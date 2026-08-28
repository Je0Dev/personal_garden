# Phase 5 — i18n + Pinyin Ruby (Implementation Plan)

> **Status:** Planning complete. Awaiting approval before implementation.
> **Goal:** Add full internationalization (EN/DE/ZH) to the entire UI, content, search, tags, and player components. Plus pinyin ruby annotations for Chinese text.

---

## Scope Summary

| Area | Scope |
|------|-------|
| **Core UI** | Navigation, page titles, buttons, search, errors, breadcrumbs |
| **Player UI** | SubtitlePlayer, MiningTray, Transcript, GitHubCalendar labels |
| **Page Content** | Home, About, Post listing pages (translated markdown per locale) |
| **Tag System** | Translation map for tags per locale |
| **Pinyin Ruby** | `:zh[你好]{pinyin="nǐ hǎo"}` → `<ruby>你好<rt>nǐ hǎo</rt></ruby>` |
| **Skip for now** | Code theme labels, meta keywords (stay English) |

---

## URL Structure

| Page | EN | DE | ZH |
|------|-----|-----|-----|
| Home | `/personal_garden/en/` | `/personal_garden/de/` | `/personal_garden/zh/` |
| About | `/personal_garden/en/about/` | `/personal_garden/de/about/` | `/personal_garden/zh/about/` |
| Blog | `/personal_garden/en/blog/` | `/personal_garden/de/blog/` | `/personal_garden/zh/blog/` |
| Post | `/personal_garden/en/blog/phase-5-i18n/` | `/personal_garden/de/blog/phase-5-i18n/` | `/personal_garden/zh/blog/phase-5-i18n/` |
| Tag | `/personal_garden/en/blog/tag/development/` | `/personal_garden/de/blog/tag/entwicklung/` | `/personal_garden/zh/blog/tag/开发/` |

`prefixDefaultLocale: false` → `/personal_garden/en/` is canonical, not `/personal_garden/`.

---

## New Files (14 files)

| # | File | Purpose |
|---|------|---------|
| 1 | `src/i18n/ui.ts` | ~120 translation keys across EN/DE/ZH |
| 2 | `src/i18n/utils.ts` | `getLangFromUrl`, `useTranslations`, `useTranslatedPath` |
| 3 | `src/i18n/tags.ts` | Tag translation map: `{ development: { de: 'Entwicklung', zh: '开发' } }` |
| 4 | `src/lib/pinyin-utils.ts` | Pinyin generation via `pinyin-pro` |
| 5 | `src/lib/remark-ruby.mjs` | Remark plugin for `:zh[...]{pinyin="..."}` → `<ruby>` |
| 6 | `src/components/LanguageSwitcher.astro` | Button group: `EN | DE | 中文` |
| 7 | `src/pages/[lang]/index.astro` | Locale-aware home page |
| 8 | `src/pages/[lang]/about.astro` | Locale-aware about page |
| 9 | `src/pages/[lang]/blog/index.astro` | Locale-aware blog listing |
| 10 | `src/pages/[lang]/blog/[...slug].astro` | Locale-aware blog post |
| 11 | `src/pages/[lang]/blog/tag/[tag].astro` | Locale-aware tag archive |
| 12 | `src/content/en/pages/home-page.md` | English home content |
| 13 | `src/content/de/pages/home-page.md` | German home content |
| 14 | `src/content/zh/pages/home-page.md` | Chinese home content |

*(Plus `about-page.md` and `post-page.md` for each locale — 9 page content files total)*

---

## Files to Modify (22 files)

### Config & Schema
| File | Changes |
|------|---------|
| `astro.config.mjs` | Add `i18n` block, add `remarkRuby` plugin |
| `src/content.config.ts` | Glob `*/*.md`, add `lang` field to schema |

### Layouts
| File | Changes |
|------|---------|
| `src/layouts/BaseLayout.astro` | Dynamic `lang={getLangFromUrl(Astro.url)}`, use `t()` for meta |
| `src/layouts/BlogPostLayout.astro` | Locale-aware date, breadcrumbs, "min read" |

