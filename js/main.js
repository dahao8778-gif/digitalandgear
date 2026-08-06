/* =================================
   Digital & Gear
   Main JavaScript
   Full interactive landing page logic
   ================================= */

document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // 1. Smooth Scroll (anchor links)
  // =========================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80; // sticky header space
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav after tapping link
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.remove('active');
      }
    });
  });

  // =========================
  // 2. Image Lazy Loading
  // =========================
  const images = document.querySelectorAll('img');
  images.forEach(function (img) {
    // Skip review-image (product images that need immediate loading)
    if (img.classList.contains('review-image')) return;
    // Skip images that already have explicit loading attribute
    if (img.hasAttribute('loading') && img.getAttribute('loading') !== 'lazy') return;
    img.loading = 'lazy';
    img.decoding = 'async';
  });

  // =========================
  // 3. Amazon CTA Click Tracking
  // =========================
  const amazonButtons = document.querySelectorAll('.amazon-btn, .mini-cta');
  amazonButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const link = this.href || this.closest('a').href;
      // Analytics hook (uncomment & configure when needed):
      // if (typeof gtag !== 'undefined') {
      //   gtag('event', 'affiliate_click', {
      //     event_category: 'Outbound',
      //     event_label: link
      //   });
      // }
      // if (typeof fbq !== 'undefined') {
      //   fbq('track', 'InitiateCheckout', { content_category: 'Air Purifier' });
      // }
    });
  });

  // =========================
  // 4. Fade-Up On Scroll (IntersectionObserver)
  // =========================
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger effect for siblings
          const delay = (index % 4) * 0.08;
          entry.target.style.transitionDelay = delay + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeElements.forEach(function (el) { fadeObserver.observe(el); });

  // Product cards hover effect — subtle scale
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(function (card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.transition = 'all 0.5s ease';
  });

  // =========================
  // 5. FAQ Accordion
  // =========================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    // Support both old structure (h3) and new structure (button.faq-question)
    const header = item.querySelector('.faq-question') || item.querySelector('h3');
    if (!header) return;

    header.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all others (single-open behavior)
      faqItems.forEach(function (i) { i.classList.remove('open'); });

      // Toggle clicked item
      if (!isOpen) item.classList.add('open');
    });
  });

  // Open the first FAQ item by default
  if (faqItems[0]) faqItems[0].classList.add('open');

  // =========================
  // 6. Mobile Hamburger Menu
  // =========================
  // Support both landing page (#hamburger / #mobileNav) and review page (#menuToggle / #navLinks)
  const hamburger = document.getElementById('hamburger') || document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav') || document.getElementById('navLinks');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
      hamburger.classList.toggle('active');

      // Animate hamburger for landing page (3 bars)
      const spans = hamburger.querySelectorAll('span');
      if (spans.length >= 3) {
        if (hamburger.classList.contains('active')) {
          spans[0].style.transform = 'translateY(8px) rotate(45deg)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      }
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('active') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        if (spans.length >= 3) {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      }
    });
  }

  // =========================
  // 7. Sticky Mobile CTA Bar
  //    Show after scroll past hero
  // =========================
  const mobileCta = document.getElementById('mobileCta');
  const heroSection = document.querySelector('.hero');

  function updateMobileCtaVisibility() {
    if (!mobileCta || !heroSection) return;
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      mobileCta.classList.add('active');
    } else {
      mobileCta.classList.remove('active');
    }
  }

  window.addEventListener('scroll', updateMobileCtaVisibility, { passive: true });
  updateMobileCtaVisibility();

  // =========================
  // 8. Social Share Buttons
  // =========================
  const shareButtons = document.querySelectorAll('.share-btn');
  const pageUrl = encodeURIComponent(window.location.href);
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  const pageTitle = encodeURIComponent(
    (ogTitleMeta && ogTitleMeta.content) || document.title
  );

  shareButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-share');
      let shareUrl = '';

      switch (type) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
          break;
        case 'pinterest':
          const ogImage = document.querySelector('meta[property="og:image"]');
          const imageUrl = encodeURIComponent(ogImage ? ogImage.content : '');
          shareUrl = `https://pinterest.com/pin/create/button/?url=${pageUrl}&media=${imageUrl}&description=${pageTitle}`;
          break;
        case 'email':
          const emailSubject = encodeURIComponent('Check out this air purifier guide!');
          const emailBody = encodeURIComponent(
            `I found this helpful guide to the best air purifiers — thought you might like it:\n\n${window.location.href}`
          );
          shareUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;
          window.location.href = shareUrl;
          return; // mailto doesn't need window.open
      }

      if (shareUrl) {
        window.open(
          shareUrl,
          'share-window',
          'width=600,height=500,scrollbars=yes,resizable=yes,noopener,noreferrer'
        );
      }

    });
  });

  // =========================
  // 9. Sticky Header Shadow on Scroll
  // =========================
  const header = document.querySelector('.site-header');
  function updateHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.06)';
    }
  }
  window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  // =========================
  // 10. Year auto-update in footer copyright
  // =========================
  const copyrightEl = document.querySelector('.copyright');
  if (copyrightEl) {
    const currentYear = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace(
      /© (\d{4})/,
      `© ${currentYear}`
    );
  }

  // =========================
  // 11. Categories Dropdown Menu
  // =========================
  (function () {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    function closeAll() {
      dropdowns.forEach(function (dd) {
        dd.classList.remove('active');
      });
    }

    dropdowns.forEach(function (dd) {
      const trigger = dd.querySelector(':scope > a');
      const subLinks = dd.querySelectorAll('.dropdown-menu a');

      // Append "View All Categories" link dynamically (skip if already in HTML)
      const menu = dd.querySelector('.dropdown-menu');
      const existingViewAll = menu ? menu.querySelector('.dropdown-view-all') : null;
      if (menu && trigger && !existingViewAll) {
        const viewAll = document.createElement('a');
        viewAll.href = trigger.href;
        viewAll.className = 'dropdown-view-all';
        viewAll.innerHTML = 'View All Categories →';
        menu.insertBefore(viewAll, menu.firstChild);
      }

      if (trigger) {
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          const wasActive = dd.classList.contains('active');
          closeAll();
          if (!wasActive) dd.classList.add('active');
        });
      }

      // Handle clicks on dropdown links (including View All)
      dd.querySelectorAll('.dropdown-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
          dd.classList.remove('active');
        });
      });
    });

    document.addEventListener('click', function (e) {
      let clickedInside = false;
      dropdowns.forEach(function (dd) {
        if (dd.contains(e.target)) clickedInside = true;
      });
      if (!clickedInside) closeAll();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  })();

  // =========================
  // 12. Handle disabled / href="#" links
  // =========================
  (function () {
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      if (link.classList.contains('disabled')) {
        var span = document.createElement('span');
        span.className = link.className;
        span.innerHTML = link.innerHTML;
        span.setAttribute('title', 'Coming Soon — Content under development');
        span.style.cursor = 'not-allowed';
        span.style.opacity = '0.6';
        if (link.parentNode) {
          link.parentNode.replaceChild(span, link);
        }
      } else {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    });
  })();

});
