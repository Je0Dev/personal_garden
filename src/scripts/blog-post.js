function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function initHeadingAnchors() {
  document.querySelectorAll('.markdown-body h2, .markdown-body h3').forEach(heading => {
    if (heading.querySelector('a.heading-anchor')) return;
    const text = heading.textContent || '';
    const slug = slugify(text);
    heading.id = slug;
    heading.classList.add('heading-anchor-wrapper');
    const anchor = document.createElement('a');
    anchor.href = `#${slug}`;
    anchor.className = 'heading-anchor';
    anchor.setAttribute('aria-hidden', 'true');
    anchor.textContent = '#';
    heading.prepend(anchor);
  });
}

function renderPreview(link, inner) {
  if (inner.dataset.rendered === 'true') return;
  const title = link.dataset.ogTitle;
  const desc = link.dataset.ogDescription;
  const img = link.dataset.ogImage;
  if (!title && !desc && !img) return;
  inner.dataset.rendered = 'true';
  const imgEl = img ? `<img class="link-preview-img" src="${img}" alt="" loading="lazy" />` : '';
  const titleEl = title ? `<span class="link-preview-title">${title}</span>` : '';
  const descEl = desc ? `<span class="link-preview-desc">${desc}</span>` : '';
  inner.insertAdjacentHTML('beforeend', `${imgEl}${titleEl}${descEl}`);
}

function initExternalLinkPreviews() {
  document.querySelectorAll('.markdown-body a[href^="http"]').forEach(link => {
    if (link.hostname === window.location.hostname) return;
    if (link.classList.contains('og-card-link')) return;
    if (link.querySelector('img')) return;

    const preview = document.createElement('div');
    preview.className = 'link-preview-popup';
    preview.innerHTML = `
      <div class="link-preview-inner">
        <span class="link-preview-domain">${link.hostname}</span>
        <span class="link-preview-url">${link.pathname}${link.search}</span>
      </div>
    `;
    link.style.position = 'relative';
    link.appendChild(preview);

    const inner = preview.querySelector('.link-preview-inner');
    let timeout;
    link.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        preview.classList.add('visible');
        renderPreview(link, inner);
      }, 400);
    });
    link.addEventListener('mouseleave', () => {
      clearTimeout(timeout);
      preview.classList.remove('visible');
    });
  });
}

function initMarkdownImages() {
  document.querySelectorAll('.markdown-body img').forEach(img => {
    img.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('openLightbox', {
        detail: { src: img.src, alt: img.alt || '', caption: img.alt || '' }
      }));
    });
  });
}

function initTooltips() {
  document.querySelectorAll('.markdown-body .glossary-tip').forEach((tip) => {
    if (tip.querySelector('.tip-card')) return;
    const definition = tip.getAttribute('data-tooltip') || '';
    if (!definition) return;

    const card = document.createElement('span');
    card.className = 'tip-card';
    card.textContent = definition;
    tip.appendChild(card);

    tip.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        document.querySelectorAll('.glossary-tip.active').forEach((t) => {
          if (t !== tip) t.classList.remove('active');
        });
        tip.classList.toggle('active');
      }
    });
  });
}

function initBlogPost() {
  initHeadingAnchors();
  initExternalLinkPreviews();
  initMarkdownImages();
  initTooltips();
}

document.addEventListener('astro:page-load', initBlogPost);
initBlogPost();