### Components (Core UI)
| File | Strings to Translate |
|------|---------------------|
| `src/components/Header.astro` | "blog", "about", "CV", "Download CV", "Search", aria-labels |
| `src/components/MobileMenu.astro` | "Home", "Blog", "About", "Close menu", "Cosmos — by George" |
| `src/components/Footer.astro` | "All rights reserved.", social link labels |
| `src/components/ArticleNav.astro` | "Previous", "Next" |
| `src/components/ShareButtons.astro` | "Share", "Share on X", "Copy link", "Sharing is caring!" |
| `src/components/PostDownloads.astro` | "Downloads" |
| `src/components/TableOfContents.astro` | "Contents" |
| `src/components/RelatedPosts.astro` | "Related Reading" |
| `src/components/BackToTop.astro` | "Back to top" aria-label |
| `src/components/Lightbox.astro` | "Close lightbox", "Press ESC or click outside to close" |
| `src/components/KeyboardShortcuts.astro` | All shortcut descriptions, "Keyboard Shortcuts" |
| `src/components/PostCard.astro` | `'en-US'` → dynamic locale |
| `src/components/PdfEmbed.astro` | "PDF preview", "Open in new tab ↗" |
| `src/components/VideoPlayer.astro` | "Your browser does not support the video tag." |
| `src/components/BilibiliEmbed.astro` | "Bilibili video" |

### Components (Search)
| File | Strings to Translate |
|------|---------------------|
| `src/components/SearchOverlay.tsx` | Popular tags, "Search unavailable" |
| `src/components/SearchInput.tsx` | Placeholder, "Loading…", "Clear search", "ESC" |
| `src/components/SearchResults.tsx` | "No results found" |
| `src/components/SearchSuggestions.tsx` | "Recent", "Tags", "Regex supported" |
| `src/components/SearchFooter.tsx` | "↑↓ navigate", "↵ open", "esc close", "results" |
| `src/components/SearchTypeFilter.tsx` | "All", "Posts", "Tags", pluralization |

### Components (Player)
| File | Strings to Translate |
|------|---------------------|
| `src/components/SubtitlePlayer.tsx` | "Pinyin", "Word-by-word", "Traditional", "Levels", "Focus", "Jump to current", "Import .srt/.vtt", level labels |
| `src/components/MiningTray.tsx` | "Mined", "Copy all", "Clear", "Remove" |
| `src/components/Transcript.tsx` | "No subtitles loaded." |
| `src/components/GitHubCalendar.tsx` | "Contributions", "Public Repos", "Followers", "Following", error/loading |

### Pages
| File | Changes |
|------|---------|
| `src/pages/404.astro` | All error text |
| `src/pages/blog/index.astro` | "Blog", "Filtered by:", "Posts", pluralization, empty state |
| `src/pages/blog/tag/[tag].astro` | Breadcrumbs, pluralization, empty state |
| `src/pages/drafts/index.astro` | "Draft Preview", "Dev-only view" |

### Scripts
| File | Changes |
|------|---------|
| `src/scripts/tag-filter.js` | "Filtered by:", pluralization |
| `src/scripts/linkcard-modal.js` | "Close", "Visit site ↗" |

---

## Translation Key Structure (~120 keys)

