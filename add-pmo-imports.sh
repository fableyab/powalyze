#!/bin/bash
cd /var/www/powalyze

# Add lazy imports for new PMO pages after PMOWorkspacePage
sed -i '/const PMOWorkspacePage = lazy/a\
const PMOProjectsPage = lazy(() => import("@/pages/PMOProjectsPage"));\
const PMOTeamPage = lazy(() => import("@/pages/PMOTeamPage"));\
const PMOReportsPage = lazy(() => import("@/pages/PMOReportsPage"));\
const PMOTasksPage = lazy(() => import("@/pages/PMOTasksPage"));\
const PMOCalendarPage = lazy(() => import("@/pages/PMOCalendarPage"));\
const PMOSettingsPage = lazy(() => import("@/pages/PMOSettingsPage"));' src/App.jsx

echo "Imports added successfully"
grep -n "const PMO" src/App.jsx
