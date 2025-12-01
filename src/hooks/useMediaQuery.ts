// src/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/config/constants';

/**
 * Check if a media query matches
 * @param query - The media query string
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Breakpoint hooks for responsive design
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.SM - 1}px)`);
}

export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.SM}px) and (max-width: ${BREAKPOINTS.LG - 1}px)`
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
}

export function useBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
  const isXxl = useMediaQuery(`(min-width: ${BREAKPOINTS.XXL}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.XL}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.SM}px)`);

  if (isXxl) return 'xxl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}
