// Expressive Code configuration: sets syntax highlighting themes, line number plugin, and style overrides for code blocks.
import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  themes: ['github-light', 'vitesse-dark'],
  useDarkModeMediaQuery: false,
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontSize: '0.9rem',
    borderWidth: '1px',
    borderColor: 'var(--clr-moss)',
    borderRadius: '0.5rem',
  },
});
