import type { NextConfig } from 'next';

// Static export: the same build runs on GitHub Pages now and on Vercel later.
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Allow Next.js dev HMR WebSocket when previewing via LAN IP (e.g. 192.168.3.1:3000).
  allowedDevOrigins: ['192.168.3.1', 'localhost', '127.0.0.1'],
};

export default config;
