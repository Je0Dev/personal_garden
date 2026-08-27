# Agents

## File Line Limit
All source files (`.astro`, `.tsx`, `.ts`, `.css`, `.md`) must be **100-120 lines maximum**. This is a strict requirement for all files in the project.

When creating or modifying files:
- Keep each file between 100-120 lines
- If a file exceeds 120 lines, split it into smaller, focused modules
- Use imports/exports to compose functionality across multiple files
- Prefer composition over monolithic files

## Branching & PRs
Agents must **never push directly to `main`**. Always:
1. Create a new branch (`git checkout -b <branch-name>`)
2. Commit changes to that branch
3. Push the branch and open a PR for review

## Migration Notes
This project is being migrated from React+Vite to Astro 7.
Follow the MIGRATION_PLAN.md for implementation details.