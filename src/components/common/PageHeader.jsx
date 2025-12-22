import React from 'react';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="ml-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
