import React from 'react';
import { Bell, Search, HelpCircle, User } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet, une tâche, un membre..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-powalyze-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Help */}
          <button className="p-2 text-gray-600 hover:text-powalyze-blue hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-600 hover:text-powalyze-blue hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Fabrice Dumont</p>
              <p className="text-xs text-gray-500">PMO Manager</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-powalyze-blue to-powalyze-blue-dark flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
