/**
 * PawVital Theme — theme.js
 * Handles: mega menu, cart drawer, product page interactions, sticky ATC
 */

(function () {
  'use strict';

  /* ── Utilities ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);

  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* ── Announcement bar dismiss ──────────────────────────────── */
  // (already handled by server — no JS needed)

  /* ── Header: mega menu & mobile nav ───────────────────────── */
  function initHeader() {
    const header = $('#site-header');
    if (!header) return;

    // ── Mega menu (desktop hover / click) ──
    $$('[data-nav-item]', header).forEach(item => {
      const mega = item.querySelector('[data-mega]');
      if (!mega) return;

      let hoverTimer;

      item.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        item.classList.add('open');
        item.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(() => {
          item.classList.remove('open');
          item.setAttribute('aria-expanded', 'false');
        }, 80);
      });

      // Close on Escape
      item.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          item.classList.remove('open');
          item.setAttribute('aria-expanded', 'false');
          item.querySelector('.nav-link').focus();
        }
      });

      // Click toggle for keyboard / mobile
      const navLink = item.querySelector('.nav-link');
      if (navLink) {
        navLink.addEventListener('click', e => {
          if (window.innerWidth < 941) return; // mobile uses drawer
          e.preventDefault();
          const isOpen = item.classList.contains('open');
          // Close all others
          $$('[data-nav-item].open', header).forEach(other => {
            if (other !== item) {
              other.classList.remove('open');
              other.setAttribute('aria-expanded', 'false');
            }
          });
          item.classList.toggle('open', !isOpen);
          item.setAttribute('aria-expanded', !isOpen);
        });
      }
    });

    // Close mega on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) {
        $$('[data-nav-item].open', header).forEach(item => {
          item.classList.remove('open');
          item.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // ── Mobile nav drawer ──
    const mobileNav    = $('#mobile-nav');
    const mobileScrim  = $('#mobile-nav-scrim');
    const mobileClose  = $('[data-mobile-nav-close]');

    function openMobileNav() {
      if (!mobileNav) return;
      mobileNav.setAttribute('aria-hidden', 'false');
      mobileScrim && mobileScrim.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileNav() {
      if (!mobileNav) return;
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileScrim && mobileScrim.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Mobile menu button — server-rendered, with JS fallback if absent
    let menuBtn = header.querySelector('[data-mobile-nav-open]');
    if (!menuBtn) {
      menuBtn = document.createElement('button');
      menuBtn.className = 'icon-btn mobile-menu-btn';
      menuBtn.setAttribute('aria-label', 'Open menu');
      menuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
      const actions = header.querySelector('.header-actions');
      if (actions) actions.prepend(menuBtn);
    }
    on(menuBtn, 'click', openMobileNav);

    on(mobileClose, 'click', closeMobileNav);
    on(mobileScrim, 'click', closeMobileNav);

    // ── Search overlay ──
    const searchOverlay = $('#search-overlay');
    const searchScrim   = $('#search-scrim');
    const searchInput   = $('#search-overlay-input');

    function openSearch() {
      if (!searchOverlay) return;
      searchOverlay.classList.add('open');
      searchOverlay.setAttribute('aria-hidden', 'false');
      searchScrim && searchScrim.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput && searchInput.focus(), 60);
    }
    function closeSearch() {
      if (!searchOverlay) return;
      searchOverlay.classList.remove('open');
      searchOverlay.setAttribute('aria-hidden', 'true');
      searchScrim && searchScrim.classList.remove('open');
      document.body.style.overflow = '';
    }

    $$('[data-search-toggle]').forEach(btn => on(btn, 'click', openSearch));
    document.addEventListener('click', e => {
      if (e.target.closest('[data-search-close]')) closeSearch();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMobileNav();
        closeSearch();
      }
    });
  }

  /* ── Cart drawer ───────────────────────────────────────────── */
  function initCart() {
    const drawer   = $('#cart-drawer');
    const scrim    = $('#cart-scrim');
    const closeBtn = $('#cart-close');
    const toggle   = $('[data-cart-toggle]');
    const countEl  = $('#cart-count');

    if (!drawer) return;

    function openCart() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      scrim && scrim.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      scrim && scrim.classList.remove('open');
      document.body.style.overflow = '';
    }

    on(toggle, 'click', openCart);
    on(closeBtn, 'click', closeCart);
    on(scrim, 'click', closeCart);

    // [data-cart-close] on any element
    document.addEventListener('click', e => {
      if (e.target.closest('[data-cart-close]')) closeCart();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart();
    });

    // ── AJAX cart operations ──
    async function fetchCart() {
      const res = await fetch('/cart.js');
      return res.json();
    }

    async function refreshCartUI() {
      try {
        const cart = await fetchCart();
        updateCartCount(cart.item_count);
        updateShippingBar(cart.total_price);
        renderCartItems(cart);
        updateCartTotals(cart.total_price);
      } catch (e) {
        console.error('Cart refresh error:', e);
      }
    }

    function updateCartCount(count) {
      if (!countEl) return;
      countEl.textContent = count;
      countEl.classList.toggle('hidden', count === 0);
      // Pulse animation
      countEl.classList.remove('pulse');
      void countEl.offsetWidth; // reflow
      countEl.classList.add('pulse');
    }

    function updateShippingBar(totalCents) {
      const threshold = (window.pawvitalConfig?.freeShippingThreshold || 49) * 100;
      const pct = Math.min(100, (totalCents / threshold) * 100);
      const fill = $('#ship-bar-fill');
      const label = $('#ship-bar-label');
      if (fill) fill.style.width = pct + '%';
      if (label) {
        const remaining = Math.max(0, threshold - totalCents);
        label.innerHTML = remaining > 0
          ? `You're <b>${formatMoney(remaining)}</b> away from <b>free shipping</b>`
          : `🎉 You've unlocked free shipping!`;
      }
    }

    function renderCartItems(cart) {
      const itemsEl = $('#cart-items');
      const footEl  = $('#cart-foot');
      if (!itemsEl) return;

      if (cart.item_count === 0) {
        itemsEl.innerHTML = `
          <div class="cd-empty">
            <div class="ce-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>
              </svg>
            </div>
            <div>
              <div style="font-family:var(--font-head);font-weight:800;font-size:18px;color:var(--ink);">Your cart is empty</div>
              <div style="margin-top:4px;">Let's find something your pet will love.</div>
            </div>
            <button class="btn btn-brand" data-cart-close>Start shopping</button>
          </div>`;
        if (footEl) footEl.style.display = 'none';
        return;
      }

      if (footEl) footEl.style.display = '';

      itemsEl.innerHTML = cart.items.map((item, idx) => `
        <div class="cd-line" data-line-item="${idx + 1}">
          <div class="cl-img">
            ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.product_title)}" width="76" height="76" loading="lazy">` : ''}
          </div>
          <div class="cl-info">
            <div class="cl-title">${escapeHtml(item.product_title)}</div>
            ${item.variant_title !== 'Default Title' ? `<div class="cl-variant">${escapeHtml(item.variant_title)}</div>` : ''}
            <div class="cl-bottom">
              <div class="qty" role="group">
                <button class="cart-qty-btn" data-line="${idx + 1}" data-change="-1" aria-label="Decrease">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14"/></svg>
                </button>
                <span class="qv">${item.quantity}</span>
                <button class="cart-qty-btn" data-line="${idx + 1}" data-change="1" aria-label="Increase">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
              <div class="cl-price">${formatMoney(item.final_line_price)}</div>
            </div>
            <button class="cl-remove" data-line="${idx + 1}" data-remove>Remove</button>
          </div>
        </div>`).join('');
    }

    function updateCartTotals(totalCents) {
      const subtotalEl   = $('#cart-subtotal');
      const checkoutPrice = $('#checkout-price');
      if (subtotalEl)   subtotalEl.textContent = formatMoney(totalCents);
      if (checkoutPrice) checkoutPrice.textContent = formatMoney(totalCents);
    }

    // ── Quantity change & remove handlers (delegated) ──
    on(drawer, 'click', async e => {
      const qtyBtn = e.target.closest('.cart-qty-btn');
      const removeBtn = e.target.closest('[data-remove]');

      if (qtyBtn) {
        const line   = parseInt(qtyBtn.dataset.line);
        const change = parseInt(qtyBtn.dataset.change);
        const qvEl   = qtyBtn.parentElement.querySelector('.qv');
        const current = parseInt(qvEl?.textContent || '1');
        const newQty  = Math.max(0, current + change);
        await changeLineQty(line, newQty);
        await refreshCartUI();
      }

      if (removeBtn) {
        const line = parseInt(removeBtn.dataset.line);
        await changeLineQty(line, 0);
        await refreshCartUI();
      }
    });

    async function changeLineQty(line, qty) {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, quantity: qty })
      });
    }

    // ── Global addToCart function ──
    window.PawVitalCart = {
      async add(variantId, qty = 1, properties = {}) {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: variantId, quantity: qty, properties })
        });
        if (!res.ok) throw new Error('Failed to add to cart');
        await refreshCartUI();
        openCart();
      }
    };

    // ── Quick-add buttons (product cards) ──
    document.addEventListener('click', async e => {
      const btn = e.target.closest('[data-quick-add]');
      if (!btn) return;
      const variantId = btn.dataset.quickAdd;
      if (!variantId) return;
      e.preventDefault();

      btn.disabled = true;
      const origText = btn.innerHTML;
      btn.innerHTML = btn.innerHTML.replace(/Quick add|Add to cart/, 'Adding…');

      try {
        await window.PawVitalCart.add(parseInt(variantId));
      } catch (err) {
        console.error(err);
      } finally {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    });
  }

  /* ── Product page ──────────────────────────────────────────── */
  function initProductPage() {
    if (!document.body.classList.contains('template-product')) return;

    const pdData = window.productData;
    if (!pdData) return;

    let currentVariantId = null;
    let selectedOptions  = [];
    let currentMode = 'sub'; // 'sub' or 'one'
    let qty = 1;

    // ── Gallery ──
    $$('[data-media-id]').forEach(thumb => {
      on(thumb, 'click', () => {
        $$('[data-media-id]').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const mainImg = $('#pdp-main-image');
        if (mainImg) mainImg.src = thumb.dataset.mediaSrc;
      });
    });

    // ── Variant options ──
    const optChips = $$('.opt-chip');
    optChips.forEach(chip => {
      on(chip, 'click', () => {
        const idx   = parseInt(chip.dataset.optionIndex);
        const value = chip.dataset.optionValue;

        // Update active state for this option group
        $$('.opt-chip').forEach(c => {
          if (parseInt(c.dataset.optionIndex) === idx) c.classList.remove('active');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');

        // Update label
        const lbl = $(`#opt-val-${idx}`);
        if (lbl) lbl.textContent = '· ' + value;

        // Find matching variant
        matchVariant();
      });
    });

    function getSelectedOptions() {
      const opts = [];
      $$('.opt-chip.active').forEach(chip => {
        opts[parseInt(chip.dataset.optionIndex)] = chip.dataset.optionValue;
      });
      return opts;
    }

    function matchVariant() {
      const selected = getSelectedOptions();
      const variant = pdData.variants.find(v =>
        v.options.every((opt, i) => opt === selected[i])
      );
      if (!variant) return;

      currentVariantId = variant.id;
      const input = $('#variant-id');
      if (input) input.value = variant.id;

      updatePrices(variant);
      updateAddBtn(variant);
      updateStickyATC(variant);
    }

    function subPrice(cents) {
      return Math.round(cents * 0.85);
    }

    function updatePrices(variant) {
      const priceNow  = $('#pdp-price-now');
      const priceWas  = $('#pdp-price-was');
      const priceSave = $('#pdp-price-save');
      const subSave   = $('#pdp-sub-save');
      const bmSubPrice = $('#bm-sub-price');
      const bmOnePrice = $('#bm-one-price');

      const displayPrice = currentMode === 'sub' ? subPrice(variant.price) : variant.price;

      if (priceNow) priceNow.textContent = formatMoney(displayPrice);
      if (currentMode === 'sub') {
        if (priceWas)  { priceWas.style.display = 'none'; }
        if (priceSave) { priceSave.style.display = 'none'; }
        if (subSave)   { subSave.style.display = ''; }
      } else {
        if (subSave) subSave.style.display = 'none';
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          if (priceWas)  { priceWas.style.display = ''; priceWas.textContent = formatMoney(variant.compare_at_price); }
          if (priceSave) { priceSave.style.display = ''; priceSave.textContent = 'Save ' + formatMoney(variant.compare_at_price - variant.price); }
        } else {
          if (priceWas)  priceWas.style.display = 'none';
          if (priceSave) priceSave.style.display = 'none';
        }
      }

      if (bmSubPrice) bmSubPrice.textContent = formatMoney(subPrice(variant.price));
      if (bmOnePrice) bmOnePrice.textContent = formatMoney(variant.price);
    }

    function updateAddBtn(variant) {
      const btn     = $('#pdp-add-btn');
      const btnText = $('#pdp-btn-price');
      if (!btn) return;

      const displayPrice = currentMode === 'sub' ? subPrice(variant.price) : variant.price;
      btn.disabled = !variant.available;
      if (btnText) btnText.textContent = formatMoney(displayPrice * qty);
    }

    function updateStickyATC(variant) {
      const stickyPrice  = $('#sticky-price');
      const stickyInfo   = $('#sticky-variant-info');
      const displayPrice = currentMode === 'sub' ? subPrice(variant.price) : variant.price;
      if (stickyPrice) stickyPrice.textContent = formatMoney(displayPrice * qty);
      if (stickyInfo) {
        const opts = getSelectedOptions().filter(Boolean).join(' · ');
        stickyInfo.textContent = opts + (currentMode === 'sub' ? ' · Subscription' : ' · One-time');
      }
    }

    // ── Subscribe / one-time toggle ──
    $$('[data-buy-mode]').forEach(mode => {
      on(mode, 'click', () => {
        $$('[data-buy-mode]').forEach(m => m.classList.remove('active'));
        mode.classList.add('active');
        currentMode = mode.dataset.buyMode;

        const variant = pdData.variants.find(v => v.id === currentVariantId) || pdData.variants[0];
        if (variant) {
          updatePrices(variant);
          updateAddBtn(variant);
          updateStickyATC(variant);
        }
      });
    });

    // ── Quantity stepper ──
    const qtyDisplay = $('#qty-display');
    const qtyInput   = $('#qty-input');

    $$('.qty-btn').forEach(btn => {
      on(btn, 'click', () => {
        const change = parseInt(btn.dataset.qty);
        qty = Math.max(1, qty + change);
        if (qtyDisplay) qtyDisplay.textContent = qty;
        if (qtyInput)   qtyInput.value = qty;

        const variant = pdData.variants.find(v => v.id === currentVariantId) || pdData.variants[0];
        if (variant) {
          updateAddBtn(variant);
          updateStickyATC(variant);
        }
      });
    });

    // ── Add to cart (product form) ──
    const productForm = $('.js-product-form');
    on(productForm, 'submit', async e => {
      e.preventDefault();
      const varId = parseInt($('#variant-id').value);
      const btnEl = $('#pdp-add-btn');
      if (btnEl) { btnEl.disabled = true; btnEl.querySelector('span').textContent = 'Adding…'; }

      try {
        await window.PawVitalCart.add(varId, qty);
      } catch (err) {
        console.error(err);
      } finally {
        if (btnEl) {
          btnEl.disabled = false;
          const variant = pdData.variants.find(v => v.id === varId) || pdData.variants[0];
          updateAddBtn(variant);
        }
      }
    });

    // ── Sticky ATC: show when main ATC button scrolls out ──
    const anchor    = $('#pdp-atc-anchor');
    const stickyBar = $('#sticky-atc');
    const stickyBtn = $('#sticky-atc-btn');

    if (anchor && stickyBar) {
      const obs = new IntersectionObserver(([entry]) => {
        stickyBar.classList.toggle('show', !entry.isIntersecting);
        stickyBar.setAttribute('aria-hidden', entry.isIntersecting);
      }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });
      obs.observe(anchor);
    }

    on(stickyBtn, 'click', async () => {
      const varId = parseInt($('#variant-id').value);
      try {
        await window.PawVitalCart.add(varId, qty);
      } catch (err) {
        console.error(err);
      }
    });

    // Initialize
    matchVariant();
  }

  /* ── Accordions (general, not just PDP) ──────────────────── */
  function initAccordions() {
    $$('[data-accordion]').forEach(acc => {
      const head = acc.querySelector('.acc-head');
      if (!head) return;
      on(head, 'click', () => {
        acc.classList.toggle('open');
        head.setAttribute('aria-expanded', acc.classList.contains('open'));
      });
    });
  }

  /* ── Wishlist (local storage) ──────────────────────────────── */
  function initWishlist() {
    const WL_KEY = 'pv_wishlist';
    const getWishlist = () => JSON.parse(localStorage.getItem(WL_KEY) || '[]');
    const saveWishlist = (list) => localStorage.setItem(WL_KEY, JSON.stringify(list));

    function applyWishlistState() {
      const list = getWishlist();
      $$('[data-wishlist]').forEach(btn => {
        const id = btn.dataset.wishlist;
        btn.classList.toggle('active', list.includes(id));
      });
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-wishlist]');
      if (!btn) return;
      e.preventDefault();
      const id   = btn.dataset.wishlist;
      const list = getWishlist();
      const idx  = list.indexOf(id);
      if (idx === -1) list.push(id);
      else list.splice(idx, 1);
      saveWishlist(list);
      applyWishlistState();
    });

    applyWishlistState();
  }

  /* ── Helpers ───────────────────────────────────────────────── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Init ──────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initCart();
    initProductPage();
    initAccordions();
    initWishlist();
  });

})();
