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

function initExternalLinkPreviews() {
  document.querySelectorAll('.markdown-body a[href^="http"]').forEach(link => {
    if (link.hostname === window.location.hostname) return;
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

    let timeout;
    link.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => preview.classList.add('visible'), 400);
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

function initBlogPost() {
  initHeadingAnchors();
  initExternalLinkPreviews();
  initMarkdownImages();
}

document.addEventListener('astro:page-load', initBlogPost);
initBlogPost();
