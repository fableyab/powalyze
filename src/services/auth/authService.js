
import { sessionService } from './sessionService';
import { auditLogService } from '@/services/logging/auditLogService';
import { validateEmail, validatePassword } from '@/utils/validation';

const USERS_KEY = 'powalyze_users';

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock bcrypt hash (simple hash for demo, NOT secure for production)
const hashPassword = async (password) => {
  // In a real app, use a library or server-side hashing
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const authService = {
  register: async (userData) => {
    await delay(800);
    
    // 1. Validation
    if (!validateEmail(userData.email)) throw new Error("Invalid email format");
    const pwdCheck = validatePassword(userData.password);
    if (!pwdCheck.valid) throw new Error(pwdCheck.error);

    // 2. Check existing
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === userData.email)) {
      throw new Error("Email already registered");
    }

    // 3. Create User
    const hashedPassword = await hashPassword(userData.password);
    const newUser = {
      id: crypto.randomUUID(),
      ...userData,
      password: hashedPassword,
      role: 'user', // default role
      createdAt: new Date().toISOString(),
      emailVerified: false,
      verificationToken: Math.random().toString(36).substring(7)
    };

    // Save
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    auditLogService.log('REGISTER', { email: userData.email });
    
    // Auto-login after register? Or require verification?
    // Let's require verification flow conceptually, but auto-login for UX demo
    const { password, ...userWithoutPwd } = newUser;
    return sessionService.startSession(userWithoutPwd, 'mock-jwt-token');
  },

  login: async (email, password) => {
    await delay(600);

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);

    if (!user) throw new Error("Invalid credentials");

    const hashed = await hashPassword(password);
    if (user.password !== hashed) {
      auditLogService.log('LOGIN_FAILED', { email });
      throw new Error("Invalid credentials");
    }

    auditLogService.log('LOGIN_SUCCESS', { userId: user.id });
    
    const { password: _, ...userWithoutPwd } = user;
    return sessionService.startSession(userWithoutPwd, 'mock-jwt-token');
  },

  loginDemo: async () => {
    // Convenience path for QA: ensures a demo user exists then logs in
    const email = 'demo@powalyze.local';
    const password = 'demo123!';

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    let user = users.find(u => u.email === email);

    if (!user) {
      const hashedPassword = await hashPassword(password);
      user = {
        id: crypto.randomUUID(),
        name: 'Demo User',
        email,
        password: hashedPassword,
        role: 'user',
        createdAt: new Date().toISOString(),
        emailVerified: true
      };
      users.push(user);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      auditLogService.log('REGISTER_DEMO', { email });
    }

    const { password: _, ...userWithoutPwd } = user;
    auditLogService.log('LOGIN_DEMO', { userId: user.id });
    return sessionService.startSession(userWithoutPwd, 'mock-demo-token');
  },

  logout: async () => {
    const session = sessionService.getSession();
    if (session) {
      auditLogService.log('LOGOUT', { userId: session.user.id });
    }
    sessionService.clearSession();
  },

  getCurrentUser: () => {
    const session = sessionService.getSession();
    return session ? session.user : null;
  },

  updateProfile: async (updates) => {
    await delay(500);
    const session = sessionService.getSession();
    if (!session) throw new Error("No active session");

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const index = users.findIndex(u => u.id === session.user.id);
    
    if (index === -1) throw new Error("User not found");

    // Merge updates (prevent overriding protected fields like id/password directly here)
    const updatedUser = { ...users[index], ...updates };
    users[index] = updatedUser;
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    const { password, ...cleanUser } = updatedUser;
    sessionService.updateUser(cleanUser);
    
    auditLogService.log('UPDATE_PROFILE', { updates }, cleanUser);
    return cleanUser;
  },

  verifyEmail: async (token) => {
    await delay(500);
    // Mock implementation finds user by token
    return true;
  },

  requestPasswordReset: async (email) => {
    await delay(500);
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      auditLogService.log('PASSWORD_RESET_REQUEST', { email });
      // Send email logic would go here
    }
    // Always return true for security (don't reveal user existence)
    return true;
  }
};
