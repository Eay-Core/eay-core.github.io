import { ArrowsSplit, ShieldCheck, Terminal } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/Reveal';
import { COMPARISON_ROWS } from '@/lib/content';

const PILLARS = [
  {
    icon: ArrowsSplit,
    title: 'No single point of failure',
    body: 'When an account hits a rate limit or runs out of quota, the next request moves to another healthy account automatically.',
  },
  {
    icon: ShieldCheck,
    title: 'Your keys stay on your machine',
    body: 'Accounts and API keys are encrypted on disk with AES-256-GCM inside a local data folder. Nothing is proxied through a third-party cloud.',
  },
  {
    icon: Terminal,
    title: 'No new SDK to learn',
    body: 'Speaks OpenAI Chat Completions, Anthropic Messages and OpenAI Responses natively, so existing clients only change one base URL.',
  },
];

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-20 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight md:text-5xl">
              Own your AI stack.
            </h2>
            <p className="mt-4 max-w-[44ch] text-muted">
              Bring the subscriptions you already pay for. Mix them with API keys and local models, and keep full control over routing, budgets and memory.
            </p>
          </Reveal>
          <ul className="grid gap-8">
            {PILLARS.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06}>
                <li className="flex gap-4">
                  <span className="theme-card flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-accent-soft text-accent">
                    <it.icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium">{it.title}</h3>
                    <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-muted">{it.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Comparison matrix */}
        <Reveal delay={0.1}>
          <div className="theme-card mt-16 overflow-x-auto border border-line bg-bg/60">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-xs text-faint">
                  <th className="px-4 py-3 font-medium">Capability</th>
                  <th className="px-4 py-3 font-medium">Direct Vendor</th>
                  <th className="px-4 py-3 font-medium">Cloud Proxy</th>
                  <th className="px-4 py-3 font-medium text-accent">eay-core</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-4 py-3.5 font-medium text-ink">{row.feature}</td>
                    <td className="px-4 py-3.5 text-muted">{row.direct}</td>
                    <td className="px-4 py-3.5 text-muted">{row.cloudProxy}</td>
                    <td className="px-4 py-3.5 font-mono text-xs text-accent">{row.eayCore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
