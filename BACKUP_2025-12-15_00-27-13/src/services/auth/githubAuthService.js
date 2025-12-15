export const githubAuthService = {
  initializeGithubAuth: () => {
    console.log('GitHub Auth Initialized (Mock)');
  },

  loginWithGithub: async () => {
    await new Promise(r => setTimeout(r, 1200));
    return {
      id: `github_${Date.now()}`,
      email: 'dev@github.com',
      firstName: 'GitHub',
      lastName: 'Dev',
      provider: 'github',
      role: 'user',
      company: 'Open Source'
    };
  },

  signupWithGithub: async () => {
    return githubAuthService.loginWithGithub();
  },

  handleGithubCallback: async () => {
    return true;
  },

  extractUserDataFromGithub: (githubUser) => {
    return {
      email: githubUser.email,
      name: githubUser.login
    };
  }
};