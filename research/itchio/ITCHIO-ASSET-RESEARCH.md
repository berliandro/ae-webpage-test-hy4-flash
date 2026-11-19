# Itch.io pixel-art asset research — Alter Ego MPL ID

**Date:** 2026-11-19
**Brief:** Explore `https://itch.io/game-assets/free/tag-pixel-art` for free pixel-art assets that could genuinely enrich the existing Alter Ego poker-arena site, evaluate every candidate against the arena artwork as the primary visual reference, verify licences, and integrate only assets that belong to the same visual world.

---

## 1. Decision

**No external asset is recommended for integration. Zero assets were adopted.**

This is a quality decision, not a search failure. The existing arena is a bespoke, high-density pixel illustration: 1672×941 px, drawn *at final resolution* with 1-pixel marks, hard 2–4 px outlines, stepped ramps, clustered dithering, a warm amber centre, cool charcoal edges, muted teal felt, crimson ornament and cream card stock (measured contract in `assets/poker-arena/STYLE-NOTES.md`).

The free itch.io pixel-art catalogue is dominated by **game sprites drawn on 16×16 / 32×32 grids**: larger pixel clusters, bright or fantasy palettes, top-down / isometric / side-scrolling perspectives, and cartoon proportions. Scaling those to the arena introduces destructive resampling and a visibly different pixel density; displaying them at native small size clashes in palette and shape language. Several licences are also ambiguous or require payment for commercial use.

Adding any of them would weaken the site's most distinctive asset. Per the brief, visual identity was not compromised to increase asset count.

---

## 2. Method

- Listing: `itch.io/game-assets/free/tag-pixel-art` — **21,938 results**. Harvested and reviewed result pages 1–4 (144 items), sorted by Popular.
- Filtered views: Backgrounds (619), Icons (1,462), Gothic (64), plus UI / Textures / Sprites / Retro / 16-bit tags.
- Direct searches: `poker`, `casino`, `poker chip`, `card game pixel`.
- Opened ~25 individual asset pages. For every serious candidate: captured previews, read the author's licence text, recorded native preview dimensions, and checked the file list where relevant.
- Created three visual comparison boards (`comparison-board.html`, `comparison-board-2.html`, `comparison-board-3.html`) that place each candidate directly against the arena reference. Open them with internet access (previews are hotlinked from itch.io, not redistributed).
- Investigated downloadable contents for the strongest licence candidate (2D Poker Pack, CC0).

---

## 3. Evaluation criteria (from the brief, applied literally)

1. **Pixel size/density** — must have 1-pixel-scale marks comparable to the arena, not chunky upscaled grids.
2. **Palette** — dark, muted, atmospheric: charcoal, desaturated teal, muted green, dusty brown, warm amber, restrained red.
3. **Shape language** — deliberate pixel clusters, consistent outlines, no smooth-illustration-converted-to-pixels.
4. **Perspective/geometry** — must plausibly exist inside the poker room; no mixed top-down/isometric/side-scroll views.
5. **Overall compatibility** — would it look as though it were created for the same world?

---

## 4. Curated shortlist (closest candidates — all rejected)

Native dimensions below are the **preview image** dimensions reported by itch.io, used as a proxy for the artwork's working resolution.

