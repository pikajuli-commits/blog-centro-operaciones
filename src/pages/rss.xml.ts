import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const whatIf = await getCollection('what-if', ({ data }) => !data.draft);
  const economia = await getCollection('economia', ({ data }) => !data.draft);

  const allPosts = [...blog, ...whatIf, ...economia].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Centro de Operaciones',
    description: 'Economía, geopolítica y scripts What If. Análisis técnicos con modelos matemáticos.',
    site: context.site!,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.collection}/${post.id}/`,
    })),
    customData: `<language>es-es</language>`,
  });
}
