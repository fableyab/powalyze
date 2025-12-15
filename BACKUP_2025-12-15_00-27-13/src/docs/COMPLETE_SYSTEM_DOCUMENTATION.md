# Complete System Documentation

## 1. Authentication System
The system implements a robust authentication flow supporting email/password and multiple OAuth providers.

### OAuth Providers
The system now supports mocks for 9 providers:
- Google, GitHub, Microsoft
- Apple, LinkedIn, Facebook, Twitter, Okta, Slack

To implement real OAuth:
1. Register apps with each provider.
2. Obtain Client ID and Secret.
3. Configure backend endpoints to exchange codes for tokens.
4. Replace mock services in `src/services/auth/*` with real API calls.

### Security Features
- **Email Verification**: Flags users as unverified until a token is confirmed.
- **Two-Factor Authentication (2FA)**: Simulation of QR code generation and code verification.
- **Role-Based Access**: 'user' vs 'admin' roles.

## 2. User Profile
Located at `/profile`.
- **Personal Info**: Update name, company.
- **Security**: Enable/Disable 2FA, Change Password.
- **History**: View recent login activity.

## 3. Consultation System
A comprehensive lead generation tool for high-value B2B services.

### Form Fields
Expanded to capture deep context:
- Project Type, Budget (up to 100k+), Timeline.
- Industry, Company Size.
- LinkedIn Profile, Website.

### Process
1. **Submission**: Data validated & stored. Analytics event fired.
2. **Confirmation**: User sees a timeline of next steps (`/consultation-confirmation`).
3. **Notification**: Mock service logs emails sent to admin and user.
4. **Admin**: Admins view requests at `/admin/consultations`.
5. **Tracking**: Users can view status at `/consultation-tracking`.

## 4. Technical Architecture

### Contexts
- **ThemeContext**: Toggles `.dark` class on root.
- **LanguageContext**: Manages translations (FR, EN, DE, IT, ES, PT).
- **AuthContext**: Central user state.

### Services (Mocks)
- **Analytics**: Tracks page views and conversion events.
- **Logging**: Centralized error handling.
- **Notifications**: Email simulation.

## 5. New Features & Pages
- **Email Verification**: Dedicated flows for verifying email ownership.
- **2FA**: Login flow interception for 2FA codes.
- **Backup Codes**: Emergency access mechanism.
- **Admin Statistics**: Visual breakdown of consultation requests.
- **Settings**: Centralized preference management.
- **Help/FAQ**: User support resources.
- **Legal**: Terms & Privacy pages.

## 6. Deployment
- Build: `npm run build`
- Preview: `npm run preview`
- **Note**: This is a frontend-only build. For production, integrate with a real backend (Node.js/Python) for auth persistence and email sending.