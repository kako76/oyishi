import React, { useState } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  zoomOnHover?: boolean;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  zoomOnHover = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#181310] ${containerClassName}`}>
      {/* Skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#1F1815] animate-pulse z-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-oyishi-gold/20 border-t-oyishi-gold rounded-full animate-spin opacity-40" />
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setHasError(true);
        }}
        className={`relative z-10 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${
          zoomOnHover
            ? 'transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.04]'
            : ''
        } ${className}`}
        {...props}
      />
    </div>
  );
};
