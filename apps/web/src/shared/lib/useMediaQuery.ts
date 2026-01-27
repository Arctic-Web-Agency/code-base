'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if a media query matches
 * Returns undefined during SSR to avoid hydration mismatch
 *
 * @param query - Media query string (e.g., '(max-width: 768px)')
 * @returns boolean | undefined - true if matches, false if not, undefined during SSR
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean | undefined => {
    const [matches, setMatches] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Listen for changes
        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};

/**
 * Tailwind CSS default breakpoints
 */
export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

/**
 * Hook to detect mobile devices (< 640px)
 */
export const useIsMobile = (): boolean | undefined => {
    return useMediaQuery(`(max-width: ${BREAKPOINTS.sm})`);
};

/**
 * Hook to detect tablet devices (< 768px)
 */
export const useIsTablet = (): boolean | undefined => {
    return useMediaQuery(`(max-width: ${BREAKPOINTS.md})`);
};