| Asset | Creator | Source | Native preview | Licence / attribution | Intended use considered | Verdict & reason |
|---|---|---|---|---|---|---|
| 2D Poker Pack | Screaming Brain Studios | https://screamingbrainstudios.itch.io/poker-pack | 1280×780 (pack shot); single `.rar`, 351 kB | **CC0 / public domain** — any use, no attribution | Chips / table props | **Reject.** Download inspected: old 90s isometric renderer, solid-colour backgrounds, purple-lit 3D scene, bright olive UI. Wholly incompatible density and perspective despite ideal licence. |
| 490+ Casino Pixel Icons 32×32 | Mulato | https://mulato.itch.io/casino-mega-pack-32 | 630×500 (animation); sprites 32×32 | Free (name your own price, $0) · commercial OK · modify OK · no resale / AI training · attribution not required | Small casino icons | **Reject.** Saturated yellow/red/green/purple palette; chunky 32×32 clusters; slot-machine subject matter. |
| Pixel Poker Chips: Essential Sprite Sheet | RealRogue | https://realrogue.itch.io/pixel-poker-chips-essential-sprite-sheet | 100×100 | Free · commercial OK · modify OK · no standalone resale | Chip accents | **Reject.** Single large primary-red chip, blocky marks, no fine shading or muted tones. |
| Playing Card, Dice and Chips Pixel Art Assets | Vibinvaibe | https://vibinvaibe.itch.io/playing-card-dice-and-chips-pixel-art-assets | 347×500 | Free · commercial + non-commercial · edit OK · **no formal licence text** | Chip accents | **Reject.** Bright red/blue/yellow chips; licence too vague to rely on. |
| Gothic RPG Furniture Sprites | Xenophero | https://xenophero.itch.io/gothic-rpg-furniture | 347×500 | Free · commercial OK · no resale · **credit required** | Dark room furniture | **Reject.** Violet/gothic palette, chunky outlines, side-view fantasy furniture. |
| Noble Interiors (30 Victorian furniture × 8 colourways) | Kelano Studio | https://kelano-studio.itch.io/noble-interior | 1600×500 | Free · personal + commercial · no resale as pack · credit appreciated | Poker-room furniture | **Reject.** Top-down/isometric perspective and warm bright browns; cannot sit in the one-point table view. |
| Industrial Parallax background | ansimuz | https://ansimuz.itch.io/industrial-parallax-background | 347×275 | Free · “use whatever you like, no attribution required” | Subpage atmosphere | **Reject.** Side-scrolling parallax with visibly larger pixel clusters and a cool green cast; wrong perspective and density. |
| Bulkhead Walls Environment | ansimuz | https://ansimuz.itch.io/bulkhead-walls-environment | 347×275 | Free · personal + commercial · modify OK · credit optional | Wall detail | **Reject.** Chunky sci-fi wall panels, side-view; no overlap with the arena's architecture. |
| Mountain Dusk Parallax background | ansimuz | https://ansimuz.itch.io/mountain-dusk-parallax-background | 641×479 | Free · commercial OK · no attribution required | Subpage atmosphere | **Reject.** Pink/purple outdoor sunset, large chunky mountains; palette and subject incompatible. |
| Caverns Environment | ansimuz | https://ansimuz.itch.io/caverns-environment | 347×195 | Free · personal + commercial · modify OK · credit optional | Dark environment | **Reject.** Purple-lit cave, side-scroller geometry, no amber pool. |
| Dark Ages UI | Hypnobius | https://hypnobius.itch.io/dark-ages-ui | 960×400 | Free · commercial (free or paid) + personal · credit optional · no resale | Subpage panel frames | **Reject.** Chunky beige/brown fantasy UI, bright and cartoonish. |
| Gothic Pixel UI | AbyssOwl | https://abyssowl.itch.io/gothic-pixel-ui | 1020×300 | Free · commercial OK **with credit required** · modify OK · no resale · no AI training | Subpage panel frames | **Reject.** Purple/grey ornate frames, chunky 16-bit-style pixels. |
| Grungy Dungeon Props | Hypnobius | https://hypnobius.itch.io/grungy-dungeon-props | 630×500 / 259×500 | Free · commercial + personal · credit optional · no resale | Environmental props | **Reject.** Gold/green ornate statues and cages; fantasy dungeon, chunky. |
| Textures for 2D Light (round gradients) | PixelFranek | https://pixelfranek.itch.io/free-textures-of-light | 32×32 | Free · commercial OK · modify OK · attribution optional · no resale | Lighting overlay | **Reject.** Smooth round gradients, not pixel art; too small to integrate without resampling. |
| Retro Pixel Ribbons, Banners and Frames 2 | BDragon1727 | https://bdragon1727.itch.io/retro-pixel-ribbons-banners-and-frames-2 | 347×277 | Non-commercial free; commercial use asks for a contribution | Banner / frame detail | **Reject.** Bright cream/yellow ornate frames; licence not clean for unrestricted use. |
| Legacy Collection — FREE 16-bit Pixel Art | ansimuz | https://ansimuz.itch.io/gothicvania-patreon-collection | 2560×1440 (promo) | Free | General sprites | **Reject.** Chunky 16-bit sprites, bright greens/reds, platformer perspective. |
| Post-Apocalypse Pixel Art | TheLazyStone | https://thelazystone.itch.io/post-apocalypse-pixel-art-asset-pack | promo sheets only | Free **non-commercial**; $2 commercial; no redistribution | Dark props | **Reject.** No verifiable in-scene fine-density artwork in the previews; licenced awkwardly for a commercial-capable site. |
| Textures | piiixl | https://piiixl.itch.io/textures | 210×500 | Licence not stated | Surface texture | **Reject.** Tiny bright tile collage; licence unverifiable. |

