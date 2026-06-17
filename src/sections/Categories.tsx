import { Link } from 'react-router-dom';
import { posts } from '../data/posts';

const Categories = () => {
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  return (
    <section className="pt-16 pb-12">
      <div className="max-w-prose mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-cream mb-4">
          Browse by Topic
        </h2>
        <p className="font-sans text-earth-tan mb-12">
          Explore writings organized by theme and subject.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allTags.map((tag) => {
            const count = posts.filter(p => p.tags.includes(tag)).length;
            return (
              <Link
                key={tag}
                to={`/tags/${encodeURIComponent(tag)}`}
                className="block bg-deep-forest border border-moss rounded-lg p-6 hover:bg-deep-sage transition-colors duration-200 no-underline"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-cream">{tag}</span>
                  <span className="font-sans text-earth-tan">{count}</span>
                </div>
                <p className="font-sans text-earth-muted text-sm">
                  {count} post{count !== 1 ? 's' : ''}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
