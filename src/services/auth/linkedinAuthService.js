export const linkedinAuthService = {
  initializeLinkedInAuth: () => console.log('LinkedIn Auth Init'),
  loginWithLinkedIn: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `li_${Date.now()}`,
      email: 'pro@linkedin.com',
      firstName: 'LinkedIn',
      lastName: 'Professional',
      provider: 'linkedin',
      role: 'user',
      company: 'Corporate Inc'
    };
  },
  signupWithLinkedIn: async () => linkedinAuthService.loginWithLinkedIn(),
  handleLinkedInCallback: async () => true,
  extractUserDataFromLinkedIn: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};