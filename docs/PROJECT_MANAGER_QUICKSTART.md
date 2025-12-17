# Project Manager Quick Start Guide

Get up and running with the new project management system in 5 minutes.

## 🚀 Quick Setup

### 1. Database Setup (2 minutes)

Open your Supabase dashboard:

1. Go to **SQL Editor**
2. Create a **new query**
3. Copy contents of `src/migrations/002_project_manager_tables.sql`
4. Paste and **Execute**
5. Verify 6 new tables appear in Tables view:
   - `project_tasks`
   - `task_comments`
   - `subtasks`
   - `task_attachments`
   - `task_activity_log`
   - `task_watchers`

```sql
-- Quick test query
SELECT table_name FROM information_schema.tables 
WHERE table_schema='public' AND table_name LIKE 'task%';
-- Should return 6 rows
```

### 2. Add Route (1 minute)

In your main router file (e.g., `src/App.jsx`):

```jsx
import ProjectManager from '@/pages/ProjectManager';

// Add to routes
{
  path: '/dashboard/projects/:projectId',
  element: <ProjectManager />
}
```

### 3. Add Navigation Link (1 minute)

In your dashboard layout (e.g., `src/layouts/ClientLayout.jsx`):

```jsx
<Link to={`/dashboard/projects/${projectId}`} className="nav-link">
  <span>📊 Projects</span>
</Link>
```

### 4. Test Locally (1 minute)

```bash
# Terminal 1: Start dev server (if not already running)
npm run dev
# Now running on http://127.0.0.1:3002/

# Terminal 2: Test the route
# Navigate to: http://127.0.0.1:3002/dashboard/projects/test-project-id
```

## 📱 Test on Mobile

1. Get your laptop's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile browser: `http://YOUR_IP:3002/dashboard/projects/test-project-id`
3. Test responsiveness - should work perfectly on all screen sizes

## 📊 Create First Task

1. Click **"Add Task"** or **"New"** button
2. Fill in:
   - **Title**: "Design homepage" (required)
   - **Description**: "Create mockups..." (optional)
   - **Priority**: "High"
   - **Status**: "To Do"
   - **Due Date**: "2024-12-20" (optional)
3. Click **"Create Task"**
4. Task appears immediately in list

## 🎯 Key Features

### View Modes
- **List** (Default): Task cards with filtering
- **Board** (Coming Soon): Kanban-style drag-drop
- **Timeline** (Coming Soon): Gantt chart view

### Filtering
- Status: Todo, In Progress, Blocked, Done
- Priority: Low, Medium, High, Critical
- Search: Free text in title/description
- Sort: By due date, creation date, priority

### Quick Actions
- **Mark Done**: Click task → change status
- **Assign**: Click task → select assignee
- **Add Comment**: Click task → Comments tab
- **Delete**: Click task → ⋮ menu → Delete

## 📚 Component Library

### Using Custom Hooks

```jsx
import { useProjectTasks, useCreateTask } from '@/hooks/useProjects';

function MyComponent({ projectId }) {
  // Fetch tasks
  const { tasks, loading, error } = useProjectTasks(projectId);
  
  // Create task
  const { createTask } = useCreateTask();
  
  const handleCreate = async () => {
    const task = await createTask(projectId, {
      title: 'New task',
      priority: 'high'
    });
  };
  
  return (
    <div>
      {tasks.map(task => <div key={task.id}>{task.title}</div>)}
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
```

### Using TaskCard Component

```jsx
import TaskCard from '@/components/projects/TaskCard';

<TaskCard 
  task={taskData}
  onClick={() => console.log('clicked')}
  onUpdate={(updates) => handleUpdate(updates)}
  onDelete={(id) => handleDelete(id)}
/>
```

### Using ProjectTaskList Component

```jsx
import ProjectTaskList from '@/components/projects/ProjectTaskList';

<ProjectTaskList 
  projectId={projectId}
  onTaskSelect={(task) => setSelectedTask(task)}
/>
```

## 🔌 API Endpoints

All endpoints available at `/api/tasks`:

```bash
# List tasks
curl "http://localhost:3002/api/tasks?projectId=xxx"

# Create task
curl -X POST "http://localhost:3002/api/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "xxx",
    "title": "Design homepage",
    "priority": "high",
    "status": "todo"
  }'

# Update task
curl -X PATCH "http://localhost:3002/api/tasks/task-id" \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'

# Add comment
curl -X POST "http://localhost:3002/api/tasks/task-id/comments" \
  -H "Content-Type: application/json" \
  -d '{"content": "Started working on this", "user_id": "user-id"}'
```

## 🐛 Common Issues

### "Tasks not loading"
```
✓ Check projectId is correct
✓ Check Supabase connection (check Network tab in DevTools)
✓ Check RLS policies (Supabase Dashboard > Authentication > Policies)
```

