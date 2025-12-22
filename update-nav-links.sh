#!/bin/bash
cd /var/www/powalyze/src/pages

# Add Link import
sed -i "s/import { motion, AnimatePresence } from 'framer-motion';/import { motion, AnimatePresence } from 'framer-motion';\nimport { Link } from 'react-router-dom';/" PMOWorkspacePage.jsx

# Replace navigation links
sed -i 's|<a href="#" className="text-sm font-medium text-\[#BFA76A\]">Dashboard</a>|<Link to="/pmo-workspace" className="text-sm font-medium text-[#BFA76A]">Dashboard</Link>|' PMOWorkspacePage.jsx

sed -i 's|<a href="#" className="text-sm font-medium text-gray-400 hover:text-white">Projets</a>|<Link to="/pmo-projects" className="text-sm font-medium text-gray-400 hover:text-white">Projets</Link>|' PMOWorkspacePage.jsx

sed -i 's|<a href="#" className="text-sm font-medium text-gray-400 hover:text-white">Équipe</a>|<Link to="/pmo-team" className="text-sm font-medium text-gray-400 hover:text-white">Équipe</Link>|' PMOWorkspacePage.jsx

sed -i 's|<a href="#" className="text-sm font-medium text-gray-400 hover:text-white">Rapports</a>|<Link to="/pmo-reports" className="text-sm font-medium text-gray-400 hover:text-white">Rapports</Link>|' PMOWorkspacePage.jsx

echo "Navigation links updated"
grep -n "Link to" PMOWorkspacePage.jsx | head -10
