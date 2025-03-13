
import { useState, useEffect } from 'react';

// Define device breakpoints
const BREAKPOINTS = {
  mobile: 640,   // Max width for mobile devices
  tablet: 1024,  // Max width for tablet devices
  desktop: 1025  // Min width for desktop
};

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setDeviceType('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    // Set initial device type
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}
