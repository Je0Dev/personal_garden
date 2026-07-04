# .github/workflows/ — GitHub Actions CI/CD

- **`deploy.yml`** — GitHub Actions workflow that deploys the site to GitHub Pages. Triggers on push to main. Builds the project with `npm ci && npm run build` and deploys the `dist/` folder to the `gh-pages` branch.

Connects to: `package.json` (build script), GitHub Pages hosting configuration.
