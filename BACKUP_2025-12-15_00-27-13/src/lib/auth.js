// Authentication Utility for Admin and Dashboard Users
// Uses localStorage for persistence.

// --- ADMIN CREDENTIALS (for CMS/Admin Panel) ---
export const ADMIN_CREDENTIALS = {
  email: "contact@powalyze.ch",
  password: "admin123" 
};

// --- DASHBOARD CREDENTIALS (for Client/Demo Access) ---
export const DASHBOARD_CREDENTIALS = {
  email: "demo@powalyze.ch",
  password: "demo123"
};

// --- ADMIN FUNCTIONS ---
export const isAuthenticated = () => {
  const session = localStorage.getItem('powalyze_admin_session');
  if (!session) return false;
  
  try {
    const { expiry } = JSON.parse(session);
    if (new Date().getTime() > expiry) {
      logout();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const session = {
          token: 'admin-token-' + Math.random().toString(36).substring(2),
          expiry: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
        };
        localStorage.setItem('powalyze_admin_session', JSON.stringify(session));
        resolve({ success: true });
      } else {
        reject({ success: false, message: 'Invalid credentials' });
      }
    }, 800);
  });
};

export const logout = () => {
  localStorage.removeItem('powalyze_admin_session');
  window.location.href = '/admin/login';
};

// --- DASHBOARD FUNCTIONS ---

export const isDashboardAuthenticated = () => {
  const session = localStorage.getItem('powalyze_dashboard_session');
  if (!session) return false;
  
  try {
    const { expiry } = JSON.parse(session);
    if (new Date().getTime() > expiry) {
      logoutDashboard();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getDashboardUser = () => {
  const session = localStorage.getItem('powalyze_dashboard_session');
  if (!session) return null;
  try {
    return JSON.parse(session).user;
  } catch(e) {
    return null;
  }
};

export const loginDashboard = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Allow specific demo credentials OR any valid email format for testing if needed
      // For now, strict check on demo credentials
      if (email.toLowerCase() === DASHBOARD_CREDENTIALS.email && password === DASHBOARD_CREDENTIALS.password) {
        const session = {
          token: 'dash-token-' + Math.random().toString(36).substring(2),
          user: { email: email, name: "Demo User" },
          expiry: new Date().getTime() + (12 * 60 * 60 * 1000) // 12 hours
        };
        localStorage.setItem('powalyze_dashboard_session', JSON.stringify(session));
        resolve({ success: true, user: session.user });
      } else {
        reject({ success: false, message: 'Invalid email or password' });
      }
    }, 1000);
  });
};

export const logoutDashboard = () => {
  localStorage.removeItem('powalyze_dashboard_session');
  // No auto-redirect here, let the context handle UI updates
};