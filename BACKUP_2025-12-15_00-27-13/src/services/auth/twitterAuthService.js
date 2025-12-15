export const twitterAuthService = {
  initializeTwitterAuth: () => console.log('Twitter Auth Init'),
  loginWithTwitter: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `tw_${Date.now()}`,
      email: 'user@twitter.com',
      firstName: 'Twitter',
      lastName: 'User',
      provider: 'twitter',
      role: 'user',
      company: 'Tech News'
    };
  },
  signupWithTwitter: async () => twitterAuthService.loginWithTwitter(),
  handleTwitterCallback: async () => true,
  extractUserDataFromTwitter: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};