import React from 'react';
import AuthGuard from './AuthGuard';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  return <AuthGuard requireAdmin={adminOnly}>{children}</AuthGuard>;
};

export default ProtectedRoute;