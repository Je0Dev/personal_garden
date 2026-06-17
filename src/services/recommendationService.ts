import type { Post } from '@/data/posts';

interface Recommendation {
  slug: string;
  title: string;
  reason: string;
}

export async function getAIRecommendations(
  currentSlug: string,
  allPosts: Post[]
): Promise<Recommendation[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackRecommendations(currentSlug, allPosts);
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const postTitles = allPosts
      .filter(p => p.slug !== currentSlug)
      .map(p => `- "${p.title}" (tags: ${p.tags.join(', ')})`)
      .join('\n');

    const prompt = `Given this blog post: "${allPosts.find(p => p.slug === currentSlug)?.title}"
with tags: ${allPosts.find(p => p.slug === currentSlug)?.tags.join(', ') || 'none'}

Recommend 3 related posts from this list:
${postTitles}

Return a JSON array of objects with "slug", "title", and "reason" fields. Only return the JSON array, no other text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = response.text;
    if (!text) return fallbackRecommendations(currentSlug, allPosts);

    const cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed: Recommendation[] = JSON.parse(cleaned);
    return parsed.slice(0, 3);
  } catch {
    return fallbackRecommendations(currentSlug, allPosts);
  }
}

function fallbackRecommendations(currentSlug: string, allPosts: Post[]): Recommendation[] {
  const currentPost = allPosts.find(p => p.slug === currentSlug);
  if (!currentPost) return [];

  const scored = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const sharedTags = p.tags.filter(t => currentPost.tags.includes(t)).length;
      return { post: p, score: sharedTags };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(s => ({
    slug: s.post.slug,
    title: s.post.title,
    reason: s.score > 0 ? `Shared tags: ${s.post.tags.filter(t => currentPost.tags.includes(t)).join(', ')}` : 'Related reading',
  }));
}
