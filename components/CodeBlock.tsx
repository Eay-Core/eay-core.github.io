'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react/dist/ssr';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked (insecure context): the text is still selectable.
    }
  };
  return (
    <div className="group relative min-w-0 max-w-full rounded-xl border border-line bg-raised">
      {label && <div className="border-b border-line px-4 py-2 text-xs text-faint">{label}</div>}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute right-2.5 top-2.5 rounded-lg border border-line bg-surface p-1.5 text-muted opacity-0 transition hover:text-ink focus-visible:opacity-100 group-hover:opacity-100 active:scale-95"
      >
        {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
      </button>
    </div>
  );
}
