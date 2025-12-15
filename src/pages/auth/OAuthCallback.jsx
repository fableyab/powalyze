import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!supabase) {
          navigate('/login?error=auth%20non%20configuree');
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          navigate('/login?error=' + encodeURIComponent(error.message));
          return;
        }

        if (session?.user) {
          setUser?.(session.user);
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Unexpected error in OAuth callback:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#BFA76A] mx-auto"></div>
        <p className="text-white mt-4">Logging you in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
