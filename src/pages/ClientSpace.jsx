import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ClientSpacePage from '@/pages/ClientSpace/ClientSpacePage';

// Wrapper to match user's requested path while using the implemented page
const ClientSpace = () => {
  return <ClientSpacePage />;
};

export default ClientSpace;