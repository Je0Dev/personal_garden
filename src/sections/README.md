# src/sections/ — Layout Sections

- **`Header.tsx`** — Responsive navigation bar with desktop/mobile menus, active route highlighting, and inline theme toggle. Rendered in App.tsx layout wrapper. Rolls into MobileMenu on small screens.
- **`Footer.tsx`** — Site footer with copyright and attribution links. Rendered in App.tsx layout wrapper.

Connects to: `src/App.tsx` (renders Header/Footer in layout), `src/components/MobileMenu.tsx` (used by Header).
