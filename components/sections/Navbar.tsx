import { DiscordLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';
import { EayMark } from '@/components/EayMark';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { DISCORD_URL, ORG_URL } from '@/lib/content';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        aria-label="Main"
      >
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <EayMark className="h-7 w-7" />
          <span className="font-mono text-sm tracking-wide">EAY</span>
        </a>

        <div className="hidden items-center gap-1 text-sm text-muted md:flex">
          <a href="#providers" className="rounded-lg px-3 py-2 transition hover:text-ink">
            Providers
          </a>
          <a href="#capabilities" className="rounded-lg px-3 py-2 transition hover:text-ink">
            Capabilities
          </a>
          <a href="#products" className="rounded-lg px-3 py-2 transition hover:text-ink">
            Ecosystem
          </a>
          <a href="#install" className="rounded-lg px-3 py-2 transition hover:text-ink">
            Quick start
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeSwitcher />
          <a
            href={ORG_URL}
            aria-label="GitHub"
            className="rounded-lg p-2 text-muted transition hover:text-ink"
          >
            <GithubLogo size={19} />
          </a>
          <a
            href={DISCORD_URL}
            aria-label="Discord"
            className="rounded-lg p-2 text-muted transition hover:text-ink"
          >
            <DiscordLogo size={19} />
          </a>
        </div>
      </nav>
    </header>
  );
}