```typescript
// src/i18n/ui.ts
export const ui = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'blog',
    'nav.about': 'about',
    'nav.cv': 'CV',
    'nav.search': 'Search',

    // Home page
    'home.title': 'Home',
    'home.readPosts': 'Read the Posts',
    'home.downloadCv': 'Download CV',
    'home.recentWriting': 'Recent Writing',
    'home.browseByTopic': 'Browse by Topic',

    // Blog
    'blog.title': 'Blog',
    'blog.contents': 'Contents',
    'blog.relatedReading': 'Related Reading',
    'blog.minRead': 'min read',
    'blog.previous': 'Previous',
    'blog.next': 'Next',
    'blog.share': 'Share',
    'blog.shareOnX': 'Share on X',
    'blog.shareOnLinkedIn': 'Share on LinkedIn',
    'blog.copyLink': 'Copy link',
    'blog.downloads': 'Downloads',
    'blog.filteredBy': 'Filtered by:',
    'blog.noArticles': 'No articles found with the selected tags.',
    'blog.clearFilters': 'Clear filters',
    'blog.article': 'article',
    'blog.articles': 'articles',

    // About
    'about.title': 'About',
    'about.articles': 'Articles',
    'about.languagesAbsorbed': 'Languages Absorbed',
    'about.githubActivity': 'GitHub Activity',

    // Search
    'search.placeholder': 'Search posts and tags…',
    'search.loading': 'Loading…',
    'search.clear': 'Clear search',
    'search.unavailable': 'Search unavailable — try refreshing.',
    'search.noResults': 'No results found',
    'search.recent': 'Recent',
    'search.tags': 'Tags',
    'search.regexHint': 'Regex supported — try',
    'search.navigate': '↑↓ navigate',
    'search.open': '↵ open',
    'search.close': 'esc close',
    'search.results': 'results',
    'search.regexFuzzy': 'regex + fuzzy',
    'search.all': 'All',
    'search.posts': 'Posts',
    'search.result': 'result',
    'search.resultsPlural': 'results',

    // Player
    'player.pinyin': 'Pinyin',
    'player.wordByWord': 'Word-by-word',
    'player.traditional': 'Traditional',
    'player.levels': 'Levels',
    'player.focus': 'Focus',
    'player.jumpToCurrent': 'Jump to current',
    'player.importSubtitles': 'Import .srt/.vtt',
    'player.fontSize': 'Font size',
    'player.mined': 'Mined',
    'player.copyAll': 'Copy all',
    'player.clear': 'Clear',
    'player.remove': 'Remove',
    'player.noSubtitles': 'No subtitles loaded.',

    // GitHub
    'github.contributions': 'Contributions',
    'github.publicRepos': 'Public Repos',
    'github.followers': 'Followers',
    'github.following': 'Following',
    'github.loading': 'Loading contributions...',
    'github.error': 'Could not load GitHub contribution data.',

    // Errors
    'error.title': 'Lost in the Archives',
    'error.description': "The page you're looking for seems to have wandered off.",
    'error.backHome': 'Back to Home',
    'error.browsePosts': 'Browse Posts',
    'error.quote': 'Not all those who wander are lost',

    // UI
    'ui.skipToContent': 'Skip to main content',
    'ui.close': 'Close',
    'ui.closeMenu': 'Close menu',
    'ui.openMenu': 'Open menu',
    'ui.toggleTheme': 'Toggle theme',
    'ui.codeTheme': 'Code block theme',
    'ui.backToTop': 'Back to top',
    'ui.closeLightbox': 'Close lightbox',
    'ui.lightboxHint': 'Press ESC or click outside to close',
    'ui.keyboardShortcuts': 'Keyboard Shortcuts',
    'ui.press': 'Press',
    'ui.toToggle': 'to toggle this panel',
    'ui.visitedSite': 'Visit site ↗',

    // Footer
    'footer.copyright': '© 2024 George Mastrogiannis. All rights reserved.',
    'footer.builtWith': 'Built with Astro.',

    // Drafts
    'drafts.title': 'Draft Preview',
    'drafts.devOnly': 'Dev-only view.',
    'drafts.draft': 'draft',
    'drafts.drafts': 'drafts',
    'drafts.notShown': 'not shown publicly.',
    'drafts.noDrafts': 'No drafts right now.',
    'drafts.add': 'Add',
    'drafts.toFrontmatter': "to a post's frontmatter.",

    // Toast
    'toast.sharing': 'Sharing is caring!',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.blog': 'Blog',
    'nav.about': 'Über',
    'nav.cv': 'Lebenslauf',
    'nav.search': 'Suche',

    // Home page
    'home.title': 'Startseite',
    'home.readPosts': 'Beiträge lesen',
    'home.downloadCv': 'Lebenslauf herunterladen',
    'home.recentWriting': 'Neueste Beiträge',
    'home.browseByTopic': 'Nach Thema durchsuchen',

    // Blog
    'blog.title': 'Blog',
    'blog.contents': 'Inhaltsverzeichnis',
    'blog.relatedReading': 'Weiterführende Lektüre',
    'blog.minRead': 'Min. Lesezeit',
    'blog.previous': 'Zurück',
    'blog.next': 'Weiter',
    'blog.share': 'Teilen',
    'blog.shareOnX': 'Auf X teilen',
    'blog.shareOnLinkedIn': 'Auf LinkedIn teilen',
    'blog.copyLink': 'Link kopieren',
    'blog.downloads': 'Downloads',
    'blog.filteredBy': 'Gefiltert nach:',
    'blog.noArticles': 'Keine Artikel mit den ausgewählten Tags gefunden.',
    'blog.clearFilters': 'Filter löschen',
    'blog.article': 'Artikel',
    'blog.articles': 'Artikel',

    // About
    'about.title': 'Über',
    'about.articles': 'Artikel',
    'about.languagesAbsorbed': 'Absorbierte Sprachen',
    'about.githubActivity': 'GitHub-Aktivität',

    // Search
    'search.placeholder': 'Beiträge und Tags suchen…',
    'search.loading': 'Laden…',
    'search.clear': 'Suche löschen',
    'search.unavailable': 'Suche nicht verfügbar — bitte aktualisieren.',
    'search.noResults': 'Keine Ergebnisse gefunden',
    'search.recent': 'Kürzlich',
    'search.tags': 'Tags',
    'search.regexHint': 'Regex unterstützt — versuche',
    'search.navigate': '↑↓ navigieren',
    'search.open': '↵ öffnen',
    'search.close': 'esc schließen',
    'search.results': 'Ergebnisse',
    'search.regexFuzzy': 'regex + fuzzy',
    'search.all': 'Alle',
    'search.posts': 'Beiträge',
    'search.result': 'Ergebnis',
    'search.resultsPlural': 'Ergebnisse',

    // Player
    'player.pinyin': 'Pinyin',
    'player.wordByWord': 'Wort für Wort',
    'player.traditional': 'Traditionell',
    'player.levels': 'Stufen',
    'player.focus': 'Fokus',
    'player.jumpToCurrent': 'Zum aktuellen springen',
    'player.importSubtitles': 'SRT/VTT importieren',
    'player.fontSize': 'Schriftgröße',
    'player.mined': 'Gefördert',
    'player.copyAll': 'Alle kopieren',
    'player.clear': 'Löschen',
    'player.remove': 'Entfernen',
    'player.noSubtitles': 'Keine Untertitel geladen.',

    // GitHub
    'github.contributions': 'Beiträge',
    'github.publicRepos': 'Öffentliche Repos',
    'github.followers': 'Follower',
    'github.following': 'Folgt',
    'github.loading': 'Lade Beiträge...',
    'github.error': 'GitHub-Beitragsdaten konnten nicht geladen werden.',

    // Errors
    'error.title': 'In den Archiven verirrt',
    'error.description': 'Die gesuchte Seite scheint verschwunden zu sein.',
    'error.backHome': 'Zurück zur Startseite',
    'error.browsePosts': 'Beiträge durchsuchen',
    'error.quote': 'Nicht alle, die umherwandern, sind verloren',

    // UI
    'ui.skipToContent': 'Zum Hauptinhalt springen',
    'ui.close': 'Schließen',
    'ui.closeMenu': 'Menü schließen',
    'ui.openMenu': 'Menü öffnen',
    'ui.toggleTheme': 'Design umschalten',
    'ui.codeTheme': 'Code-Block-Design',
    'ui.backToTop': 'Nach oben',
    'ui.closeLightbox': 'Lightbox schließen',
    'ui.lightboxHint': 'ESC drücken oder außerhalb klicken zum Schließen',
    'ui.keyboardShortcuts': 'Tastaturkürzel',
    'ui.press': 'Drücke',
    'ui.toToggle': 'um dieses Panel umzuschalten',
    'ui.visitedSite': 'Seite besuchen ↗',

    // Footer
    'footer.copyright': '© 2024 George Mastrogiannis. Alle Rechte vorbehalten.',
    'footer.builtWith': 'Erstellt mit Astro.',

    // Drafts
    'drafts.title': 'Entwurf-Vorschau',
    'drafts.devOnly': 'Nur für Entwickler.',
    'drafts.draft': 'Entwurf',
    'drafts.drafts': 'Entwürfe',
    'drafts.notShown': 'nicht öffentlich sichtbar.',
    'drafts.noDrafts': 'Keine Entwürfe im Moment.',
    'drafts.add': 'Füge',
    'drafts.toFrontmatter': 'zu den Frontmatter eines Beitrags hinzu.',

    // Toast
    'toast.sharing': 'Teilen ist caring!',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.about': '关于',
    'nav.cv': '简历',
    'nav.search': '搜索',

    // Home page
    'home.title': '首页',
    'home.readPosts': '阅读文章',
    'home.downloadCv': '下载简历',
    'home.recentWriting': '最新文章',
    'home.browseByTopic': '按主题浏览',

    // Blog
    'blog.title': '博客',
    'blog.contents': '目录',
    'blog.relatedReading': '相关阅读',
    'blog.minRead': '分钟阅读',
    'blog.previous': '上一篇',
    'blog.next': '下一篇',
    'blog.share': '分享',
    'blog.shareOnX': '在 X 上分享',
    'blog.shareOnLinkedIn': '在 LinkedIn 上分享',
    'blog.copyLink': '复制链接',
    'blog.downloads': '下载',
    'blog.filteredBy': '筛选条件：',
    'blog.noArticles': '未找到包含所选标签的文章。',
    'blog.clearFilters': '清除筛选',
    'blog.article': '篇文章',
    'blog.articles': '篇文章',

    // About
    'about.title': '关于',
    'about.articles': '文章',
    'about.languagesAbsorbed': '已吸收的语言',
    'about.githubActivity': 'GitHub 活动',

    // Search
    'search.placeholder': '搜索文章和标签…',
    'search.loading': '加载中…',
    'search.clear': '清除搜索',
    'search.unavailable': '搜索不可用 — 请刷新重试。',
    'search.noResults': '未找到结果',
    'search.recent': '最近',
    'search.tags': '标签',
    'search.regexHint': '支持正则表达式 — 试试',
    'search.navigate': '↑↓ 导航',
    'search.open': '↵ 打开',
    'search.close': 'esc 关闭',
    'search.results': '结果',
    'search.regexFuzzy': '正则 + 模糊',
    'search.all': '全部',
    'search.posts': '文章',
    'search.result': '结果',
    'search.resultsPlural': '结果',

    // Player
    'player.pinyin': '拼音',
    'player.wordByWord': '逐词',
    'player.traditional': '繁体',
    'player.levels': '等级',
    'player.focus': '聚焦',
    'player.jumpToCurrent': '跳到当前',
    'player.importSubtitles': '导入 .srt/.vtt',
    'player.fontSize': '字体大小',
    'player.mined': '已 mining',
    'player.copyAll': '复制全部',
    'player.clear': '清除',
    'player.remove': '移除',
    'player.noSubtitles': '未加载字幕。',

    // GitHub
    'github.contributions': '贡献',
    'github.publicRepos': '公开仓库',
    'github.followers': '粉丝',
    'github.following': '关注',
    'github.loading': '加载贡献中...',
    'github.error': '无法加载 GitHub 贡献数据。',

    // Errors
    'error.title': '迷失在档案中',
    'error.description': '您寻找的页面似乎已经走失了。',
    'error.backHome': '返回首页',
    'error.browsePosts': '浏览文章',
    'error.quote': '并非所有流浪者都迷失了',

    // UI
    'ui.skipToContent': '跳到主要内容',
    'ui.close': '关闭',
    'ui.closeMenu': '关闭菜单',
    'ui.openMenu': '打开菜单',
    'ui.toggleTheme': '切换主题',
    'ui.codeTheme': '代码块主题',
    'ui.backToTop': '回到顶部',
    'ui.closeLightbox': '关闭灯箱',
    'ui.lightboxHint': '按 ESC 或点击外部关闭',
    'ui.keyboardShortcuts': '键盘快捷键',
    'ui.press': '按',
    'ui.toToggle': '切换此面板',
    'ui.visitedSite': '访问网站 ↗',

    // Footer
    'footer.copyright': '© 2024 George Mastrogiannis. 保留所有权利。',
    'footer.builtWith': '使用 Astro 构建。',

    // Drafts
    'drafts.title': '草稿预览',
    'drafts.devOnly': '仅开发者可见。',
    'drafts.draft': '草稿',
    'drafts.drafts': '草稿',
    'drafts.notShown': '不公开显示。',
    'drafts.noDrafts': '目前没有草稿。',
    'drafts.add': '添加',
    'drafts.toFrontmatter': '到文章的 frontmatter。',

    // Toast
    'toast.sharing': '分享是一种关爱！',
  },
} as const;

export type Locale = keyof typeof ui;
export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'de', 'zh'];
```

