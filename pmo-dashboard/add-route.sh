#!/bin/bash
# Add PMOWorkspacePage to App.jsx

APP_FILE="/var/www/powalyze/src/App.jsx"

# Add import after line 93
sed -i '93a const PMOWorkspacePage = lazy(() => import("@/pages/PMOWorkspacePage"));' "$APP_FILE"

# Add route before line 189 (now 190 after insert)
sed -i '/Route path="\/admin\/statistics"/a \         <Route path="/pmo-workspace" element={<PMOWorkspacePage />} />' "$APP_FILE"

echo "PMOWorkspacePage added to App.jsx"
grep -n "PMOWorkspace" "$APP_FILE"
