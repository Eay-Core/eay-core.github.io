import { DiscordLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { EayMark } from '@/components/EayMark';
import { Reveal } from '@/components/Reveal';
import { DISCORD_URL, ORG_URL } from '@/lib/content';

export function CommunitySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-24">
      <Reveal>
        <div className="theme-card flex flex-col items-start justify-between gap-6 border border-line bg-surface p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Build it with us.</h2>
            <p className="mt-2 max-w-[52ch] text-muted">
              Questions, custom provider setups, bug reports and release notes all live in the community.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              className="theme-pill inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90 active:scale-[0.98]"
            >
              <DiscordLogo size={18} /> Discord
            </a>
            <a
              href={ORG_URL}
              className="theme-pill inline-flex items-center gap-2 border border-line bg-bg px-5 py-3 text-sm font-medium transition hover:bg-raised active:scale-[0.98]"
            >
              <GithubLogo size={18} /> GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:px-6">
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <EayMark className="h-5 w-5" /> EAY · Every AI, Yours.
        </span>
        <span className="text-xs">Product names and logos belong to their owners.</span>
      </div>
    </footer>
  );
}
