// Reusable four-point card typography warp.
//
// The player-card PNGs contain a tilted, perspective-distorted playing card
// inside a rectangular, transparent canvas. A CSS rotate() cannot follow that
// geometry. Here each card's four real corners are measured once in the PNG's
// own pixel space and a homography maps an upright [0,1]² card surface onto
// them. The text plane inherits that matrix, so the name and lane lines stay
// printed on the card at any size, on hover and on mobile.
(function () {
  "use strict";

  // Upright card surface: top-left, top-right, bottom-right, bottom-left.
  var CANON = [[0, 0], [1, 0], [1, 1], [0, 1]];

  function solveLinear(A, b) {
    var n = b.length, i, r, c;
    var M = A.map(function (row, idx) { return row.concat([b[idx]]); });
    for (c = 0; c < n; c++) {
      var pivot = c;
      for (r = c + 1; r < n; r++) {
        if (Math.abs(M[r][c]) > Math.abs(M[pivot][c])) pivot = r;
      }
      if (Math.abs(M[pivot][c]) < 1e-12) return null;
      var tmp = M[c]; M[c] = M[pivot]; M[pivot] = tmp;
      var d = M[c][c];
      for (i = c; i <= n; i++) M[c][i] /= d;
      for (r = 0; r < n; r++) {
        if (r === c) continue;
        var f = M[r][c];
        if (!f) continue;
        for (i = c; i <= n; i++) M[r][i] -= f * M[c][i];
      }
    }
    return M.map(function (row) { return row[n]; });
  }

  function homography(src, dst) {
    var A = [], b = [];
    for (var i = 0; i < src.length; i++) {
      var u = src[i][0], v = src[i][1], x = dst[i][0], y = dst[i][1];
      A.push([u, v, 1, 0, 0, 0, -x * u, -x * v]); b.push(x);
      A.push([0, 0, 0, u, v, 1, -y * u, -y * v]); b.push(y);
    }
    var h = solveLinear(A, b);
    if (!h) return null;
    return [[h[0], h[1], h[2]], [h[3], h[4], h[5]], [h[6], h[7], 1]];
  }

  // Re-express the normalised homography in the plane's pixel space. matrix3d
  // is column-major; these entries apply the same map to local px coordinates.
  function toMatrix3d(H, w, h) {
    var a = H[0][0], b = H[0][1], c = H[0][2];
    var d = H[1][0], e = H[1][1], f = H[1][2];
    var g = H[2][0], k = H[2][1];
    var m = [
      a,     d * h / w, 0, g / w,
      b * w / h, e,     0, k / h,
      0,     0,         1, 0,
      c * w, f * h,     0, 1
    ];
    return "matrix3d(" + m.map(function (n) {
      return Math.abs(n) < 1e-9 ? 0 : +n.toFixed(6);
    }).join(",") + ")";
  }

  function parseCorners(raw) {
    if (!raw) return null;
    var pts = raw.trim().split(/\s+/).map(function (s) {
      return s.split(",").map(Number);
    });
    if (pts.length !== 4) return null;
    for (var i = 0; i < 4; i++) {
      if (pts[i].length !== 2 || pts[i].some(function (n) { return !isFinite(n); })) return null;
    }
    return pts;
  }

  function apply() {
    var planes = document.querySelectorAll(".card__plane");
    Array.prototype.forEach.call(planes, function (plane) {
      var card = plane.parentElement;
      if (!card) return;
      var pts = parseCorners(card.getAttribute("data-corners"));
      var anchor = (card.getAttribute("data-anchor") || "").split(",").map(Number);
      if (!pts || anchor.length !== 2 || anchor.some(function (n) { return !isFinite(n); })) return;
      var w = plane.offsetWidth, h = plane.offsetHeight;
      if (!w || !h) return;
      var H = homography(CANON, pts);
      if (!H) return;
      plane.style.transform = toMatrix3d(H, w, h);
      plane.style.setProperty("--label-x", (anchor[0] * 100).toFixed(2) + "%");
      plane.style.setProperty("--label-y", (anchor[1] * 100).toFixed(2) + "%");
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; apply(); });
  }

  function init() {
    apply();
    window.addEventListener("resize", schedule, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
