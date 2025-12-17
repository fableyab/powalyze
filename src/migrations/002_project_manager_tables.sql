/**
 * Supabase Migration: Project Management System
 * Adds task management tables to powalyze SaaS platform
 * 
 * Tables:
 * - project_tasks: Core task data
 * - task_comments: Comments and activity
 * - subtasks: Task breakdowns
 * - task_attachments: File uploads
 * - task_activity_log: Activity tracking for timeline
 */

-- ============================================
-- 1. PROJECT TASKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Task properties
  priority VARCHAR(20) NOT NULL DEFAULT 'medium' 
    CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(20) NOT NULL DEFAULT 'todo'
    CHECK (status IN ('todo', 'in_progress', 'blocked', 'done')),
  
  -- Assignments and dates
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  start_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  order_position DECIMAL(10, 3),
  parent_task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE,
  
  -- Statistics (updated via triggers)
  subtask_count INT DEFAULT 0,
  completed_subtasks INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  attachment_count INT DEFAULT 0,
  
  -- Audit
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_due_date CHECK (due_date IS NULL OR due_date >= created_at)
);

-- Indexes for task queries
CREATE INDEX idx_tasks_project ON project_tasks(project_id);
CREATE INDEX idx_tasks_status ON project_tasks(status);
CREATE INDEX idx_tasks_priority ON project_tasks(priority);
CREATE INDEX idx_tasks_assigned ON project_tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON project_tasks(due_date);
CREATE INDEX idx_tasks_created ON project_tasks(created_at DESC);
CREATE INDEX idx_tasks_parent ON project_tasks(parent_task_id);

-- Combined index for common queries
CREATE INDEX idx_tasks_project_status_priority ON project_tasks(project_id, status, priority);

-- ============================================
-- 2. TASK COMMENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  -- Edit tracking
  edited_at TIMESTAMP WITH TIME ZONE,
  edited_by UUID REFERENCES users(id),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT non_empty_content CHECK (LENGTH(TRIM(content)) > 0)
);

-- Indexes for comment queries
CREATE INDEX idx_comments_task ON task_comments(task_id);
CREATE INDEX idx_comments_user ON task_comments(user_id);
CREATE INDEX idx_comments_created ON task_comments(created_at DESC);

-- ============================================
-- 3. SUBTASKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  
  title VARCHAR(255) NOT NULL,
  order_position DECIMAL(10, 3),
  
  -- Status tracking
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Dates
  due_date TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for subtask queries
CREATE INDEX idx_subtasks_task ON subtasks(task_id);
CREATE INDEX idx_subtasks_completed ON subtasks(completed);
CREATE INDEX idx_subtasks_assigned ON subtasks(assigned_to);

-- ============================================
-- 4. TASK ATTACHMENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS task_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  
  -- File info
  file_name VARCHAR(255) NOT NULL,
  file_size INT NOT NULL,
  file_type VARCHAR(100),
  
  -- Storage (Supabase Storage URL or external URL)
  url TEXT NOT NULL,
  
  -- Metadata
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for attachment queries
CREATE INDEX idx_attachments_task ON task_attachments(task_id);

-- ============================================
-- 5. TASK ACTIVITY LOG TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS task_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  
  -- Activity type
  action_type VARCHAR(50) NOT NULL
    CHECK (action_type IN (
      'created', 'updated', 'status_changed', 'assigned', 'commented',
      'attachment_added', 'subtask_created', 'subtask_completed', 'deleted'
    )),
  
  -- What changed
  field_name VARCHAR(100),
  old_value TEXT,
  new_value TEXT,
  
  -- Who did it
  performed_by UUID REFERENCES users(id),
  
  -- When
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activity queries
CREATE INDEX idx_activity_task ON task_activity_log(task_id);
CREATE INDEX idx_activity_action ON task_activity_log(action_type);
CREATE INDEX idx_activity_created ON task_activity_log(created_at DESC);

-- ============================================
-- 6. TASK WATCHERS/FOLLOWERS (Optional)
-- ============================================

CREATE TABLE IF NOT EXISTS task_watchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES project_tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(task_id, user_id)
);

CREATE INDEX idx_watchers_task ON task_watchers(task_id);
CREATE INDEX idx_watchers_user ON task_watchers(user_id);

-- ============================================
-- 7. TRIGGERS
-- ============================================

-- Update task updated_at timestamp
CREATE OR REPLACE FUNCTION update_task_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_task_timestamp
BEFORE UPDATE ON project_tasks
FOR EACH ROW
EXECUTE FUNCTION update_task_timestamp();

-- Increment comment count on new comment
CREATE OR REPLACE FUNCTION increment_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_tasks
  SET comment_count = comment_count + 1
  WHERE id = NEW.task_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_comment_count
AFTER INSERT ON task_comments
FOR EACH ROW
EXECUTE FUNCTION increment_comment_count();

-- Decrement comment count on comment delete
CREATE OR REPLACE FUNCTION decrement_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_tasks
  SET comment_count = GREATEST(0, comment_count - 1)
  WHERE id = OLD.task_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_decrement_comment_count
AFTER DELETE ON task_comments
FOR EACH ROW
EXECUTE FUNCTION decrement_comment_count();

-- Increment subtask count on new subtask
CREATE OR REPLACE FUNCTION increment_subtask_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_tasks
  SET subtask_count = subtask_count + 1
  WHERE id = NEW.task_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_subtask_count
AFTER INSERT ON subtasks
FOR EACH ROW
EXECUTE FUNCTION increment_subtask_count();

