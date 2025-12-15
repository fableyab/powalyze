
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items, className = "" }) => {
  // If items are provided manually, use them. Otherwise, try to infer from path could be added here,
  // but usually manual passing is more robust for SEO titles.
  
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm font-medium text-gray-500 mb-8 overflow-x-auto whitespace-nowrap ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-[#BFA76A] transition-colors"
            title="Accueil"
          >
            <Home size={16} className="mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-gray-700" />
            {item.path ? (
              <Link 
                to={item.path} 
                className="hover:text-[#BFA76A] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#BFA76A] font-semibold" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
