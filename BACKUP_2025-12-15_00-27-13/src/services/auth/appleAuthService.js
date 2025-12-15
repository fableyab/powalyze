export const appleAuthService = {
  initializeAppleAuth: () => {
    console.log('Apple Auth Initialized (Mock)');
  },
  loginWithApple: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `apple_${Date.now()}`,
      email: 'user@icloud.com',
      firstName: 'Apple',
      lastName: 'User',
      provider: 'apple',
      role: 'user',
      company: 'Creative Studio'
    };
  },
  signupWithApple: async () => appleAuthService.loginWithApple(),
  handleAppleCallback: async () => true,
  extractUserDataFromApple: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};