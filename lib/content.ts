// Every claim on the site comes from the product READMEs and eay-core docs. Keep it that way:
// update this file when a product changes, not the components.

export const ORG_URL = 'https://github.com/Eay-Core';

/**
 * eay-core is private for now: no public repo, releases or Homebrew download. While this is false
 * the site links to Discord for early access instead of install commands that would 404.
 */
export const CORE_PUBLIC = false;
export const DISCORD_URL = 'https://discord.gg/'; // shortcut: replace with the server's permanent invite link
export const GATEWAY_URL = 'http://127.0.0.1:20129';

export type ProductId = 'core' | 'workspace' | 'battle' | 'code';

export interface Product {
  id: ProductId;
  name: string;
  role: string;
  summary: string;
  points: string[];
  /** Public source repo; null while the product is private. */
  repo: string | null;
  /** Command or snippet that shows the product in use. */
  snippet: { label: string; code: string };
}

export const PRODUCTS: Product[] = [
  {
    id: 'core',
    name: 'eay-core',
    role: 'Runtime & router',
    summary:
      'A local Rust daemon that puts every AI subscription and API key you own behind one OpenAI- and Anthropic-compatible endpoint.',
    points: [
      'Routes each request to your best available account',
      'Fails over on rate limits, empty quota or outages',
      'MCP host, Skills, Agent Teams and project workspaces',
    ],
    repo: CORE_PUBLIC ? `${ORG_URL}/eay-core` : null,
    snippet: {
      label: 'Point any OpenAI SDK at it',
      code: `from openai import OpenAI

client = OpenAI(
    base_url="${GATEWAY_URL}/v1",
    api_key="gw-sk-…",
)
client.chat.completions.create(model="auto", messages=[…])`,
    },
  },
  {
    id: 'workspace',
    name: 'eay-workspace',
    role: 'Workspace & control plane',
    summary:
      'Chat, research and vibe-code against any model, agent or team, with live tool activity and approvals you can see.',
    points: [
      'Live subagent tree and tool timeline',
      'Approve sensitive writes and commands before they run',
      'Projects, files, Git and a real terminal in one place',
    ],
    repo: 'https://github.com/nannndev/eay-workspace',
    snippet: {
      label: 'Run it locally',
      code: `npm install
npm run dev`,
    },
  },
  {
    id: 'battle',
    name: 'eay-battle',
    role: 'Model arena',
    summary:
      'Pit models against each other on your own prompts and build a personal ELO leaderboard, all on your local gateway.',
    points: [
      'Blind side-by-side battles with live previews',
      'Multi-agent debates and benchmarks',
      'Ratings that reflect your stack, not a public leaderboard',
    ],
    repo: 'https://github.com/nannndev/eay-battle',
    snippet: {
      label: 'Compare on your prompts',
      code: `npm install
npm run dev`,
    },
  },
  {
    id: 'code',
    name: 'eay-code',
    role: 'Terminal coding agent',
    summary:
      'A CLI and TUI coding agent that can switch models mid-session without losing the conversation.',
    points: [
      'Any model, subscription, agent or team from the gateway',
      'Shares projects, sessions and skills with eay-workspace',
      'Approve tool calls right in the terminal',
    ],
    repo: 'https://github.com/nannndev/eay-code',
    snippet: {
      label: 'Switch models mid-session',
      code: `/model anthropic/claude-sonnet
/model gemini-2.5-pro
/model agent/builder`,
    },
  },
];

/** Tools documented in eay-core's integrations guide. */
export const WORKS_WITH: { name: string; icon: string }[] = [
  { name: 'Claude Code', icon: '/brand/tool-claude.png' },
  { name: 'Codex', icon: '/brand/tool-codex.png' },
  { name: 'Cursor', icon: '/brand/tool-cursor.png' },
  { name: 'Gemini CLI', icon: '/brand/tool-gemini-cli.png' },
  { name: 'GitHub Copilot', icon: '/brand/tool-copilot.png' },
  { name: 'Zed', icon: '/brand/tool-zed.png' },
  { name: 'OpenCode', icon: '/brand/tool-opencode.png' },
  { name: 'Kiro', icon: '/brand/tool-kiro.png' },
  { name: 'Windsurf', icon: '/brand/tool-windsurf.png' },
  { name: 'Ollama', icon: '/brand/tool-ollama.png' },
];

export const STEPS: { title: string; body: string; code: string }[] = [
  {
    title: 'Install',
    body: 'One static binary for macOS, Linux and Windows.',
    code: `brew install nannndev/tap/eay-gateway
brew services start eay-gateway`,
  },
  {
    title: 'Connect',
    body: 'Sign in with your subscriptions or add API keys. Keys stay encrypted on your machine.',
    code: `curl -X POST localhost:20129/gateway/providers/openai/connect \\
  -d '{"api_key":"sk-..."}'`,
  },
  {
    title: 'Point your tools',
    body: 'Anything that speaks OpenAI or Anthropic works unchanged.',
    code: `export ANTHROPIC_BASE_URL=${GATEWAY_URL}
export OPENAI_BASE_URL=${GATEWAY_URL}/v1`,
  },
];
