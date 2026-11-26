# EAY Core Landing Page — Requirements & Breakdown

> **Target repo:** `eay-core.github.io` (`https://eay-core.github.io/`)  
> **Brand:** **EAY** — *Every AI, Yours.* / *One Core. Every AI Tool.*  
> **Status:** Living PRD & Technical Specification (v1.0)

---

## 1. Current State Audit (`eay-core.github.io`)

### Tech Stack
- **Framework:** Next.js `16.4.6` (`output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`) — kompatibel langsung dengan **GitHub Pages** dan **Vercel** tanpa perubahan config.
- **Styling & Typography:** Tailwind CSS v4 (`@tailwindcss/postcss`) + `GeistSans` & `GeistMono` + system-based Light/Dark CSS variables di `app/globals.css`.
- **Icons & Motion:** `@phosphor-icons/react` + `motion` (`Reveal`, `RoutingDiagram`) dengan dukungan `prefers-reduced-motion`.
- **Content Architecture:** Single source of truth di `lib/content.ts` (semua klaim produk, URL, snippet, dan flag `CORE_PUBLIC` dipusatkan di sini).
- **Testing:** `npm run lint` (`tsc --noEmit`) & `npm test` (`tests/build.test.mjs`).

### Struktur Existing
| File | Peran |
|---|---|
| `app/layout.tsx` | Metadata SEO, OpenGraph, Twitter card, viewport themeColor, font Geist |
| `app/globals.css` | Design tokens (Light/Dark), `.eay-mark` theming, reduced-motion |
| `app/page.tsx` | Single-page landing: `Nav`, `Hero`, `WorksWith`, `Products`, `Why`, `Install`, `Community`, `Footer` |
| `lib/content.ts` | Data produk (`eay-core`, `eay-workspace`, `eay-battle`, `eay-code`), `WORKS_WITH`, `STEPS`, `CORE_PUBLIC`, `DISCORD_URL` |
| `components/RoutingDiagram.tsx` | Visual arsitektur 3-kolom animasi (Tools → `eay-core` → Upstreams/Failover) |
| `components/CodeBlock.tsx` | Blok kode dengan label |
| `components/EayMark.tsx` | Inline SVG monogram EAY (`--eay-ribs-color`, `--eay-letters-color`) |
| `components/Reveal.tsx` | Scroll reveal wrapper |

### Gap & Temuan yang Harus Dibereskan
1. **Placeholder link belum diisi:** `DISCORD_URL` di `lib/content.ts` masih `'https://discord.gg/'`.
2. **Inkonsistensi URL repo:** `ORG_URL` sudah `https://github.com/Eay-Core`, tapi link `eay-workspace`, `eay-battle`, `eay-code`, dan Homebrew tap (`brew install nannndev/tap/eay-gateway`) masih mengarah ke `nannndev/*` — perlu disinkronkan saat repo dipindah/rilis publik.
3. **Social preview (OG/Twitter image) belum ada:** `metadata.openGraph` & `twitter` belum punya `images` (`1200x630`), sehingga share link di X/Discord/WhatsApp tampil tanpa gambar.
4. **Kedalaman fitur `eay-core` belum terekspos penuh:** Landing page saat ini baru menonjolkan routing/failover dasar. Kekuatan utama `eay-core` (19 subscription OAuth logins, 70+ API/search/media providers, Thinking Everywhere, Progressive Skills & `eay_ask_user`, Multi-Agent Teams, `.eay/` dual-store project workspace, MCP host, Virtual Keys & Budgets, AES-256-GCM encryption) belum punya showcase terstruktur.
5. **Interaktivitas masih minimal:** `CodeBlock` perlu tombol Copy + feedback, `Install` perlu tab platform (macOS Homebrew / Binary / Docker), dan `RoutingDiagram` bisa dibuat interaktif (simulasi rate-limit → auto failover).
6. **Belum ada halaman/link dokumentasi & changelog:** Belum ada tautan ke VitePress docs (`eay-core/docs`), Releases, atau Security policy.

---

## 2. Tujuan Produk & Target Audiens

### Objective
Mengonversi developer & AI power-user yang melihat `eay-core.github.io` untuk:
- **Private Preview (`CORE_PUBLIC = false`):** Memahami value proposition EAY dalam <10 detik dan bergabung ke Discord / waitlist akses awal.
- **Public Launch (`CORE_PUBLIC = true`):** Langsung meng-install `eay-core` dalam <2 menit dan mengarahkan tool existing mereka (Claude Code, Codex, Cursor, SDK) ke `http://127.0.0.1:20129`.

