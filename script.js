// Homepage — pick up the actual card, move it into the dossier, put it back.
// One card element throughout: FLIP-style transform between fan and detail slot.
(function () {
  "use strict";

  const table = document.querySelector(".table");
  const scene = document.querySelector(".scene-root");
  const fan = document.querySelector(".fan");
  const detail = document.querySelector(".detail");
  const slot = document.querySelector("#detailSlot");
  const detailClose = document.querySelector("#detailClose");
  const detailPrev = document.querySelector("#detailPrev");
  const detailNext = document.querySelector("#detailNext");
  const hint = document.querySelector(".hint");
  if (!fan || !detail || !slot) return;

  const cards = Array.from(fan.querySelectorAll(".card"));
  const fields = {
    eyebrow: document.querySelector("#dossierEyebrow"),
    counter: document.querySelector("#detailCounter"),
    name: document.querySelector("#detailName"),
    laneIcon: document.querySelector("#detailLaneIcon"),
    role: document.querySelector("#detailRoleText"),
    designation: document.querySelector("#dossierDesignation"),
    primary: document.querySelector("#dossierPrimary"),
    secondary: document.querySelector("#dossierSecondary"),
    mvp: document.querySelector("#dossierMvp"),
    poolCount: document.querySelector("#dossierPoolCount"),
    heroesTop: document.querySelector("#dossierHeroesTop"),
    heroesAll: document.querySelector("#dossierHeroesAll"),
    more: document.querySelector("#dossierMore"),
    moreLabel: document.querySelector("#dossierMoreLabel"),
    source: document.querySelector("#dossierSource"),
    announce: document.querySelector("#detailAnnounce")
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const background = Array.from(document.body.children).filter(function (el) {
    return el !== table && el.tagName !== "SCRIPT";
  });

  let active = null;
  let origin = null;
  let busy = false;

  // Alpha-aware pointer hit testing. One mask per source PNG, built lazily and
  // reused; pointer events only do array lookups, never canvas reads.
  const masks = new Map();
  const hitCanvas = document.createElement("canvas");
  const hitCtx = hitCanvas.getContext("2d", { willReadFrequently: true });

  function maskFor(card) {
    if (masks.has(card)) return masks.get(card);
    const img = card.querySelector("img");
    if (!img || !img.complete || !img.naturalWidth) return null;
    const w = img.naturalWidth, h = img.naturalHeight;
    hitCanvas.width = w; hitCanvas.height = h;
    hitCtx.clearRect(0, 0, w, h);
    hitCtx.drawImage(img, 0, 0);
    const rgba = hitCtx.getImageData(0, 0, w, h).data;
    const mask = new Uint8Array(w * h);
    for (let i = 0; i < mask.length; i++) mask[i] = rgba[i * 4 + 3] > 64 ? 1 : 0;
    const result = { w: w, h: h, mask: mask };
    masks.set(card, result);
    return result;
  }

  function opaqueAt(card, x, y) {
    const b = card.getBoundingClientRect();
    if (x < b.left || x > b.right || y < b.top || y > b.bottom) return false;
    const m = maskFor(card);
    if (!m) return true; // artwork not decoded yet: fall back to the rect
    let u, v;
    let quad = null;
    if (card.getBoxQuads) {
      try { quad = card.getBoxQuads()[0]; } catch (err) { quad = null; }
    }
    if (quad) {
      const p1 = quad.p1, p2 = quad.p2, p4 = quad.p4;
      const ax = p2.x - p1.x, ay = p2.y - p1.y;
      const bx = p4.x - p1.x, by = p4.y - p1.y;
      const det = ax * by - ay * bx;
      if (Math.abs(det) < 1e-6) return true;
      const dx = x + window.scrollX - p1.x, dy = y + window.scrollY - p1.y;
      u = (dx * by - dy * bx) / det;
      v = (ax * dy - ay * dx) / det;
    } else {
      u = (x - b.left) / b.width;
      v = (y - b.top) / b.height;
    }
    if (u < 0 || u > 1 || v < 0 || v > 1) return false;
    const px = Math.min(m.w - 1, Math.max(0, Math.floor(u * m.w)));
    const py = Math.min(m.h - 1, Math.max(0, Math.floor(v * m.h)));
    return m.mask[py * m.w + px] === 1;
  }

  function cardAt(x, y) {
    for (let i = cards.length - 1; i >= 0; i--) {
      if (opaqueAt(cards[i], x, y)) return cards[i];
    }
    return null;
  }

  function setActive(card) {
    cards.forEach(function (c) { c.classList.toggle("is-active", c === card); });
    fan.classList.toggle("is-inspecting", !!card);
  }

  const dataset = (window.AE_S18 && window.AE_S18.players) || [];
  const fmt = function (n) { return Number(n).toFixed(2); };
  const heroEntry = function (h) {
    const src = "assets/dossier/heroes/" + h.slug + ".webp";
    return '<div class="hero-entry"><img src="' + src + '" alt="" width="44" height="44" loading="lazy" decoding="async">'
      + '<span class="hero-entry__info"><span class="hero-entry__name">' + h.label + '</span>'
      + '<span class="hero-entry__meta">' + h.picks + ' games · ' + h.winRate + '% wins</span></span></div>';
  };

  function announcePlayer(card) {
    const p = dataset.find(function (x) { return x.name === card.dataset.name; });
    if (!p || !fields.announce) return;
    fields.announce.textContent = p.name + ", " + p.role + ". " + fmt(p.avg.kda)
      + " average KDA, " + p.avg.kp + " percent kill participation across "
      + p.games + " games. " + p.heroes + " distinct heroes.";
  }

  function render(card) {
    const d = card.dataset;
    const p = dataset.find(function (x) { return x.name === d.name; });
    fields.name.textContent = d.name;
    fields.laneIcon.src = "assets/hero/lane-icons/ai/" + (d.lane || "gold") + ".png";
    fields.role.textContent = d.role;
    fields.designation.textContent = d.name === "Nino" ? "Captain" : "";
    if (p) fields.eyebrow.textContent = p.rank + p.suit + " · THE READ · MPL ID S18";
    fields.counter.textContent = String(cards.indexOf(card) + 1).padStart(2, "0") + " / "
      + String(cards.length).padStart(2, "0");

    if (p) {
      fields.primary.innerHTML =
        '<div class="metric"><span class="metric__value">' + fmt(p.avg.kda) + '</span><span class="metric__label">Avg KDA</span></div>'
        + '<div class="metric"><span class="metric__value">' + p.avg.kp + '%</span><span class="metric__label">Kill participation</span></div>'
        + '<div class="metric"><span class="metric__value">' + p.games + '</span><span class="metric__label">Games played</span></div>';
      fields.secondary.innerHTML =
        '<div class="dossier__line"><span>Average K / D / A</span><strong>' + fmt(p.avg.kills) + ' / ' + fmt(p.avg.deaths) + ' / ' + fmt(p.avg.assists) + '</strong></div>'
        + '<div class="dossier__line"><span>Total K / D / A</span><strong>' + p.total.kills + ' / ' + p.total.deaths + ' / ' + p.total.assists + '</strong></div>'
        + '<div class="dossier__line"><span>Real name</span><strong>' + p.real + '</strong></div>';
      const mvp = p.mvp && p.mvp.points != null;
      fields.mvp.innerHTML = mvp
        ? '<span>MVP points</span><strong>' + p.mvp.points + '</strong><span class="rank">#' + p.mvp.rank + ' league standing</span>'
        : '';
      fields.poolCount.textContent = p.heroes + ' distinct heroes';
      fields.heroesTop.innerHTML = p.pool.slice(0, 4).map(heroEntry).join("");
      fields.heroesAll.innerHTML = p.pool.map(heroEntry).join("");
      fields.moreLabel.textContent = 'View all ' + p.heroes + ' heroes';
      fields.more.open = false;
      fields.source.innerHTML = 'Season 18 data: <a href="https://id-mpl.com/id/statistics" target="_blank" rel="noopener noreferrer">MPL Indonesia statistics</a>, retrieved '
        + (window.AE_S18.retrieved || '') + '. Individual GPM and MVP award counts are not published. MVP points appear only when published in the official standings.';
    }
    cards.forEach(function (c) { c.setAttribute("aria-expanded", String(c === card)); });
    active = card;
  }

  // Move the SAME card between parents and animate geometry + orientation.
  // The artwork carries the fan's baked-in perspective; data-straight is the
  // angle that neutralises it, so the picked-up card finishes upright.
  function fly(card, toSlot, duration) {
    const straight = parseFloat(card.dataset.straight || 0);
    const upright = "rotate(" + straight + "deg)";
    const first = card.getBoundingClientRect();

    if (toSlot) {
      card.style.transform = "";
      slot.appendChild(card);
      card.classList.add("is-flying");
      card.tabIndex = -1;
    } else {
      card.classList.remove("is-flying");
      card.removeAttribute("tabindex");
      fan.appendChild(card);
      // Keep the upright rotation while measuring so the return starts from
      // exactly where the card visually is.
      card.style.transform = upright;
    }

    const last = card.getBoundingClientRect();
    const sx = last.width ? first.width / last.width : 1;
    const sy = last.height ? first.height / last.height : 1;
    // Center-origin FLIP: rotation/scale leave the rect centre in place.
    const dx = first.left - last.left - last.width * (1 - sx) / 2;
    const dy = first.top - last.top - last.height * (1 - sy) / 2;
    const inverse = "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")";
    const destination = toSlot ? upright : "none";

    card.style.transition = "none";
    if (reduce) {
      card.style.transform = toSlot ? upright : "";
      card.style.transition = "";
      return Promise.resolve();
    }
    const anim = card.animate(
      [{ transform: inverse }, { transform: destination }],
      { duration: duration, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "both" }
    );
    return new Promise(function (resolve) {
      let done = false;
      function finish() {
        if (done) return;
        done = true;
        try { anim.cancel(); } catch (err) { /* already finished */ }
        card.style.transform = toSlot ? upright : "";
        card.style.transition = "";
        resolve();
      }
      anim.onfinish = finish;
      // Safety net: a throttled/background tab may not deliver onfinish promptly.
      setTimeout(finish, duration + 320);
    });
  }

  function setBackgroundInert(on) {
    background.forEach(function (el) {
      if (on) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
    if (on) scene.setAttribute("inert", "");
    else scene.removeAttribute("inert");
  }

  function focusables() {
    // Only the tab-accessible controls. The name is focused programmatically
    // and has tabindex="-1", so it must not be part of the wrap cycle.
    return Array.from(detail.querySelectorAll('a[href], button, summary, [tabindex]:not([tabindex="-1"])'))
      .filter(function (el) { return el !== fields.name; });
  }

  function openDetail(card) {
    if (busy || active) return;
    busy = true;
    origin = card;
    render(card);
    setActive(card);
    setBackgroundInert(true);
    document.body.classList.add("is-card-detail");
    table.classList.add("is-detail");
    detail.classList.add("is-open");
    detail.setAttribute("aria-hidden", "false");
    if (hint) { hint.classList.add("is-hidden"); hint.setAttribute("inert", ""); }
    fly(card, true, 560).then(function () {
      detail.classList.add("is-ready");
      announcePlayer(active);
      fields.name.focus();
      busy = false;
    });
  }

  function closeDetail() {
    if (busy || !active) return;
    busy = true;
    const card = active;
    detail.classList.remove("is-ready");
    detail.classList.add("is-leaving");
    table.classList.remove("is-detail");
    fly(card, false, 440).then(function () {
      detail.classList.remove("is-open", "is-leaving");
      detail.setAttribute("aria-hidden", "true");
      setBackgroundInert(false);
      document.body.classList.remove("is-card-detail");
      if (hint) { hint.classList.remove("is-hidden"); hint.removeAttribute("inert"); }
      setActive(null);
      cards.forEach(function (c) { c.setAttribute("aria-expanded", "false"); });
      active = null;
      if (origin) origin.focus();
      origin = null;
      busy = false;
    });
  }

  function step(dir) {
    if (busy || !active) return;
    busy = true;
    const i = cards.indexOf(active);
    const next = cards[(i + dir + cards.length) % cards.length];
    detail.classList.remove("is-ready");
    detail.classList.add("is-leaving");
    fly(active, false, 300).then(function () {
      render(next);
      origin = next;
      setActive(next);
      detail.classList.remove("is-leaving");
      return fly(next, true, 460);
    }).then(function () {
      detail.classList.add("is-ready");
      announcePlayer(active);
      fields.name.focus();
      busy = false;
    });
  }

  let lastPointer = null;
  let pointerQueued = false;
  fan.addEventListener("pointermove", function (e) {
    if (active || detail.classList.contains("is-open")) return;
    lastPointer = { x: e.clientX, y: e.clientY };
    if (pointerQueued) return;
    pointerQueued = true;
    requestAnimationFrame(function () {
      pointerQueued = false;
      if (!lastPointer || active || !fan.matches(":hover")) return;
      setActive(cardAt(lastPointer.x, lastPointer.y));
    });
  }, { passive: true });
  fan.addEventListener("pointerleave", function () {
    lastPointer = null;
    if (!active) setActive(null);
  });
  fan.addEventListener("focusin", function (e) {
    // Restoring focus to the returned card must not re-enter the dimmed
    // inspecting state; CSS :focus-visible already highlights it.
    if (!detail.classList.contains("is-open")) return;
    const c = e.target.closest(".card");
    if (c && !active) setActive(c);
  });
  fan.addEventListener("click", function (e) {
    // Keyboard activation reports detail 0 and no useful point; use the target.
    const c = e.detail === 0 ? e.target.closest(".card") : cardAt(e.clientX, e.clientY);
    if (c) openDetail(c);
  });

  if (detailClose) detailClose.addEventListener("click", closeDetail);
  if (detailPrev) detailPrev.addEventListener("click", function () { step(-1); });
  if (detailNext) detailNext.addEventListener("click", function () { step(1); });
  detail.addEventListener("click", function (e) {
    if (e.target === detail) closeDetail();
  });

  document.addEventListener("keydown", function (e) {
    if (!detail.classList.contains("is-open")) return;
    if (e.key === "Escape") { e.preventDefault(); closeDetail(); return; }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); return; }
    if (e.key !== "Tab") return;
    const list = focusables();
    const idx = list.indexOf(document.activeElement);
    if (idx === -1) {
      e.preventDefault();
      (e.shiftKey ? list[list.length - 1] : list[0]).focus();
      return;
    }
    if (e.shiftKey && idx === 0) { e.preventDefault(); list[list.length - 1].focus(); }
    else if (!e.shiftKey && idx === list.length - 1) { e.preventDefault(); list[0].focus(); }
  });

  if (scene && table && !reduce) {
    table.addEventListener("pointerenter", function () { scene.classList.add("is-tilted"); }, { passive: true });
    table.addEventListener("pointerleave", function () { scene.classList.remove("is-tilted"); }, { passive: true });
  }
})();
