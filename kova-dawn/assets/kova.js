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

  function openQuickView(productHandle) {
    if (!quickModal) return;
    const url = `/products/${productHandle}?view=quick`;
    fetch(url)
      .then(r => r.text())
      .then(html => {
        const body = quickModal.querySelector('.kv-modal__body');
        if (body) body.innerHTML = html;
        quickModal.classList.remove('hidden');
        quickOverlay && quickOverlay.classList.remove('hidden');
        document.body.classList.add('kv-lock');
        initQuickViewForms();
      })
      .catch(() => {
        // Fallback: just show modal with link to product
      });
  }

  function closeQuickView() {
    quickModal && quickModal.classList.add('hidden');
    quickOverlay && quickOverlay.classList.add('hidden');
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

  function initQuickViewForms() {
    // Size selection in quick view
    const sizes = quickModal ? quickModal.querySelectorAll('.kv-size') : [];
    sizes.forEach(btn => {
      btn.addEventListener('click', () => {
        sizes.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const form = quickModal.querySelector('form');
        if (form) {
          const variantInput = form.querySelector('[name="id"]');
          if (variantInput) variantInput.value = btn.dataset.variantId || '';
          const addBtn = form.querySelector('[data-add-to-cart]');
          if (addBtn) {
            addBtn.disabled = false;
            addBtn.textContent = 'Add to cart';
          }
        }
      });
    });

    // Color swatches
    const swatches = quickModal ? quickModal.querySelectorAll('.kv-swatch') : [];
    swatches.forEach(sw => {
      sw.addEventListener('click', () => {
        swatches.forEach(s => s.classList.remove('is-active'));
        sw.classList.add('is-active');
      });
    });

    // Add to cart from quick view
    const addBtn = quickModal ? quickModal.querySelector('[data-add-to-cart]') : null;
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const form = addBtn.closest('form');
        if (!form) return;
        const data = new FormData(form);
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        })
          .then(r => r.json())
          .then(() => {
            closeQuickView();
            openCart();
            updateCartCount();
          });
      });
    }
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

  // ── Color swatch selection ────────────────────────────────────
  document.addEventListener('click', (e) => {
    const swatch = e.target.closest('.kv-swatch');
    if (!swatch) return;
    const group = swatch.closest('.swatches, .kv-card__swatches');
    if (!group) return;
    group.querySelectorAll('.kv-swatch').forEach(s => s.classList.remove('is-active'));
    swatch.classList.add('is-active');
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
