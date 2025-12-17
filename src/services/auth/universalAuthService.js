import { supabase } from '@/lib/supabaseClient';

/**
 * Universal OAuth + Email authentication service
 * Works with Supabase OAuth or falls back to local storage for demo
 */

const USERS_STORAGE_KEY = 'powalyze_users';
const CURRENT_USER_KEY = 'powalyze_current_user';

// Get all stored users (for demo mode)
const getStoredUsers = () => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

// Save user to storage
const saveUser = (user) => {
  const users = getStoredUsers();
  const existingIndex = users.findIndex(u => u.email === user.email);
  
  if (existingIndex >= 0) {
    users[existingIndex] = { ...users[existingIndex], ...user };
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return user;
};

// Get user by email
const getUserByEmail = (email) => {
  const users = getStoredUsers();
  return users.find(u => u.email === email);
};

export const universalAuthService = {
  /**
   * Sign up with email/password
   */
  signUpWithEmail: async (email, password, fullName) => {
    try {
      if (supabase) {
        // Use Supabase if available
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { fullName }
          }
        });
        if (error) throw error;
        return data.user;
      } else {
        // Fallback to local storage
        const existing = getUserByEmail(email);
        if (existing) throw new Error('Email already registered');
        
        const user = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          email,
          fullName,
          createdAt: new Date().toISOString(),
          provider: 'email'
        };
        
        saveUser({ ...user, passwordHash: btoa(password) });
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        
        return user;
      }
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },

  /**
   * Sign in with email/password
   */
  signInWithEmail: async (email, password) => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
      } else {
        // Fallback to local storage
        const user = getUserByEmail(email);
        if (!user) throw new Error('User not found');
        if (user.passwordHash !== btoa(password)) throw new Error('Invalid password');
        
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  },

  /**
   * OAuth Sign In with Google
   */
  signInWithGoogle: async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
        return data;
      } else {
        // Fallback: simulate Google login
        const googleUser = {
          id: `google_${Date.now()}`,
          email: `user${Date.now()}@gmail.com`,
          fullName: 'Google User',
          provider: 'google',
          createdAt: new Date().toISOString()
        };
        saveUser(googleUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(googleUser));
        return googleUser;
      }
    } catch (error) {
      console.error('Google OAuth error:', error);
      throw error;
    }
  },

  /**
   * OAuth Sign In with GitHub
   */
  signInWithGitHub: async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
        return data;
      } else {
        const githubUser = {
          id: `github_${Date.now()}`,
          email: `github_user${Date.now()}@github.com`,
          fullName: 'GitHub User',
          provider: 'github',
          createdAt: new Date().toISOString()
        };
        saveUser(githubUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(githubUser));
        return githubUser;
      }
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      throw error;
    }
  },

  /**
   * OAuth Sign In with LinkedIn
   */
  signInWithLinkedIn: async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'linkedin_oidc',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
        return data;
      } else {
        const linkedInUser = {
          id: `linkedin_${Date.now()}`,
          email: `linkedin_user${Date.now()}@linkedin.com`,
          fullName: 'LinkedIn User',
          provider: 'linkedin',
          createdAt: new Date().toISOString()
        };
        saveUser(linkedInUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(linkedInUser));
        return linkedInUser;
      }
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      throw error;
    }
  },

  /**
   * OAuth Sign In with Microsoft/Azure AD
   */
  signInWithMicrosoft: async () => {
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'azure',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            scopes: 'email openid profile'
          }
        });
        if (error) throw error;
        return data;
      } else {
        const microsoftUser = {
          id: `microsoft_${Date.now()}`,
          email: `microsoft_user${Date.now()}@outlook.com`,
          fullName: 'Microsoft User',
          provider: 'microsoft',
          createdAt: new Date().toISOString()
        };
        saveUser(microsoftUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(microsoftUser));
        return microsoftUser;
      }
    } catch (error) {
      console.error('Microsoft OAuth error:', error);
      throw error;
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: () => {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem(CURRENT_USER_KEY);
      return { success: true };
    } catch (error) {
      console.error('SignOut error:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!universalAuthService.getCurrentUser();
  }
};

export default universalAuthService;
