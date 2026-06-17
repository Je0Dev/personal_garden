import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const theme = localStorage.getItem('theme');
if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  document.documentElement.classList.add('light');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
