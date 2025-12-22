#!/bin/bash
cd /var/www/powalyze

# Add imports after PMOWorkspacePage import
sed -i "/import PMOWorkspacePage/a\\
import PMOProjectsPage from './pages/PMOProjectsPage';\\
import PMOTeamPage from './pages/PMOTeamPage';\\
import PMOReportsPage from './pages/PMOReportsPage';\\
import PMOTasksPage from './pages/PMOTasksPage';\\
import PMOCalendarPage from './pages/PMOCalendarPage';\\
import PMOSettingsPage from './pages/PMOSettingsPage';" src/App.jsx

# Add routes after pmo-workspace route
sed -i '/<Route path="\/pmo-workspace" element={<PMOWorkspacePage \/>} \/>/a\
          <Route path="/pmo-projects" element={<PMOProjectsPage />} />\
          <Route path="/pmo-team" element={<PMOTeamPage />} />\
          <Route path="/pmo-reports" element={<PMOReportsPage />} />\
          <Route path="/pmo-tasks" element={<PMOTasksPage />} />\
          <Route path="/pmo-calendar" element={<PMOCalendarPage />} />\
          <Route path="/pmo-settings" element={<PMOSettingsPage />} />' src/App.jsx

echo "Routes added to App.jsx"
grep -n "PMO" src/App.jsx
