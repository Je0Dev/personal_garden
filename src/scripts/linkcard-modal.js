function ensureModal() {
  let el = document.getElementById('linkcard-modal');
  if (el) return el;
  el = document.createElement('div');
  el.id = 'linkcard-modal';
  el.className = 'linkcard-modal';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.hidden = true;
  el.innerHTML = `
    <div class="linkcard-modal-backdrop" data-close></div>
    <div class="linkcard-modal-panel" role="document">
      <button class="linkcard-modal-close" data-close aria-label="Close">×</button>
      <div class="linkcard-modal-media"></div>
      <div class="linkcard-modal-body markdown-body"></div>
      <a class="linkcard-modal-visit" target="_blank" rel="noopener">Visit site ↗</a>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  return el;
}

function closeModal() {
  const modal = document.getElementById('linkcard-modal');
  if (modal) modal.hidden = true;
  document.body.classList.remove('linkcard-modal-open');
}

function safeImg(src) {
  try {
    const u = new URL(src);
    return u.protocol === 'http:' || u.protocol === 'https:' ? src : '';
  } catch {
    return '';
  }
}

function openModal(card) {
  const modal = ensureModal();
  const wrap = card.closest('.og-card-wrap');
  const detail = wrap ? wrap.querySelector('.linkcard-detail') : null;
  const media = modal.querySelector('.linkcard-modal-media');
  const img = safeImg(card.dataset.ogImage || '');
  media.innerHTML = img ? `<img src="${img}" alt="" class="linkcard-modal-img" />` : '';
  const body = modal.querySelector('.linkcard-modal-body');
  body.innerHTML = '';
  const title = card.dataset.ogTitle || '';
  const desc = card.dataset.ogDescription || '';
  if (title) {
    const h = document.createElement('h3');
    h.className = 'linkcard-modal-title';
    h.textContent = title;
    body.appendChild(h);
  }
  if (desc) {
    const p = document.createElement('p');
    p.className = 'linkcard-modal-desc';
    p.textContent = desc;
    body.appendChild(p);
  }
  if (detail && detail.innerHTML.trim()) {
    const frag = document.createElement('div');
    frag.innerHTML = detail.innerHTML;
    while (frag.firstChild) body.appendChild(frag.firstChild);
  }
  const visit = modal.querySelector('.linkcard-modal-visit');
  visit.href = card.getAttribute('href') || '#';
  const domain = card.querySelector('.og-card-domain')?.textContent || 'site';
  visit.textContent = `Visit ${domain} ↗`;
  modal.hidden = false;
  document.body.classList.add('linkcard-modal-open');
}

function initLinkCardModals() {
  ensureModal();
  document.querySelectorAll('.markdown-body a.og-card-link').forEach((card) => {
    if (card.dataset.linkcardBound) return;
    card.dataset.linkcardBound = 'true';
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(card);
    });
  });
}

document.addEventListener('astro:page-load', initLinkCardModals);
initLinkCardModals();
