// Phase 6 — Dynamic GIF hover previews
// Works for any element with a `data-gif` attribute (e.g. the CV button)
// and for links whose hostname matches GIF_MAP below.
const BASE = import.meta.env.BASE_URL;
const GIF_MAP = {
  'github.com': { src: `${BASE}gifs/transparent-demo.gif`, transparent: true },
  'developer.mozilla.org': { src: `${BASE}gifs/demo.gif`, transparent: false },
};

let preview = null;
let activeEl = null;
let lastEvent = { clientX: 0, clientY: 0 };

function ensurePreview() {
  if (preview) return preview;
  preview = document.createElement('img');
  preview.className = 'gif-hover-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.addEventListener('load', () => preview.classList.add('is-loaded'));
  document.body.appendChild(preview);
  return preview;
}

function positionPreview(e) {
  const pad = 16;
  const offset = 18;
  const rect = preview.getBoundingClientRect();
  let x = e.clientX + offset;
  let y = e.clientY + offset;
  if (x + rect.width > window.innerWidth - pad) x = e.clientX - rect.width - offset;
  if (y + rect.height > window.innerHeight - pad) y = e.clientY - rect.height - offset;
  preview.style.left = `${Math.max(pad, x)}px`;
  preview.style.top = `${Math.max(pad, y)}px`;
}

function showGif(el) {
  const src = el.getAttribute('data-gif');
  if (!src || activeEl === el) return;
  activeEl = el;
  const img = ensurePreview();
  img.classList.remove('is-loaded');
  img.classList.toggle('is-transparent', el.dataset.gifTransparent === 'true');
  img.src = src;
  positionPreview(lastEvent);
  img.classList.add('is-visible');
}

function hideGif() {
  if (!preview) return;
  preview.classList.remove('is-visible');
  activeEl = null;
}

function onMove(e) {
  lastEvent = e;
  if (preview && preview.classList.contains('is-visible')) positionPreview(e);
}

function resolveGif(el) {
  if (el.dataset.gif) {
    return { src: el.dataset.gif, transparent: el.dataset.gifTransparent === 'true' };
  }
  if (el.matches('a[href^="http"]')) {
    try {
      const host = new URL(el.href).hostname.replace(/^www\./, '');
      const entry = GIF_MAP[host];
      if (entry) {
        const src = typeof entry === 'string' ? entry : entry.src;
        const transparent = typeof entry === 'string' ? false : !!entry.transparent;
        return { src, transparent };
      }
    } catch { /* ignore */ }
  }
  return null;
}

function bind(el) {
  if (el.dataset.gifBound) return;
  const gif = resolveGif(el);
  if (!gif) return;
  el.dataset.gifBound = 'true';
  el.dataset.gif = gif.src;
  if (gif.transparent) el.dataset.gifTransparent = 'true';
  el.addEventListener('mouseenter', () => showGif(el));
  el.addEventListener('mouseleave', hideGif);
  el.addEventListener('focus', () => showGif(el));
  el.addEventListener('blur', hideGif);
}

function initGifHover() {
  document.querySelectorAll('a[href], [data-gif]').forEach(bind);
  if (!window.__gifMoveBound) {
    window.addEventListener('mousemove', onMove, { passive: true });
    window.__gifMoveBound = true;
  }
}

initGifHover();
document.addEventListener('astro:page-load', initGifHover);
