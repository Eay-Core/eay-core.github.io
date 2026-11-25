'use client';

import { motion, useReducedMotion } from 'motion/react';
import { WORKS_WITH } from '@/lib/content';

const TOOLS = WORKS_WITH.slice(0, 4);
const UPSTREAMS = ['Subscriptions', 'API keys', 'Local models'];

const chip = 'flex min-w-0 items-center rounded-xl border border-line bg-raised px-2 py-2 text-xs sm:px-3 sm:py-2.5 sm:text-sm';

/**
 * Hero visual: the real architecture. Tools on the left send one request shape to eay-core,
 * which routes to whichever account is available on the right. The moving dots show that flow.
 */
export function RoutingDiagram({ markSvg }: { markSvg: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative rounded-2xl border border-line bg-surface p-3.5 sm:p-7">
      {/* minmax(0,…) lets the side columns shrink on phones instead of overflowing. */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-6">
        <ul className="grid min-w-0 gap-2.5">
          {TOOLS.map((t) => (
            <li key={t.name} className={`${chip} gap-2 sm:gap-2.5`}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/95">
                <img src={t.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] rounded" />
              </span>
              <span className="truncate">{t.name}</span>
            </li>
          ))}
        </ul>

        <div className="relative flex flex-col items-center">
          <Flow side="left" reduce={!!reduce} />
          <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-accent/40 bg-accent-soft sm:h-28 sm:w-28">
            <span className="eay-mark inline-block h-9 w-9 sm:h-12 sm:w-12" dangerouslySetInnerHTML={{ __html: markSvg }} />
            <span className="mt-1.5 font-mono text-[10px] text-ink sm:text-[11px]">eay-core</span>
          </div>
          <Flow side="right" reduce={!!reduce} />
        </div>

        <ul className="grid min-w-0 gap-2.5">
          {UPSTREAMS.map((u) => (
            <li key={u} className={chip}>
              <span className="truncate">{u}</span>
            </li>
          ))}
          <li className={`${chip} border-dashed bg-transparent text-faint`}>
            <span className="truncate">Failover</span>
          </li>
        </ul>
      </div>
      <p className="mt-5 text-center font-mono text-xs text-faint">one endpoint · 127.0.0.1:20129</p>
    </div>
  );
}

function Flow({ side, reduce }: { side: 'left' | 'right'; reduce: boolean }) {
  const pos = side === 'left' ? 'right-full mr-1' : 'left-full ml-1';
  return (
    <div aria-hidden="true" className={`absolute top-1/2 hidden h-px w-6 -translate-y-1/2 bg-line sm:block sm:w-10 ${pos}`}>
      {!reduce && (
        <motion.span
          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-accent"
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: side === 'left' ? 0 : 0.8 }}
        />
      )}
    </div>
  );
}
