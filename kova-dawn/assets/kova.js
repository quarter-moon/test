/* VELD — Shopify Dawn Theme JS */
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

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function fmtMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\.00$/, '');
  }
  function resizeImg(src, size) {
    if (!src) return '';
    return src.replace(/(\.(jpg|jpeg|gif|png|webp))(\?.*)?$/i, '_' + size + 'x$1$3');
  }

  const QV_COLOR_MAP = {black:'#1a1a18',white:'#ffffff',ivory:'#f5f0e8','ivory white':'#f5f0e8',ecru:'#e8e0ce',camel:'#c4a882',sand:'#d4c4a8',stone:'#f5f3ef',slate:'#6b7888',grey:'#9a9a9a',gray:'#9a9a9a',charcoal:'#4a4a4a',navy:'#1a2744',forest:'#3d5c3e','forest green':'#3d5c3e',sage:'#6b7c6e',olive:'#707840',burgundy:'#7a2040',clay:'#c4a882',blush:'#e8c4b8',cream:'#f5eed8',midnight:'#1a1a2e',brown:'#8b5e35',oat:'#d8cebe',chalk:'#f0ede8',cobalt:'#1a3a6e',rust:'#b84a2a'};

  function buildQvHTML(p) {
    const v0 = p.variants[0];
    const img0src = p.images[0] ? resizeImg(p.images[0].src, 800) : '';
    const imgHTML = img0src
      ? '<img id="kv-qv-main-img" src="' + escHtml(img0src) + '" alt="' + escHtml(p.title) + '" width="800" height="1067" loading="eager">'
      : '<div class="kv-ph" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">' + escHtml(p.vendor) + '</div>';

    let optionsHTML = '';
    p.options.forEach((opt, i) => {
      const pos = i + 1;
      const isColor = /^colou?r$/i.test(opt.name);
      let btns = '';
      opt.values.forEach((val, vi) => {
        const isFirst = vi === 0;
        if (isColor) {
          const hex = QV_COLOR_MAP[val.toLowerCase()] || '#ccc';
          const cv = p.variants.find(v => v['option' + pos] === val);
          const cvImg = cv && cv.image_id ? p.images.find(im => im.id === cv.image_id) : null;
          const cvSrc = cvImg ? resizeImg(cvImg.src, 800) : img0src;
          btns += '<button type="button" class="kv-swatch' + (isFirst?' is-active':'') + '" '
            + 'aria-label="' + escHtml(val) + '" title="' + escHtml(val) + '" '
            + 'style="background:' + hex + ';" '
            + 'data-option="' + pos + '" data-value="' + escHtml(val) + '" data-img="' + escHtml(cvSrc) + '">'
            + '</button>';
        } else {
          const bv = p.variants.find(v => v['option' + pos] === val);
          const avail = bv ? bv.available : true;
          btns += '<button type="button" class="kv-size' + (isFirst?' is-active':'') + (avail?'':' is-sold') + '" '
            + 'data-option="' + pos + '" data-value="' + escHtml(val) + '"'
            + (avail?'':' disabled') + '>' + escHtml(val) + '</button>';
        }
      });
      optionsHTML += '<div class="kv-qv__option">'
        + '<span class="kv-qv__option-label">' + escHtml(opt.name)
        + (isColor ? '' : '<span class="kv-qv__option-sel" id="kv-qv-sel-' + pos + '">: ' + escHtml(opt.values[0]) + '</span>')
        + '</span>'
        + (isColor ? '<div class="kv-qv__swatches">' + btns + '</div>' : '<div class="kv-sizes">' + btns + '</div>')
        + '</div>';
    });

    let priceHTML;
    if (v0.compare_at_price && v0.compare_at_price > v0.price) {
      priceHTML = '<s class="kv-qv__price--was">' + fmtMoney(v0.compare_at_price) + '</s>'
        + '<span class="kv-qv__price--sale">' + fmtMoney(v0.price) + '</span>';
    } else {
      priceHTML = '<span>' + fmtMoney(v0.price) + '</span>';
    }
    const atcBtn = p.available
      ? '<button type="submit" class="kv-btn kv-btn--lg" style="width:100%;justify-content:center;" data-add-to-cart>Add to cart</button>'
      : '<button type="button" class="kv-btn kv-btn--lg" style="width:100%;justify-content:center;opacity:.5;" disabled>Sold out</button>';

    return '<div class="kv-qv">'
      + '<div class="kv-qv__img">' + imgHTML + '</div>'
      + '<div class="kv-qv__form">'
      + (p.vendor ? '<span class="kv-qv__vendor">' + escHtml(p.vendor) + '</span>' : '')
      + '<h2 class="kv-qv__title">' + escHtml(p.title) + '</h2>'
      + '<div class="kv-qv__price" id="kv-qv-price">' + priceHTML + '</div>'
      + '<form id="kv-qv-form"><input type="hidden" name="id" value="' + v0.id + '">'
      + optionsHTML
      + '<div class="kv-qv__actions">' + atcBtn + '</div>'
      + '</form>'
      + '<a href="/products/' + escHtml(p.handle) + '" class="kv-qv__pdp-link">View full details &rarr;</a>'
      + '</div></div>';
  }

  function initQvInteractions(product) {
    if (!quickModal) return;
    const form = quickModal.querySelector('#kv-qv-form');
    if (!form) return;
    const variants = product.variants;
    const selected = {};

    quickModal.querySelectorAll('[data-option][data-value]').forEach(btn => {
      if (btn.classList.contains('is-active')) selected[btn.getAttribute('data-option')] = btn.getAttribute('data-value');
    });

    function findVariant() {
      return variants.find(v => Object.keys(selected).every(pos => v['option' + pos] === selected[pos]));
    }
    function applyVariant(v) {
      if (!v) return;
      const inp = form.querySelector('[name="id"]');
      if (inp) inp.value = v.id;
      const btn = form.querySelector('[data-add-to-cart]');
      if (btn) { btn.disabled = !v.available; btn.textContent = v.available ? 'Add to cart' : 'Sold out'; }
      const priceEl = quickModal.querySelector('#kv-qv-price');
      if (priceEl) {
        priceEl.innerHTML = (v.compare_at_price && v.compare_at_price > v.price)
          ? '<s class="kv-qv__price--was">' + fmtMoney(v.compare_at_price) + '</s><span class="kv-qv__price--sale">' + fmtMoney(v.price) + '</span>'
          : '<span>' + fmtMoney(v.price) + '</span>';
      }
    }

    quickModal.querySelectorAll('[data-option][data-value]').forEach(btn => {
      btn.addEventListener('click', () => {
        const pos = btn.getAttribute('data-option');
        selected[pos] = btn.getAttribute('data-value');
        quickModal.querySelectorAll('[data-option="' + pos + '"]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const lbl = quickModal.querySelector('#kv-qv-sel-' + pos);
        if (lbl) lbl.textContent = ': ' + btn.getAttribute('data-value');
        if (btn.classList.contains('kv-swatch') && btn.dataset.img) {
          const img = quickModal.querySelector('#kv-qv-main-img');
          if (img) img.src = btn.dataset.img;
        }
        applyVariant(findVariant());
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const addBtn = form.querySelector('[data-add-to-cart]');
      if (addBtn) { addBtn.disabled = true; addBtn.textContent = 'Adding…'; }
      fetch('/cart/add.js', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(r => r.json())
        .then(() => { closeQuickView(); openCart(); updateCartCount(); })
        .catch(() => { if (addBtn) { addBtn.disabled = false; addBtn.textContent = 'Add to cart'; } });
    });

    applyVariant(findVariant());
  }

  function openQuickView(productHandle) {
    if (!quickModal) return;
    const body = quickModal.querySelector('.kv-modal__body');
    if (body) body.innerHTML = '<div style="padding:56px 40px;text-align:center;color:#999;font-size:13px;letter-spacing:.06em;">Loading&hellip;</div>';
    showModal(quickModal);
    showModal(quickOverlay);
    document.body.classList.add('kv-lock');

    fetch('/products/' + productHandle + '.json')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        if (body) body.innerHTML = buildQvHTML(data.product);
        initQvInteractions(data.product);
      })
      .catch(() => {
        if (body) body.innerHTML = '<div style="padding:40px;text-align:center;">'
          + 'Could not load product. '
          + '<a href="/products/' + productHandle + '" style="text-decoration:underline;">View on page &rarr;</a></div>';
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
    if (btn) { e.preventDefault(); e.stopPropagation(); openQuickView(btn.dataset.quickView); }
  });

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