### "Create task not working"
```
✓ Check title field is filled
✓ Check projectId is provided
✓ Look for error message in modal
✓ Check browser console for errors
```

### "Mobile layout broken"
```
✓ Clear browser cache (Ctrl+Shift+Delete)
✓ Check mobile emulation in DevTools
✓ Test on actual mobile device
✓ Check viewport meta tag in index.html
```

## 📖 Full Documentation

For complete documentation, see:
- **Feature Guide**: `docs/PROJECT_MANAGER_GUIDE.md`
- **Implementation Details**: `docs/PROJECT_MANAGER_IMPLEMENTATION.md`
- **Database Schema**: `src/migrations/002_project_manager_tables.sql`
- **Component Code**: `src/components/projects/`

## 🎓 Learning Path

1. **Start with**: This quick start guide (you are here!)
2. **Understand**: `docs/PROJECT_MANAGER_GUIDE.md` → Architecture section
3. **Build with**: Component examples in this file
4. **Deep dive**: `docs/PROJECT_MANAGER_IMPLEMENTATION.md` for details
5. **Customize**: Component source code in `src/components/projects/`

## ⚙️ Configuration

### Customize Colors

Edit TailwindCSS classes in components:

```jsx
// Change primary color from blue to purple
className="bg-blue-500" → className="bg-purple-500"
```

### Customize Labels

Edit text in components:

```jsx
// Change "Tasks" to "Work Items"
<h2>Tasks</h2> → <h2>Work Items</h2>
```

### Customize Statuses

Edit status options in TaskModal.jsx:

```jsx
<select>
  <option value="todo">To Do</option>
  <option value="in_progress">In Progress</option>
  <option value="blocked">Blocked</option>
  <option value="done">Done</option>
  {/* Add new statuses here */}
</select>
```

## 📱 Mobile Testing Devices

Recommended devices to test on:

```
Small Phones (320px):
  - iPhone SE, SE 2, SE 3
  - Galaxy A50, A51

Standard Phones (390px):
  - iPhone 12, 12 Pro
  - iPhone 13, 13 Pro
  - Pixel 6, 6 Pro

Large Phones (430px+):
  - iPhone 14 Pro Max
  - Pixel 7 Pro
  - Galaxy S22

Tablets (768px+):
  - iPad (all generations)
  - iPad Air, Pro
  - Galaxy Tab S
```

## 🚀 Production Deployment

When ready to go live:

1. **Test thoroughly** on mobile devices
2. **Run production build**:
   ```bash
   npm run build
   # Creates dist/ folder with 139 files
   ```
3. **Deploy to Hostinger**:
   - Use File Manager or FTP
   - Upload dist/ contents to `/domains/powalyze.com/public_html/`
4. **Verify in production**:
   - Test at `https://powalyze.com/dashboard/projects/{id}`
   - Test on mobile: `https://powalyze.com`
5. **Monitor for errors**:
   - Check Supabase logs
   - Monitor browser console

## 💡 Pro Tips

### Tip 1: Keyboard Shortcuts
- `Tab` to navigate form fields
- `Enter` to submit forms
- `Escape` to close modals

### Tip 2: Mobile Optimization
- Test in DevTools with throttling (Slow 3G)
- Use real devices for final testing
- Test in landscape orientation

### Tip 3: Performance
- Use Chrome DevTools Lighthouse
- Check Network tab for slow queries
- Look for console warnings

### Tip 4: Debugging
- Add `?debug=true` to see extra logs
- Use React DevTools browser extension
- Check Supabase logs in dashboard

## 📞 Support

### For Questions About...

**Components**: Look at JSDoc comments at top of file
```jsx
/**
 * TaskCard Component
 * Displays a single task with status, priority, and actions
 * Mobile-first responsive design
 */
```

**Hooks**: See `src/hooks/useProjects.ts` for examples
**API**: See `src/api/routes/tasks.ts` endpoint comments
**Database**: See `src/migrations/002_project_manager_tables.sql` comments
**Types**: See `src/types/projects.types.ts` for all TypeScript interfaces

## ✅ Checklist

- [ ] Database tables created in Supabase
- [ ] Routes added to main router
- [ ] Navigation link added to dashboard
- [ ] Dev server running on localhost:3002
- [ ] Can navigate to `/dashboard/projects/test-id`
- [ ] Can create a task
- [ ] Can filter tasks
- [ ] Can add a comment
- [ ] Layout responsive on mobile
- [ ] Build passes: `npm run build`
- [ ] Tested in production domain

---

**Status**: ✅ Project Manager Ready
**Version**: 1.0 Beta
**Last Updated**: December 15, 2024

**Ready to deploy? Follow the Production Deployment section above!** 🚀
