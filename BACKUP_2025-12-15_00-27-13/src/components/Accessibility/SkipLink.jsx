
import React from 'react';

const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#BFA76A] focus:text-black focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white transition-transform"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;
