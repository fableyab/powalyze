import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <main className="flex-1 overflow-y-auto bg-black min-h-screen">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
