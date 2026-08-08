/* =========================================================
   Digital & Gear - Affiliate Source Tracking
   ---------------------------------------------------------
   Purpose:
   - Detect Pinterest traffic from UTM parameters or referrer.
   - Persist the source for the current browser session.
   - Use the Pinterest Amazon Associates Tracking ID only
     when the visitor arrived from Pinterest.
   - Keep the normal Tracking ID for all other traffic.
   ========================================================= */

(function () {
  'use strict';

  var DEFAULT_TAG = 'dahao8778-20';
  var PINTEREST_TAG = 'digitalgearpin-20';
  var STORAGE_KEY = 'dg_affiliate_source';
  var PINTEREST_SOURCES = ['pinterest', 'pin', 'pinterest.com', 'pin.it'];

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function isPinterestSource(value) {
    var source = normalize(value);
    if (!source) return false;
    return PINTEREST_SOURCES.some(function (item) {
      return source === item || source.indexOf(item + '.') === 0;
    });
  }

  function detectSource() {
    var params = new URLSearchParams(window.location.search);
    var utmSource = normalize(params.get('utm_source'));

    if (isPinterestSource(utmSource)) {
      return 'pinterest';
    }

    var referrer = normalize(document.referrer);
    if (referrer) {
      try {
        var refHost = normalize(new URL(referrer).hostname);
        if (refHost === 'pinterest.com' ||
            refHost.endsWith('.pinterest.com') ||
            refHost === 'pin.it' ||
            refHost.endsWith('.pin.it')) {
          return 'pinterest';
        }
      } catch (e) {
        // Ignore malformed referrer values.
      }
    }

    return null;
  }

  function getSource() {
    var detected = detectSource();

    if (detected) {
      try {
        sessionStorage.setItem(STORAGE_KEY, detected);
      } catch (e) {
        // Storage can be unavailable in private/restricted contexts.
      }
      return detected;
    }

    try {
      return sessionStorage.getItem(STORAGE_KEY) || 'default';
    } catch (e) {
      return 'default';
    }
  }

  function getAffiliateTag() {
    return getSource() === 'pinterest' ? PINTEREST_TAG : DEFAULT_TAG;
  }

  function isAmazonUrl(href) {
    try {
      var url = new URL(href, window.location.href);
      return url.hostname === 'amazon.com' ||
             url.hostname.endsWith('.amazon.com');
    } catch (e) {
      return false;
    }
  }

  function rewriteAmazonLink(link) {
    if (!link || !link.href || !isAmazonUrl(link.href)) return;

    try {
      var url = new URL(link.href, window.location.href);

      // Only rewrite Amazon links. All other query parameters are preserved.
      url.searchParams.set('tag', getAffiliateTag());

      link.href = url.toString();
      link.setAttribute('data-affiliate-tracked', 'true');
      link.setAttribute('data-affiliate-source', getSource());
    } catch (e) {
      // Leave the original link untouched if URL parsing fails.
    }
  }

  function rewriteAmazonLinks(root) {
    var container = root || document;

    if (container.nodeType === 1 && container.matches && container.matches('a[href]')) {
      rewriteAmazonLink(container);
    }

    var links = container.querySelectorAll ? container.querySelectorAll('a[href]') : [];
    Array.prototype.forEach.call(links, rewriteAmazonLink);
  }

  function init() {
    var source = getSource();

    // Make the current source visible for analytics/debugging.
    document.documentElement.setAttribute('data-affiliate-source', source);
    document.documentElement.setAttribute(
      'data-affiliate-tag',
      source === 'pinterest' ? PINTEREST_TAG : DEFAULT_TAG
    );

    rewriteAmazonLinks(document);

    // Finder results and other dynamic components may add Amazon links later.
    if (window.MutationObserver) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, function (node) {
            if (node.nodeType === 1) {
              rewriteAmazonLinks(node);
            }
          });
        });
      });

      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Optional public helpers for future analytics/debugging.
  window.DigitalGearAffiliate = {
    getSource: getSource,
    getAffiliateTag: getAffiliateTag,
    isPinterest: function () {
      return getSource() === 'pinterest';
    }
  };
})();
