'use client';

import { motion } from 'motion/react';
import { MoonStars, Sun, TerminalWindow } from '@phosphor-icons/react';
import { THEMES, type SiteTheme } from '@/lib/theme';
import { useSiteTheme } from './ThemeProvider';

const THEME_ICON: Record<SiteTheme, typeof TerminalWindow> = {
  ascii: TerminalWindow,
  dark: MoonStars,
  light: Sun,
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useSiteTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Visual theme"
      className="theme-pill inline-flex items-center border border-line bg-surface p-0.5 text-xs"
    >
      {THEMES.map((item) => {
        const Icon = THEME_ICON[item.id];
        const active = theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={item.description}
            onClick={() => setTheme(item.id)}
            className={`theme-pill relative inline-flex cursor-pointer items-center gap-1.5 px-2.5 py-1.5 font-mono text-[11px] font-medium transition-colors ${
              active ? 'text-accent-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId="theme-switcher-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="theme-pill absolute inset-0 bg-accent"
              />
            )}
            <Icon size={13} weight={active ? 'fill' : 'regular'} className="relative z-10" />
            <span className="relative z-10 hidden sm:inline">{item.short}</span>
          </button>
        );
      })}
    </div>
  );
}
