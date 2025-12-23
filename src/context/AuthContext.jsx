import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Compte démo pour présentation client
export const DEMO_ACCOUNT = {
  email: 'demo@powalyze.com',
  password: 'Demo2024!',
  user: {
    id: 'demo-user',
    email: 'demo@powalyze.com',
    name: 'Client Démo',
    company: 'Powalyze Demo',
    role: 'client',
    isDemo: true,
    avatar: null
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('powalyze_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('powalyze_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('powalyze_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Check if demo account
      if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
        setUser(DEMO_ACCOUNT.user);
        setLoading(false);
        return { success: true, user: DEMO_ACCOUNT.user };
      }
      
      // Simulate API call for other accounts
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, accept any credentials (dev mode)
      const userData = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        company: 'Default Company',
        role: 'user',
        isDemo: false,
        avatar: null
      };
      
      setUser(userData);
      setLoading(false);
      return { success: true, user: userData };
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Erreur de connexion' };
    }
  };

  const loginDemo = () => {
    setUser(DEMO_ACCOUNT.user);
    return { success: true, user: DEMO_ACCOUNT.user };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('powalyze_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      loginDemo, 
      logout,
      isAuthenticated: !!user,
      isDemo: user?.isDemo || false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