---

## 5. Paid assets excluded without download

Per instruction, no paid asset was purchased or integrated.

| Asset | Creator | Price | Note |
|---|---|---|---|
| Gridwright Cards & Dice (826 sprites) | Gridwright | $8 | Licence otherwise fine; cost excluded |
| KR JACKPOT! Casino RPG Tileset | Kokoro Reflections | $7 | Edit restrictions; cost excluded |
| UI User Interface Pack — Retro | ToffeeCraft | $23 | Cost excluded |
| Dark Gothic Castle background | PIXEL_1992 | $5 | Page price conflicts with “free for commercial” claim; excluded |
| Card game pixel art assets | Giose | $1 | Cost excluded |

---

## 6. Licensing records

- **CC0 / public domain:** 2D Poker Pack (Screaming Brain Studios) — verified in page text and creator replies.
- **Free, commercial use, no attribution:** Industrial Parallax (ansimuz), Mountain Dusk (ansimuz), Caverns (ansimuz), 490+ Casino Icons (Mulato), Pixel Poker Chips (RealRogue), Dark Ages UI (Hypnobius), Textures for 2D Light (PixelFranek), Noble Interiors (Kelano Studio), Grungy Dungeon Props (Hypnobius).
- **Credit required:** Gothic RPG Furniture (Xenophero — link itch page or @Xenophero); Gothic Pixel UI (AbyssOwl — commercial projects).
- **No resale / redistribution:** most packs above; none were redistributed.
- **Ambiguous or conditional:** Vibinvaibe (no formal licence), Retro Ribbons (commercial contribution requested), Post-Apocalypse ($2 commercial), piiixl Textures (none stated).

No downloadable asset pack was copied into the repository. The comparison boards reference itch.io preview URLs only; they are internal evaluation tools, not redistribution.

---

## 7. Recommendation

- Keep the existing assets as the sole visual foundation: `assets/poker-arena/` and `assets/hero/`.
- Do **not** add decorative icons or textures from this catalogue — it would be clutter with a mismatched style.
- If the world needs more completeness later, the right route is a **commission or in-house extension drawn to the measured 1-pixel contract** in `STYLE-NOTES.md` (e.g. a matching banner strip, a chip-stack strip at the same density, or a subpage-wide felt/vignette panel), not a generic pack.
- Revisit only if a free pack appears that is drawn at final resolution (≈1500 px+ canvas) with the same muted amber/charcoal/teal palette and a one-point interior perspective.

### What a future candidate must pass

1. Native canvas large enough that 1 px stays 1 px at display size — no 16×16/32×32 grids.
2. Palette sampled into the 24-colour contract in `STYLE-NOTES.md`.
3. Hard 2–4 px outlines, stepped ramps, clustered dithering — no smooth gradients.
4. One-point / frontal interior geometry consistent with the table view.
5. Explicit commercial-use licence, modification rights, no redistribution, and a clear credit string.

---

## 8. Files

- `research/itchio/comparison-board.html` — board 1: reference + first shortlist
- `research/itchio/comparison-board-2.html` — board 2: dark environments + poker assets
- `research/itchio/comparison-board-3.html` — board 3: deeper previews
- `research/itchio/ITCHIO-ASSET-RESEARCH.md` — this report

**Asset inventory impact:** none. No external assets adopted; `assets/poker-arena/ASSET-INVENTORY.md` is unchanged in content and now cross-references this research.
