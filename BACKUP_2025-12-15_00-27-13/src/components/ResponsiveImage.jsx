
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
}) => {
  const [loaded, setLoaded] = useState(false);

  // Generate rudimentary optimization simulation
  // In a real app with a CDN like Cloudinary or Vercel, we would append query params for resizing
  // Here we just use the provided src but add loading states and proper attributes
  
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted z-10" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes={sizes}
        // If we had multiple sources:
        // srcSet={`${src}?w=320 320w, ${src}?w=640 640w, ${src}?w=1024 1024w`}
      />
    </div>
  );
};

export default ResponsiveImage;
