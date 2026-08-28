export interface Cue {
  start: number;
  end: number;
  text: string;
}

function toSeconds(t: string): number {
  const parts = t.replace(',', '.').trim().split(':');
  let s = 0;
  while (parts.length) s = s * 60 + parseFloat(parts.shift() || '0');
  return s;
}

export function parseSubtitles(raw: string): Cue[] {
  const isVtt = raw.startsWith('WEBVTT');
  let body = isVtt ? raw.replace(/WEBVTT.*?(\n\n|$)/s, '') : raw;
  body = body.replace(/^\ufeff/, '').replace(/^\d+\s*$/gm, '');

  const blocks = body
    .split(/\r?\n\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const cues: Cue[] = [];
  for (const block of blocks) {
    const lines = block.split(/\r?\n/);
    const timeIdx = lines.findIndex((l) => /-->/.test(l));
    if (timeIdx === -1) continue;
    const [start, end] = lines[timeIdx].split('-->').map((t) => toSeconds(t));
    const text = lines
      .slice(timeIdx + 1)
      .join(' ')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (text) cues.push({ start, end, text });
  }
  return cues.sort((a, b) => a.start - b.start);
}
