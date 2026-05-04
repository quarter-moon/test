/* GAPTEC theme – minimal JS */

(function () {
  'use strict';

  // Scroll-reveal via IntersectionObserver
  function initReveal() {
    var els = document.querySelectorAll('.gaptec-reveal');
    if (!els.length || !window.IntersectionObserver) {
      // Fallback: show everything immediately
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // Sticky header shadow on scroll
  function initStickyHeader() {
    var header = document.querySelector('.site-header, header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initStickyHeader();
  });

})();
