import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
      <Link 
        to="/" 
        className="flex items-center hover:text-[#BFA76A] transition-colors"
      >
        <Home size={16} className="mr-1" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="mx-2 text-gray-700" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="hover:text-[#BFA76A] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#BFA76A] font-semibold">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;