# Changes that were made to the site
> as long as i remember to store them here 
## 2026-10-11 — tsconfig / VSCode fix

- Ran `npm install` — `node_modules` was missing, so `extends: "astro/tsconfigs/strict"` could not be resolved and VSCode showed the error.
- Verified `node_modules/astro/tsconfigs/strict.json` now exists.
- Removed `"extends"` from `tsconfig.json` and inlined all inherited options:
  - `target: ESNext`, `module: ESNext`, `moduleResolution: Bundler`
  - `allowImportingTsExtensions`, `resolveJsonModule`, `verbatimModuleSyntax`
  - `isolatedModules`, `noEmit`, `forceConsistentCasingInFileNames`
  - `esModuleInterop`, `skipLibCheck`, `allowJs`, `jsx: preserve`
  - `strict: true` (from `astro/tsconfigs/strict`)
  - kept `paths: { "@/*": ["./src/*"] }`
- Fixed `include`: `["src"]` → `[".astro/types.d.ts", "src"]` (the old value overwrote the base config's `include` and skipped Astro's generated types).
- Added `exclude: ["dist", "node_modules"]` (base config excluded `dist`).
- Verification: `npx tsc --noEmit` → exit code 0, no errors.
- Note: `npx astro sync` fails with an unrelated Vite error (`The specifiers must be a non-empty string. Received ""`); `.astro/types.d.ts` already exists, so it was not required for the fix.

## 2026-10-11 — npm audit vulnerabilities

- Ran `npm audit fix` (your session): cleared 6 of 20 issues → 14 left (4 low, 10 moderate).
- Root causes left:
  - `katex` — advisory GHSA-238p-pmpm-9mq7 covers `0.11.0 – 0.18.1`; every dependent (`rehype-katex`, `micromark-extension-math`, `remark-math`) pins `^0.16.x`, so npm could only pick a vulnerable version.
  - `postcss-selector-parser` — advisory GHSA-rj75-hqrm-r3gf (`<7.1.6`); pulled in via `postcss-nested@6` inside `@expressive-code/core`, which `npm audit fix --force` wanted to "fix" by downgrading `astro-expressive-code` from `0.44.1` to `0.34.2` (breaking — avoided).
- Changes to `package.json`:
  - dependency `katex`: `^0.16.44` → `^0.19.0`
  - added `overrides`: `{ "katex": "^0.19.0", "postcss-selector-parser": "^7.1.6" }` to force both past their vulnerable ranges without downgrading expressive-code.
- Verification:
  - `npm audit` → **0 vulnerabilities**
  - `npm run lint` (`tsc --noEmit`) → exit 0
  - `npm run build` → 55 pages built, exit 0
  - Checked output: math still renders (`class="katex"` in `dist/en/blog/phase-3-link-cards/`), expressive-code styles present (`dist/_astro/ec.*.css` has `.ec-` rules).
- Residual: these are build-time toolchain CVEs (your own content is the only input), so risk was low; the override to `postcss-selector-parser@7` is a major bump that npm's own suggested fix did not intend — worth watching if code-block styling ever looks off.
- Net result: 20 vulnerabilities → **0**, no dependency downgrades, site still builds.
