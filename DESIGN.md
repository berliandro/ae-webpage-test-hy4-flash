# Design — Alter Ego MPL ID website

<!-- impeccable:design-schema 1 -->

The homepage is an Experience surface: the illustration leads and the interface recedes. It is an immersive first viewport of a retro pixel-art poker arena. The rest of the site extends that world with an editorial Read/Persuade layer across four pages (Roster, Competition, Legacy, Media), connected by navigation whose crest sits at the centre like a dealer button and whose links flank it like table positions.

## World and visual authority

Source of truth: the approved pixel-art poker arena reference and the verified product brief in `PRODUCT.md`. No alternative visual world was explored; the concept was user-pinned.

- **Ground:** full-bleed arena rendered at the source 1672×941 pixel grid, scaled to cover the viewport. The arena carries opponents, felt, chips, banners and architecture.
- **Palette (from the source):** near-black charcoal `#131017`, dark teal-green felt, crimson ornamental splatter, warm cream card stock `#e7d6b4`, amber overhead light `#e2be80`, brass accent `#c9a66b`, warm skin tones, red-orange jersey stripes.
- **Image character:** hard pixel edges and `image-rendering: pixelated`; 1:1 pixel density within each asset family; no resampling.
- **Type direction:** a restrained system UI face for the quiet wordmark and card labels. The artwork carries the identity; type does not compete with it.

## Surface anatomy

1. **Arena layer** — `assets/hero/arena-blurred.png` (depth of field pre-baked into the pixels), `object-fit: cover`, with a radial vignette. Depth of field and darkening apply **only** to the environment, never to the cards or hands.
2. **Light pool** — a `screen`-blended radial gradient centred over the fan, echoing the source's amber overhead light.
3. **Fan** — five independently positioned `<button>` cards at exact source offsets, each a tight-cropped transparent PNG with its baked pixel-art perspective. Cards stay fully sharp and legible.
4. **Hands** — `thumb-left.png` / `thumb-right.png` at their measured source offsets, layered above the cards so the thumbs sit in front, completing the grip.
5. **Wordmark** — a small, high, letter-spaced `ALTER EGO` in the dark.
6. **Hint** — one quiet line at the lower edge, dismissed on first card interaction.

## Interaction and motion

- Hover / focus / tap lifts a card slightly within the fan and reveals a quiet name + role label on its blank name plate; the other cards stay put.
- Focus is an unmistakable 3px amber ring with 5px offset and an inner dark keyline — high contrast, never a subtle glow alone.
- A restrained 11s "breath" shifts the fan a few pixels; disabled under `prefers-reduced-motion`.
- Keyboard: Tab reaches each card; Enter/Space toggles; Escape closes and restores focus; a click outside settles the card.
- Card rank (10/J/Q/K/A) is a creative identity, not a roster claim. Labels use verified display names and official roles only.

## Responsive behaviour

- Wide viewports keep the source 16:9 composition at exact offsets.
- Narrow viewports (aspect ≤ 4/5) use a tighter, more overlapping fan in the lower half via per-card mobile offsets, with the dark room above — no horizontal scroll, no broken hand illusion.

## Performance contract

Measured, not assumed. The page targets a smooth 60fps at rest and during interaction on the shipped pixel-art assets.

- **Whole-scene tilt on one wrapper.** Arena, cards and fingers live in a single `.scene-root`; pointermove writes two custom properties once per frame so they rotate together as one rigid layer (no per-element work, no drift).
- **Depth of field is pre-baked** into `arena-blurred.png` — no runtime CSS `blur()` filter, so the tilt composites cheaply instead of re-rasterizing a full-viewport blurred layer each frame.
- **No animated `filter: drop-shadow()`** on the large card/hand images (the pixel art carries its own painted shadows).
- Card hover/focus lifts a single card (`transform` only, 300ms) and reveals its name/role label; the other four recede to 0.34 opacity while hands and fingers stay solid.
- Clicking a card opens a focus state: the whole scene behind it blurs to the arena's exact tone (`blur(6px) brightness(0.62)`); the chosen card moves to the left at ~half-screen scale and straightens to a perfect vertical using per-card corrections measured from each PNG's alpha mask; verified player details sit beside it in white, borderless type. Escape or Close returns focus to the card.
- The Alter Ego crest sits at top centre. Alter Ego red (`#cf2f2f`) is the only accent, carried by the detail eyebrow rule — used sparingly, never scattered.

## Motion thesis (breathing)

One authored focal moment (the card-focus zoom/straighten) plus three quiet, continuous pulses that make the scene feel alive without pulling focus: a 9s light-pool opacity breath, an 11s four-pixel fan lift, and a 12s brand-mark shimmer. All are transform/opacity only, bounded, and disabled under `prefers-reduced-motion`. The rest of the composition stays still and strong so the breathing stays subordinate.
- Measured in Chrome at 1440×900: idle ~91fps, pointer-move ~44fps, card-open responsive (was ~1–5fps). Detector clean.

## Asset provenance

All rasters in `assets/hero/` were produced by the separate Pixie image-editing agent from the user's approved source `C:\Users\nberl\Downloads\Retro Pixel Art Poker Arena.png`. Card textures came from an Affinity layer decomposition; hands and thumbs from Canva background removal; the clean arena from the user's Canva export. Original source pixels were preserved at 1:1 scale. Pixel-grid and density contract is documented in the image-editing project's `STYLE-NOTES.md` §7.

## Site pages (verified content only)

- **Roster** (`roster.html`) — the five cards as player tiles, three registered substitutes, coaching staff. Card ranks are explicitly labelled a creative identity, not an official designation.
- **Competition** (`competition.html`) — MPL ID Season 18: 3rd in the regular season (10–6), 4th after playoffs; verified playoff and late-season results; final table; no published upcoming fixtures.
- **Legacy** (`legacy.html`) — selected verified achievements (MPLI 2020 champions, M7 runners-up 2026, M2 4th 2021, and others), Season 18 individual honours, a sourced history timeline, and an About section.
- **Media** (`media.html`) — five embedded official YouTube videos, seven verified official channel links. No invented galleries or fan uploads presented as official.
- All factual claims cite MPL Indonesia and/or Liquipedia in each page footer. Unverifiable details (exact founding date, official slogan status) are explicitly hedged.

## Player-card identity

The five cards are an original Alter Ego collectible set, not a copy of any commercial
TCG. The lower information panel is composed inside `.card__plane` so the existing
four-point homography carries every ornament, label and insignia through the FLIP
pickup, upright inspection and return. Panel system: parchment plate, four CSS-drawn
corner brackets, rank-and-suit chip, edition label, large pixel-font nickname, diamond
divider, oversized pixel lane insignia with role label, and a secondary captain tag on
Nino. Sizing uses container queries so the system holds from mobile fan to enlarged
detail. Artwork, ranks, suits, perspective, card assignment and interaction are unchanged.

## Open decisions (not invented)

- Player → rank creative mapping remains a creative identity, clearly labelled as such.
- Substitute-card swap interaction in the hero was not built; substitutes are presented on the Roster page instead.
- A portrait-specific expanded background was not yet supplied; mobile/portrait uses the tighter fan composition until it arrives.
