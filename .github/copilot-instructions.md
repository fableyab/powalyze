# Copilot Instructions for POWALYZE

## Project Overview
- **POWALYZE** is a production-ready project management system with a focus on task management, real-time sync, and mobile-first design.
- Built with React (JSX), TypeScript, and Supabase for backend/database.
- Key features: Task CRUD, comments, activity tracking, filtering, real-time updates, and responsive UI.

## Architecture & Key Files
- **Frontend**: Main app in `src/` (see `App.jsx`, `components/projects/`, `pages/`).
- **API**: REST endpoints in `src/api/routes/` (e.g., `tasks.ts`).
- **Database**: Supabase SQL migrations in `src/migrations/` (e.g., `002_project_manager_tables.sql`).
- **Types**: Shared types in `src/types/`.
- **Docs**: Extensive guides in `docs/` (start with `PROJECT_MANAGER_QUICKSTART.md`).

## Developer Workflows
- **Build**: `npm run build` (see `package.json`).
- **Test locally**: Start dev server, then visit `http://localhost:3002/dashboard/projects/test-id`.
- **Deploy**: Use scripts in root (e.g., `deploy.sh`, `deploy-hostinger.ps1`).
- **Database setup**: Run SQL from `src/migrations/002_project_manager_tables.sql` in Supabase.

## Project-Specific Conventions
- **Routing**: Add new pages/components to the router in `App.jsx`.
- **Component structure**: Use `components/projects/` for project/task UI, hooks in `hooks/`.
- **API**: Follow RESTful conventions; endpoints are documented in `PROJECT_MANAGER_README.md`.
- **Security**: Enforced via Supabase RLS and PostgreSQL constraints.
- **Mobile**: All UI must be responsive and touch-friendly.

## Integration & Communication
- **Supabase**: Used for authentication, database, and real-time sync.
- **No direct DB access**: Always use API or Supabase client.
- **Cross-component data**: Use custom hooks (see `hooks/`).

## Patterns & Examples
- **Task CRUD**: See `useProjectTasks()`, `useCreateTask()`, `TaskCard.jsx`.
- **Comments**: `TaskCommentFeed.jsx`, `useTaskComments()`.
- **API usage**: `src/api/routes/tasks.ts`.
- **Adding features**: Update both frontend (component/hook) and backend (API route, SQL if needed).

## Documentation
- **Start here**: `PROJECT_MANAGER_README.md` (root) and `docs/` folder.
- **Deployment**: `DEPLOYMENT_README.md` and scripts in root.
- **Troubleshooting**: See guides in `docs/`.

## Quick Reference
- Main entry: `PROJECT_MANAGER_README.md`
- Build: `npm run build`
- Test: Visit `/dashboard/projects/test-id`
- Deploy: See `DEPLOYMENT_README.md`
- Database: Use Supabase migrations

---
For more, see the guides in `docs/` and comments in key files. When in doubt, follow the patterns in `components/projects/` and `hooks/`.
