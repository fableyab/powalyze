import { PublicClientApplication } from "@azure/msal-browser";
import { azureAdConfig, loginRequest } from "@/config/azureAdConfig";

// Initialize the MSAL application object
const msalInstance = new PublicClientApplication(azureAdConfig);

// Initialize function (required for MSAL v2+)
export const initializeAzureAD = async () => {
  try {
    if (!msalInstance.getActiveAccount()) {
       await msalInstance.initialize();
    }
  } catch (error) {
    console.error("Failed to initialize Azure AD:", error);
  }
  return msalInstance;
};

export const azureAdService = {
  login: async () => {
    await initializeAzureAD();
    try {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      msalInstance.setActiveAccount(loginResponse.account);
      return loginResponse;
    } catch (err) {
      console.error("Azure AD Login Error:", err);
      throw err;
    }
  },

  logout: async () => {
    await initializeAzureAD();
    try {
      await msalInstance.logoutPopup({
        postLogoutRedirectUri: window.location.origin,
        mainWindowRedirectUri: window.location.origin
      });
    } catch (err) {
      console.error("Azure AD Logout Error:", err);
      throw err;
    }
  },

  getAccessToken: async () => {
    await initializeAzureAD();
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    try {
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      return response.accessToken;
    } catch (error) {
      console.warn("Silent token acquisition failed. Acquiring token using popup.", error);
      const response = await msalInstance.acquireTokenPopup({
        ...loginRequest,
        account: account,
      });
      return response.accessToken;
    }
  },

  getUserProfile: async () => {
     await initializeAzureAD();
     return msalInstance.getActiveAccount();
  },

  getInstance: () => msalInstance
};