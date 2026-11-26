'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Check } from '@phosphor-icons/react';
import { PROVIDERS, WORKS_WITH, type ProviderCategory } from '@/lib/content';

type FilterTab = 'all' | ProviderCategory;

const TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All providers' },
  { id: 'oauth', label: 'Subscriptions' },
  { id: 'api', label: 'API & Local' },
  { id: 'media', label: 'Search & Media' },
];

export function WorksWithSection() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleProviders = useMemo(
    () => (filter === 'all' ? PROVIDERS : PROVIDERS.filter((p) => p.category === filter)),
    [filter]
  );

  const copyAlias = async (id: string, alias: string) => {
    try {
      await navigator.clipboard.writeText(`${alias}/auto`);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1300);
    } catch {
      // Ignore clipboard failures in restricted contexts.
    }
  };

  return (
    <section
      id="providers"
      aria-label="Works with and supported providers"
      className="scroll-mt-20 border-y border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {/* Compatible clients strip (logos only per design-taste-frontend logo wall discipline) */}
        <p className="text-center text-sm text-muted">
          Works unchanged with the tools you already use
        </p>
        <ul className="mt-6 grid grid-cols-5 gap-x-4 gap-y-5 sm:grid-cols-10">
          {WORKS_WITH.map((t) => (
            <li key={t.name} className="flex flex-col items-center">
              <span
                title={t.name}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 ring-1 ring-line transition hover:-translate-y-0.5"
              >
                <img
                  src={t.icon}
                  alt={t.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-md"
                  loading="lazy"
                />
              </span>
            </li>
          ))}
        </ul>

        {/* Real eay-core providers showcase */}
        <div className="mt-12 border-t border-line pt-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                19 subscription logins and 70+ API, search &amp; media providers.
              </h2>
              <p className="mt-1 text-sm text-muted">
                Click any provider to copy its model route alias.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter providers">
              {TABS.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(tab.id)}
                    className={`theme-pill relative cursor-pointer border border-line px-3 py-1.5 font-mono text-[11px] transition-colors ${
                      active ? 'border-accent text-accent-ink font-medium' : 'bg-bg text-muted hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="provider-filter-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="theme-pill absolute inset-0 bg-accent"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {visibleProviders.map((provider) => {
              const isCopied = copiedId === provider.id;
              return (
                <li key={provider.id}>
                  <button
                    type="button"
                    onClick={() => copyAlias(provider.id, provider.alias)}
                    title={`Copy ${provider.alias}/auto`}
                    className="theme-card flex w-full min-w-0 cursor-pointer items-center gap-2.5 border border-line bg-bg/80 px-2.5 py-2 text-left transition hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/95 ring-1 ring-line/60">
                      <img
                        src={provider.icon}
                        alt={provider.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded-xs object-contain"
                        loading="lazy"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-ink">{provider.name}</div>
                      <div className="flex items-center gap-1 truncate font-mono text-[10px] text-faint">
                        {isCopied ? (
                          <span className="inline-flex items-center gap-1" style={{ color: 'var(--color-ok)' }}>
                            <Check size={10} weight="bold" /> Copied {provider.alias}/auto
                          </span>
                        ) : (
                          <span>{provider.alias}/*</span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-4 text-right font-mono text-[11px] text-faint">
            Showing {visibleProviders.length} featured providers · plus custom OpenAI-compatible &amp; self-hosted endpoints
          </p>
        </div>
      </div>
    </section>
  );
}
