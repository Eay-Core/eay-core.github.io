import {
  ArrowRight,
  Browser,
  GithubLogo,
  HardDrives,
  Sword,
  Terminal,
} from '@phosphor-icons/react/dist/ssr';
import { CodeBlock } from '@/components/CodeBlock';
import { Reveal } from '@/components/Reveal';
import { PRODUCTS, type Product } from '@/lib/content';

const PRODUCT_ICON = { core: HardDrives, workspace: Browser, battle: Sword, code: Terminal } as const;

export function ProductsSection() {
  const [core, ...rest] = PRODUCTS;
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-24">
      <Reveal>
        <h2 className="max-w-[20ch] text-3xl font-semibold tracking-tight md:text-5xl">
          One core. Every AI tool.
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted">
          eay-core runs on your machine. Every first-party app and external CLI plugs into it and shares the same accounts, projects and sessions.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <ProductFeature product={core} />
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal
            key={p.id}
            delay={i * 0.06}
            className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}
          >
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
    <article className="theme-card grid gap-8 border border-accent/35 bg-accent-soft p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] [&>*]:min-w-0">
      <div>
        <div className="flex items-center gap-3">
          <Icon size={26} className="text-accent" />
          <h3 className="font-mono text-xl font-medium">{product.name}</h3>
        </div>
        <p className="mt-1 text-sm text-muted">{product.role}</p>
        <p className="mt-5 max-w-[48ch] text-base leading-relaxed sm:text-lg">{product.summary}</p>
        <ul className="mt-6 grid gap-2.5 text-sm text-muted">
          {product.points.map((pt) => (
            <li key={pt} className="flex gap-2.5">
              <ArrowRight size={14} className="mt-1 shrink-0 text-accent" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        {product.repo ? (
          <a
            href={product.repo}
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            View on GitHub <ArrowRight size={14} />
          </a>
        ) : (
          <p className="mt-7 font-mono text-xs text-muted">Private preview. Source opens soon.</p>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <CodeBlock label={product.snippet.label} code={product.snippet.code} />
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = PRODUCT_ICON[product.id];
  return (
    <article className="theme-card flex h-full min-w-0 flex-col border border-line bg-surface p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <Icon size={22} className="text-accent" />
        <h3 className="font-mono text-lg font-medium">{product.name}</h3>
      </div>
      <p className="mt-1 text-sm text-faint">{product.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">{product.summary}</p>
      <div className="mt-6">
        <CodeBlock code={product.snippet.code} label={product.snippet.label} />
      </div>
      <div className="mt-auto pt-6">
        {product.repo && (
          <a
            href={product.repo}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-accent"
          >
            <GithubLogo size={16} /> Source
          </a>
        )}
      </div>
    </article>
  );
}
