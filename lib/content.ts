// Every claim on the site comes from the product READMEs and eay-core docs. Keep it that way:
// update this file when a product changes, not the components.
// Note: avoid em/en dashes in visible copy (enforced by tests/build.test.mjs).

export const ORG_URL = 'https://github.com/Eay-Core';

/**
 * eay-core is private for now: no public repo, releases or Homebrew download. While this is false
 * the site links to Discord for early access instead of install commands that would 404.
 */
export const CORE_PUBLIC = false;
export const DISCORD_URL = 'https://discord.gg/'; // replace with the server's permanent invite link
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

export const HERO_METRICS: { value: string; label: string }[] = [
  { value: '19', label: 'Subscription OAuth logins' },
  { value: '70+', label: 'API, search & media providers' },
  { value: '3', label: 'Native protocols (OpenAI, Anthropic, Responses)' },
  { value: '100%', label: 'Local-first & AES-256-GCM encrypted' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'core',
    name: 'eay-core',
    role: 'Runtime & router',
    summary:
      'A local Rust daemon that puts every AI subscription and API key you own behind one OpenAI-, Anthropic-, and Responses-compatible endpoint.',
    points: [
      'Routes each turn to your best available account with automatic failover',
      'Translates thinking streams, tools, images, PDFs and audio across providers',
      'Built-in MCP host, progressive Skills, Agent Teams and .eay/ workspaces',
    ],
    repo: CORE_PUBLIC ? `${ORG_URL}/eay-core` : null,
    snippet: {
      label: 'Point any OpenAI SDK at it',
      code: `from openai import OpenAI

client = OpenAI(
    base_url="${GATEWAY_URL}/v1",
    api_key="gw-sk-local",
)
client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Review this diff"}],
)`,
    },
  },
  {
    id: 'workspace',
    name: 'eay-workspace',
    role: 'Workspace & control plane',
    summary:
      'Chat, research and vibe-code against any model, agent or team, with live tool activity, interactive questions and approvals you can see.',
    points: [
      'Live subagent tree, tool timeline and interactive follow-up prompts',
      'Approve sensitive writes and commands before they execute',
      'Projects, files, Git, skills, MCP and a real terminal in one place',
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
      'Pit models against each other on your own prompts and build a personal ELO leaderboard, all routed through your local gateway.',
    points: [
      'Blind side-by-side battles with live HTML and code previews',
      'Multi-agent debates and repeatable prompt benchmarks',
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
      'A CLI and TUI coding agent that switches models, subscriptions, agents or teams mid-session without losing the conversation.',
    points: [
      'Any model, subscription, agent or team from the local gateway',
      'Shares projects, sessions and skills with eay-workspace',
      'Approve tool calls right inside the terminal',
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

export type CapabilityId = 'routing' | 'protocols' | 'agents' | 'workspaces' | 'security';

export interface Capability {
  id: CapabilityId;
  tab: string;
  tag: string;
  title: string;
  summary: string;
  bullets: string[];
  snippetLabel: string;
  snippet: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'routing',
    tab: 'Routing',
    tag: 'SMART FAILOVER',
    title: 'Keep coding when an account hits a wall.',
    summary:
      'Combine subscription logins and pay-per-token keys into priority, round-robin or fill-first pools. Rate-limited accounts enter automatic cooldown while traffic moves cleanly to the next healthy upstream.',
    bullets: [
      'Use auto, <alias>/auto or custom combos like auto/coding',
      'Automatic quarantine cooldowns after 429 rate limits or outages',
      'Skips text-only upstreams automatically when requests include binary media',
    ],
    snippetLabel: 'Custom routing combo request',
    snippet: `curl ${GATEWAY_URL}/v1/chat/completions \\
  -H "authorization: Bearer gw-sk-local" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "auto/coding",
    "reasoning_effort": "high",
    "messages": [{"role": "user", "content": "Refactor auth middleware"}]
  }'`,
  },
  {
    id: 'protocols',
    tab: 'Protocols',
    tag: 'THINKING EVERYWHERE',
    title: 'One local daemon, every major AI wire format.',
    summary:
      'Expose OpenAI Chat Completions, Anthropic Messages, OpenAI Responses, embeddings, images, speech and web search on localhost. Thinking budgets and reasoning streams translate cleanly across providers.',
    bullets: [
      'Native /v1/messages for Claude Code and Anthropic SDKs',
      'OpenAI /v1/chat/completions and /v1/responses side by side',
      'Translates images, PDFs, audio and reasoning traces across vendors',
    ],
    snippetLabel: 'Point Claude Code at eay-core',
    snippet: `export ANTHROPIC_BASE_URL="${GATEWAY_URL}"
export ANTHROPIC_API_KEY="gw-sk-local"

# Works with Claude, Codex, Gemini or OpenRouter behind the scenes
claude`,
  },
  {
    id: 'agents',
    tab: 'Skills & Teams',
    tag: 'PROGRESSIVE ORCHESTRATION',
    title: 'Reusable skills, interactive prompts and multi-agent teams.',
    summary:
      'Attach progressive SKILL.md capabilities on demand without bloating prompts. Agents can delegate parallel subagents, pause mid-run with structured questions via eay_ask_user, and coordinate in shared team threads.',
    bullets: [
      'Auto-discoverable skills (x-eay-skills: *) with @skill and /skill mentions',
      'Adaptive tool-loop guard with stuck-loop detection and context compaction',
      'Named agent profiles (agent/<name>) and multi-agent teams (x-eay-team)',
    ],
    snippetLabel: 'Invoke an agent team with skills enabled',
    snippet: `curl ${GATEWAY_URL}/v1/chat/completions \\
  -H "x-eay-team: core-builders" \\
  -H "x-eay-skills: *" \\
  -H "x-eay-session-id: ws_feature_auth" \\
  -d '{"model":"auto","messages":[{"role":"user","content":"Audit & patch PR #12"}]}'`,
  },
  {
    id: 'workspaces',
    tab: 'MCP & Projects',
    tag: 'DUAL-STORE .EAY/',
    title: 'Portable project memory and unified MCP tooling.',
    summary:
      'Bind any local folder to a project for confined file operations, Git source control and portable .eay/rules.md instructions. Host local stdio and remote Streamable HTTP MCP servers with OAuth 2.0 discovery.',
    bullets: [
      'Confined workspace file tools, @file indexing and Git diff/branch APIs',
      'Local stdio (Filesystem, GitHub, Postgres) and remote HTTP MCP servers',
      'One-click MCP config import from Claude Desktop, Cursor or VS Code',
    ],
    snippetLabel: 'Scope a request to a project and MCP server',
    snippet: `curl ${GATEWAY_URL}/v1/chat/completions \\
  -H "x-eay-project: prj_eay_core" \\
  -H "x-eay-mcp: filesystem,github" \\
  -H "x-eay-approval: manual_for_writes" \\
  -d '{"model":"auto","messages":[{"role":"user","content":"Update release notes"}]}'`,
  },
  {
    id: 'security',
    tab: 'Security',
    tag: 'LOCAL-FIRST GUARDRAILS',
    title: 'Encrypted at rest, loopback-only by default.',
    summary:
      'Every credential stays on your machine encrypted with AES-256-GCM. Issue virtual keys with strict provider allowlists, rate limits, USD budgets, secret redaction and manual tool approval gates.',
    bullets: [
      'Binds strictly to 127.0.0.1 with DNS-rebinding Host validation',
      'Per-key rate_limit_per_min, max_tokens_budget and max_cost_usd caps',
      'Approval gates (manual or manual_for_writes) before sensitive tools run',
    ],
    snippetLabel: 'Create a scoped virtual key with a USD cap',
    snippet: `curl -X POST ${GATEWAY_URL}/gateway/keys \\
  -H "content-type: application/json" \\
  -d '{
    "name": "cursor-daily",
    "allowed_providers": ["anthropic", "openai", "deepseek"],
    "max_cost_usd": 15.0,
    "rate_limit_per_min": 30
  }'`,
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

export type ProviderCategory = 'oauth' | 'api' | 'media';

export interface ProviderItem {
  id: string;
  name: string;
  alias: string;
  category: ProviderCategory;
  icon: string;
}

/** Real providers documented in eay-core/docs/providers.md with official icon assets. */
export const PROVIDERS: ProviderItem[] = [
  // Subscription OAuth providers
  { id: 'claude', name: 'Claude', alias: 'cc', category: 'oauth', icon: '/providers/claude.png' },
  { id: 'codex', name: 'ChatGPT / Codex', alias: 'cx', category: 'oauth', icon: '/providers/codex.png' },
  { id: 'copilot', name: 'GitHub Copilot', alias: 'gh', category: 'oauth', icon: '/providers/copilot.png' },
  { id: 'gemini-cli', name: 'Gemini CLI', alias: 'gc', category: 'oauth', icon: '/providers/gemini-cli.png' },
  { id: 'antigravity', name: 'Antigravity', alias: 'ag', category: 'oauth', icon: '/providers/antigravity.png' },
  { id: 'kimi', name: 'Kimi Code', alias: 'km', category: 'oauth', icon: '/providers/kimi.png' },
  { id: 'cline', name: 'Cline', alias: 'cl', category: 'oauth', icon: '/providers/cline.png' },
  { id: 'kilocode', name: 'Kilo Code', alias: 'kc', category: 'oauth', icon: '/providers/kilocode.png' },
  { id: 'kiro', name: 'Kiro', alias: 'kr', category: 'oauth', icon: '/providers/kiro.png' },
  { id: 'zed', name: 'Zed', alias: 'zed', category: 'oauth', icon: '/providers/zed.png' },
  { id: 'trae', name: 'Trae SOLO', alias: 'trae', category: 'oauth', icon: '/providers/trae.png' },
  { id: 'glm-coding', name: 'GLM Coding Plan', alias: 'zc', category: 'oauth', icon: '/providers/glm.png' },
  { id: 'codebuddy-intl', name: 'CodeBuddy', alias: 'cbi', category: 'oauth', icon: '/providers/codebuddy-intl.png' },
  { id: 'minimax-code', name: 'MiniMax Code', alias: 'mmcg', category: 'oauth', icon: '/providers/minimax.png' },
  { id: 'muse', name: 'Muse Code', alias: 'mu', category: 'oauth', icon: '/providers/muse.png' },
  { id: 'nous', name: 'Nous Research', alias: 'ns', category: 'oauth', icon: '/providers/nous.png' },

  // Flagship API & local providers
  { id: 'openai', name: 'OpenAI', alias: 'oa', category: 'api', icon: '/providers/openai.png' },
  { id: 'anthropic', name: 'Anthropic', alias: 'an', category: 'api', icon: '/providers/anthropic.png' },
  { id: 'gemini', name: 'Google Gemini', alias: 'gm', category: 'api', icon: '/providers/gemini.png' },
  { id: 'deepseek', name: 'DeepSeek', alias: 'ds', category: 'api', icon: '/providers/deepseek.png' },
  { id: 'openrouter', name: 'OpenRouter', alias: 'or', category: 'api', icon: '/providers/openrouter.png' },
  { id: 'groq', name: 'Groq', alias: 'gq', category: 'api', icon: '/providers/groq.png' },
  { id: 'xai', name: 'xAI Grok', alias: 'xa', category: 'api', icon: '/providers/xai.png' },
  { id: 'mistral', name: 'Mistral AI', alias: 'ms', category: 'api', icon: '/providers/mistral.png' },
  { id: 'together', name: 'Together AI', alias: 'tg', category: 'api', icon: '/providers/together.png' },
  { id: 'fireworks', name: 'Fireworks AI', alias: 'fw', category: 'api', icon: '/providers/fireworks.png' },
  { id: 'cerebras', name: 'Cerebras', alias: 'cb', category: 'api', icon: '/providers/cerebras.png' },
  { id: 'nvidia', name: 'NVIDIA NIM', alias: 'nvidia', category: 'api', icon: '/providers/nvidia.png' },
  { id: 'ollama', name: 'Ollama (Local)', alias: 'ol', category: 'api', icon: '/providers/ollama.png' },
  { id: 'bedrock', name: 'AWS Bedrock', alias: 'br', category: 'api', icon: '/providers/bedrock.png' },
  { id: 'azure', name: 'Azure OpenAI', alias: 'az', category: 'api', icon: '/providers/azure.png' },
  { id: 'cloudflare-ai', name: 'Cloudflare AI', alias: 'cf', category: 'api', icon: '/providers/cloudflare-ai.png' },
  { id: 'huggingface', name: 'Hugging Face', alias: 'hf', category: 'api', icon: '/providers/huggingface.png' },
  { id: 'vercel', name: 'Vercel AI', alias: 'vercel', category: 'api', icon: '/providers/vercel.png' },
  { id: 'cohere', name: 'Cohere', alias: 'co', category: 'api', icon: '/providers/cohere.png' },
  { id: 'qwen', name: 'Qwen / DashScope', alias: 'dashscope', category: 'api', icon: '/providers/qwen.png' },
  { id: 'sambanova', name: 'SambaNova', alias: 'sn', category: 'api', icon: '/providers/sambanova.png' },
  { id: 'siliconflow', name: 'SiliconFlow', alias: 'sf', category: 'api', icon: '/providers/siliconflow.png' },

  // Search, embeddings & media providers
  { id: 'perplexity', name: 'Perplexity', alias: 'pp', category: 'media', icon: '/providers/perplexity.png' },
  { id: 'tavily', name: 'Tavily Search', alias: 'tavily', category: 'media', icon: '/providers/tavily.png' },
  { id: 'exa', name: 'Exa Search', alias: 'exa', category: 'media', icon: '/providers/exa.png' },
  { id: 'brave-search', name: 'Brave Search', alias: 'brave', category: 'media', icon: '/providers/brave-search.png' },
  { id: 'elevenlabs', name: 'ElevenLabs', alias: 'el', category: 'media', icon: '/providers/elevenlabs.png' },
  { id: 'cartesia', name: 'Cartesia', alias: 'cart', category: 'media', icon: '/providers/cartesia.png' },
  { id: 'black-forest-labs', name: 'FLUX / BFL', alias: 'bfl', category: 'media', icon: '/providers/black-forest-labs.png' },
  { id: 'voyage-ai', name: 'Voyage AI', alias: 'voyage', category: 'media', icon: '/providers/voyage-ai.png' },
];

export type InstallMethodId = 'homebrew' | 'binary' | 'docker';

export const INSTALL_METHODS: { id: InstallMethodId; label: string; note: string; code: string }[] = [
  {
    id: 'homebrew',
    label: 'macOS (Homebrew)',
    note: 'Install the static binary and run it as a background login service.',
    code: `brew install nannndev/tap/eay-gateway
brew services start eay-gateway`,
  },
  {
    id: 'binary',
    label: 'Linux / Windows',
    note: 'Single zero-dependency static binary (macOS Universal, Linux musl, Windows).',
    code: `# Download from Releases, then register as a login service
eay-gateway service install
eay-gateway --port 20129`,
  },
  {
    id: 'docker',
    label: 'Docker / NAS',
    note: 'Run on a home server, NAS or Raspberry Pi with persistent encrypted state.',
    code: `docker run -d --name eay-core \\
  -p 127.0.0.1:20129:20129 \\
  -v eay-data:/data \\
  ghcr.io/eay-core/eay-core:latest`,
  },
];

export const SETUP_STEPS: { title: string; body: string; code: string }[] = [
  {
    title: 'Connect providers',
    body: 'Sign in with your existing AI subscriptions or add API keys. Credentials stay AES-256-GCM encrypted on disk.',
    code: `curl -X POST ${GATEWAY_URL}/gateway/providers/deepseek/connect \\
  -H "content-type: application/json" \\
  -d '{"api_key":"sk-..."}'`,
  },
  {
    title: 'Point your tools',
    body: 'Anything that speaks OpenAI or Anthropic works unchanged with a single base URL.',
    code: `export ANTHROPIC_BASE_URL=${GATEWAY_URL}
export OPENAI_BASE_URL=${GATEWAY_URL}/v1`,
  },
];

export const COMPARISON_ROWS: {
  feature: string;
  direct: string;
  cloudProxy: string;
  eayCore: string;
}[] = [
  {
    feature: 'Subscription OAuth + API key pooling',
    direct: 'Single vendor only',
    cloudProxy: 'API keys only',
    eayCore: '19 OAuth logins + 70+ APIs',
  },
  {
    feature: 'Automatic 429 failover & cooldowns',
    direct: 'Manual switching',
    cloudProxy: 'Cloud-routed',
    eayCore: 'Instant local failover',
  },
  {
    feature: 'Credential custody & chat privacy',
    direct: 'Per-vendor cloud',
    cloudProxy: 'Third-party servers',
    eayCore: '100% local, AES-256-GCM',
  },
  {
    feature: 'MCP host, Skills & .eay/ workspaces',
    direct: 'Fragmented per IDE',
    cloudProxy: 'Not available',
    eayCore: 'Shared across every tool',
  },
];
