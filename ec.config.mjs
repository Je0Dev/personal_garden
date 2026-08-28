import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export const CODE_THEMES = [
  { id: 'github-light', label: 'GitHub Light' },
  { id: 'vitesse-dark', label: 'Vitesse Dark' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'catppuccin-mocha', label: 'Catppuccin' },
];

export default defineEcConfig({
  themes: CODE_THEMES.map((t) => t.id),
  useDarkModeMediaQuery: false,
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontSize: '0.9rem',
    borderWidth: '1px',
    borderColor: 'var(--clr-moss)',
    borderRadius: '0.5rem',
  },
});
