import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutTemplate, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout, isAuthenticated } from '@/lib/auth';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
       {/* Admin Header */}
       <header className="border-b border-white/10 bg-[#111] fixed w-full top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                 <ArrowLeft size={16} /> Back
               </Link>
               <div className="h-6 w-[1px] bg-white/10"></div>
               <div className="flex items-center gap-2">
                 <span className="font-display text-lg text-white">Editor Mode</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 gap-2"
               >
                 <LogOut size={16} /> Logout
               </Button>
            </div>
          </div>
        </header>
        <main className="flex-grow pt-20">
           {children}
        </main>
    </div>
  );
};

export default AdminLayout;