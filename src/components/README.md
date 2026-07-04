# src/components/ — Reusable UI Components

- **`Toast.tsx`** — Toast notification system with success/info/error types. Used across pages for user feedback (e.g., "CV downloaded!").
- **`Lightbox.tsx`** — Full-screen image overlay for article galleries. Triggered by clicking gallery images in articles.
- **`MobileMenu.tsx`** — Slide-in mobile navigation drawer with `MobileMenuButton` export. Rendered conditionally in Header based on viewport.
- **`BackToTop.tsx`** — Scroll-to-top button that appears after scrolling down. Used globally in App.tsx layout.
- **`ReadingProgress.tsx`** — Progress bar at top of article pages indicating scroll completion. Used in Article page.
- **`ShareButtons.tsx`** — Social share buttons (copy link, Twitter, etc.) for articles. Used in Article page.
- **`ContactForm.tsx`** — Form component for the About page contact section. Handles form state and submission.
- **`Newsletter.tsx`** — Newsletter signup form embedded in articles. Uses Buttondown API integration.
- **`KeyboardShortcuts.tsx`** — Global keyboard navigation (`g h`, `g a`, `g p`, etc.). Mounted in App.tsx.
- **`KonamiEasterEgg.tsx`** — Konami code easter egg that triggers a special effect. Mounted in App.tsx.


Sub-directories: `article/`, `games/`, `languages/`, `projects/`, `tags/` for domain-specific components.

Connects to: `pages/` (pages render these components), `sections/` (shared UI).