---

## Helper Functions

```typescript
// src/i18n/utils.ts
import { ui, defaultLocale, type Locale } from './ui';

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof typeof ui[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key];
  };
}

export function useTranslatedPath(lang: Locale) {
  return function path(p: string) {
    return `/${lang}/${p}`;
  };
}
```

---

## Tag Translation Map

```typescript
// src/i18n/tags.ts
export const tagTranslations: Record<string, { en: string; de: string; zh: string }> = {
  'development': { en: 'development', de: 'Entwicklung', zh: '开发' },
  'programming': { en: 'programming', de: 'Programmierung', zh: '编程' },
  'web-dev': { en: 'web-dev', de: 'Web-Entwicklung', zh: '网页开发' },
  'language-learning': { en: 'language-learning', de: 'Sprachenlernen', zh: '语言学习' },
  'anki': { en: 'anki', de: 'Anki', zh: 'Anki' },
  'chinese': { en: 'chinese', de: 'Chinesisch', zh: '中文' },
  'hardware': { en: 'hardware', de: 'Hardware', zh: '硬件' },
  'electronics': { en: 'electronics', de: 'Elektronik', zh: '电子' },
  'personal': { en: 'personal', de: 'Persönlich', zh: '个人' },
  'i18n': { en: 'i18n', de: 'i18n', zh: '国际化' },
  'pinyin': { en: 'pinyin', de: 'Pinyin', zh: '拼音' },
  'localization': { en: 'localization', de: 'Lokalisierung', zh: '本地化' },
  // ... add all tags
};

export function getTranslatedTag(tag: string, lang: Locale): string {
  return tagTranslations[tag]?.[lang] || tag;
}
```