### Target Persona
1. **Multi-Subscription Developer:** Sudah bayar Claude Pro/Max, ChatGPT Plus/Codex, Copilot, atau Gemini, dan kesal saat kena rate-limit di tengah coding.
2. **AI Engineer / Agent Builder:** Butuh satu gateway lokal OpenAI + Anthropic + Responses compatible dengan MCP, Skills, subagent orchestration, dan kontrol approval/budget.
3. **Privacy-First / Self-Hoster:** Tidak mau API key dan history chat lewat proxy cloud pihak ketiga; butuh enkripsi lokal dan bisa jalan di laptop atau homelab/NAS (Docker).

---

## 3. Information Architecture & Section Requirements

| Priority | Kode | Deskripsi |
|---|---|---|
| **P0** | Must-have sebelum launch / share publik |
| **P1** | High-impact untuk konversi & kredibilitas teknis |
| **P2** | Nice-to-have / iterasi pasca-launch |

### 3.1 Navigation (`Nav`)
- **P0:** Brand mark (`EayMark`) + label `EAY`, anchor links (`Products`, `Features`, `Install`), icon links (`GitHub`, `Discord`).
- **P1:** Link `Docs` (mengarah ke VitePress docs saat publik) + badge status ringan (`Private Preview` saat `CORE_PUBLIC = false` atau versi rilis terbaru saat publik).
- **P1:** Theme toggle (System / Light / Dark) opsional selain default `prefers-color-scheme`.

### 3.2 Hero Section (`Hero` + `RoutingDiagram`)
- **P0:** Headline utama *"Every AI, yours."* + subheadline ringkas tentang satu endpoint lokal (`127.0.0.1:20129`) untuk semua subscription & API key.
- **P0:** Primary CTA dinamis berdasarkan `CORE_PUBLIC` (`Join the Discord` vs `Get started`) + Secondary CTA (`See the products`).
- **P0:** `RoutingDiagram` responsif tanpa horizontal overflow di mobile (`360px`+).
- **P1:** Interactive failover toggle/demo di `RoutingDiagram` (klik *"Simulate 429 Rate Limit"* → akun pertama cooldown, request langsung berpindah ke akun kedua secara visual).

### 3.3 Compatibility Strip (`WorksWith`)
- **P0:** Grid logo tool terintegrasi (Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot, Zed, OpenCode, Kiro, Windsurf, Ollama).
- **P1:** Tambahan ringkasan angka nyata dari `eay-core`: **19 Subscription Logins** · **70+ API, Search & Media Providers** · **OpenAI, Anthropic & Responses Protocols**.

### 3.4 Core Capabilities Deep-Dive *(New Section — P1)*
Menjelaskan kapabilitas inti `eay-core` yang membedakannya dari proxy biasa dalam 4–6 kartu/tab terstruktur:
1. **Smart Routing & Auto-Failover:** `auto`, `<alias>/auto`, custom combos (`auto/coding`), priority / round-robin / fill-first, auto-quarantine cooldown saat 429/outage.
2. **Protocol & Thinking Translation:** `/v1/chat/completions`, `/v1/messages`, `/v1/responses`, plus media/audio/search; menerjemahkan `reasoning_effort` & thinking streams lintas provider.
3. **Progressive Skills & Interactive Agents:** `SKILL.md` on-demand loading (`@skill` / `/skill`), `eay_ask_user` mid-run follow-up questions, Agent Profiles (`agent/<name>`) & Teams (`x-eay-team`).
4. **Project Workspaces & MCP Host:** `.eay/` dual-store memory, confined file & Git tools, konektor MCP lokal (`stdio`) & remote (`Streamable HTTP` + OAuth 2.0).
5. **Security, Guardrails & Budgets:** Loopback-only default, AES-256-GCM at rest (`0600`), virtual keys (`gw-sk-…`) dengan limit rate/concurrency/token/USD, secret redaction, dan tool approval gates (`manual` / `manual_for_writes`).

### 3.5 Ecosystem Showcase (`Products`)
- **P0:** Featured card untuk `eay-core` (Runtime & router) + 3 card ekosistem (`eay-workspace`, `eay-battle`, `eay-code`).
- **P0:** Setiap produk menampilkan: nama monospace, role, summary, key points, code/usage snippet, dan status repo (`View on GitHub` jika publik, atau `Private preview` jika private).
- **P1:** Screenshot/preview ringan untuk `eay-workspace` & `eay-battle` (WebP/AVIF teroptimasi, lazy-loaded, support light/dark).

### 3.6 Why Local-First (`Why`)
- **P0:** 3 pilar utama: *No single point of failure*, *Your keys stay on your machine*, *No new SDK to learn*.
- **P1:** Tambah tabel perbandingan singkat (*Direct Provider vs Cloud Proxy vs EAY Local Core*) untuk memperjelas keunggulan privasi & zero vendor lock-in.

