import Fuse from 'fuse.js';

export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  body?: string;
}

export interface TagItem {
  id: string;
  name: string;
}

const fuseKeys = [
  { name: 'title', weight: 0.4 },
  { name: 'tags', weight: 0.3 },
  { name: 'description', weight: 0.2 },
  { name: 'body', weight: 0.1 },
];

export function createPostFuse(data: SearchIndexItem[]): Fuse<SearchIndexItem> {
  return new Fuse(data, {
    keys: fuseKeys,
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}

export function createTagFuse(tags: string[]): Fuse<TagItem> {
  const items = tags.map(name => ({ id: name, name }));
  return new Fuse(items, {
    keys: ['name'],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}
