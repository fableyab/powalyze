import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
