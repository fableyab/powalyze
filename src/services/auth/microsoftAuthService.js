export const microsoftAuthService = {
  initializeMicrosoftAuth: () => {
    console.log('Microsoft Auth Initialized (Mock)');
  },

  loginWithMicrosoft: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `ms_${Date.now()}`,
      email: 'corp@microsoft.com',
      firstName: 'Microsoft',
      lastName: 'User',
      provider: 'microsoft',
      role: 'user',
      company: 'Microsoft Corp'
    };
  },

  signupWithMicrosoft: async () => {
    return microsoftAuthService.loginWithMicrosoft();
  },

  handleMicrosoftCallback: async () => {
    return true;
  },

  extractUserDataFromMicrosoft: (msUser) => {
    return {
      email: msUser.mail || msUser.userPrincipalName,
      name: msUser.displayName
    };
  }
};