### 3.7 Quick Start / Install (`Install`)
- **P0:** 3 langkah jelas: `1. Install` → `2. Connect` → `3. Point your tools`.
- **P0:** Banner kontekstual otomatis saat `CORE_PUBLIC = false` agar user tidak kebingungan jika command install belum publik.
- **P1:** Tab metode instalasi di langkah 1: **macOS (Homebrew)**, **Linux / Windows (Binary)**, dan **Docker / NAS (`ghcr.io/eay-core/eay-core`)**.
- **P1:** Tombol **Copy** di setiap `CodeBlock` dengan state feedback (`Copied`).

### 3.8 Community & Footer (`Community`, `Footer`)
- **P0:** Call-to-action komunitas (Discord + GitHub Organization `https://github.com/Eay-Core`).
- **P0:** Footer dengan `EayMark`, tagline *"EAY — Every AI, Yours."*, dan trademark disclaimer.
- **P2:** Link cepat ke Security Policy (`SECURITY.md`), Releases/Changelog, dan License (`MIT`).

---

## 4. Functional & Technical Requirements

### 4.1 Content & Configuration Governance
- **Single Source of Truth:** Semua teks produk, daftar provider/tool, URL, dan feature flag (`CORE_PUBLIC`) wajib berada di `lib/content.ts` — dilarang hardcode klaim produk di komponen UI.
- **Truthfulness Rule:** Setiap angka dan fitur yang ditulis wajib sinkron dengan `eay-core/README.md` dan `eay-core/docs/*`.
- **Release Toggle:** Mengubah `CORE_PUBLIC = true` harus otomatis memperbarui Hero CTA, link repo `eay-core`, dan menghilangkan notice private preview di section `Install`.

### 4.2 Performance & Build
- **Static Export Clean:** `npm run build` harus menghasilkan folder `out/` yang 100% statis tanpa runtime Node server.
- **Target Core Web Vitals:** LCP < 1.8s, CLS < 0.05, Lighthouse Performance / Accessibility / Best Practices / SEO >= 95.
- **Zero Hydration & Type Errors:** `npm run lint` (`tsc --noEmit`) dan `npm test` wajib lulus di CI sebelum deploy.

### 4.3 SEO, Metadata & Social Sharing
- **P0:** Canonical URL (`https://eay-core.github.io`), `<title>`, meta description, favicon SVG (`/brand/eay-mark.svg`).
- **P0:** Static OG image (`public/og.png`, `1200x630`) didaftarkan di `openGraph.images` dan `twitter.images` (`summary_large_image`).
- **P1:** `robots.txt` & `sitemap.xml` (static di `public/` atau generated saat build).

### 4.4 Accessibility & Responsiveness
- **Responsive Breakpoints:** Harus rapi di Mobile (`360px`–`639px`), Tablet (`640px`–`1023px`), dan Desktop (`1024px`–`1440px+`) tanpa horizontal scroll.
- **Keyboard & Screen Reader:** Semua link/button memiliki `focus-visible`, `aria-label` pada icon-only links, semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), dan heading hierarchy (`h1` → `h2` → `h3`) yang benar.
- **Motion Safety:** Semua animasi `motion/react` dan CSS wajib mematuhi `prefers-reduced-motion: reduce`.

---

## 5. Pre-Launch Checklist

### Sebelum Share Private Preview (`CORE_PUBLIC = false`)
- [x] Isi `DISCORD_URL` dengan permanent invite link server Discord EAY di `lib/content.ts`.
- [ ] Buat & pasang `public/og.png` (`1200x630`) di `app/layout.tsx`.
- [ ] Tambah tombol Copy di `components/CodeBlock.tsx`.
- [ ] Pastikan `npm run lint && npm run build && npm test` lulus.
- [ ] Verifikasi workflow `.github/workflows/deploy.yml` sukses publish ke `https://eay-core.github.io/`.

### Sebelum Public Launch (`CORE_PUBLIC = true`)
- [ ] Flip `CORE_PUBLIC = true` di `lib/content.ts`.
- [ ] Sinkronkan semua URL repo (`eay-core`, `eay-workspace`, `eay-battle`, `eay-code`) ke org `https://github.com/Eay-Core/*`.
- [ ] Tambah tab install (macOS Homebrew, Binary, Docker) & link ke VitePress Docs + GitHub Releases.
- [ ] Tambah section Core Capabilities Deep-Dive & screenshot `eay-workspace`.
- [ ] Update `tests/build.test.mjs` untuk memverifikasi tidak ada placeholder `https://discord.gg/` kosong atau broken anchor saat build.
