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
  const announce = document.querySelector("#detailAnnounce");
  const hint = document.querySelector(".hint");
  if (!fan || !detail || !slot) return;

  const cards = Array.from(fan.querySelectorAll(".card"));
  const fields = {
    rank: document.querySelector("#detailRank"),
    name: document.querySelector("#detailName"),
    laneIcon: document.querySelector("#detailLaneIcon"),
    role: document.querySelector("#detailRoleText"),
    real: document.querySelector("#detailReal"),
    born: document.querySelector("#detailBorn"),
    heroes: document.querySelector("#detailHeroes")
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const background = Array.from(document.body.children).filter(function (el) {
    return el !== table && el.tagName !== "SCRIPT";
  });

  let active = null;
  let origin = null;
  let busy = false;

  function setActive(card) {
    cards.forEach(function (c) { c.classList.toggle("is-active", c === card); });
    fan.classList.toggle("is-inspecting", !!card);
  }

  function render(card) {
    const d = card.dataset;
    fields.rank.textContent = d.rank + " card · Alter Ego";
    fields.name.textContent = d.name;
    fields.laneIcon.src = "assets/hero/lane-icons/lane-" + (d.lane || "gold") + ".svg";
    fields.role.textContent = d.role;
    fields.real.textContent = d.real;
    fields.born.textContent = d.born;
    fields.heroes.textContent = d.heroes;
    if (announce) announce.textContent = d.name + ", " + d.role + ". " + d.real + ". Signature heroes: " + d.heroes + ".";
    cards.forEach(function (c) { c.setAttribute("aria-expanded", String(c === card)); });
    active = card;
  }

  // Move the SAME card between parents and animate the geometry difference.
  function fly(card, toSlot, duration) {
    const first = card.getBoundingClientRect();
    if (toSlot) {
      slot.appendChild(card);
      card.classList.add("is-flying");
      card.tabIndex = -1;
    } else {
      card.classList.remove("is-flying");
      card.removeAttribute("tabindex");
      fan.appendChild(card);
    }
    const last = card.getBoundingClientRect();
    const sx = last.width ? first.width / last.width : 1;
    const sy = last.height ? first.height / last.height : 1;
    const inverse = "translate(" + (first.left - last.left) + "px," + (first.top - last.top) + "px) scale(" + sx + "," + sy + ")";

    card.style.transition = "none";
    card.style.transformOrigin = "0 0";
    if (reduce) {
      card.style.transition = "";
      card.style.transformOrigin = "";
      return Promise.resolve();
    }
    const anim = card.animate(
      [{ transform: inverse }, { transform: "none" }],
      { duration: duration, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "both" }
    );
    return new Promise(function (resolve) {
      let done = false;
      function finish() {
        if (done) return;
        done = true;
        try { anim.cancel(); } catch (err) { /* already finished */ }
        card.style.transition = "";
        card.style.transformOrigin = "";
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
    return [detailPrev, detailNext, detailClose].filter(Boolean);
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
      fields.name.focus();
      busy = false;
    });
  }

  function closeDetail() {
    if (busy || !active) return;
    busy = true;
    const card = active;
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
    detail.classList.add("is-leaving");
    fly(active, false, 300).then(function () {
      render(next);
      setActive(next);
      detail.classList.remove("is-leaving");
      return fly(next, true, 460);
    }).then(function () {
      fields.name.focus();
      busy = false;
    });
  }

  fan.addEventListener("pointerover", function (e) {
    if (active) return;
    const c = e.target.closest(".card");
    if (c) setActive(c);
  });
  fan.addEventListener("pointerout", function (e) {
    if (active) return;
    if (e.target.closest(".card")) setActive(null);
  });
  fan.addEventListener("focusin", function (e) {
    const c = e.target.closest(".card");
    if (c && !active) setActive(c);
  });
  fan.addEventListener("click", function (e) {
    const c = e.target.closest(".card");
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
