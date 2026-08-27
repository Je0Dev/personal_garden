export function initTagFilters() {
  const selectedTags = new Set();
  const tagBtns = document.querySelectorAll('.tag-filter-btn');
  const postCards = document.querySelectorAll('.post-card');
  const activeTagsEl = document.getElementById('active-tags');
  const noResults = document.getElementById('no-results');
  const postCount = document.getElementById('post-count');
  const clearBtn = document.getElementById('clear-filters');

  function updateFilter() {
    let visible = 0;
    postCards.forEach(card => {
      const tags = JSON.parse(card.dataset.tags || '[]');
      const match = selectedTags.size === 0 || tags.some(t => selectedTags.has(t));
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    tagBtns.forEach(btn => {
      const tag = btn.dataset.tag || '';
      btn.classList.toggle('border-olive-light', selectedTags.has(tag));
      btn.classList.toggle('bg-deep-sage', selectedTags.has(tag));
    });

    activeTagsEl?.classList.toggle('hidden', selectedTags.size === 0);
    if (activeTagsEl) {
      activeTagsEl.innerHTML = '<span class="text-xs text-earth-muted font-sans">Filtered by:</span>';
      selectedTags.forEach(tag => {
        activeTagsEl.innerHTML += `<button class="active-tag text-xs font-mono px-2 py-1 bg-olive/20 text-olive-light hover:bg-tomato/20 hover:text-tomato transition-colors" data-tag="${tag}">#${tag} ×</button>`;
      });
    }

    noResults?.classList.toggle('hidden', visible > 0);
    if (postCount) postCount.textContent = `${visible} article${visible !== 1 ? 's' : ''}`;

    const params = new URLSearchParams(window.location.search);
    params.delete('tag');
    selectedTags.forEach(tag => params.append('tag', tag));
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    history.replaceState(null, '', newUrl);
  }

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.getAll('tag').forEach(tag => {
    if (tag) selectedTags.add(tag);
  });
  if (selectedTags.size > 0) updateFilter();

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag || '';
      if (selectedTags.has(tag)) selectedTags.delete(tag);
      else selectedTags.add(tag);
      updateFilter();
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('active-tag')) {
      const tag = target.dataset.tag || '';
      selectedTags.delete(tag);
      updateFilter();
    }
    if (target.classList.contains('post-tag')) {
      e.preventDefault();
      e.stopPropagation();
      const tag = target.dataset.tag || '';
      if (tag) {
        if (selectedTags.has(tag)) selectedTags.delete(tag);
        else selectedTags.add(tag);
        updateFilter();
      }
    }
  });

  clearBtn?.addEventListener('click', () => {
    selectedTags.clear();
    updateFilter();
  });
}
