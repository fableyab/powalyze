# Google & OAuth Setup Guide for Powalyze

## Overview
This guide helps you configure Google OAuth (and other providers) with Supabase for the Powalyze application. The error "www.google.com n'autorise pas la connexion" typically occurs when OAuth redirect URIs are not properly configured.

## Prerequisites
- Supabase project created (https://supabase.com)
- Google Cloud Project created (https://console.cloud.google.com)
- Environment variables configured in `.env.local`

## Environment Variables Required

Add these to your `.env.local` file:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from:
1. Go to your Supabase project
2. Settings → API → Project API keys
3. Copy URL and anon (public) key

## Google OAuth Configuration

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Navigate to "APIs & Services" → "Credentials"
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Choose "Web application"
6. Add Authorized redirect URIs:
   - `http://localhost:5173/auth/callback` (development)
   - `http://localhost:3005/auth/callback` (dev server)
   - `https://your-domain.com/auth/callback` (production)
   - `https://your-project.supabase.co/auth/v1/callback` (Supabase)

7. Copy the Client ID and Client Secret

### Step 2: Configure in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Find "Google" provider
3. Click "Enable"
4. Paste your Google Client ID and Client Secret
5. Save changes

### Step 3: Configure Allowed Redirect URLs in Supabase

1. Go to Authentication → URL Configuration
2. Under "Redirect URLs", add:
   ```
   http://localhost:5173/auth/callback
   http://localhost:3005/auth/callback
   https://your-domain.com/auth/callback
   ```
3. Save

## Microsoft (Azure AD) Configuration

### Step 1: Register Application in Azure

1. Go to [Azure Portal](https://portal.azure.com)
2. Select "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Set Redirect URI to: `https://your-project.supabase.co/auth/v1/callback`
5. Copy Application (client) ID and create a secret

### Step 2: Configure in Supabase

1. Go to Authentication → Providers → Azure
2. Enable and add:
   - Client ID (Application ID from Azure)
   - Client Secret
   - Tenant ID (if using custom tenant)
3. Save

## GitHub OAuth Configuration

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase → Authentication → Providers → GitHub:
   - Enable and add credentials
   - Save

## LinkedIn OAuth Configuration

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers)
2. Create new app
3. Add Authorized redirect URLs:
   - `https://your-project.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret
5. In Supabase → Authentication → Providers → LinkedIn:
   - Enable and add credentials
   - Save

## Testing OAuth Flows

### Local Development

1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173/login (or :3005 based on your setup)
3. Click a social provider button (Google, Microsoft, GitHub, LinkedIn)
4. You'll be redirected to provider's login
5. After login, you'll be redirected to `/auth/callback`
6. If successful, you'll be redirected to `/dashboard`

### Troubleshooting

**Error: "www.google.com doesn't authorize"**
- Verify redirect URI is added in BOTH Google Cloud Console AND Supabase
- Check that redirect URI matches exactly (http vs https, domain, path)
- Clear browser cache and cookies

**Error: "The Redirect URI is mismatched"**
- Ensure redirect URI in Supabase matches exactly in your auth provider (Google, Microsoft, etc.)
- Common mismatch: `http://localhost:5173` vs `http://localhost:3005`

**User not created in Supabase after OAuth**
- Check Supabase logs: Authentication → Logs
- Verify OAuth provider credentials are correct
- Check redirect URL configuration

**Session not persisting**
- Ensure Supabase auth listener is active in AuthContext.jsx
- Check browser localStorage for session data
- Verify cookies are not blocked

## Code Implementation

### AuthContext.jsx (Already Implemented)
```jsx
const socialLogin = async (provider) => {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectUrl,
      scopes: provider === 'google' ? 'openid profile email' : undefined
    }
  });
  // Handle response...
};
```

### OAuthCallback.jsx (Already Implemented)
- Handles OAuth redirect from provider
- Retrieves session and updates auth state
- Redirects to dashboard on success

### Environment Configuration
- `.env.local` must contain VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Supabase client automatically initializes if keys are present

## Production Deployment

### Domain Setup
1. Update Supabase URL Configuration:
   - Add your production domain: `https://your-domain.com/auth/callback`

2. Update OAuth Providers:
   - Add production redirect URI to each provider (Google, Microsoft, etc.)

3. SSL Certificate
   - Ensure HTTPS is enabled
   - OAuth requires secure (https) URLs

4. Environment Variables
   - Deploy with production Supabase keys
   - Use secrets management (environment variables)

## Monitoring

Monitor OAuth failures:
1. Supabase Dashboard → Authentication → Logs
2. Browser console (F12) for detailed error messages
3. Network tab to check redirect URLs

## Support

If issues persist:
1. Check Supabase status: https://status.supabase.com
2. Review logs in Supabase dashboard
3. Verify all URLs are HTTPS (except localhost)
4. Check provider's documentation for latest requirements

---
**Last Updated**: 2024
**Status**: Fully Implemented with Interactive Examples
