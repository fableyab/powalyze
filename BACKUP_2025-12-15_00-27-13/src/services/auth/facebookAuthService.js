export const facebookAuthService = {
  initializeFacebookAuth: () => console.log('Facebook Auth Init'),
  loginWithFacebook: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `fb_${Date.now()}`,
      email: 'user@facebook.com',
      firstName: 'Facebook',
      lastName: 'User',
      provider: 'facebook',
      role: 'user',
      company: 'Social Media'
    };
  },
  signupWithFacebook: async () => facebookAuthService.loginWithFacebook(),
  handleFacebookCallback: async () => true,
  extractUserDataFromFacebook: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};