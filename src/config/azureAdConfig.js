/**
 * Azure AD Configuration
 * This configuration is used to initialize the MSAL instance for Azure AD authentication.
 */
export const azureAdConfig = {
  auth: {
    clientId: "YOUR_AZURE_AD_CLIENT_ID", // Replace with your actual Client ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your Tenant ID
    redirectUri: window.location.origin, // Automatically detects current origin
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "Directory.Read.All"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};