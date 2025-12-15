
// Simulation of TOTP/2FA
export const twoFactorAuthService = {
  setup: async (userId) => {
    // Simulate QR Code generation URL
    const secret = "JBSWY3DPEHPK3PXP"; // Mock base32 secret
    const otpauth = `otpauth://totp/Powalyze:${userId}?secret=${secret}&issuer=Powalyze`;
    return {
      secret,
      qrCode: `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${encodeURIComponent(otpauth)}`
    };
  },

  verify: async (token) => {
    // Mock verification - accept '123456' or for demo purposes
    return token === '123456';
  },

  generateBackupCodes: () => {
    return Array.from({ length: 10 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );
  }
};
