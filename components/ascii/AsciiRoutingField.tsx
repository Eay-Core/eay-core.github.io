'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowClockwise, Lightning, PaperPlaneTilt, WarningCircle } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { useSiteTheme } from '@/components/theme/ThemeProvider';

interface UpstreamNode {
  id: string;
  label: string;
  alias: string;
  icon: string;
  latencyMs: number;
}

const TOOLS: { id: string; label: string; icon: string }[] = [
  { id: 'claude-code', label: 'claude-code', icon: '/providers/claude.png' },
  { id: 'codex', label: 'codex', icon: '/providers/codex.png' },
  { id: 'cursor', label: 'cursor', icon: '/providers/cursor.png' },
  { id: 'openai-sdk', label: 'openai-sdk', icon: '/providers/openai.png' },
];

const UPSTREAMS: UpstreamNode[] = [
  { id: 'claude', label: 'claude', alias: 'cc', icon: '/providers/claude.png', latencyMs: 14 },
  { id: 'codex', label: 'codex', alias: 'cx', icon: '/providers/codex.png', latencyMs: 18 },
  { id: 'gemini-cli', label: 'gemini-cli', alias: 'gc', icon: '/providers/gemini-cli.png', latencyMs: 12 },
  { id: 'ollama', label: 'ollama', alias: 'ol', icon: '/providers/ollama.png', latencyMs: 6 },
];

const COLS = 48;
const ROWS = 9;
const GLYPHS = [' ', '.', ':', '-', '=', '+', '*', '#'];

function buildAsciiFrame(
  tick: number,
  activeToolIndex: number,
  activeUpstreamIndex: number,
  pointer: { col: number; row: number } | null,
  pulseBoost: number,
  allDown: boolean
): string {
  const centerCol = Math.floor(COLS / 2);
  const centerRow = Math.floor(ROWS / 2);
  const sourceRow = Math.min(ROWS - 2, Math.max(1, 1 + activeToolIndex * 2));
  const targetRow = Math.min(ROWS - 2, Math.max(1, 1 + activeUpstreamIndex * 2));
  const lines: string[] = [];

  for (let r = 0; r < ROWS; r++) {
    let rowStr = '';
    for (let c = 0; c < COLS; c++) {
      // Center EAY core node
      if (r === centerRow && c >= centerCol - 4 && c <= centerCol + 4) {
        const badge = pulseBoost > 0.4 ? '[*EAY*]' : '[ EAY ]';
        const padded = ` ${badge} `;
        rowStr += padded[c - (centerCol - 4)];
        continue;
      }
      if ((r === centerRow - 1 || r === centerRow + 1) && c >= centerCol - 4 && c <= centerCol + 4) {
        const cap = r === centerRow - 1 ? ' /-----\\ ' : ' \\-----/ ';
        rowStr += cap[c - (centerCol - 4)];
        continue;
      }

      const isActiveLeftLane = c < centerCol - 5 && r === sourceRow;
      const isIdleLeftLane = c < centerCol - 5 && (r === 1 || r === 3 || r === 5 || r === 7) && r !== sourceRow;
      const isRightLane = !allDown && c > centerCol + 5 && r === targetRow;
      const isBus =
        (c === centerCol - 6 && r >= Math.min(centerRow, sourceRow) && r <= Math.max(centerRow, sourceRow)) ||
        (!allDown && c === centerCol + 6 && r >= Math.min(centerRow, targetRow) && r <= Math.max(centerRow, targetRow));

      let ripple = 0;
      if (pointer) {
        const dx = (c - pointer.col) * 0.65;
        const dy = r - pointer.row;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 5) {
          ripple = Math.max(0, 1 - dist / 5);
        }
      }

      if (isActiveLeftLane) {
        const phase = ((c - tick) % 8 + 8) % 8;
        if (phase === 0 || (pulseBoost > 0.2 && phase === 4)) {
          rowStr += '>';
        } else if (phase === 1) {
          rowStr += '=';
        } else {
          rowStr += ripple > 0.4 ? '*' : '-';
        }
        continue;
      }

      if (isIdleLeftLane) {
        const phase = ((c - Math.floor(tick / 2) + r * 3) % 12 + 12) % 12;
        rowStr += phase === 0 ? '>' : ripple > 0.45 ? '+' : '.';
        continue;
      }

      if (isRightLane) {
        const phase = ((c - tick) % 7 + 7) % 7;
        if (phase === 0 || (pulseBoost > 0.2 && phase === 3)) {
          rowStr += '>';
        } else if (phase === 1) {
          rowStr += '=';
        } else {
          rowStr += ripple > 0.4 ? '*' : '-';
        }
        continue;
      }

      if (isBus) {
        rowStr += pulseBoost > 0.35 ? ':' : '|';
        continue;
      }

      const wave =
        Math.sin(c * 0.24 + tick * 0.2) * 0.5 +
        Math.cos(r * 0.72 - tick * 0.14) * 0.5;
      const energy = Math.max(0, (wave + 1) * 0.22 + ripple * 0.9 + pulseBoost * 0.18);
      const idx = Math.min(GLYPHS.length - 1, Math.floor(energy * (GLYPHS.length - 1)));
      rowStr += GLYPHS[idx];
    }
    lines.push(rowStr);
  }

  return lines.join('\n');
}

