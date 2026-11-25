import {
  ArrowRight,
  ArrowsSplit,
  Browser,
  DiscordLogo,
  GithubLogo,
  HardDrives,
  ShieldCheck,
  Sword,
  Terminal,
} from '@phosphor-icons/react/dist/ssr';
import { CodeBlock } from '@/components/CodeBlock';
import { EAY_MARK_SVG, EayMark } from '@/components/EayMark';
import { Reveal } from '@/components/Reveal';
import { RoutingDiagram } from '@/components/RoutingDiagram';
import { CORE_PUBLIC, DISCORD_URL, ORG_URL, PRODUCTS, STEPS, WORKS_WITH, type Product } from '@/lib/content';

const PRODUCT_ICON = { core: HardDrives, workspace: Browser, battle: Sword, code: Terminal } as const;

// Primary action depends on whether eay-core can be installed publicly yet.
const PRIMARY = CORE_PUBLIC
  ? { href: '#install', label: 'Get started' }
  : { href: DISCORD_URL, label: 'Join the Discord' };

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorksWith />
        <Products />
        <Why />
        <Install />
        <Community />
      </main>
      <Footer />
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <EayMark className="h-7 w-7" />
          EAY
        </a>
        <div className="flex items-center gap-1 text-sm text-muted sm:gap-2">
          <a href="#products" className="hidden rounded-lg px-3 py-2 hover:text-ink sm:block">Products</a>
          <a href="#install" className="hidden rounded-lg px-3 py-2 hover:text-ink sm:block">Install</a>
          <a href={ORG_URL} aria-label="GitHub" className="rounded-lg p-2 hover:text-ink">
            <GithubLogo size={20} />
          </a>
          <a href={DISCORD_URL} aria-label="Discord" className="rounded-lg p-2 hover:text-ink">
            <DiscordLogo size={20} />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 [&>*]:min-w-0">
      <Reveal>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
          Every AI,
          <br />
          <span className="text-accent">yours.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
          One local endpoint for every AI subscription and API key you own. Your tools keep working when one account runs out.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={PRIMARY.href}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90 active:scale-[0.98]"
          >
            {PRIMARY.label}
            <ArrowRight size={16} weight="bold" />
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition hover:bg-raised active:scale-[0.98]"
          >
            See the products
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <RoutingDiagram markSvg={EAY_MARK_SVG} />
      </Reveal>
    </section>
  );
}

function WorksWith() {
  return (
    <section aria-label="Works with" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-center text-sm text-muted">Works with the tools you already use</p>
        <ul className="mt-6 grid grid-cols-5 gap-x-4 gap-y-6 sm:grid-cols-10">
          {WORKS_WITH.map((t) => (
            <li key={t.name} className="flex flex-col items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 ring-1 ring-line">
                <img src={t.icon} alt={t.name} width={28} height={28} className="h-7 w-7 rounded-md" loading="lazy" />
              </span>
              <span className="hidden text-center text-[11px] text-faint lg:block">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Products() {
  const [core, ...rest] = PRODUCTS;
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight md:text-5xl">One core. Every AI tool.</h2>
        <p className="mt-4 max-w-[60ch] text-muted">
          eay-core runs on your machine. Everything else plugs into it and shares the same accounts, projects and sessions.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <ProductFeature product={core} />
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductFeature({ product }: { product: Product }) {
  const Icon = PRODUCT_ICON[product.id];
  return (
    <article className="grid gap-8 rounded-2xl border border-accent/30 bg-accent-soft p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] [&>*]:min-w-0">
      <div>
        <div className="flex items-center gap-3">
          <Icon size={26} className="text-accent" />
          <h3 className="font-mono text-xl font-medium">{product.name}</h3>
        </div>
        <p className="mt-1 text-sm text-muted">{product.role}</p>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed">{product.summary}</p>
        <ul className="mt-6 grid gap-2.5 text-sm text-muted">
          {product.points.map((pt) => (
            <li key={pt} className="flex gap-2.5">
              <ArrowRight size={14} className="mt-1 shrink-0 text-accent" />
              {pt}
            </li>
          ))}
        </ul>
        {product.repo ? (
          <a href={product.repo} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            View on GitHub <ArrowRight size={14} />
          </a>
        ) : (
          <p className="mt-7 text-sm text-muted">Private preview. Source opens soon.</p>
        )}
      </div>
      <CodeBlock label={product.snippet.label} code={product.snippet.code} />
    </article>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = PRODUCT_ICON[product.id];
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <Icon size={22} className="text-accent" />
        <h3 className="font-mono text-lg font-medium">{product.name}</h3>
      </div>
      <p className="mt-1 text-sm text-faint">{product.role}</p>
      <p className="mt-4 leading-relaxed text-muted">{product.summary}</p>
      <div className="mt-6">
        <CodeBlock code={product.snippet.code} label={product.snippet.label} />
      </div>
      <div className="mt-auto pt-6">
        {product.repo && (
          <a href={product.repo} className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
            <GithubLogo size={16} /> Source
          </a>
        )}
      </div>
    </article>
  );
}

function Why() {
  const items = [
    {
      icon: ArrowsSplit,
      title: 'No single point of failure',
      body: 'When an account hits a rate limit or runs out of quota, the next request goes to another one automatically.',
    },
    {
      icon: ShieldCheck,
      title: 'Your keys stay on your machine',
      body: 'Accounts and keys are stored encrypted in a local data folder. Nothing is proxied through a third-party service.',
    },
    {
      icon: Terminal,
      title: 'No new SDK to learn',
      body: 'It speaks the OpenAI and Anthropic APIs, so existing clients only need a different base URL.',
    },
  ];
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="max-w-[16ch] text-3xl font-semibold tracking-tight md:text-5xl">Own your AI stack.</h2>
          <p className="mt-4 max-w-[44ch] text-muted">
            Bring the subscriptions you already pay for. Mix them with API keys and local models, and keep the control.
          </p>
        </Reveal>
        <ul className="grid gap-8">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
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
    </section>
  );
}

function Install() {
  return (
    <section id="install" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Running in three commands.</h2>
        {!CORE_PUBLIC && (
          <p className="mt-4 max-w-[60ch] text-muted">
            eay-core is in private preview. Ask for access on{' '}
            <a href={DISCORD_URL} className="text-accent hover:underline">Discord</a>. This is what setup looks like.
          </p>
        )}
      </Reveal>
      <ol className="mt-12 grid gap-8 xl:grid-cols-3 [&>*]:min-w-0">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <li className="flex h-full flex-col">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent">{i + 1}</span>
                <h3 className="text-lg font-medium">{s.title}</h3>
              </div>
              <p className="mb-4 mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              <div className="mt-auto">
                <CodeBlock code={s.code} />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Community() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Build it with us.</h2>
            <p className="mt-2 max-w-[52ch] text-muted">Questions, setups, bug reports and release notes all live in the community.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90 active:scale-[0.98]"
            >
              <DiscordLogo size={18} /> Discord
            </a>
            <a
              href={ORG_URL}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition hover:bg-raised active:scale-[0.98]"
            >
              <GithubLogo size={18} /> GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:px-6">
        <span className="flex items-center gap-2">
          <EayMark className="h-5 w-5" /> EAY, Every AI, Yours.
        </span>
        <span>Product names and logos belong to their owners.</span>
      </div>
    </footer>
  );
}
