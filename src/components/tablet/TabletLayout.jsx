import React from 'react';
import { Outlet } from 'react-router-dom';
import TabletSidebar from '@/components/tablet/TabletSidebar';
import VersionBanner from '@/components/VersionBanner';

/**
 * Layout principal pour tablette/iPad
 */
const TabletLayout = () => {
  return (
    <div className="flex flex-col h-screen w-screen fixed inset-0 bg-gray-50 overflow-hidden z-[9999]">
      <VersionBanner currentView="tablet" />
      
      <div className="flex flex-1 overflow-hidden">
        <TabletSidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TabletLayout;
