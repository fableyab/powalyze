export const slackAuthService = {
  initializeSlackAuth: () => console.log('Slack Auth Init'),
  loginWithSlack: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `slack_${Date.now()}`,
      email: 'team@slack.com',
      firstName: 'Team',
      lastName: 'Member',
      provider: 'slack',
      role: 'user',
      company: 'Agile Team'
    };
  },
  signupWithSlack: async () => slackAuthService.loginWithSlack(),
  handleSlackCallback: async () => true,
  extractUserDataFromSlack: (user) => ({ email: user.email, name: `${user.firstName} ${user.lastName}` })
};