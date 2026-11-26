'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';
import { CodeBlock } from '@/components/CodeBlock';
import { CAPABILITIES, type CapabilityId } from '@/lib/content';

export function CapabilitiesSection() {
  const [activeId, setActiveId] = useState<CapabilityId>('routing');
  const active = CAPABILITIES.find((c) => c.id === activeId) || CAPABILITIES[0];

  return (
    <section id="capabilities" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24">
      <h2 className="max-w-[22ch] text-3xl font-semibold tracking-tight md:text-5xl">
        More than a proxy. A complete local AI runtime.
      </h2>
      <p className="mt-4 max-w-[60ch] text-muted">
        Built in Rust to run quietly on your laptop or home server. Inspect each subsystem below.
      </p>

      {/* Interactive subsystem tabs */}
      <div
        role="tablist"
        aria-label="eay-core capabilities"
        className="mt-10 flex flex-wrap gap-2"
      >
        {CAPABILITIES.map((cap) => {
          const selected = cap.id === active.id;
          return (
            <button
              key={cap.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(cap.id)}
              className={`theme-pill relative cursor-pointer border px-3.5 py-2 font-mono text-xs transition-colors ${
                selected
                  ? 'border-accent text-accent-ink font-medium'
                  : 'border-line bg-surface text-muted hover:border-accent/40 hover:text-ink'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="capability-tab-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="theme-pill absolute inset-0 bg-accent"
                />
              )}
              <span className="relative z-10">{cap.tab}</span>
            </button>
          );
        })}
      </div>

      {/* Active capability panel */}
      <div
        role="tabpanel"
        className="theme-card mt-6 overflow-hidden border border-line bg-surface p-6 sm:p-9"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] [&>*]:min-w-0"
          >
            <div>
              <span className="font-mono text-[11px] tracking-[0.12em] text-accent">{active.tag}</span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{active.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{active.summary}</p>
              <ul className="mt-6 grid gap-2.5 text-sm text-muted">
                {active.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5">
                    <ArrowRight size={14} className="mt-1 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <CodeBlock label={active.snippetLabel} code={active.snippet} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
