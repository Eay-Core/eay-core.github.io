import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { EAY_MARK_SVG } from '@/components/EayMark';
import { Reveal } from '@/components/Reveal';
import { AsciiRoutingField } from '@/components/ascii/AsciiRoutingField';
import { CORE_PUBLIC, DISCORD_URL, HERO_METRICS } from '@/lib/content';

const PRIMARY = CORE_PUBLIC
  ? { href: '#install', label: 'Get started' }
  : { href: DISCORD_URL, label: 'Join the Discord' };

export function HeroSection() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-18">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14 [&>*]:min-w-0">
        <Reveal immediate>
          <div className="theme-pill inline-flex items-center gap-2 border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: 'var(--color-ok)' }}
            />
            <span>{CORE_PUBLIC ? 'local-first rust runtime' : 'private preview · local-first rust runtime'}</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.04] tracking-tighter md:text-6xl">
            Every AI,
            <br />
            <span className="text-accent">yours.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg">
            One local endpoint for every AI subscription and API key you own. Route across accounts automatically, keep keys encrypted on disk, and plug in every tool you already use.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PRIMARY.href}
              className="theme-pill inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90 active:scale-[0.98]"
            >
              {PRIMARY.label}
              <ArrowRight size={16} weight="bold" />
            </a>
            <a
              href="#capabilities"
              className="theme-pill inline-flex items-center gap-2 border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition hover:bg-raised active:scale-[0.98]"
            >
              Explore eay-core
            </a>
          </div>
        </Reveal>

        <Reveal immediate>
          <AsciiRoutingField markSvg={EAY_MARK_SVG} />
        </Reveal>
      </div>

      {/* Concise factual metrics grounded in eay-core */}
      <Reveal immediate>
        <dl className="mt-14 grid grid-cols-2 gap-3 border-t border-line pt-8 sm:grid-cols-4 sm:gap-6">
          {HERO_METRICS.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="font-mono text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {m.value}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted">{m.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
