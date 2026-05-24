/* VELA Studio — Main JavaScript */
'use strict';

// ── Theme Object ────────────────────────────────────
const VELA = {
  init() {
    this.header();
    this.mobileNav();
    this.cartDrawer();
    this.productGallery();
    this.variants();
    this.accordion();
    this.search();
    this.fadeInView();
    this.announcement();
  },

  // ── Sticky Header ─────────────────────────────────
  header() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const THRESHOLD = 80;

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > THRESHOLD) {
        header.classList.add('header--scrolled');
        if (scroll > lastScroll + 5) header.classList.add('header--hidden');
        else if (scroll < lastScroll - 5) header.classList.remove('header--hidden');
      } else {
        header.classList.remove('header--scrolled', 'header--hidden');
      }
      lastScroll = scroll;
    }, { passive: true });
  },

  // ── Mobile Navigation ─────────────────────────────
  mobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    const close = document.querySelector('.mobile-nav-close');
    if (!toggle || !nav) return;

    const open = () => {
      nav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', open);
    if (close) close.addEventListener('click', closeNav);

    nav.addEventListener('click', (e) => {
      if (e.target === nav) closeNav();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  },

  // ── Cart Drawer ────────────────────────────────────
  cartDrawer() {
    const cartBtn = document.querySelectorAll('[data-cart-open]');
    const drawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-overlay');
    const closeBtn = document.querySelector('.cart-drawer-close');
    if (!drawer) return;

    const open = () => {
      drawer.classList.add('is-open');
      overlay?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      drawer.classList.remove('is-open');
      overlay?.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    cartBtn.forEach(btn => btn.addEventListener('click', open));
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Qty buttons
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const numEl = btn.parentElement.querySelector('.qty-num');
        let qty = parseInt(numEl.textContent);
        if (action === 'plus') qty++;
        else if (action === 'minus' && qty > 1) qty--;
        numEl.textContent = qty;
      });
    });
  },

  // ── Product Gallery ────────────────────────────────
  productGallery() {
    const thumbs = document.querySelectorAll('.product-gallery-thumb');
    const mainImg = document.querySelector('.product-gallery-main img');
    if (!thumbs.length || !mainImg) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        const srcset = thumb.dataset.srcset;
        if (src) mainImg.src = src;
        if (srcset) mainImg.srcset = srcset;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  },

  // ── Variant Selection ──────────────────────────────
  variants() {
    const variantBtns = document.querySelectorAll('.variant-btn, .color-swatch-btn');
    variantBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.variant-btns, .color-swatches');
        group?.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const label = btn.closest('.product-option')?.querySelector('.product-option-selected');
        if (label) label.textContent = btn.dataset.value || btn.title || '';
      });
    });
  },

  // ── Accordion ─────────────────────────────────────
  accordion() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
        trigger.setAttribute('aria-expanded', !isOpen);
      });
    });
  },

  // ── Search ────────────────────────────────────────
  search() {
    const searchOpen = document.querySelectorAll('[data-search-open]');
    const searchBar = document.querySelector('.search-bar');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    if (!searchBar) return;

    const open = () => {
      searchBar.classList.add('is-open');
      searchInput?.focus();
    };

    const close = () => searchBar.classList.remove('is-open');

    searchOpen.forEach(btn => btn.addEventListener('click', open));
    searchClose?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
    });
  },

  // ── Scroll Fade-In ─────────────────────────────────
  fadeInView() {
    const els = document.querySelectorAll('.fade-up');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  },

  // ── Announcement dismissal ─────────────────────────
  announcement() {
    const bar = document.querySelector('.announcement-bar');
    const dismiss = document.querySelector('[data-dismiss-announcement]');
    if (!dismiss || !bar) return;
    dismiss.addEventListener('click', () => {
      bar.remove();
      sessionStorage.setItem('vela_ann_dismissed', '1');
    });
    if (sessionStorage.getItem('vela_ann_dismissed')) bar.remove();
  },

  // ── Dark mode toggle ──────────────────────────────
  themeToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    const root = document.documentElement;
    const saved = localStorage.getItem('vela_theme') || 'light';
    root.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('vela_theme', next);
    });
  }
};

