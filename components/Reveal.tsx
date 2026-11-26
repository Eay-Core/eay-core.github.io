'use client';

/**
 * Lightweight section wrapper. Always renders visible on first paint so no section
 * can ever get stuck at opacity: 0 across hash navigation, mobile emulators, or SSR.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
