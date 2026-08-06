/* =========================
   Digital & Gear - Component System
   Injects shared UI elements across all pages
   ========================= */

(function () {
  'use strict';

  // Detect page depth to build correct relative paths
  function getBasePath() {
    var path = window.location.pathname;
    var match = path.match(/\/(?:categories|reviews|guides)\/[^/]+\//);
    if (match) return '../../';
    if (/\/(?:categories|reviews|guides)\//.test(path)) return '../';
    return '';
  }

  var base = getBasePath();

  // Affiliate disclosure bar template (top of every page)
  var disclosureBar =
    '<div class="affiliate-disclosure" role="note">' +
      '<div class="container">' +
      '<span class="disclosure-icon">⚠️</span>' +
      '<span class="disclosure-text">' +
      'Digital &amp; Gear is reader-supported. As an Amazon Associate, we earn from qualifying purchases.' +
      '</span>' +
      '</div>' +
      '</div>';

  // Inject disclosure bar right after <body> open
  function injectDisclosure() {
    var body = document.body;
    if (!body) return;
    if (body.querySelector('.affiliate-disclosure')) return;
    var temp = document.createElement('div');
    temp.innerHTML = disclosureBar;
    body.insertBefore(temp.firstChild, body.firstChild);
  }

  // Inject lazy loading + width/height for all below-fold images
  function optimizeImages() {
    var images = document.querySelectorAll('img');

    images.forEach(function (img) {
      // Skip if already optimized
      if (img.hasAttribute('data-optimized')) return;

      // Skip hero images (above the fold)
      if (img.classList.contains('hero-image') ||
          img.classList.contains('review-image') ||
          img.closest('.article-hero') ||
          img.closest('.hero')) {
        img.setAttribute('data-optimized', 'true');
        return;
      }

      // Skip Pinterest / OG images
      if (img.closest('.og-image-check')) {
        img.setAttribute('data-optimized', 'true');
        return;
      }

      // Set width/height if not present (prevents CLS)
      var w = img.getAttribute('width');
      var h = img.getAttribute('height');
      if (!w || !h) {
        img.setAttribute('width', '400');
        img.setAttribute('height', '400');
      }

      // Lazy load for all non-hero images
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');

      img.setAttribute('data-optimized', 'true');
    });
  }

  // Adjust sticky header top position to account for disclosure bar
  function adjustHeaderOffset() {
    var disclosure = document.querySelector('.affiliate-disclosure');
    var header = document.querySelector('.site-header');
    if (!disclosure || !header) return;

    var height = disclosure.offsetHeight;
    if (height > 0) {
      header.style.top = height + 'px';
    }
  }

  // Run on DOM ready
  function init() {
    injectDisclosure();

    // Adjust header after disclosure is rendered
    requestAnimationFrame(function () {
      adjustHeaderOffset();
    });

    // Re-optimize images
    requestAnimationFrame(function () {
      optimizeImages();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-optimize on window resize (in case images moved)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      adjustHeaderOffset();
      optimizeImages();
    }, 300);
  });

  // Also adjust after full load (fonts/images may affect layout)
  window.addEventListener('load', function () {
    setTimeout(adjustHeaderOffset, 100);
  });

})();