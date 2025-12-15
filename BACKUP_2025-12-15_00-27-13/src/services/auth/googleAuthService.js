export const googleAuthService = {
  initializeGoogleAuth: () => {
    console.log('Google Auth Initialized (Mock)');
  },

  loginWithGoogle: async () => {
    // Simulate popup and redirect
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `google_${Date.now()}`,
      email: 'user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      provider: 'google',
      role: 'user',
      company: 'Google Inc'
    };
  },

  signupWithGoogle: async () => {
    return googleAuthService.loginWithGoogle();
  },

  handleGoogleCallback: async () => {
    return true;
  },

  extractUserDataFromGoogle: (googleUser) => {
    return {
      email: googleUser.email,
      name: googleUser.name
    };
  }
};