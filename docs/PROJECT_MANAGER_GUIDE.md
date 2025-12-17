# Project Manager - Feature Documentation

## Overview

A mobile-first, simple project management application integrated into the Powalyze client portal. Similar to Monday.com but significantly simpler, focused on essential task management features.

**Status**: ✅ Core components created, ready for integration and testing

## Features

### ✅ Implemented
- **Task Management**: Create, read, update, delete tasks
- **Task Properties**: Title, description, priority (critical/high/medium/low), status (todo/in_progress/blocked/done), due dates
- **Filtering & Search**: By status, priority, assigned user, free text search
- **Task Statistics**: Total, completed, in-progress, overdue task counts
- **Comments & Activity**: Comments on tasks with user avatars and timestamps
- **Mobile-First Design**: Fully responsive on phones, tablets, and desktops
- **Real-Time Sync**: Supabase real-time listeners for live updates

### 🔄 In Development
- **Kanban Board View**: Drag-and-drop task management (coming soon)
- **Timeline/Gantt View**: Visual timeline with task dependencies (coming soon)
- **Subtasks**: Break down complex tasks (types created, UI coming soon)
- **Attachments**: File uploads and management (coming soon)
- **Notifications**: Task assignments and deadline alerts (coming soon)

### 🎯 Future
- **Recurring Tasks**: Set up repeating tasks
- **Templates**: Pre-defined task templates
- **Collaboration**: Real-time collaboration with team members
- **Webhooks**: Integrate with external tools (Slack, Zapier, etc.)

## Architecture

### Database Schema

**Key Tables**:
```sql
-- Main task table
project_tasks (
  id, project_id, title, description, priority, status,
  due_date, assigned_to, created_at, updated_at, completed_at
)

-- Comments/activity
task_comments (
  id, task_id, user_id, content, created_at
)

-- Subtasks (for breaking down work)
subtasks (
  id, task_id, title, completed, created_at
)

-- Attachments
task_attachments (
  id, task_id, file_name, file_size, file_type, url
)
```

### Component Structure

```
src/components/projects/
├── TaskCard.jsx              # Individual task display card
├── ProjectTaskList.jsx       # Main list view with filtering
├── TaskModal.jsx             # Create/edit task modal
├── TaskCommentFeed.jsx       # Comments display and input
└── ProjectBoard.jsx          # (Future) Kanban board view

src/pages/
└── ProjectManager.jsx        # Main page with view switcher

src/hooks/
└── useProjects.ts            # Custom hooks for data fetching

src/api/routes/
└── tasks.ts                  # REST API endpoints
```

### React Hooks (Custom)

All custom hooks are in `src/hooks/useProjects.ts`:

```typescript
// Fetch tasks with filtering
const { tasks, loading, error } = useProjectTasks(projectId, filters);

// Create new task
const { createTask, loading, error } = useCreateTask();

// Update task
const { updateTask, loading, error } = useUpdateTask();

// Get task comments
const { comments, loading, error } = useTaskComments(taskId);

// Add comment
const { addComment, loading, error } = useAddComment();

// Get project statistics
const { stats, loading } = useProjectStats(projectId);
```

### TypeScript Types

See `src/types/projects.types.ts` for all type definitions:

```typescript
interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  due_date?: string;
  assigned_to?: string;
  assigned_user?: User;
  subtask_count?: number;
  completed_subtasks?: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  user?: User;
  content: string;
  created_at: string;
  updated_at: string;
}
```

## API Reference

### Endpoints

All endpoints are in `src/api/routes/tasks.ts`.

#### List Tasks
```
GET /api/tasks?projectId=xxx&status=in_progress&priority=high&search=design

Query Parameters:
- projectId (required): UUID of project
- status: 'todo' | 'in_progress' | 'blocked' | 'done' (can be array)
- priority: 'low' | 'medium' | 'high' | 'critical' (can be array)
- assigned_to: User ID
- search: Free text search in title and description
- page: Page number (default 1)
- limit: Items per page (default 20)

Response:
{
  "data": [ProjectTask, ...],
  "pagination": { "page": 1, "limit": 20, "total": 42 }
}
```

#### Create Task
```
POST /api/tasks

Body:
{
  "projectId": "xxx",
  "title": "Design homepage",
  "description": "Create mockups for new homepage layout",
  "priority": "high",
  "status": "todo",
  "due_date": "2024-01-15",
  "assigned_to": "user-123"
}

Response: ProjectTask
```

#### Get Task Details
```
GET /api/tasks/:id

Response: ProjectTask (includes comments, subtasks)
```

#### Update Task
```
PATCH /api/tasks/:id

Body: Partial<ProjectTask>

Response: Updated ProjectTask
```

#### Delete Task
```
DELETE /api/tasks/:id

Response: 204 No Content
```

#### Update Task Status (Quick Action)
```
PATCH /api/tasks/:id/status

Body:
{
  "status": "done"
}

Response: Updated ProjectTask
```

#### List Comments
```
GET /api/tasks/:id/comments?page=1&limit=50

Response:
{
  "data": [TaskComment, ...],
  "pagination": { "page": 1, "limit": 50, "total": 8 }
}
```

#### Add Comment
```
POST /api/tasks/:id/comments

Body:
{
  "content": "Started working on this",
  "user_id": "user-123"
}

Response: TaskComment
```

## Usage Examples

### Basic Integration

