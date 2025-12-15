
import React from 'react';
// Placeholder for the actual reset confirm page which handles token
import ForgotPasswordPage from './ForgotPasswordPage'; 
// Re-using forgot password page logic or redirection for now as this usually requires a token handling logic
// which is backend dependent. For mock, we will just use this file as a stub for the confirm route.

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white">
       Invalid or expired token.
    </div>
  );
};

export default ResetPasswordPage;
