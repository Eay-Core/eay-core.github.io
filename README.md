# eay-core.github.io

Landing page for the EAY ecosystem, live at **https://eay-core.github.io/**.

Next.js (static export) + Tailwind v4 + Motion. The same build runs on GitHub Pages and Vercel.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm test         # checks the built page (run after build)
```

- **Copy and product facts** live in `lib/content.ts`. Change text there, not in components.
- **eay-core is private for now**: `CORE_PUBLIC = false` swaps install calls to action for the Discord. Flip it once the repo and releases are public.
- **Deploy**: every push to `main` builds and publishes via `.github/workflows/deploy.yml`.
- **Vercel later**: import the repo; no config changes needed.
