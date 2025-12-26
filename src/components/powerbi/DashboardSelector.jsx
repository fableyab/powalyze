import React from 'react';

const DashboardSelector = ({ dashboards, selectedId, onSelect }) => {
  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg p-2">
      <div className="flex flex-wrap gap-2">
        {dashboards.map((dashboard) => (
          <button
            key={dashboard.id}
            onClick={() => onSelect(dashboard.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedId === dashboard.id
                ? 'bg-gold-primary text-dark-primary shadow-lg shadow-gold-primary/20'
                : 'bg-dark-700 text-dark-300 hover:bg-dark-600 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{dashboard.icon}</span>
              <span>{dashboard.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSelector;
