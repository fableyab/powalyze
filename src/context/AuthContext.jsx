
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth/authService';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const initAuth = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();

    // Listen for auth changes from Supabase
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      });

      return () => subscription?.unsubscribe();
    }
  }, [initAuth]);

  const login = async (email, password) => {
    try {
      const session = await authService.login(email, password);
      setUser(session.user);
      toast({ title: "Welcome back!", description: "You have successfully logged in." });
      return true;
    } catch (error) {
      toast({ variant: "destructive", title: "Login Failed", description: error.message });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const session = await authService.register(userData);
      setUser(session.user);
      toast({ title: "Account Created", description: "Welcome to Powalyze!" });
      return true;
    } catch (error) {
      toast({ variant: "destructive", title: "Registration Failed", description: error.message });
      throw error;
    }
  };

  const socialLogin = async (provider) => {
    try {
      setLoading(true);
      
      if (!supabase) {
        toast({ 
          variant: "destructive", 
          title: "OAuth Not Configured", 
          description: "Please check your Supabase configuration." 
        });
        return;
      }

      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: redirectUrl,
          scopes: provider === 'google' ? 'openid profile email' : undefined
        }
      });

      if (error) {
        throw error;
      }

      toast({ title: "Redirecting...", description: `Logging in with ${provider}...` });
    } catch (error) {
      console.error(`${provider} OAuth Error:`, error);
      toast({ 
        variant: "destructive", 
        title: "Login Failed", 
        description: `Could not login with ${provider}. ${error?.message || 'Please try again.'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast({ title: "Logged out", description: "See you soon!" });
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (data) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
      toast({ title: "Profile Updated", description: "Changes saved successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      loginDemo: authService.loginDemo,
      register,
      signup: register,
      logout,
      updateProfile,
      socialLogin,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