// ── Cart API Helpers ─────────────────────────────────
const CartAPI = {
  async addItem(variantId, quantity = 1) {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });
    return res.json();
  },

  async getCart() {
    const res = await fetch('/cart.js');
    return res.json();
  },

  async updateItem(key, quantity) {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity })
    });
    return res.json();
  },

  updateCartCount(count) {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ── Add to Cart Form ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  VELA.init();
  VELA.themeToggle();

  const form = document.querySelector('[data-product-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.product-add-btn');
      const variantInput = form.querySelector('[name="id"]');
      if (!variantInput) return;

      btn.disabled = true;
      btn.textContent = 'Adding...';

      try {
        await CartAPI.addItem(variantInput.value);
        const cart = await CartAPI.getCart();
        CartAPI.updateCartCount(cart.item_count);

        btn.textContent = 'Added to Bag';
        setTimeout(() => {
          btn.textContent = 'Add to Bag';
          btn.disabled = false;
        }, 2000);

        // Open drawer
        document.querySelector('.cart-drawer')?.classList.add('is-open');
        document.querySelector('.cart-overlay')?.classList.add('is-open');
      } catch (err) {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
      }
    });
  }
});

// ── Quick Add ─────────────────────────────────────────
async function velaQuickAdd(btn) {
  const variantId = btn.dataset.quickAdd;
  if (!variantId) return;

  const prev = btn.textContent;
  btn.textContent = '...';
  btn.disabled = true;

  try {
    await CartAPI.addItem(variantId);
    const cart = await CartAPI.getCart();
    CartAPI.updateCartCount(cart.item_count);

    btn.textContent = '✓';
    setTimeout(() => {
      btn.textContent = prev;
      btn.disabled = false;
    }, 1400);

    document.querySelector('.cart-drawer')?.classList.add('is-open');
    document.querySelector('.cart-overlay')?.classList.add('is-open');
  } catch {
    btn.textContent = prev;
    btn.disabled = false;
  }
}

// ── Product Page (pd-*) ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  pdPage.init();
});