-- Update completed_subtasks count
CREATE OR REPLACE FUNCTION update_completed_subtasks()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_tasks
  SET completed_subtasks = (
    SELECT COUNT(*) FROM subtasks 
    WHERE task_id = NEW.task_id AND completed = TRUE
  )
  WHERE id = NEW.task_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_completed_subtasks
AFTER INSERT OR UPDATE ON subtasks
FOR EACH ROW
EXECUTE FUNCTION update_completed_subtasks();

-- Increment attachment count
CREATE OR REPLACE FUNCTION increment_attachment_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE project_tasks
  SET attachment_count = attachment_count + 1
  WHERE id = NEW.task_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_attachment_count
AFTER INSERT ON task_attachments
FOR EACH ROW
EXECUTE FUNCTION increment_attachment_count();

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_watchers ENABLE ROW LEVEL SECURITY;

-- Users can view tasks if they're members of the project organization
CREATE POLICY "view_tasks_if_org_member" ON project_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE projects.id = project_tasks.project_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Users can create tasks in their organization's projects
CREATE POLICY "create_tasks_in_org" ON project_tasks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE projects.id = project_tasks.project_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Users can update tasks in their organization
CREATE POLICY "update_tasks_in_org" ON project_tasks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE projects.id = project_tasks.project_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Similar policies for comments
CREATE POLICY "view_comments_if_org_member" ON task_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_tasks
      JOIN projects ON project_tasks.project_id = projects.id
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE project_tasks.id = task_comments.task_id
      AND organization_members.user_id = auth.uid()
    )
  );

CREATE POLICY "create_comments_in_org" ON task_comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_tasks
      JOIN projects ON project_tasks.project_id = projects.id
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE project_tasks.id = task_comments.task_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Similar policies for subtasks
CREATE POLICY "view_subtasks_if_org_member" ON subtasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_tasks
      JOIN projects ON project_tasks.project_id = projects.id
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE project_tasks.id = subtasks.task_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- Similar policies for attachments
CREATE POLICY "view_attachments_if_org_member" ON task_attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM project_tasks
      JOIN projects ON project_tasks.project_id = projects.id
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN organization_members ON organizations.id = organization_members.organization_id
      WHERE project_tasks.id = task_attachments.task_id
      AND organization_members.user_id = auth.uid()
    )
  );

-- ============================================
-- 9. VIEWS
-- ============================================

-- Task with all related info
CREATE OR REPLACE VIEW tasks_with_details AS
SELECT 
  pt.id,
  pt.project_id,
  pt.title,
  pt.description,
  pt.priority,
  pt.status,
  pt.assigned_to,
  u.full_name as assigned_user_name,
  u.email as assigned_user_email,
  pt.due_date,
  pt.start_date,
  pt.completed_at,
  pt.subtask_count,
  pt.completed_subtasks,
  pt.comment_count,
  pt.attachment_count,
  pt.created_at,
  pt.updated_at,
  CASE 
    WHEN pt.status = 'done' THEN 100
    ELSE CASE 
      WHEN pt.subtask_count > 0 
      THEN ROUND((pt.completed_subtasks::FLOAT / pt.subtask_count) * 100)
      ELSE 0
    END
  END as completion_percentage,
  CASE 
    WHEN pt.status = 'done' THEN 'completed'
    WHEN pt.due_date < NOW() AND pt.status != 'done' THEN 'overdue'
    WHEN pt.due_date < NOW() + INTERVAL '3 days' THEN 'due_soon'
    ELSE 'on_track'
  END as health_status
FROM project_tasks pt
LEFT JOIN users u ON pt.assigned_to = u.id;

-- Task statistics by project
CREATE OR REPLACE VIEW project_task_stats AS
SELECT 
  pt.project_id,
  COUNT(*) as total_tasks,
  COUNT(*) FILTER (WHERE status = 'done') as completed_tasks,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_tasks,
  COUNT(*) FILTER (WHERE status = 'blocked') as blocked_tasks,
  COUNT(*) FILTER (WHERE status = 'todo') as todo_tasks,
  COUNT(*) FILTER (WHERE due_date < NOW() AND status != 'done') as overdue_tasks,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'done')::FLOAT / 
    NULLIF(COUNT(*), 0) * 100
  ) as completion_percentage
FROM project_tasks pt
GROUP BY pt.project_id;

-- ============================================
-- 10. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment to add sample data
/*
INSERT INTO project_tasks (
  project_id, title, description, priority, status, due_date
) VALUES
  (
    (SELECT id FROM projects LIMIT 1),
    'Design homepage mockups',
    'Create multiple design variations for the homepage landing page',
    'high',
    'in_progress',
    NOW() + INTERVAL '5 days'
  ),
  (
    (SELECT id FROM projects LIMIT 1),
    'Set up authentication',
    'Implement OAuth2 authentication for user login',
    'critical',
    'todo',
    NOW() + INTERVAL '2 days'
  );
*/

-- ============================================
-- 11. GRANTS (For service role)
-- ============================================

-- Grant permissions to service role
GRANT ALL PRIVILEGES ON project_tasks TO authenticated;
GRANT ALL PRIVILEGES ON task_comments TO authenticated;
GRANT ALL PRIVILEGES ON subtasks TO authenticated;
GRANT ALL PRIVILEGES ON task_attachments TO authenticated;
GRANT ALL PRIVILEGES ON task_activity_log TO authenticated;
GRANT ALL PRIVILEGES ON task_watchers TO authenticated;

-- Grant permissions on views
GRANT SELECT ON tasks_with_details TO authenticated;
GRANT SELECT ON project_task_stats TO authenticated;

-- ============================================
-- Migration complete
-- ============================================

-- Verify tables exist
-- SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE 'task%' OR tablename LIKE 'subtask%';
