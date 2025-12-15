
const SESSION_KEY = 'powalyze_session';

export const sessionService = {
  startSession: (user, token) => {
    const session = {
      user,
      token,
      expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  getSession: () => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;
    
    try {
      const session = JSON.parse(sessionStr);
      if (Date.now() > session.expiry) {
        sessionService.clearSession();
        return null;
      }
      return session;
    } catch (e) {
      return null;
    }
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateUser: (updatedUser) => {
    const session = sessionService.getSession();
    if (session) {
      session.user = { ...session.user, ...updatedUser };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }
};
