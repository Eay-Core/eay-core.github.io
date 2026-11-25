import type { NextConfig } from 'next';

// Static export: the same build runs on GitHub Pages now and on Vercel later.
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default config;
