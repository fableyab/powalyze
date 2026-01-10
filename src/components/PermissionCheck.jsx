
import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { hasPermission } from '@/lib/permissions';

const PermissionCheck = ({ permission, children, fallback = null }) => {
  const { user } = useAuth();
  const userRole = user?.user_metadata?.role || 'Viewer';

  if (hasPermission(userRole, permission)) {
    return <>{children}</>;
  }

  return fallback;
};

export default PermissionCheck;
