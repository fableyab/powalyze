# Live Demo & Client Space Implementation Guide

## Overview
This update introduces a comprehensive **Live Demo** environment with real-time simulated data streaming, alongside a fully functional **Client Space** for project management.

## 1. Live Demo Architecture
The Live Demo pages utilize a simulated WebSocket connection via `useLiveData` hook and `realtimeDataGenerator` service.

- **URL**: `/live-demo`
- **Tabs**: Dashboard, Projects, Financials, Sales, PMO.
- **Mechanism**: Data updates every 2 seconds with realistic "jitter" to simulate live metric fluctuations.

### Components
- `LiveDashboard.jsx`: High-level overview with latency metrics.
- `LiveProjectTracking.jsx`: Auto-updating progress bars.
- `LiveFinancialOverview.jsx`: Area charts with real-time redrawing.

## 2. Client Space (Project Management)
A dedicated area for authenticated users to manage their portfolios.

- **URL**: `/client/space`
- **Features**: 
  - List View with filtering.
  - Create New Project wizard (`/client/projects/new`).
  - Validation using `projectService`.
- **Data Persistence**: Uses a unified `dataService` that defaults to LocalStorage ("Mock Mode") if Supabase is not configured, ensuring seamless demo capability.

## 3. Services & Context
- **SettingsContext**: Persists user preferences (theme, currency) to localStorage.
- **CacheService**: Simple in-memory LRU-style cache for expensive operations.
- **PerformanceService**: Utilities for optimizing heavy data processing.

## 4. Usage
1. navigate to `/live-demo` to see the streaming data.
2. Login (demo/demo) and go to **Client Space** via Navbar.
3. Create a new project to test the validation and persistence.