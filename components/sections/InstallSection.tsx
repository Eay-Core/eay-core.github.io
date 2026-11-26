'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CodeBlock } from '@/components/CodeBlock';
import {
  CORE_PUBLIC,
  DISCORD_URL,
  INSTALL_METHODS,
  SETUP_STEPS,
  type InstallMethodId,
} from '@/lib/content';

export function InstallSection() {
  const [methodId, setMethodId] = useState<InstallMethodId>('homebrew');
  const activeMethod = INSTALL_METHODS.find((m) => m.id === methodId) || INSTALL_METHODS[0];

  return (
    <section id="install" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Running in three steps.
      </h2>
      {!CORE_PUBLIC && (
        <p className="mt-4 max-w-[60ch] text-muted">
          eay-core is in private preview. Ask for early access on{' '}
          <a href={DISCORD_URL} className="text-accent hover:underline">
            Discord
          </a>
          . This is what local setup looks like.
        </p>
      )}

      <ol className="mt-12 grid gap-8 xl:grid-cols-3 [&>*]:min-w-0">
        {/* Step 1: Multi-platform install selector */}
        <li className="flex h-full flex-col">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-accent">01</span>
            <h3 className="text-lg font-medium">Install daemon</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{activeMethod.note}</p>

          <div className="mb-3 mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Install method">
            {INSTALL_METHODS.map((m) => {
              const selected = m.id === activeMethod.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setMethodId(m.id)}
                  className={`theme-pill relative cursor-pointer border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    selected
                      ? 'border-accent text-accent-ink font-medium'
                      : 'border-line bg-surface text-muted hover:text-ink'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="install-method-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="theme-pill absolute inset-0 bg-accent"
                    />
                  )}
                  <span className="relative z-10">{m.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeMethod.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
              >
                <CodeBlock label={activeMethod.label} code={activeMethod.code} />
              </motion.div>
            </AnimatePresence>
          </div>
        </li>

        {/* Steps 2 & 3 */}
        {SETUP_STEPS.map((s, idx) => (
          <li key={s.title} className="flex h-full flex-col">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-accent">0{idx + 2}</span>
              <h3 className="text-lg font-medium">{s.title}</h3>
            </div>
            <p className="mb-4 mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            <div className="mt-auto">
              <CodeBlock label={s.title.toLowerCase()} code={s.code} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
