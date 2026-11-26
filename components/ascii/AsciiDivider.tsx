'use client';

import { useSiteTheme } from '@/components/theme/ThemeProvider';

export function AsciiDivider({ label }: { label?: string }) {
  const { theme } = useSiteTheme();

  if (theme !== 'ascii') {
    return <div aria-hidden="true" className="h-px w-full bg-line" />;
  }

  return (
    <div
      aria-hidden="true"
      className="mx-auto flex max-w-6xl items-center gap-3 px-4 font-mono text-[10px] tracking-[0.18em] text-faint sm:px-6"
    >
      <span className="flex-1 overflow-hidden whitespace-nowrap">
        +----------------------------------------------------------------------------------------------------+
      </span>
      {label && <span className="shrink-0 text-accent">[ {label} ]</span>}
      <span className="flex-1 overflow-hidden whitespace-nowrap">
        +----------------------------------------------------------------------------------------------------+
      </span>
    </div>
  );
}
