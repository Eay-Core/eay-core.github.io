'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_THEME, isSiteTheme, SITE_THEME_ORDER, THEME_STORAGE_KEY, type SiteTheme } from './themeHelpers';

interface ThemeContextValue {
  theme: SiteTheme;
  setTheme: (next: SiteTheme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  cycleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SiteTheme>(DEFAULT_THEME);

  // Sync with the attribute set by the pre-hydration script in layout.tsx
  useEffect(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (isSiteTheme(attr)) {
      setThemeState(attr);
      return;
    }
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (isSiteTheme(saved)) {
        document.documentElement.setAttribute('data-theme', saved);
        setThemeState(saved);
        return;
      }
    } catch {
      // Ignore storage failures in restricted browsing contexts.
    }
    document.documentElement.setAttribute('data-theme', DEFAULT_THEME);
  }, []);

  const setTheme = useCallback((next: SiteTheme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const idx = SITE_THEME_ORDER.indexOf(current);
      const next = SITE_THEME_ORDER[(idx + 1) % SITE_THEME_ORDER.length];
      document.documentElement.setAttribute('data-theme', next);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, setTheme, cycleTheme }), [theme, setTheme, cycleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useSiteTheme() {
  return useContext(ThemeContext);
}
