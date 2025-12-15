# Live Demo & Projects Implementation

## 1. Live Data Architecture
The `/live-demo` page uses a sophisticated simulation engine:
- **realtimeDataGenerator.js**: Jitters base values to create realistic noise.
- **useLiveData.js**: Hook that manages the polling interval (default 2s) and ensures memory cleanup on unmount.
- **Components**: Each tab (Dashboard, Projects, etc.) subscribes to the specific data stream it needs.

## 2. Client Space (Project Management)
A complete CRUD environment for managing portfolios:
- **Storage**: Uses `localStorage` via `projectService` to persist data between reloads without a backend.
- **Context**: `ProjectContext` handles state lifting so the project list updates immediately after creation/deletion.
- **UI**: 
  - `ClientSpacePage`: List view with search.
  - `NewProjectPage`: Form based creation with validation.

## 3. Settings System
- **Persistence**: `SettingsContext` loads/saves preferences (theme, refresh rate) to `localStorage` keyed by User ID.
- **UI**: Accessible via `SettingsPanel` in the Power BI embed view or potentially global nav.

## 4. Performance
- **Caching**: `cacheService` provides short-term memory caching for expensive operations.
- **Lazy Loading**: All major route components are lazy loaded in `App.jsx`.
- **Optimization**: Images preloaded via `performanceService` where applicable.

## 5. Usage Guide
1. **Live Demo**: Navigate to `/live-demo` to see the streaming data. No login required.
2. **Projects**: Login (demo/demo), go to "Client Space", click "New Project". 
3. **Settings**: Available in the Power BI Advanced view settings gear icon.