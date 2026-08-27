interface SearchItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  body?: string;
}

interface RankedResult {
  item: SearchItem;
  score: number;
  type: 'post' | 'tag';
  matchedTag?: string;
}

const TITLE_MULT = 3;
const TAG_MULT = 2.5;
const DESC_MULT = 1.5;
const BODY_MULT = 1;

function calcTitleScore(query: string, title: string): number {
  const lower = title.toLowerCase();
  if (lower === query) return 100;
  if (lower.startsWith(query)) return 80;
  if (lower.includes(query)) return 60;
  return 0;
}

function calcTagScore(query: string, tags: string[]): number {
  let best = 0;
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (lower === query) best = Math.max(best, 100);
    else if (lower.startsWith(query)) best = Math.max(best, 80);
    else if (lower.includes(query)) best = Math.max(best, 60);
  }
  return best;
}

export function rankResults(
  query: string,
  items: SearchItem[],
  fuseMatches: Map<string, number>
): RankedResult[] {
  const q = query.toLowerCase();
  const results: RankedResult[] = [];

  for (const item of items) {
    const fuseScore = fuseMatches.get(item.id) ?? 0;
    const titleScore = calcTitleScore(q, item.title) * TITLE_MULT;
    const tagScore = calcTagScore(q, item.tags) * TAG_MULT;
    const descScore = item.description.toLowerCase().includes(q)
      ? DESC_MULT * 50
      : 0;
    const bodyScore = item.body?.toLowerCase().includes(q)
      ? BODY_MULT * 30
      : 0;

    const totalScore = fuseScore + titleScore + tagScore + descScore + bodyScore;
    if (totalScore > 0) {
      results.push({ item, score: totalScore, type: 'post' });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function rankTags(
  query: string,
  allTags: string[],
  fuseTagMatches: Set<string>
): RankedResult[] {
  const q = query.toLowerCase();
  const results: RankedResult[] = [];

  for (const tag of allTags) {
    const lower = tag.toLowerCase();
    const fuseBoost = fuseTagMatches.has(tag) ? 40 : 0;
    let score = 0;
    if (lower === q) score = 100;
    else if (lower.startsWith(q)) score = 80;
    else if (lower.includes(q)) score = 60;

    score += fuseBoost;
    if (score > 0) {
      results.push({
        item: { id: tag, title: tag, description: '', tags: [] },
        score,
        type: 'tag',
        matchedTag: tag,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