```jsx
import ProjectTaskList from '@/components/projects/ProjectTaskList';

export function Dashboard() {
  const projectId = 'project-123';

  return (
    <ProjectTaskList 
      projectId={projectId}
      onTaskSelect={(task) => console.log('Selected:', task)}
    />
  );
}
```

### With Custom Hooks

```jsx
import { useProjectTasks, useCreateTask } from '@/hooks/useProjects';

export function TaskManager({ projectId }) {
  const { tasks, loading } = useProjectTasks(projectId);
  const { createTask } = useCreateTask();

  const handleCreate = async () => {
    await createTask(projectId, {
      title: 'New task',
      priority: 'high',
      status: 'todo',
    });
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
      <button onClick={handleCreate}>Create Task</button>
    </div>
  );
}
```

## Mobile Optimization

### Responsive Breakpoints

- **Mobile** (< 640px): Full-width cards, stacked layout, simplified filters
- **Tablet** (640px - 1024px): Two-column layout, improved spacing
- **Desktop** (> 1024px): Three-column layout, expanded details

### Mobile-Specific Features

- **Touch-friendly**: Buttons sized for thumb/finger taps (44px minimum)
- **Scroll optimization**: Horizontal scroll for filters, vertical for tasks
- **Bottom sheet**: Modal opens from bottom on mobile (full height)
- **One-handed operation**: Important controls on lower part of screen
- **Fast loading**: Lazy load comments and attachments
- **Offline support**: Ready for service worker implementation

### Testing Checklist

- [ ] iPhone SE (320px width)
- [ ] iPhone 12/13 (390px width)
- [ ] iPhone 14 Pro Max (430px width)
- [ ] iPad (768px width)
- [ ] iPad Pro (1024px width)
- [ ] Android phones (various resolutions)
- [ ] Touch interactions (no hover effects on mobile)
- [ ] Landscape orientation
- [ ] Network throttling (slow 3G)

## Integration into Client Portal

### Route Setup

Add to your main router configuration:

```jsx
import ProjectManager from '@/pages/ProjectManager';

export const routes = [
  // ... other routes
  {
    path: '/dashboard/projects/:projectId',
    element: <ProjectManager />,
  },
];
```

### Navigation

Add link in client dashboard navigation:

```jsx
<Link to={`/dashboard/projects/${projectId}`}>
  <span>📊 Projects</span>
  <span className="badge">5</span>
</Link>
```

### Permission Control

Use Supabase RLS policies to control access:

```sql
-- Users can only see their organization's projects
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_view_org_tasks" ON project_tasks
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects 
      WHERE organization_id = auth.user_organization_id()
    )
  );
```

## Performance Optimization

### Implemented
- ✅ Query filtering at database level (not client-side)
- ✅ Pagination (20 items per page by default)
- ✅ Indexed columns (project_id, status, due_date, assigned_to)
- ✅ Lazy loading of comments and attachments

### Recommendations
- 🔄 Add virtual scrolling for lists > 100 items
- 🔄 Implement caching with React Query or SWR
- 🔄 Debounce search input (300ms)
- 🔄 Batch updates when changing multiple tasks

## Error Handling

All components include proper error states:

```jsx
const { tasks, loading, error } = useProjectTasks(projectId);

if (error) {
  return (
    <div className="bg-red-50 border border-red-200 p-4">
      Error: {error}
    </div>
  );
}
```

## Testing

### Unit Tests
```bash
npm test -- src/components/projects/
npm test -- src/hooks/useProjects.ts
```

### E2E Tests
```bash
npm run test:e2e -- task-management
```

### Manual Testing
1. Create project and navigate to `/dashboard/projects/:projectId`
2. Click "Add Task" and fill form
3. Verify task appears in list
4. Test filters and search
5. Test on mobile devices (actual or DevTools)
6. Test offline (DevTools Network tab)

## Troubleshooting

### Tasks not loading
- Check Supabase connection
- Verify projectId is correct
- Check RLS policies in Supabase
- Look at browser console for errors

### Modal not opening on mobile
- Check CSS media queries in TaskModal.jsx
- Ensure no max-width constraints
- Test with DevTools mobile emulation

### Comments not appearing
- Verify task is saved first
- Check task_comments table exists
- Verify user_id is provided when adding comment
- Check RLS policies for comments table

## Future Roadmap

### Phase 1 (Next 2 weeks)
- [ ] Complete Kanban board view with drag-drop
- [ ] Add subtasks UI
- [ ] Implement real-time collaboration

### Phase 2 (Month 2)
- [ ] Timeline/Gantt chart view
- [ ] File attachments
- [ ] Email notifications

### Phase 3 (Month 3)
- [ ] Advanced filtering (custom fields)
- [ ] Task templates
- [ ] Integration webhooks

### Phase 4 (Month 4+)
- [ ] AI-powered insights
- [ ] Predictive analytics
- [ ] Mobile app (React Native)

## Support

For issues or questions:
1. Check this documentation
2. Review component JSDoc comments
3. Check error messages in browser console
4. Contact dev team

## Environment Variables

```env
# Required in .env or .env.local
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=xxx

# Optional (for notifications)
REACT_APP_SENDGRID_API_KEY=xxx
REACT_APP_SLACK_WEBHOOK_URL=xxx
```

---

**Created**: December 2024
**Status**: Beta (core features functional, advanced features pending)
**Last Updated**: [Current Date]