export function AsciiRoutingField({ markSvg }: { markSvg: string }) {
  const { theme } = useSiteTheme();
  const reducedMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [cooledIds, setCooledIds] = useState<string[]>([]);
  const [pulseBoost, setPulseBoost] = useState(0);
  const [reqCount, setReqCount] = useState(128);
  const [pointer, setPointer] = useState<{ col: number; row: number } | null>(null);
  const [eventLog, setEventLog] = useState<string>(
    '[200 OK] claude-code -> claude (cc/auto · 14ms)'
  );
  const preRef = useRef<HTMLPreElement | null>(null);

  const activeIndex = useMemo(
    () => UPSTREAMS.findIndex((u) => !cooledIds.includes(u.id)),
    [cooledIds]
  );

  const activeUpstream = activeIndex >= 0 ? UPSTREAMS[activeIndex] : null;
  const activeTool = TOOLS[activeToolIdx];

  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;
    let last = 0;
    const step = (ts: number) => {
      if (ts - last >= 80) {
        last = ts;
        setTick((t) => (t + 1) % 10000);
        setPulseBoost((p) => (p > 0 ? Math.max(0, p - 0.12) : 0));
      }
      rafId = window.requestAnimationFrame(step);
    };
    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  const sendRequest = useCallback(() => {
    setPulseBoost(1);
    setReqCount((n) => n + 1);
    if (activeUpstream) {
      setEventLog(
        `[200 OK] ${activeTool.label} -> ${activeUpstream.label} (${activeUpstream.alias}/auto · ${activeUpstream.latencyMs}ms)`
      );
    } else {
      setEventLog('[503] all accounts in cooldown · click Reset or an upstream');
    }
  }, [activeTool.label, activeUpstream]);

  const triggerFailover = useCallback(() => {
    setPulseBoost(1);
    setCooledIds((prev) => {
      const current = UPSTREAMS.find((u) => !prev.includes(u.id));
      if (!current) {
        setEventLog('[router] all accounts restored -> claude (cc/auto · 14ms)');
        return [];
      }
      const nextCooled = [...prev, current.id];
      const fallback = UPSTREAMS.find((u) => !nextCooled.includes(u.id));
      if (fallback) {
        setEventLog(
          `[failover] 429 on ${current.label} -> rerouted to ${fallback.label} (${fallback.alias}/auto · ${fallback.latencyMs}ms)`
        );
      } else {
        setEventLog('[router] all upstreams in cooldown · click Reset to restore pool');
      }
      return nextCooled;
    });
  }, []);

  const toggleUpstream = useCallback((u: UpstreamNode) => {
    setPulseBoost(0.9);
    setCooledIds((prev) => {
      const isDown = prev.includes(u.id);
      const next = isDown ? prev.filter((id) => id !== u.id) : [...prev, u.id];
      const active = UPSTREAMS.find((item) => !next.includes(item.id));
      if (isDown) {
        setEventLog(`[health] ${u.label} recovered -> pool ready`);
      } else if (active) {
        setEventLog(`[failover] ${u.label} marked 429 -> routed to ${active.label}`);
      } else {
        setEventLog('[router] pool exhausted · click any upstream or Reset');
      }
      return next;
    });
  }, []);

  const selectTool = useCallback(
    (index: number) => {
      setActiveToolIdx(index);
      setPulseBoost(0.9);
      setReqCount((n) => n + 1);
      const t = TOOLS[index];
      if (activeUpstream) {
        setEventLog(
          `[200 OK] ${t.label} -> ${activeUpstream.label} (${activeUpstream.alias}/auto · ${activeUpstream.latencyMs}ms)`
        );
      }
    },
    [activeUpstream]
  );

  const resetPool = useCallback(() => {
    setCooledIds([]);
    setPulseBoost(0.8);
    setEventLog('[router] pool reset -> claude (cc/auto · 14ms)');
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLPreElement>) => {
    const el = preRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xRatio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const yRatio = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    setPointer({
      col: Math.floor(xRatio * (COLS - 1)),
      row: Math.floor(yRatio * (ROWS - 1)),
    });
  }, []);

  const asciiFrame = useMemo(
    () =>
      buildAsciiFrame(
        tick,
        activeToolIdx,
        activeIndex >= 0 ? activeIndex : 0,
        pointer,
        pulseBoost,
        activeIndex < 0
      ),
    [tick, activeToolIdx, activeIndex, pointer, pulseBoost]
  );

  const isAscii = theme === 'ascii';

  return (
    <div className="theme-card relative overflow-hidden border border-line bg-surface">
      {/* Top terminal / control bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-raised/70 px-3.5 py-2.5 text-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: activeUpstream ? 'var(--color-ok)' : 'var(--color-warn)' }}
          />
          <span>127.0.0.1:20129</span>
          <span className="hidden text-faint sm:inline">· {reqCount} reqs</span>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={sendRequest}
            className="theme-pill inline-flex cursor-pointer items-center gap-1.5 border border-line bg-surface px-2.5 py-1 font-mono text-[11px] font-medium text-ink transition hover:border-accent/50"
          >
            <PaperPlaneTilt size={12} weight="fill" className="text-accent" />
            Send
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={triggerFailover}
            className="theme-pill inline-flex cursor-pointer items-center gap-1.5 border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-medium text-accent transition hover:border-accent"
          >
            <Lightning size={12} weight="fill" />
            Simulate 429
          </motion.button>
          {cooledIds.length > 0 && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={resetPool}
              className="theme-pill inline-flex cursor-pointer items-center gap-1 border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted transition hover:text-ink"
            >
              <ArrowClockwise size={12} />
              Reset
            </motion.button>
          )}
        </div>
      </div>

      {/* Main interactive stage */}
      <div className="p-3.5 sm:p-5">
        {/* Interactive ASCII Signal Field */}
        <div className="relative overflow-hidden rounded-md border border-line bg-bg/95">
          <pre
            ref={preRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setPointer(null)}
            onClick={sendRequest}
            aria-label="Interactive ASCII routing signal animation. Hover to ripple or click to send a request."
            className={`cursor-crosshair select-none overflow-hidden px-3 py-3 text-center font-mono text-[10px] leading-[1.35] tracking-[0.06em] sm:text-[11.5px] ${
              isAscii ? 'text-accent' : 'text-muted'
            }`}
          >
            {asciiFrame}
          </pre>
          <span className="pointer-events-none absolute bottom-1.5 right-2.5 font-mono text-[9.5px] text-faint">
            hover or click field
          </span>
        </div>

        {/* Interactive Topology Nodes (Clickable Tools -> Core -> Clickable Upstreams) */}
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.15fr)] items-center gap-2 sm:gap-4">
          <ul className="grid min-w-0 gap-1.5">
            {TOOLS.map((tool, idx) => {
              const selected = idx === activeToolIdx;
              return (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => selectTool(idx)}
                    title={`Route from ${tool.label}`}
                    className={`theme-card flex w-full min-w-0 cursor-pointer items-center gap-2 border px-2 py-1.5 text-left font-mono text-[11px] transition active:scale-[0.98] ${
                      selected
                        ? 'border-accent/60 bg-accent-soft text-ink'
                        : 'border-line bg-raised/70 text-muted hover:border-accent/30 hover:text-ink'
                    }`}
                  >
                    <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-white/95">
                      <img src={tool.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-xs" />
                    </span>
                    <span className="truncate">{tool.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <motion.div
            animate={pulseBoost > 0.35 ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="theme-card flex h-20 w-20 flex-col items-center justify-center border border-accent/40 bg-accent-soft sm:h-24 sm:w-24"
          >
            <span
              className="eay-mark inline-block h-8 w-8 sm:h-10 sm:w-10"
              dangerouslySetInnerHTML={{ __html: markSvg }}
            />
            <span className="mt-1 font-mono text-[10px] text-ink">auto</span>
          </motion.div>

          <ul className="grid min-w-0 gap-1.5">
            {UPSTREAMS.map((u) => {
              const isDown = cooledIds.includes(u.id);
              const isActive = activeUpstream?.id === u.id;
              return (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => toggleUpstream(u)}
                    title={`Click to toggle 429 rate-limit state (${u.alias}/*)`}
                    className={`theme-card flex w-full min-w-0 cursor-pointer items-center justify-between gap-1.5 border px-2 py-1.5 text-left font-mono text-[11px] transition active:scale-[0.98] ${
                      isDown
                        ? 'border-dashed border-line bg-transparent text-faint line-through'
                        : isActive
                          ? 'border-accent/60 bg-accent-soft text-ink'
                          : 'border-line bg-raised/60 text-muted hover:border-accent/30 hover:text-ink'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded bg-white/95">
                        <img src={u.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 rounded-xs" />
                      </span>
                      <span className="truncate">{u.label}</span>
                    </span>
                    <span
                      className="shrink-0 text-[9.5px] font-semibold"
                      style={{
                        color: isDown
                          ? 'var(--color-warn)'
                          : isActive
                            ? 'var(--color-ok)'
                            : 'var(--color-faint)',
                      }}
                    >
                      {isDown ? '429' : isActive ? 'ACTIVE' : 'READY'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Live telemetry log strip */}
        <div className="mt-4 flex items-center gap-2 rounded-md border border-line bg-bg/80 px-3 py-2 font-mono text-[11px] text-muted">
          {!activeUpstream ? (
            <WarningCircle size={14} className="shrink-0" style={{ color: 'var(--color-warn)' }} />
          ) : (
            <span className="shrink-0 text-accent">$</span>
          )}
          <span className="truncate">{eventLog}</span>
        </div>
      </div>
    </div>
  );
}
