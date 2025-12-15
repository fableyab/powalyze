
import React, { useState, useEffect } from 'react';
import { getOptimizedImageUrl } from '@/utils/performanceOptimization';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  width = 800, 
  height,
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    if (!src) return;
    
    // Reset state when src changes
    setIsLoaded(false);
    setError(false);

    // Optimize URL
    const optimizedSrc = getOptimizedImageUrl(src, width);
    setCurrentSrc(optimizedSrc);

    // Preload if priority
    if (priority) {
      const img = new Image();
      img.src = optimizedSrc;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, width, priority]);

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)} style={{ height }}>
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)} style={{ height }}>
      {/* Placeholder / Blur Effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse z-10" />
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
