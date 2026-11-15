import { useState, useEffect } from 'react';

export function useDevice() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobileWidth = window.innerWidth < 768;
      const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      setIsMobile(mobileWidth);
      setIsTouch(touchDevice);
      setPrefersReducedMotion(motionQuery.matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkDevice);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return { isMobile, isTouch, prefersReducedMotion };
}