---

## Pinyin Ruby Support

```markdown
# Syntax
:zh[你好世界]{pinyin="nǐ hǎo shì jiè"}

# Output
<ruby>你好世界<rt>nǐ hǎo shì jiè</rt></ruby>
```

```typescript
// src/lib/pinyin-utils.ts
import { pinyin } from 'pinyin-pro';

export function generatePinyin(text: string): string {
  return pinyin(text, { toneType: 'symbol', type: 'string' });
}

export function generateRubyHtml(text: string, pinyinText?: string): string {
  const ruby = pinyinText || generatePinyin(text);
  return `<ruby>${text}<rt>${ruby}</rt></ruby>`;
}
```

```javascript
// src/lib/remark-ruby.mjs
import { visit } from 'unist-util-visit';

export function remarkRuby() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'zh') return;
      const text = node.children[0]?.value || '';
      const pinyinAttr = node.attributes?.pinyin || '';
      const rubyHtml = `<ruby>${text}<rt>${pinyinAttr}</rt></ruby>`;
      node.type = 'html';
      node.value = rubyHtml;
    });
  };
}
```

---

## Astro Config Changes

```javascript
// astro.config.mjs
export default defineConfig({
  // ... existing config
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'zh'],
    prefixDefaultLocale: false,
  },
  markdown: {
    processor: unified({
      remarkPlugins: [/* existing */, remarkRuby],
      // ...
    }),
  },
});
```

