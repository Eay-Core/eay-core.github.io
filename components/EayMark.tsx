// Inlines the official EAY monogram (public/brand/eay-mark.svg) so its ribs/letters follow the theme.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const EAY_MARK_SVG = readFileSync(join(process.cwd(), 'public/brand/eay-mark.svg'), 'utf8')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace('<svg ', '<svg aria-hidden="true" focusable="false" width="100%" height="100%" ');

export function EayMark({ className = '' }: { className?: string }) {
  return <span className={`eay-mark inline-block ${className}`} dangerouslySetInnerHTML={{ __html: EAY_MARK_SVG }} />;
}
