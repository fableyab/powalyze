# Authentication & Consultation System - Complete Implementation

## 1. Authentication System
A fully functioning auth system using React Context and LocalStorage persistence to simulate a real backend environment.

### Core Features
- **Login/Signup**: Full forms with validation, password strength indicators, and terms acceptance.
- **Social Login**: Mock implementations for Google, GitHub, Microsoft.
- **Session Management**: Persistent sessions via `localStorage` with expiry.
- **Role-Based Access**: Distinguishes between 'user' and 'admin' roles.
- **Recovery**: Forgot/Reset password flows.

### Services
- `src/services/auth/authService.js`: Main logic hub.
- `src/services/auth/*AuthService.js`: Providers for OAuth.

### Security
- **AuthGuard**: Protects routes. Can require specific roles (e.g. `requireAdmin={true}`).
- **Validation**: Regex checks for emails and password complexity.

## 2. Professional Consultation Flow
A high-converting B2B lead generation flow.

### User Journey
1. **Contact Page**: User visits `/contact`.
2. **Form**: Fills out `ConsultationForm` (Industry, Role, Challenges, Budget, Timeline).
3. **Submission**: Data is validated and stored in `localStorage` ('powalyze_consultations').
4. **Confirmation**: User redirected to `/consultation-confirmation`.

### Admin Management
- **Admin Page**: `/admin/consultations` (Requires login as admin@powalyze.ch / admin123).
- **Features**: View list, filter by status (New/Completed), mark as completed, delete.

## 3. How to Test

### Auth Testing
1. **Sign Up**: Go to `/signup`, create a new account. You will be auto-logged in or redirected to login.
2. **Login**: Use the new credentials.
3. **Demo Admin**: Use `admin@powalyze.ch` / `admin123`.

### Consultation Testing
1. Go to `/contact`.
2. Submit a form.
3. Login as Admin.
4. Go to `/admin/consultations` to see the new entry.

## 4. Technical Details
- **State Management**: `AuthContext` and `ConsultationContext`.
- **UI Components**: Reusable `Input`, `Button`, `Select`, `Label` from `shadcn/ui`.
- **Icons**: Lucide React.