const pdPage = {
  qty: 1,
  selectedOptions: {},

  init() {
    if (!document.querySelector('.pd-wrap')) return;
    this.thumbRail();
    this.mobileSwipe();
    this.zoomLightbox();
    this.optionSelectors();
    this.quantityStepper();
    this.addToCart();
    this.wishlist();
  },

  // Mobile scroll-snap dot indicator
  mobileSwipe() {
    const track = document.getElementById('pd-mobile-track');
    const dots = document.querySelectorAll('.pd-mobile-dot');
    if (!track || !dots.length) return;

    const slides = track.querySelectorAll('.pd-mobile-slide');
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    }, { passive: true });

    dots.forEach((dot, i) => {
      dot.style.pointerEvents = 'all';
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        slides[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      });
    });
  },

  // Thumbnail rail sync
  thumbRail() {
    const thumbs = document.querySelectorAll('.pd-thumb');
    const gridImgs = document.querySelectorAll('.pd-grid-img, .pd-panoramic-img');
    if (!thumbs.length) return;

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');

        // Scroll to corresponding image
        const target = gridImgs[i];
        if (target) {
          target.closest('.pd-grid-cell, .pd-panoramic')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  },

  // Zoom lightbox
  zoomLightbox() {
    const overlay = document.getElementById('pd-zoom');
    const zoomImg = document.getElementById('pd-zoom-img');
    const closeBtn = document.getElementById('pd-zoom-close');
    if (!overlay) return;

    const openZoom = (src) => {
      zoomImg.src = src;
      overlay.classList.add('is-open');
      overlay.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
    };

    const closeZoom = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => { zoomImg.src = ''; }, 300);
    };

    document.querySelectorAll('[data-zoom]').forEach(img => {
      img.addEventListener('click', () => openZoom(img.dataset.zoom));
    });

    closeBtn?.addEventListener('click', closeZoom);
    zoomImg?.addEventListener('click', closeZoom);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeZoom(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeZoom(); });
  },

  // Colour/size/option selectors
  optionSelectors() {
    const variantIdInput = document.getElementById('pd-variant-id');
    const addBtn = document.getElementById('pd-add-btn');
    const addLabel = document.getElementById('pd-add-label');
    if (!variantIdInput) return;

    // Get all variants from the page (Shopify embeds JSON)
    let variants = [];
    const variantJson = document.querySelector('[data-product-variants]');
    if (variantJson) {
      try { variants = JSON.parse(variantJson.textContent); } catch {}
    }

    document.querySelectorAll('.pd-swatch, .pd-size').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-oos')) return;

        const optionPos = parseInt(btn.dataset.pdOption);
        const val = btn.dataset.value;

        // Update button states within same option group
        const siblings = document.querySelectorAll(`[data-pd-option="${optionPos}"]`);
        siblings.forEach(s => {
          s.classList.remove('is-active');
          s.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        // Update label for colour swatches
        const colourLabel = document.getElementById('pd-colour-label');
        if (btn.classList.contains('pd-swatch') && colourLabel) {
          colourLabel.textContent = val;
        }

        // Try to find matching variant
        if (variants.length) {
          this.updateVariant(variants, variantIdInput, addBtn, addLabel);
        }
      });
    });
  },

  updateVariant(variants, variantInput, addBtn, addLabel) {
    const activeOptions = [];
    for (let pos = 1; pos <= 3; pos++) {
      const active = document.querySelector(`[data-pd-option="${pos}"].is-active`);
      if (active) activeOptions.push(active.dataset.value);
    }

    const match = variants.find(v => {
      return activeOptions.every((opt, i) => v['option' + (i + 1)] === opt);
    });

    if (match && variantInput) {
      variantInput.value = match.id;
      if (addBtn && addLabel) {
        if (match.available) {
          addBtn.disabled = false;
          addBtn.classList.remove('pd-add-btn--oos');
          addLabel.textContent = 'Add to Bag';
        } else {
          addBtn.disabled = true;
          addBtn.classList.add('pd-add-btn--oos');
          addLabel.textContent = 'Sold Out';
        }
      }
    }
  },

  // Quantity stepper
  quantityStepper() {
    const minusBtn = document.querySelector('.pd-qty-btn[data-action="minus"]');
    const plusBtn = document.querySelector('.pd-qty-btn[data-action="plus"]');
    const display = document.getElementById('pd-qty-display');
    const input = document.getElementById('pd-qty-input');
    if (!display) return;

    const update = (n) => {
      this.qty = Math.max(1, Math.min(10, n));
      display.textContent = this.qty;
      if (input) input.value = this.qty;
    };

    minusBtn?.addEventListener('click', () => update(this.qty - 1));
    plusBtn?.addEventListener('click', () => update(this.qty + 1));
  },

  // Add to cart (new pd-* form)
  addToCart() {
    const form = document.getElementById('product-form');
    const addBtn = document.getElementById('pd-add-btn');
    const addLabel = document.getElementById('pd-add-label');
    if (!form || !addBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const variantId = document.getElementById('pd-variant-id')?.value;
      if (!variantId) return;

      addBtn.disabled = true;
      if (addLabel) addLabel.textContent = 'Adding...';

      try {
        await CartAPI.addItem(variantId, this.qty);
        const cart = await CartAPI.getCart();
        CartAPI.updateCartCount(cart.item_count);

        if (addLabel) addLabel.textContent = 'Added ✓';
        setTimeout(() => {
          if (addLabel) addLabel.textContent = 'Add to Bag';
          addBtn.disabled = false;
        }, 2000);

        document.querySelector('.cart-drawer')?.classList.add('is-open');
        document.querySelector('.cart-overlay')?.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } catch {
        if (addLabel) addLabel.textContent = 'Error — Retry';
        addBtn.disabled = false;
        setTimeout(() => {
          if (addLabel) addLabel.textContent = 'Add to Bag';
        }, 2000);
      }
    });
  },

  // Wishlist toggle
  wishlist() {
    const btn = document.querySelector('.pd-wish-btn');
    if (!btn) return;
    const productId = btn.dataset.productId;
    const key = `vela_wish_${productId}`;
    if (localStorage.getItem(key)) btn.classList.add('is-wished');

    btn.addEventListener('click', () => {
      const wished = btn.classList.toggle('is-wished');
      if (wished) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    });
  }
};
