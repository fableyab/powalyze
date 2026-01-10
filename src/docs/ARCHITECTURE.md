
# Powalyze Architecture Documentation

## Overview
Powalyze OS is a single-page application (SPA) built with Vite and React, designed to serve as a high-performance strategic steering platform for enterprise clients.

## Technology Stack
- **Frontend**: React 18, Vite, TailwindCSS
- **State Management**: React Context (Auth, Language), TanStack Query (Data Fetching)
- **Routing**: React Router 6 (Lazy loading enabled)
- **UI Library**: shadcn/ui (Radix Primitives) + Framer Motion
- **Backend (Simulated)**: Supabase (Auth, Database, Storage)

## Security Architecture
1. **Authentication**: 
   - Managed via Supabase Auth (JWT).
   - Session persistence in local storage with automatic refresh.
2. **Row-Level Security (RLS)**:
   - All database tables enforce RLS policies based on `tenant_id`.
   - Users can only access data belonging to their assigned tenant.
3. **Power BI Security**:
   - "App Owns Data" model simulated.
   - Tokens generated server-side with RLS identity blob injection.

## Project Structure
- `/src/components`: Reusable UI components (Atomic design)
- `/src/pages`: Page-level components mapped to routes
- `/src/lib`: Utilities, constants, and API wrappers
- `/src/contexts`: Global state providers
- `/src/docs`: Technical documentation
