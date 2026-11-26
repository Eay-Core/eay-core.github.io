'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react/dist/ssr';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: text remains selectable.
    }
  };

  return (
    <div className="theme-card group relative min-w-0 max-w-full overflow-hidden border border-line bg-raised">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2">
        <span className="truncate font-mono text-[11px] text-faint">{label || 'shell'}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="theme-pill inline-flex cursor-pointer items-center gap-1 border border-line bg-surface px-2 py-0.5 font-mono text-[10.5px] text-muted transition hover:text-ink active:scale-95"
        >
          {copied ? (
            <>
              <Check size={12} weight="bold" style={{ color: 'var(--color-ok)' }} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
    </div>
  );
}
