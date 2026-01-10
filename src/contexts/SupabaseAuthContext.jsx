
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (currentSession) => {
    console.log('✅ [AUTH] handleSession:', currentSession ? 'Session active' : 'Pas de session');
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        console.log('🔍 [AUTH] Récupération session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('📦 [AUTH] Session récupérée:', session ? 'OUI' : 'NON', session);
        if (error) {
          console.error('❌ [AUTH] Erreur getSession:', error);
          // If refresh token is invalid, we just clear the session and let the user login again
          // This prevents the app from crashing or getting stuck in a loop
          if (error.message.includes('Refresh Token Not Found') || error.message.includes('Invalid Refresh Token')) {
             console.warn("Session expired or invalid, clearing session.");
             if (mounted) {
                setSession(null);
                setUser(null);
                setLoading(false);
             }
             return;
          }
          throw error;
        }
        if (mounted) handleSession(session);
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
            setSession(null);
            setUser(null);
            setLoading(false);
        }
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 [AUTH] État changé:', event, 'Session:', session ? 'OUI' : 'NON');
        if (event === 'TOKEN_REFRESH_REVOKED') {
           console.warn('⚠️ [AUTH] Token refresh revoked');
        }
        if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
            setLoading(false);
        } else if (mounted) {
            handleSession(session);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
      return { data: null, error };
    }
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
      return { data: null, error };
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
      return { error };
    }
  }, [toast]);

  const orgId = session?.user?.app_metadata?.organization_id || null;

  const value = useMemo(() => ({
    user,
    session,
    orgId,
    loading,
    signUp,
    signIn,
    signOut,
  }), [user, session, orgId, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
