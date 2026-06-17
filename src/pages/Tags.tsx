import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { posts, getPostsByTag, getAllTags } from '../data/posts';
import { getTagColor } from '../data/tag-colors';
import PostCard from '../components/tags/PostCard';
import TagFilter from '../components/tags/TagFilter';

const oldBookImages = [
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/14298/perseus-gorgons.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/11021/fights-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/9859/atin-cymochles.jpg',
  'https://www.oldbookillustrations.com/site/assets/files/12863/reached-city.jpg',
];

const Tags = () => {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = getAllTags();

  useEffect(() => {
    if (tag) {
      const decodedTag = decodeURIComponent(tag);
      const normalizedTag = decodedTag.toLowerCase().replace(/-/g, ' ');
      const matchedTag = allTags.find(t => t.toLowerCase() === normalizedTag);
      if (matchedTag && !selectedTags.includes(matchedTag)) {
        setSelectedTags([matchedTag]);
      }
    }
  }, [tag, allTags]);

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => selectedTags.some(t => post.tags.includes(t)))
    : posts;

  const tagPostCounts = allTags.map(t => ({
    name: t,
    count: getPostsByTag(t).length,
    color: getTagColor(t),
  })).sort((a, b) => b.count - a.count);

  useEffect(() => {
    if (headerRef.current) headerRef.current.style.opacity = '1';
  }, []);

  const toggleTag = (tagToToggle: string) => {
    setSelectedTags(prev =>
      prev.includes(tagToToggle)
        ? prev.filter(t => t !== tagToToggle)
        : [...prev, tagToToggle]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
    if (tag) navigate('/tags');
  };

  const getTagsTitle = () => {
    if (selectedTags.length === 0) return null;
    return selectedTags.map((t, i) => (
      <span key={t}>
        {i > 0 && <span className="text-earth-muted"> / </span>}
        <span className={i === 0 ? 'text-tomato' : 'text-olive-light'}>{t}</span>
      </span>
    ));
  };

  return (
    <div className="pt-20 pb-16">
      <header ref={headerRef} className="pb-8 px-6 opacity-0 transition-opacity duration-500">
        <div className="max-w-wide mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center text-cream">
            <Link to="/tags" onClick={() => setSelectedTags([])} className="text-olive-light hover:text-tomato transition-colors">Tags</Link>
            {selectedTags.length > 0 && (
              <><span className="text-earth-muted mx-2">/</span>{getTagsTitle()}</>
            )}
          </h1>
          <p className="font-sans text-base text-earth-tan text-center max-w-2xl mx-auto mb-8">
            {selectedTags.length > 0
              ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} tagged with ${selectedTags.length === 1 ? `"${selectedTags[0]}"` : `"${selectedTags.join('" or "')}"`}`
              : 'Explore articles organized by topic and technology. Select multiple tags to filter.'}
          </p>
        </div>
      </header>

      <div className="px-6">
        <div className="max-w-wide mx-auto">
          <TagFilter tags={tagPostCounts} selectedTags={selectedTags} onToggleTag={toggleTag} onClearTags={clearTags} />

          <div className="mb-6 flex items-center justify-between">
            <p className="font-sans text-earth-muted">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              {selectedTags.length > 0 && ` matching ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} imageSrc={oldBookImages[index % oldBookImages.length]} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-earth-tan mb-4">No articles found with the selected tags.</p>
              <button onClick={clearTags} className="inline-flex items-center gap-2 text-olive-light hover:text-tomato transition-colors">
                <ArrowLeft className="w-4 h-4" />Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;
