export const oktaAuthService = {
  initializeOktaAuth: () => console.log('Okta Auth Init'),
  loginWithOkta: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `okta_${Date.now()}`,
      email: 'employee@enterprise.com',
      firstName: 'Enterprise',
      lastName: 'Employee',
      provider: 'okta',
      role: 'user',
      company: 'Enterprise Corp'
    };
  },
  signupWithOkta: async () => oktaAuthService.loginWithOkta(),
  handleOktaCallback: async () => true,
  extractUserDataFromOkta: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};