---

## Content Directory Structure

```
src/content/
├── en/
│   ├── blog/          # English posts (move existing)
│   └── pages/
│       ├── home-page.md
│       ├── about-page.md
│       └── post-page.md
├── de/
│   ├── blog/          # German posts
│   └── pages/
│       ├── home-page.md
│       ├── about-page.md
│       └── post-page.md
└── zh/
    ├── blog/          # Chinese posts
    └── pages/
        ├── home-page.md
        ├── about-page.md
        └── post-page.md
```

---

## Implementation Order

1. **i18n infrastructure** — `ui.ts`, `utils.ts`, `tags.ts`
2. **Astro config** — Add `i18n` block, `remarkRuby` plugin
3. **Content restructure** — Move to `en/`, `de/`, `zh/` directories
4. **BaseLayout** — Dynamic `lang` attribute
5. **LanguageSwitcher** — Button group component
6. **Header/MobileMenu** — Navigation translation
7. **Pages** — Home, About, Blog, Tag, 404
8. **BlogPostLayout** — Date, breadcrumbs, labels
9. **Search components** — All 7 search components
10. **Player components** — SubtitlePlayer, MiningTray, Transcript, GitHubCalendar
11. **Other components** — ShareButtons, TOC, RelatedPosts, etc.
12. **Scripts** — tag-filter.js, linkcard-modal.js
13. **Pinyin** — remark-ruby.mjs, pinyin-utils.ts
14. **Test post** — Create phase-5-i18n.md in all 3 locales

---

## New Dependencies

```bash
npm install pinyin-pro
```

---

## Testing Checklist

- [ ] Language switcher toggles EN/DE/ZH
- [ ] URLs include locale prefix
- [ ] All UI strings translate
- [ ] Date formatting changes with locale
- [ ] Tags display in locale language
- [ ] Search works with translated tags
- [ ] Pinyin ruby renders for Chinese
- [ ] Player UI translates
- [ ] 404 page in correct locale
- [ ] Breadcrumbs use translated labels
- [ ] Meta tags in correct language
- [ ] Content pages translated
- [ ] Pluralization works ("1 article" / "2 articles")

---

## Notes

1. **File Line Limit**: All source files must stay 100-120 lines per `AGENTS.md`
2. **Backward Compatibility**: Existing `/personal_garden/blog/` should redirect to `/personal_garden/en/blog/`
3. **Fallback**: If a post doesn't exist in a locale, fall back to English
4. **Content Translation**: Initially only English; DE/ZH posts added later
5. **Performance**: Pinyin generation at build time, not runtime
