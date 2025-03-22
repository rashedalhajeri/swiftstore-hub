
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
          {/* Background for the logo */}
          <rect 
            x="10" 
            y="5" 
            width="100" 
            height="30" 
            rx="15" 
            fill={variant === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)'} 
          />
          
          {/* Main letter L */}
          <path
            ref={letterL}
            d="M23,12 L23,28 L40,28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          
          {/* Dot after L */}
          <circle
            ref={dotRef}
            cx="45"
            cy="28"
            r="0"
            fill="currentColor"
          />
          
          {/* Text "inok" */}
          <text 
            x="54" 
            y="28" 
            className="text-2xl font-bold" 
            fill="currentColor"
            dominantBaseline="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
          >
            inok
          </text>
          
          {/* Text ".me" */}
          <text 
            x="93" 
            y="28" 
            className="text-2xl font-bold" 
            fill={variant === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)'}
            dominantBaseline="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="500"
          >
            .me
          </text>
        </svg>
        
        {/* Animated effect elements */}
        {animated && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
            <div 
              className="absolute left-0 w-12 h-[2px] opacity-0"
              style={{
                background: `linear-gradient(to right, transparent, ${variant === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)'}, transparent)`,
                transform: 'translateX(-100%)', 
                animation: 'fade-in 0.3s ease-out 0.8s forwards, fade-out 0.5s ease-in 1.3s forwards, slide-right 0.6s ease-out 0.8s forwards'
              }}
            />
          </div>
        )}
      </div>
      
      <style>
        {`
          @keyframes slide-right {
            from { transform: translateX(-100%); }
            to { transform: translateX(200%); }
          }
          
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 0.7; }
          }
          
          @keyframes fade-out {
            from { opacity: 0.7; }
            to { opacity: 0; }
          }
        `}
      </style>
    </Link>
  );
};

export default Logo;
