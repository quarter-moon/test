/* Pavé Theme JS */
(function () {
  'use strict';

  /* ─── Utility ─── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

  /* ─── Cart state ─── */
  let cartDrawerOpen = false;

  /* ─── Announcement dismiss ─── */
  window.paveDismissAnnouncement = function (el) {
    const bar = el.closest('.pave-announcement');
    if (bar) {
      bar.style.maxHeight = bar.offsetHeight + 'px';
      requestAnimationFrame(() => {
        bar.style.transition = 'max-height .3s ease, opacity .3s ease';
        bar.style.maxHeight = '0';
        bar.style.opacity = '0';
      });
      sessionStorage.setItem('pave-ann-dismissed', '1');
    }
  };

  /* ─── Search overlay ─── */
  window.paveOpenSearch = function () {
    const el = $('#pave-search-overlay');
    if (!el) return;
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const inp = el.querySelector('input[type="search"]');
    if (inp) setTimeout(() => inp.focus(), 120);
  };

  window.paveCloseSearch = function () {
    const el = $('#pave-search-overlay');
    if (!el) return;
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  /* ─── Mobile nav ─── */
  window.paveOpenNav = function () {
    const el = $('#pave-mobile-nav');
    if (!el) return;
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.paveCloseNav = function () {
    const el = $('#pave-mobile-nav');
    if (!el) return;
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  /* ─── Cart drawer ─── */
  window.paveOpenCart = function () {
    const el = $('#pave-cart-overlay');
    if (!el) return;
    el.classList.add('is-open');
    cartDrawerOpen = true;
    document.body.style.overflow = 'hidden';
    paveRefreshCart();
  };

  window.paveCloseCart = function () {
    const el = $('#pave-cart-overlay');
    if (!el) return;
    el.classList.remove('is-open');
    cartDrawerOpen = false;
    document.body.style.overflow = '';
  };

  function paveRefreshCart() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
        paveUpdateCartBadge(cart.item_count);
        paveRenderCartItems(cart);
      })
      .catch(() => {});
  }

  function paveUpdateCartBadge(count) {
    $$('.pave-cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function paveRenderCartItems(cart) {
    const itemsEl = $('#pave-cart-items');
    const totalEl = $('#pave-cart-total');
    const emptyEl = $('#pave-cart-empty');
    const filledEl = $('#pave-cart-filled');

    if (!itemsEl) return;

    if (totalEl) {
      totalEl.textContent = paveMoney(cart.total_price);
    }

    if (cart.item_count === 0) {
      if (emptyEl) emptyEl.style.display = '';
      if (filledEl) filledEl.style.display = 'none';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (filledEl) filledEl.style.display = '';

    itemsEl.innerHTML = cart.items.map(item => `
      <div class="pave-cart-item" data-key="${item.key}">
        <a href="${item.url}" style="width:72px;flex-shrink:0;border-radius:var(--pave-radius-card);overflow:hidden;border:1px solid var(--divider);display:block;">
          ${item.image
            ? `<img src="${item.image}" alt="${escapeHtml(item.title)}" width="72" height="72" style="width:100%;height:100%;object-fit:cover;">`
            : '<div style="width:72px;height:72px;background:var(--surface);"></div>'}
        </a>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(item.product_title)}</div>
          ${item.variant_title && item.variant_title !== 'Default Title' ? `<div style="font-size:11px;color:var(--ink-soft);margin-top:2px;">${escapeHtml(item.variant_title)}</div>` : ''}
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
            <div class="pave-qty" style="--qty-h:28px;">
              <button class="pave-qty__btn" onclick="paveCartUpdateQty('${item.key}', ${item.quantity - 1})" style="font-size:12px;">−</button>
              <span class="pave-qty__val" style="font-size:12px;">${item.quantity}</span>
              <button class="pave-qty__btn" onclick="paveCartUpdateQty('${item.key}', ${item.quantity + 1})" style="font-size:12px;">+</button>
            </div>
            <button onclick="paveCartUpdateQty('${item.key}', 0)" style="background:none;border:none;color:var(--ink-soft);font-size:11px;cursor:pointer;text-decoration:underline;padding:0;">Remove</button>
          </div>
        </div>
        <div style="font-size:13px;color:var(--ink);white-space:nowrap;">${paveMoney(item.final_line_price)}</div>
      </div>
    `).join('');
  }

  window.paveCartUpdateQty = function (key, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    })
      .then(r => r.json())
      .then(cart => {
        paveUpdateCartBadge(cart.item_count);
        paveRenderCartItems(cart);
      })
      .catch(() => {});
  };

  /* ─── Add to cart ─── */
  window.paveAddToCart = function (variantId, qty, properties) {
    const body = {
      items: [{ id: variantId, quantity: qty || 1 }]
    };
    if (properties && Object.keys(properties).length) {
      body.items[0].properties = properties;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(() => {
        paveRefreshCart();
        paveOpenCart();
        paveToast('Added to your bag');
      })
      .catch(() => paveToast('Could not add to bag — please try again.', 'error'));
  };

  /* ─── Product form ─── */
  document.addEventListener('submit', function (e) {
    const form = e.target;
    if (!form.matches('[data-pave-atc-form]')) return;
    e.preventDefault();

    const btn = form.querySelector('[data-atc-btn]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Adding…';
    }

    const fd = new FormData(form);
    const variantId = fd.get('id');
    const qty = parseInt(fd.get('quantity') || '1', 10);

    const properties = {};
    for (const [k, v] of fd.entries()) {
      if (k.startsWith('properties[')) {
        const name = k.replace(/^properties\[/, '').replace(/\]$/, '');
        if (v && v.trim()) properties[name] = v.trim();
      }
    }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: qty, properties })
    })
      .then(r => r.json())
      .then(() => {
        paveRefreshCart();
        paveOpenCart();
        paveToast('Added to your bag');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Add to Bag';
        }
      })
      .catch(() => {
        paveToast('Could not add to bag — please try again.', 'error');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Add to Bag';
        }
      });
  });

  /* ─── Product gallery ─── */
  window.paveSetGallery = function (index) {
    const thumbs = $$('.pave-thumb');
    const mainImg = $('#pave-gallery-img');

    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));

    const active = thumbs[index];
    if (active && mainImg) {
      const img = active.querySelector('img');
      if (img) {
        mainImg.src = img.src.replace(/width=\d+/, 'width=900');
        mainImg.alt = img.alt;
      }
    }
  };

  /* ─── Product image hover zoom ─── */
  function initImageZoom() {
    const wrap = $('#pave-main-gallery');
    const img  = $('#pave-gallery-img');
    if (!wrap || !img) return;

    const SCALE = 2.2;

    wrap.style.overflow = 'hidden';
    wrap.style.cursor   = 'crosshair';

    wrap.addEventListener('mouseenter', function () {
      img.style.transition = 'none';
      img.style.transformOrigin = '0 0';
    });

    wrap.addEventListener('mousemove', function (e) {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top)  / rect.height;
      const tx = -(x * (SCALE - 1) * rect.width);
      const ty = -(y * (SCALE - 1) * rect.height);
      img.style.transform = `scale(${SCALE}) translate(${tx / SCALE}px, ${ty / SCALE}px)`;
    });

    wrap.addEventListener('mouseleave', function () {
      img.style.transition = 'transform .25s ease';
      img.style.transform  = 'scale(1) translate(0,0)';
    });
  }

  /* ─── Variant / option selection ─── */
  window.paveSelectOption = function (btn) {
    const optionName  = btn.getAttribute('data-option');
    const optionValue = btn.getAttribute('data-value');

    // Deactivate siblings with same data-option, activate clicked
    const container = btn.closest('.pave-product-main') || document;
    $$('[data-option="' + optionName + '"]', container).forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Update label if present
    const labelEl = container.querySelector('[data-option-label="' + optionName + '"]');
    if (labelEl) labelEl.textContent = optionValue;

    // Match variant
    const form = btn.closest('form') || $('[data-pave-atc-form]');
    const variantsJson = $('#pave-variants-json');
    if (!form || !variantsJson) return;

    try {
      const variants = JSON.parse(variantsJson.textContent);
      // Collect all currently selected options
      const selected = {};
      $$('[data-option].is-active', container).forEach(b => {
        selected[b.getAttribute('data-option')] = b.getAttribute('data-value');
      });

      const match = variants.find(v =>
        v.options.every((opt, i) => {
          const key = Object.keys(selected)[i];
          return !key || selected[key] === opt;
        })
      );

      if (match) {
        const idInput = form.querySelector('input[name="id"]');
        if (idInput) idInput.value = match.id;
        const priceEl = $('#pave-product-price');
        if (priceEl && match.price) priceEl.textContent = paveMoney(match.price);
      }
    } catch (_) {}
  };

  /* ─── Qty stepper ─── */
  window.paveAdjustQty = function (delta) {
    const inp = $('[data-qty-input]');
    if (!inp) return;
    const current = parseInt(inp.value, 10) || 1;
    const next = Math.max(1, current + delta);
    inp.value = next;
  };

  /* ─── Engraving preview ─── */
  window.paveEngravingInput = function (inp) {
    const preview = $('#pave-engraving-preview');
    if (!preview) return;
    const val = inp.value.trim();
    preview.textContent = val || 'Your text';
    preview.style.opacity = val ? '1' : '0.4';
  };

  /* ─── Gift wrap toggle ─── */
  window.paveGiftToggle = function (chk) {
    const details = $('#pave-gift-details');
    if (!details) return;
    details.style.display = chk.checked ? '' : 'none';
  };

  /* ─── Size guide modal ─── */
  window.paveOpenSizeGuide = function () {
    const el = $('#pave-size-guide-modal');
    if (!el) return;
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.paveCloseSizeGuide = function () {
    const el = $('#pave-size-guide-modal');
    if (!el) return;
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  /* ─── Accordion ─── */
  window.paveAccordionToggle = function (header) {
    const item = header.closest('[data-accordion-item]');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');

    // Close all in same group
    const group = item.closest('[data-accordion]');
    if (group) {
      $$('[data-accordion-item].is-open', group).forEach(el => {
        el.classList.remove('is-open');
        const body = el.querySelector('[data-accordion-body]');
        if (body) body.style.maxHeight = '0';
      });
    }

    if (!isOpen) {
      item.classList.add('is-open');
      const body = item.querySelector('[data-accordion-body]');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    }
  };

  /* ─── Collection filter drawer (mobile) ─── */
  window.paveOpenFilters = function () {
    const el = $('#pave-filter-overlay');
    if (!el) return;
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  window.paveCloseFilters = function () {
    const el = $('#pave-filter-overlay');
    if (!el) return;
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  /* ─── Toast ─── */
  let toastTimer;
  window.paveToast = function (message, type) {
    const el = $('#pave-toast');
    if (!el) return;
    el.textContent = message;
    el.className = 'pave-toast is-show' + (type === 'error' ? ' pave-toast--error' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('is-show');
    }, 3200);
  };

  /* ─── Scroll-aware header ─── */
  let lastScroll = 0;
  let headerEl;

  function onScroll() {
    if (!headerEl) return;
    const current = window.scrollY;

    if (current > 80) {
      headerEl.classList.add('is-scrolled');
    } else {
      headerEl.classList.remove('is-scrolled');
    }

    if (current > lastScroll && current > 200) {
      headerEl.classList.add('is-hidden');
    } else {
      headerEl.classList.remove('is-hidden');
    }

    lastScroll = current;
  }

  /* ─── Reveal on scroll ─── */
  let revealObserver;

  function initReveal() {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => revealObserver.observe(el));
  }

  /* ─── Overlay backdrop click to close ─── */
  document.addEventListener('click', function (e) {
    if (e.target.matches('#pave-search-overlay .pave-overlay__backdrop')) paveCloseSearch();
    if (e.target.matches('#pave-mobile-nav .pave-overlay__backdrop')) paveCloseNav();
    if (e.target.matches('#pave-cart-drawer .pave-overlay__backdrop')) paveCloseCart();
    if (e.target.matches('#pave-size-guide-modal .pave-overlay__backdrop')) paveCloseSizeGuide();
    if (e.target.matches('#pave-filter-bg')) paveCloseFilters();
  });

  /* ─── Keyboard ESC ─── */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    paveCloseSearch();
    paveCloseNav();
    paveCloseCart();
    paveCloseSizeGuide();
    paveCloseFilters();
  });

  /* ─── Collection sort redirect ─── */
  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-sort-select]')) {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', e.target.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    }
  });

  /* ─── Cart qty form (cart page, non-drawer) ─── */
  document.addEventListener('change', function (e) {
    const inp = e.target;
    if (!inp.matches('[data-cart-qty]')) return;
    const key = inp.getAttribute('data-cart-key');
    const qty = parseInt(inp.value, 10);
    if (!key || isNaN(qty)) return;

    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    })
      .then(r => r.json())
      .then(() => window.location.reload())
      .catch(() => {});
  });

  /* ─── Wishlist (localStorage) ─── */
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem('pave-wishlist') || '[]'); } catch (_) { return []; }
  }

  function saveWishlist(list) {
    try { localStorage.setItem('pave-wishlist', JSON.stringify(list)); } catch (_) {}
  }

  window.paveToggleWishlist = function (btn, productId) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx === -1) {
      list.push(productId);
      btn.classList.add('is-active');
      paveToast('Saved to wishlist');
    } else {
      list.splice(idx, 1);
      btn.classList.remove('is-active');
      paveToast('Removed from wishlist');
    }
    saveWishlist(list);
  };

  function initWishlistState() {
    const list = getWishlist();
    $$('[data-wishlist-btn]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-btn');
      if (list.includes(id)) btn.classList.add('is-active');
    });
  }

  /* ─── Utilities ─── */
  function paveMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ─── Init ─── */
  function init() {
    headerEl = $('header.pave-header, .pave-header');

    // Announcement
    if (sessionStorage.getItem('pave-ann-dismissed')) {
      const bar = $('.pave-announcement');
      if (bar) bar.style.display = 'none';
    }

    // Wire header icon buttons
    const searchBtn = $('#pave-search-btn');
    if (searchBtn) searchBtn.addEventListener('click', paveOpenSearch);

    const cartBtn = $('#pave-cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', paveOpenCart);

    const mobileMenuBtn = $('#pave-mobile-menu-btn');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', paveOpenNav);

    const filterBtn = $('#pave-filter-btn');
    if (filterBtn) filterBtn.addEventListener('click', paveOpenFilters);

    const filterClose = $('#pave-filter-close');
    if (filterClose) filterClose.addEventListener('click', paveCloseFilters);

    const filterBg = $('#pave-filter-bg');
    if (filterBg) filterBg.addEventListener('click', paveCloseFilters);

    // Wire close buttons and backdrops
    const searchClose = $('#pave-search-close');
    if (searchClose) searchClose.addEventListener('click', paveCloseSearch);

    const searchBg = $('#pave-search-bg');
    if (searchBg) searchBg.addEventListener('click', paveCloseSearch);

    const cartClose = $('#pave-cart-close');
    if (cartClose) cartClose.addEventListener('click', paveCloseCart);

    const cartBg = $('#pave-cart-bg');
    if (cartBg) cartBg.addEventListener('click', paveCloseCart);

    // Scroll events
    window.addEventListener('scroll', onScroll, { passive: true });

    // Reveal
    if ('IntersectionObserver' in window) initReveal();

    // Wishlist
    initWishlistState();

    // Price range filter
    initPriceFilter();

    // Product image zoom
    initImageZoom();

    // Cart badge init
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => paveUpdateCartBadge(cart.item_count))
      .catch(() => {});

    // Accordion bodies: set initial max-height
    $$('[data-accordion-body]').forEach(body => {
      body.style.maxHeight = '0';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height .28s ease';
    });

    // Open first accordion by default on product page
    const firstAccordion = $('[data-accordion-item]');
    if (firstAccordion && $('[data-accordion-item]').closest('[data-accordion]')) {
      // leave closed; user clicks to open
    }
  }

  /* ─── Price range slider ─── */
  function initPriceFilter() {
    const wrap = $('.pave-price-filter');
    if (!wrap) return;

    const minInput = $('#pf-min');
    const maxInput = $('#pf-max');
    const minLabel = $('#pf-min-label');
    const maxLabel = $('#pf-max-label');
    const fill = $('#pf-fill');
    const rangeMin = parseFloat(wrap.getAttribute('data-min'));
    const rangeMax = parseFloat(wrap.getAttribute('data-max'));
    const baseUrl = wrap.getAttribute('data-filter-url');

    // Remove any existing apply button
    wrap.querySelectorAll('.pave-price-filter__apply').forEach(b => b.remove());

    let debounceTimer = null;

    function fmt(v) { return '$' + Math.round(v).toLocaleString(); }

    function updateFill() {
      const min = parseFloat(minInput.value);
      const max = parseFloat(maxInput.value);
      const span = rangeMax - rangeMin;
      fill.style.left = ((min - rangeMin) / span * 100) + '%';
      fill.style.right = ((rangeMax - max) / span * 100) + '%';
      minLabel.textContent = fmt(min);
      maxLabel.textContent = fmt(max);
    }

    function applyPrice() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        const url = new URL(baseUrl, window.location.origin);
        url.searchParams.set('filter.v.price.gte', minInput.value);
        url.searchParams.set('filter.v.price.lte', maxInput.value);
        paveLoadFiltered(url.toString());
      }, 400);
    }

    minInput.addEventListener('input', function () {
      if (parseFloat(minInput.value) >= parseFloat(maxInput.value)) minInput.value = parseFloat(maxInput.value) - 10;
      updateFill();
      applyPrice();
    });

    maxInput.addEventListener('input', function () {
      if (parseFloat(maxInput.value) <= parseFloat(minInput.value)) maxInput.value = parseFloat(minInput.value) + 10;
      updateFill();
      applyPrice();
    });

    updateFill();
  }

  /* ─── AJAX Filtering ─── */

  let filterBusy = false;

  window.paveLoadFiltered = async function (url, pushState) {
    if (filterBusy) return;
    if (pushState === undefined) pushState = true;

    const layout = $('.pave-collection-layout');
    if (!layout) { window.location.href = url; return; }

    filterBusy = true;

    // Dim the grid while loading
    const gridWrap = layout.querySelector('.pave-prod-grid')?.parentElement;
    if (gridWrap) { gridWrap.style.opacity = '0.4'; gridWrap.style.pointerEvents = 'none'; }

    try {
      const res = await fetch(url, { headers: { 'X-Requested-With': 'fetch' } });
      if (!res.ok) throw new Error('Network error');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      // Swap product grid + pagination
      const newGridWrap = doc.querySelector('.pave-collection-layout > div');
      const oldGridWrap = layout.querySelector(':scope > div');
      if (newGridWrap && oldGridWrap) {
        oldGridWrap.innerHTML = newGridWrap.innerHTML;
      }

      // Swap sidebar (filter states change)
      const newSidebar = doc.querySelector('.pave-sidebar');
      const oldSidebar = layout.querySelector('.pave-sidebar');
      if (newSidebar && oldSidebar) {
        oldSidebar.innerHTML = newSidebar.innerHTML;
      }

      // Swap mobile filter drawer body (filter states change)
      const newDrawerBody = doc.querySelector('.pave-filter-drawer__body');
      const oldDrawerBody = document.querySelector('.pave-filter-drawer__body');
      if (newDrawerBody && oldDrawerBody) {
        oldDrawerBody.innerHTML = newDrawerBody.innerHTML;
      }

      // Swap product count
      const newCount = doc.querySelector('[data-pave-count]');
      const oldCount = $('[data-pave-count]');
      if (newCount && oldCount) oldCount.textContent = newCount.textContent;

      // Update URL without reload
      if (pushState) history.pushState({ url }, '', url);

      // Re-init price filter and reveal for new DOM
      initPriceFilter();
      if ('IntersectionObserver' in window) initReveal();

      // Scroll to top of grid
      layout.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (e) {
      window.location.href = url;
    } finally {
      filterBusy = false;
      if (gridWrap) { gridWrap.style.opacity = ''; gridWrap.style.pointerEvents = ''; }
    }
  };

  function initAjaxFilters() {
    if (!$('.pave-collection-layout')) return;

    // Intercept filter link clicks in sidebar and mobile drawer
    document.addEventListener('click', function (e) {
      const link = e.target.closest('.pave-sidebar a, .pave-filter-drawer__body a');
      if (!link) return;
      e.preventDefault();
      paveCloseFilters();
      paveLoadFiltered(link.href);
    });

    // Intercept pagination links
    document.addEventListener('click', function (e) {
      const link = e.target.closest('.pave-collection-layout a.pave-btn');
      if (!link) return;
      e.preventDefault();
      paveLoadFiltered(link.href);
    });

    // Intercept sort select
    document.addEventListener('change', function (e) {
      if (e.target.matches('.pave-select')) {
        paveLoadFiltered(e.target.value);
      }
    });

    // Browser back / forward
    window.addEventListener('popstate', function (e) {
      paveLoadFiltered(window.location.href, false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Init AJAX filters after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAjaxFilters);
  } else {
    initAjaxFilters();
  }
})();
