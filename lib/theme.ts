export type SiteTheme = 'ascii' | 'dark' | 'light';

export const THEME_STORAGE_KEY = 'eay-site-theme';
export const DEFAULT_THEME: SiteTheme = 'ascii';

export const THEMES: { id: SiteTheme; label: string; short: string; description: string }[] = [
  {
    id: 'ascii',
    label: 'ASCII',
    short: 'ASCII',
    description: 'Interactive terminal art with monospace grid and warm phosphor accents',
  },
  {
    id: 'dark',
    label: 'Cozy Dark',
    short: 'Dark',
    description: 'Minimalist deep charcoal surfaces with calm contrast',
  },
  {
    id: 'light',
    label: 'Light',
    short: 'Light',
    description: 'Warm alabaster paper with crisp monochrome ink',
  },
];

export function isSiteTheme(value: unknown): value is SiteTheme {
  return value === 'ascii' || value === 'dark' || value === 'light';
}
