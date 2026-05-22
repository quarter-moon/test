/* KOVA — Shopify Dawn Theme JS */
(function () {
  'use strict';

  // ── Announcement bar dismiss ──────────────────────────────────
  const ann = document.getElementById('kv-ann');
  const annClose = document.getElementById('kv-ann-close');
  if (annClose && ann) {
    annClose.addEventListener('click', () => {
      ann.style.display = 'none';
      sessionStorage.setItem('kv-ann-dismissed', '1');
    });
    if (sessionStorage.getItem('kv-ann-dismissed')) ann.style.display = 'none';
  }

  // ── Rotating announcement messages ───────────────────────────
  const annMsg = document.getElementById('kv-ann-msg');
  if (annMsg) {
    const msgs = annMsg.dataset.messages ? JSON.parse(annMsg.dataset.messages) : [];
    if (msgs.length > 1) {
      let idx = 0;
      setInterval(() => {
        idx = (idx + 1) % msgs.length;
        annMsg.textContent = msgs[idx];
      }, 5000);
    }
  }

  // ── Nav scroll shadow ─────────────────────────────────────────
  const nav = document.getElementById('kv-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Mobile menu drawer ────────────────────────────────────────
  const hamburger = document.getElementById('kv-hamburger');
  const navDrawer = document.getElementById('kv-nav-drawer');
  const navDrawerClose = document.getElementById('kv-nav-drawer-close');
  const navOverlay = document.getElementById('kv-nav-overlay');

  function openNavDrawer() {
    navDrawer && navDrawer.classList.add('is-open');
    navOverlay && navOverlay.classList.remove('hidden');
    document.body.classList.add('kv-lock');
  }
  function closeNavDrawer() {
    navDrawer && navDrawer.classList.remove('is-open');
    navOverlay && navOverlay.classList.add('hidden');
    document.body.classList.remove('kv-lock');
  }

  hamburger && hamburger.addEventListener('click', openNavDrawer);
  navDrawerClose && navDrawerClose.addEventListener('click', closeNavDrawer);
  navOverlay && navOverlay.addEventListener('click', closeNavDrawer);

  // ── Cart drawer ───────────────────────────────────────────────
  const cartDrawer = document.getElementById('kv-cart-drawer');
  const cartOverlay = document.getElementById('kv-cart-overlay');
  const cartToggles = document.querySelectorAll('[data-cart-toggle]');
  const cartClose = document.getElementById('kv-cart-close');

  function openCart() {
    cartDrawer && cartDrawer.classList.add('is-open');
    cartOverlay && cartOverlay.classList.remove('hidden');
    document.body.classList.add('kv-lock');
  }
  function closeCart() {
    cartDrawer && cartDrawer.classList.remove('is-open');
    cartOverlay && cartOverlay.classList.add('hidden');
    document.body.classList.remove('kv-lock');
  }

  cartToggles.forEach(b => b.addEventListener('click', openCart));
  cartClose && cartClose.addEventListener('click', closeCart);
  cartOverlay && cartOverlay.addEventListener('click', closeCart);

  // ── ESC key closes all overlays ───────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeNavDrawer();
      closeQuickView();
    }
  });

  // ── Cart: qty steppers ────────────────────────────────────────
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-qty-change]')) {
      const change = parseInt(e.target.dataset.qtyChange);
      const key = e.target.dataset.key;
      const input = document.querySelector(`[data-qty-input="${key}"]`);
      if (!input) return;
      const currentQty = parseInt(input.value) || 1;
      const newQty = Math.max(0, currentQty + change);
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: newQty })
      })
        .then(r => r.json())
        .then(() => { window.location.reload(); });
    }

    if (e.target.matches('[data-remove-item]')) {
      const key = e.target.dataset.removeItem;
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 })
      })
        .then(r => r.json())
        .then(() => { window.location.reload(); });
    }
  });

  // ── Quick view modal ──────────────────────────────────────────
  const quickModal = document.getElementById('kv-quick-modal');
  const quickOverlay = document.getElementById('kv-quick-overlay');
  const quickClose = document.getElementById('kv-quick-close');

  function showModal(el) {
    if (!el) return;
    el.style.display = '';
    el.classList.remove('hidden');
  }
  function hideModal(el) {
    if (!el) return;
    el.style.display = 'none';
    el.classList.add('hidden');
  }

  function openQuickView(productHandle) {
    if (!quickModal) return;
    const body = quickModal.querySelector('.kv-modal__body');
    if (body) body.innerHTML = '<div style="padding:56px 40px;text-align:center;color:#999;font-size:13px;letter-spacing:.06em;">Loading&hellip;</div>';
    showModal(quickModal);
    showModal(quickOverlay);
    document.body.classList.add('kv-lock');

    fetch('/products/' + productHandle + '?section_id=quick-view')
      .then(r => r.ok ? r.text() : Promise.reject(r.status))
      .then(html => {
        if (body) body.innerHTML = html;
        initQuickViewForms();
      })
      .catch(() => {
        if (body) body.innerHTML = '<div style="padding:40px;text-align:center;">'
          + 'Could not load product. '
          + '<a href="/products/' + productHandle + '" style="text-decoration:underline;">View on page &#8594;</a>'
          + '</div>';
      });
  }

  function closeQuickView() {
    hideModal(quickModal);
    hideModal(quickOverlay);
    document.body.classList.remove('kv-lock');
  }

  quickClose && quickClose.addEventListener('click', closeQuickView);
  quickOverlay && quickOverlay.addEventListener('click', closeQuickView);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quick-view]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      openQuickView(btn.dataset.quickView);
    }
  });

  function fmtMoney(cents) {
    const dollars = (cents / 100).toFixed(2);
    return '$' + dollars.replace(/\.00$/, '');
  }

  function initQuickViewForms() {
    if (!quickModal) return;
    const form = quickModal.querySelector('#kv-qv-form');
    if (!form) return;
    const variants = window.kvQvVariants || [];
    const selected = {};

    // Seed selected from active buttons
    quickModal.querySelectorAll('[data-option][data-value]').forEach(btn => {
      if (btn.classList.contains('is-active')) {
        selected[btn.getAttribute('data-option')] = btn.getAttribute('data-value');
      }
    });

    function findVariant() {
      return variants.find(v => {
        return Object.keys(selected).every(pos => {
          return v['option' + pos] === selected[pos];
        });
      });
    }

    function applyVariant(v) {
      if (!v) return;
      const idInput = form.querySelector('[name="id"]');
      if (idInput) idInput.value = v.id;
      const addBtn = form.querySelector('[data-add-to-cart]');
      if (addBtn) {
        addBtn.disabled = !v.available;
        addBtn.textContent = v.available ? 'Add to cart' : 'Sold out';
      }
      // Update price
      const priceEl = quickModal.querySelector('#kv-qv-price');
      if (priceEl) {
        if (v.compare_at_price && v.compare_at_price > v.price) {
          priceEl.innerHTML = '<s class="kv-qv__price--was">' + fmtMoney(v.compare_at_price) + '</s>'
            + '<span class="kv-qv__price--sale">' + fmtMoney(v.price) + '</span>';
        } else {
          priceEl.innerHTML = '<span>' + fmtMoney(v.price) + '</span>';
        }
      }
    }

    // Option button clicks
    quickModal.querySelectorAll('[data-option][data-value]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pos = btn.getAttribute('data-option');
        const val = btn.getAttribute('data-value');
        selected[pos] = val;

        // Sync siblings
        quickModal.querySelectorAll('[data-option="' + pos + '"]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Update option label display
        const selLabel = quickModal.querySelector('#kv-qv-sel-' + pos);
        if (selLabel) selLabel.textContent = ': ' + val;

        // Swap image for color swatches
        if (btn.classList.contains('kv-swatch') && btn.dataset.img) {
          const imgEl = quickModal.querySelector('#kv-qv-main-img');
          if (imgEl) imgEl.src = btn.dataset.img;
        }

        applyVariant(findVariant());
      });
    });

    // ATC submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const addBtn = form.querySelector('[data-add-to-cart]');
      const origText = addBtn ? addBtn.textContent : '';
      if (addBtn) { addBtn.disabled = true; addBtn.textContent = 'Adding…'; }
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(r => r.json())
        .then(() => {
          closeQuickView();
          openCart();
          updateCartCount();
        })
        .catch(() => {
          if (addBtn) { addBtn.disabled = false; addBtn.textContent = origText; }
        });
    });

    // Set initial variant
    applyVariant(findVariant());
  }

  // ── Add to cart (PDP) ─────────────────────────────────────────
  const pdpForm = document.getElementById('kv-pdp-form');
  if (pdpForm) {
    pdpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = pdpForm.querySelector('[data-add-to-cart]');
      if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(pdpForm)
      })
        .then(r => r.json())
        .then(() => {
          openCart();
          updateCartCount();
          if (btn) { btn.disabled = false; btn.textContent = 'Add to cart'; }
        })
        .catch(() => {
          if (btn) { btn.disabled = false; btn.textContent = 'Add to cart'; }
        });
    });
  }

  // ── Variant / size selection ──────────────────────────────────
  document.addEventListener('click', (e) => {
    const sizeBtn = e.target.closest('.kv-size:not([disabled])');
    if (!sizeBtn) return;
    const group = sizeBtn.closest('.kv-sizes');
    if (!group) return;
    group.querySelectorAll('.kv-size').forEach(b => b.classList.remove('is-active'));
    sizeBtn.classList.add('is-active');
    // Update hidden variant input
    const variantId = sizeBtn.dataset.variantId;
    const form = sizeBtn.closest('form');
    if (form && variantId) {
      const input = form.querySelector('[name="id"]');
      if (input) input.value = variantId;
      const addBtn = form.querySelector('[data-add-to-cart]');
      if (addBtn) {
        addBtn.disabled = false;
        addBtn.textContent = 'Add to cart';
      }
    }
  });

  // ── Color swatch selection (collection cards) ──────────────────
  document.addEventListener('click', (e) => {
    const swatch = e.target.closest('.kv-swatch');
    if (!swatch) return;
    const swatchGroup = swatch.closest('.kv-col-card__swatches, .kv-card__swatches, .swatches');
    if (!swatchGroup) return;
    swatchGroup.querySelectorAll('.kv-swatch').forEach(s => s.classList.remove('is-active'));
    swatch.classList.add('is-active');
    // Swap card image if data-img present
    if (swatch.dataset.img) {
      const wrap = swatch.closest('.kv-col-card, article');
      if (wrap) {
        const mainImg = wrap.querySelector('.kv-col-card__img--main, .kv-card__img--main');
        if (mainImg) mainImg.src = swatch.dataset.img;
      }
    }
  });

  // ── Accordion ─────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const head = e.target.closest('.kv-accordion__head');
    if (!head) return;
    const item = head.closest('.kv-accordion__item');
    if (!item) return;
    const isOpen = item.classList.contains('is-open');
    // Close siblings
    item.closest('.kv-accordion').querySelectorAll('.kv-accordion__item').forEach(i => i.classList.remove('is-open'));
    if (!isOpen) item.classList.add('is-open');
  });

  // ── PDP gallery thumbnails ────────────────────────────────────
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.kv-pdp__thumb');
    if (!thumb) return;
    const gallery = thumb.closest('.kv-pdp__gallery');
    if (!gallery) return;
    const hero = gallery.querySelector('.kv-pdp__hero img');
    const src = thumb.dataset.src;
    if (hero && src) hero.src = src;
    gallery.querySelectorAll('.kv-pdp__thumb').forEach(t => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
  });

  // ── Wishlist toggle (local only) ──────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-wishlist]');
    if (!btn) return;
    e.stopPropagation();
    btn.classList.toggle('is-on');
    const icon = btn.querySelector('svg');
    if (icon) icon.setAttribute('fill', btn.classList.contains('is-on') ? 'currentColor' : 'none');
  });

  // ── Collection filter chips ───────────────────────────────────
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.kv-filter-chip[data-filter]');
    if (!chip) return;
    const type = chip.dataset.filterType;
    const value = chip.dataset.filter;
    const chips = document.querySelectorAll(`.kv-filter-chip[data-filter-type="${type}"]`);
    const wasActive = chip.classList.contains('is-on');
    chips.forEach(c => c.classList.remove('is-on'));
    if (!wasActive) chip.classList.add('is-on');
    applyFilters();
  });

  function applyFilters() {
    const activeSize = (document.querySelector('.kv-filter-chip[data-filter-type="size"].is-on') || {}).dataset?.filter;
    const cards = document.querySelectorAll('.kv-card[data-sizes]');
    cards.forEach(card => {
      const sizes = (card.dataset.sizes || '').split(',');
      const show = !activeSize || sizes.includes(activeSize);
      card.parentElement.style.display = show ? '' : 'none';
    });
  }

  // ── Update cart count badge ───────────────────────────────────
  function updateCartCount() {
    fetch('/cart.js')
      .then(r => r.json())
      .then(cart => {
        document.querySelectorAll('[data-cart-count]').forEach(el => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      });
  }

  updateCartCount();

})();
