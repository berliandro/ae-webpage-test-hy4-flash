# Poker Arena — Phase 1 Asset Inventory (pass 7)

Source: `C:/Users/nberl/Downloads/Retro Pixel Art Poker Arena.png` — 1672×941, unmodified.

| File | Size (px) | Offset (x,y) | Role |
|---|---|---|---|
| `background.png` | 1672×941 | [0, 0] | arena environment |
| `cards/card-10.png` | 263×410 | [180, 465] | playing card 10 |
| `cards/card-jack.png` | 262×412 | [430, 375] | playing card J |
| `cards/card-queen.png` | 263×413 | [685, 309] | playing card Q |
| `cards/card-king.png` | 263×412 | [935, 320] | playing card K |
| `cards/card-ace.png` | 274×370 | [1185, 392] | playing card A |
| `hand-left.png` | 492×212 | [109, 729] | hand |
| `hand-right.png` | 457×182 | [1024, 759] | hand |

Reconstruction uses local-palette block synthesis (banner/felt/plaque) and exemplar
patch matching (occluded card areas, hands). Generative tooling unavailable (no credits).
All assets at original pixel scale. Z-order and offsets in manifest.json.

## External asset research (2026-11-19)

Free pixel-art packs were surveyed on itch.io and evaluated against the measured
contract in `STYLE-NOTES.md`. **No external assets were adopted**: surveyed packs use
16×16/32×32 chunky grids, bright or fantasy palettes, or incompatible perspectives,
and could not sit beside the arena's 1-pixel, muted, one-point scene without breaking
visual consistency. Full shortlist, licence records, rejection reasons and visual
comparison boards: `research/itchio/ITCHIO-ASSET-RESEARCH.md`. Future additions should
be drawn to the measured 1-pixel contract rather than sourced from generic packs.