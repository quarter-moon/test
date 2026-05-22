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
