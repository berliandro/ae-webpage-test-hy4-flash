// Homepage — accessible card interaction, player dossier, quiet motion.
// Delegated listeners only; no timers and no per-frame JS.
(function () {
  "use strict";

  const table = document.querySelector(".table");
  const scene = document.querySelector(".scene-root");
  const fan = document.querySelector(".fan");
  const detail = document.querySelector(".detail");
  const detailCard = document.querySelector(".detail__card");
  const detailClose = document.querySelector(".detail__close");
  const detailPrev = document.querySelector(".detail__nav-btn#detailPrev");
  const detailNext = document.querySelector(".detail__nav-btn#detailNext");
  const announce = document.querySelector("#detailAnnounce");
  const hint = document.querySelector(".hint");
  if (!fan || !detail) return;

  const cards = Array.from(fan.querySelectorAll(".card"));
  const fields = {
    rank: document.querySelector("#detailRank"),
    name: document.querySelector("#detailName"),
    role: document.querySelector("#detailRole"),
    real: document.querySelector("#detailReal"),
    born: document.querySelector("#detailBorn"),
    heroes: document.querySelector("#detailHeroes")
  };
  let origin = null;
  let current = null;

  function setActive(card) {
    cards.forEach(function (c) { c.classList.toggle("is-active", c === card); });
    fan.classList.toggle("is-inspecting", !!card);
  }

  function render(card) {
    const d = card.dataset;
    detailCard.src = card.querySelector("img").src;
    detailCard.alt = d.name + " — " + d.rank + " card";
    detailCard.style.setProperty("--straight", (parseFloat(d.straight || 0)).toFixed(2) + "deg");
    fields.rank.textContent = d.rank + " card · Alter Ego";
    fields.name.textContent = d.name;
    fields.role.textContent = d.role;
    fields.real.textContent = d.real;
    fields.born.textContent = "Born " + d.born;
    fields.heroes.textContent = d.heroes;
    if (announce) announce.textContent = d.name + ", " + d.role + ". " + d.real + ". Signature heroes: " + d.heroes + ".";
    current = card;
  }

  function openDetail(card) {
    origin = card;
    render(card);
    cards.forEach(function (c) { c.setAttribute("aria-expanded", String(c === card)); });
    table.classList.add("is-detail");
    scene.setAttribute("inert", "");
    if (hint) hint.setAttribute("inert", "");
    detail.classList.add("is-open");
    detail.setAttribute("aria-hidden", "false");
    if (hint) hint.classList.add("is-hidden");
    // Focus the player's name — the announcement the user came for.
    fields.name.focus();
  }

  function step(dir) {
    if (!current) return;
    const i = cards.indexOf(current);
    const next = cards[(i + dir + cards.length) % cards.length];
    render(next);
    next.setAttribute("aria-expanded", "true");
    cards.forEach(function (c) { if (c !== next) c.setAttribute("aria-expanded", "false"); });
  }

  function closeDetail() {
    detail.classList.remove("is-open");
    detail.setAttribute("aria-hidden", "true");
    table.classList.remove("is-detail");
    scene.removeAttribute("inert");
    if (hint) hint.removeAttribute("inert");
    cards.forEach(function (c) { c.classList.remove("is-open"); c.setAttribute("aria-expanded", "false"); });
    setActive(null);
    current = null;
    if (origin) origin.focus();
    origin = null;
  }

  fan.addEventListener("pointerover", function (e) {
    if (detail.classList.contains("is-open")) return;
    const c = e.target.closest(".card");
    if (c) setActive(c);
  });
  fan.addEventListener("pointerout", function (e) {
    if (detail.classList.contains("is-open")) return;
    if (e.target.closest(".card")) setActive(null);
  });
  fan.addEventListener("focusin", function (e) {
    const c = e.target.closest(".card");
    if (c) setActive(c);
  });
  fan.addEventListener("click", function (e) {
    const c = e.target.closest(".card");
    if (c) openDetail(c);
  });

  if (detailClose) detailClose.addEventListener("click", closeDetail);
  if (detailPrev) detailPrev.addEventListener("click", function () { step(-1); });
  if (detailNext) detailNext.addEventListener("click", function () { step(1); });
  detail.addEventListener("click", function (e) { if (e.target === detail) closeDetail(); });

  document.addEventListener("keydown", function (e) {
    if (!detail.classList.contains("is-open")) return;
    if (e.key === "Escape") closeDetail();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {
      // keep focus within the dialog
      const focusables = [fields.name, detailPrev, detailNext, detailClose].filter(Boolean);
      const idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) { e.preventDefault(); focusables[focusables.length - 1].focus(); }
      else if (!e.shiftKey && idx === focusables.length - 1) { e.preventDefault(); focusables[0].focus(); }
    }
  });

  // One-shot tilt on stage enter/leave; CSS handles the motion.
  if (scene && table && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    table.addEventListener("pointerenter", function () { scene.classList.add("is-tilted"); }, { passive: true });
    table.addEventListener("pointerleave", function () { scene.classList.remove("is-tilted"); }, { passive: true });
  }
})();
