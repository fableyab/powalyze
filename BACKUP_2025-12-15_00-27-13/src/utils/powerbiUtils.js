import { models } from 'powerbi-client';

/**
 * Construct Power BI Embed Configuration
 */
export const buildEmbedConfig = (embedData, settings = {}) => {
  return {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: embedData.token,
    embedUrl: embedData.embedUrl,
    id: embedData.reportId,
    permissions: models.Permissions.Read,
    settings: {
      filterPaneEnabled: settings.showFilterPane ?? false,
      navContentPaneEnabled: settings.showNavPane ?? true,
      layoutType: settings.isMobile ? models.LayoutType.MobilePortrait : models.LayoutType.Master,
      background: models.BackgroundType.Transparent,
      ...settings.customSettings
    }
  };
};

/**
 * Handle typical embed errors
 */
export const handleEmbedError = (error) => {
  console.error("Power BI Embed Error:", error);
  
  let userMessage = "An error occurred while loading the report.";
  
  if (error?.message?.includes("TokenExpired")) {
    userMessage = "Session expired. Please refresh the page.";
  } else if (error?.message?.includes("NotAuthorized")) {
    userMessage = "You do not have permission to view this report.";
  }

  return {
    message: userMessage,
    technical: error.message || error.toString()
  };
};