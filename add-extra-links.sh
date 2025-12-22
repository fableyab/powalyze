#!/bin/bash
cd /var/www/powalyze/src/pages

# Find the line number with Rapports link
LINE=$(grep -n 'Rapports</Link>' PMOWorkspacePage.jsx | head -1 | cut -d: -f1)

if [ -n "$LINE" ]; then
  # Insert after that line
  sed -i "${LINE}a\\
                <Link to=\"/pmo-tasks\" className=\"text-sm font-medium text-gray-400 hover:text-white\">Tâches</Link>\\
                <Link to=\"/pmo-calendar\" className=\"text-sm font-medium text-gray-400 hover:text-white\">Calendrier</Link>" PMOWorkspacePage.jsx
  echo "Added Tâches and Calendrier links after line $LINE"
fi

# Also update Settings button to be a Link
sed -i 's|<button className="p-2 rounded-lg hover:bg-white/10">|<Link to="/pmo-settings" className="p-2 rounded-lg hover:bg-white/10">|' PMOWorkspacePage.jsx
sed -i 's|<Settings size={18} className="text-gray-400" /></button>|<Settings size={18} className="text-gray-400" /></Link>|' PMOWorkspacePage.jsx

echo "Updated navigation"
grep -n 'Link to' PMOWorkspacePage.jsx | head -15
