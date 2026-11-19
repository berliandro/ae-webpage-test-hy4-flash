// Purposeful motion: reveal content as it enters the viewport and keep
// interactive feedback crisp. Content stays visible when JS is unavailable.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Dealing cards / sliding rows / lifting sections — one vocabulary, three materials.
  var GROUPS = [
    { sel: ".player-tile", type: "deal" },
    { sel: ".sub-card", type: "deal" },
    { sel: ".result-row", type: "line" },
    { sel: ".stat", type: "line" },
    { sel: ".timeline-item", type: "line" },
    { sel: ".channel-row", type: "line" },
    { sel: ".stock-card", type: "rise" },
    { sel: ".video-grid > div", type: "rise" },
    { sel: ".section-head", type: "rise" },
    { sel: ".page-title, .page-deck", type: "rise" },
    { sel: ".prose", type: "rise" },
    { sel: ".home-intro > *", type: "rise" },
    { sel: ".action-link", type: "rise" }
  ];

  var seen = new Set();
  var targets = [];

  GROUPS.forEach(function (group) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(group.sel));
    nodes.forEach(function (node, i) {
      if (seen.has(node)) return;
      seen.add(node);
      node.classList.add("reveal", "reveal--" + group.type);
      // Cap the stagger so nobody waits on a long list.
      node.style.setProperty("--reveal-delay", Math.min(i, 6) * 55 + "ms");
      targets.push(node);
    });
  });

  if (reduce || !("IntersectionObserver" in window)) {
    root.classList.add("js-motion");
    targets.forEach(function (node) { node.classList.add("is-revealed"); });
    return;
  }

  root.classList.add("js-motion");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      io.unobserve(entry.target);
    });
    // A jump-scroll (anchor, restore, find-in-page) can skip a section entirely.
    // Anything at or above the current viewport must be visible too.
    targets.forEach(function (node) {
      if (node.classList.contains("is-revealed")) return;
      if (node.getBoundingClientRect().top < window.innerHeight) {
        node.classList.add("is-revealed");
        io.unobserve(node);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  targets.forEach(function (node) { io.observe(node); });
})();
