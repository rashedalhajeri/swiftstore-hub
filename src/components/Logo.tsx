
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ className, animated = true, size = 'md', variant = 'dark' }) => {
  const letterL = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  
  useEffect(() => {
    if (animated && letterL.current && dotRef.current) {
      // Initialize animation
      const animateLogo = () => {
        // Reset
        letterL.current?.setAttribute('stroke-dashoffset', '100');
        dotRef.current?.setAttribute('r', '0');
        
        // Animate L
        setTimeout(() => {
          letterL.current?.animate(
            [
              { strokeDashoffset: '100' },
              { strokeDashoffset: '0' }
            ],
            { duration: 800, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );
        }, 100);
        
        // Animate dot
        setTimeout(() => {
          dotRef.current?.animate(
            [
              { r: '0', opacity: 0 },
              { r: '4', opacity: 1 }
            ],
            { duration: 400, fill: 'forwards', easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
          );
        }, 800);
      };
      
      animateLogo();
      
      // Repeat animation on hover
      const logoContainer = letterL.current.parentElement;
      logoContainer?.addEventListener('mouseenter', animateLogo);
      
      return () => {
        logoContainer?.removeEventListener('mouseenter', animateLogo);
      };
    }
  }, [animated]);

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link to="/" className={cn("inline-flex items-center font-bold", sizeClasses[size], className)}>
      <div className="relative">
        <svg 
          viewBox="0 0 120 40" 
          className={cn(
            "mr-2 overflow-visible",
            sizeClasses[size],
            variant === 'light' ? 'text-white' : 'text-black'
          )}
        >
          <path
            ref={letterL}
            d="M20,10 L20,30 L40,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <circle
            ref={dotRef}
            cx="45"
            cy="30"
            r="0"
            fill="currentColor"
          />
          <text 
            x="55" 
            y="30" 
            className="text-2xl font-bold" 
            fill="currentColor"
            dominantBaseline="middle"
          >
            inok
          </text>
          <text 
            x="92" 
            y="30" 
            className="text-2xl font-bold" 
            fill="currentColor"
            dominantBaseline="middle"
          >
            .me
          </text>
        </svg>
        
        {/* Speed lines for animation */}
        {animated && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute left-0 w-8 h-[2px] bg-gradient-to-r from-transparent to-current opacity-0 animate-[fade-in_0.3s_ease-out_0.8s_forwards,fade-out_0.5s_ease-in_1.3s_forwards]" 
                style={{transform: 'translateX(-100%)', animation: 'fade-in 0.3s ease-out 0.8s forwards, fade-out 0.5s ease-in 1.3s forwards, slide-right 0.6s ease-out 0.8s forwards'}}></div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slide-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
      `}</style>
    </Link>
  );
};

export default Logo;
