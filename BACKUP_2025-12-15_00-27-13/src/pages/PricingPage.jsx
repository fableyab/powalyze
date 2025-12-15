import React from 'react';
import { Navigate } from 'react-router-dom';

// This page has been deprecated and removed. 
// Redirecting to home to ensure no broken user flows.
const PricingPage = () => {
  return <Navigate to="/" replace />;
};

export default PricingPage;