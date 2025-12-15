
import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Active': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Completed': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'On Hold': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'At Risk': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Pending': 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  };

  const currentStyle = styles[status] || styles['Pending'];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${currentStyle}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
