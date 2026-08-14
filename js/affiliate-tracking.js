/* =========================================================
   Digital & Gear - Affiliate Link Helper
   ---------------------------------------------------------
   Purpose:
   - Ensure Amazon affiliate links use the correct tracking ID.
   - Rewrite dynamically inserted links (e.g. finder results).
   ========================================================= */

(function () {
  'use strict';

  var DEFAULT_TAG = 'dahao8778-20';

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
      url.searchParams.set('tag', DEFAULT_TAG);
      link.href = url.toString();
      link.setAttribute('data-affiliate-tracked', 'true');
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
    rewriteAmazonLinks(document);

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
})();
