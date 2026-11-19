# STYLE NOTES — measured contract from the reference image

Source: `C:\Users\nberl\Downloads\Retro Pixel Art Poker Arena.png`
Canvas: **1672 × 941 px**, RGB, lossless. Original is unmodified.
All figures below were measured directly from the file (median-cut quantisation,
region medians, run-length and block statistics), not guessed.

## 1. Palette and colour roles

Global median-cut palette (24 colours, share of image). These are the only
colours permitted in invented pixels; use the role column as a colour script.

| Hex | Share | RGB | Role |
|---|---|---|---|
| `#464645` | 7.08% | 70,70,69 | Warm grey — lit banner / wall midtone |
| `#18171F` | 6.60% | 24,23,31 | Near-black charcoal — deepest outlines, jersey shadows |
| `#2A2A33` | 6.22% | 42,42,51 | Dark blue-charcoal — architecture, jersey base |
| `#5A594C` | 5.46% | 90,89,76 | Olive-grey — banner fabric midtone |
| `#1D1C25` | 5.16% | 29,28,37 | Charcoal — outlines, dark architecture |
| `#AE9374` | 5.04% | 174,147,116 | Cream/tan — card stock, skin highlight |
| `#33383E` | 4.96% | 51,56,62 | Slate — architecture, cool shadow |
| `#23242D` | 4.82% | 35,36,45 | Charcoal — background crowd, jersey |
| `#572D31` | 4.60% | 87,45,49 | Deep crimson — ornament shadow, dark red stripe |
| `#813031` | 4.11% | 129,48,49 | Crimson — ornate splatter midtone |
| `#844237` | 3.87% | 132,66,55 | Warm red-brown — splatter highlight, jersey stripe |
| `#383236` | 3.79% | 56,50,54 | Neutral dark warm — jersey folds |
| `#B99571` | 3.73% | 185,149,113 | Light cream — card face, name plaque |
| `#323E3F` | 3.65% | 50,62,63 | Dark teal-green — felt shadow / architecture |
| `#A07051` | 3.64% | 160,112,81 | Warm skin midtone — hands and faces |
| `#3A4446` | 3.58% | 58,68,70 | Teal-grey — felt mid shadow, architecture light |
| `#C8A881` | 3.37% | 200,168,129 | Cream highlight — card border, plaque light |
| `#202129` | 3.36% | 32,33,41 | Charcoal — outlines |
| `#D7BA8E` | 3.34% | 215,186,142 | Pale cream — brightest card stock |
| `#2C2F37` | 3.12% | 44,47,55 | Cool charcoal — background architecture |
| `#29252C` | 3.02% | 41,37,44 | Warm dark neutral — crowd/jersey |
| `#131017` | 2.88% | 19,16,23 | Black — strongest outlines, deepest shadow |
| `#39272A` | 2.49% | 57,39,42 | Dark maroon — jersey/ornament shadow |
| `#5D453D` | 2.11% | 93,69,61 | Brown — mid shadow on skin/card |

Region medians (semantic anchors):

| Region | Median | Mean |
|---|---|---|
| Felt, centre bottom | `#344140` | `#394540` |
| Felt, left mid | `#364340` | `#3D4640` |
| Banner behind logo | `#595147` | `#544D45` |
| Jersey / sleeve | `#312B2F` | `#422B2F` |
| Warm skin (grip) | `#9A6246` | `#9D6E50` |
| Card name plaque | `#B49877` | `#9E866B` |
| Card cream field | `#A47B5E` | `#A2775F` |
| Red ornate splatter | `#593133` | `#653B35` |
| Amber overhead light | `#E2BE80` | `#DDBA80` |
| Background architecture | `#2B2D36` | `#2E3038` |

## 2. Pixel grid, density, outlines, dithering

- **Not an upscaled low-res grid.** Adjacent pixels are identical only 8.4%
  horizontally and 7.1% vertically; only 5.4% of 2×2 blocks are uniform; run
  length median = 1, mean 1.09. The art is drawn *at final resolution* in a
  pixel-art idiom with fine per-pixel noise. Reconstruction must therefore use
  **1-pixel marks**, not chunky 4×4 blocks or stretched patches.
- **Outlines:** hard, 2–4 px dark contours (`#131017`–`#23242D`) around cards,
  hands, sleeves and figures. No soft anti-aliased fringe; where AA exists it is
  deliberate clustered pixels, never a blur.
- **Shading:** stepped colour ramps from the palette, not continuous gradients.
  Skin uses `#A07051` → `#AE9374` → `#C8A881`/`#D7BA8E` with dark maroon shadow
  (`#39272A`). Felt uses `#323E3F` → `#344140` → `#3A4446` speckles.
- **Dithering:** fine **clustered** speckle (2–3 px groups), not checkerboard
  static. Random per-pixel colour rejection looks wrong and must be avoided.

## 3. Lighting and contact shadows

- Warm overhead pool. Mean luminance: top band 60.2, middle 80.5, bottom 67.7.
  Centre-top (x700–1000, y0–120) = **103.2** vs corners = **47.9**.
- The banner behind the logo is lit from above by the amber source (`#E2BE80`),
  falling off to `#595147`/`#464645` downward and toward the edges. Any rebuilt
  banner must preserve this vertical falloff, not be a flat fill.
- Cards are lit from the same overhead source: upper edges and cream highlights
  brighter, lower plaque dimmer. Hands cast soft dark contact shadows onto the
  felt and onto adjacent card corners; cards cast short shadows on the felt.

## 4. Card anatomy (as rendered in this image)

Each card is a rotated rectangle (~258–270 × 364–410 px in the fanned finals)
with, from outside in:

1. **Outer border** — 3–5 px dark contour plus cream/ivory edge.
2. **Corner index** — rank letter/number plus suit pip, top-left (e.g. `10♣`,
   `Q♥`, `A♠`). This is a functional zone, not decoration.
3. **Portrait field** — player portrait over a crimson ornamental splatter
   (`#572D31`/`#813031`/`#844237`) on cream stock.
4. **Name plaque** — beige polygon (`#B49877`→`#C8A881`) carrying the player name.
5. **Thin horizontal separator rule** — the ONLY text-zone element to retain.
6. **Lane/role zone** — role icon + role name; to be emptied.

Cleanup target: zones 2, 4 (name text) and 6 blank; zone 5 untouched; zones 1
and 3 fully intact including the parts hidden by neighbouring cards.

## 5. Environment theme

A dim esports poker arena: green-felt table with fine speckle, stacks of chips,
surrounding players in dark jerseys with red-orange shoulder stripes, amber
overhead light pool, dark blue-grey architecture (windows/panels), hanging red
banners, and the central Alter Ego / MPL ID lockup on a lit olive banner. Mood is
warm-centre, cool-dark edges, high contrast, retro pixel-art.

## 6. Contract for every reconstructed pixel

1. Colour ∈ the palette tables above; role matches the region.
2. 1-pixel mark size; no blur, no gradient tool, no random static.
3. Outline weight 2–4 px, colour `#131017`–`#23242D`.
4. Follow the local pattern direction (felt speckle, banner weave, card ornament).
5. Respect the overhead light falloff and contact shadows.
6. No new concept, no redesign, no composition change, original pixel scale.

## 7. Pixel-grid and density consistency contract (owner decision, 2026-11-18)

1. **Grid decision:** 1 source pixel = 1 art pixel at the original 1672×941
   canvas. No upscaling, downscaling, resampling, or sub-pixel antialiasing at
   any stage. This matches the measured source statistics (run-length median 1,
   mean 1.09; only 5.4% uniform 2×2 blocks) — the image is pixel art drawn at
   final resolution, not an enlarged low-res grid.
2. **Family density contract:** left and right hands must share identical pixel
   density; all five cards must share identical pixel density; the background
   has its own density but must be internally consistent. Never let one card,
   one hand, or a distant wall element read sharper than its family.
3. **Edges:** hard uniform pixel edges only; outline weight 2–4 px. No AA that
   makes diagonals or some edges look higher-resolution than the rest.
4. **Mixed density forbidden:** no distant object sharper than a near one, no
   wall item visibly lower-resolution than the foreground.
5. **Verification:** record per-asset-family measurements — adjacent-pixel
   identity (horizontal/vertical), 2×2 block uniformity, and run-length
   distribution — and require the families to match within measurement noise.
   Grid and densities are a contract once published in this file.

Measured source baseline (`work/poker/measure_density.py`, run 2026-11-18;
h/v = adjacent-pixel identity, b2 = uniform 2×2 blocks, rm = mean run length):

| Family / region | h | v | b2 | rm |
|---|---|---|---|---|
| card-10 | 0.053 | 0.042 | 0.032 | 1.058 |
| card-J | 0.055 | 0.044 | 0.033 | 1.059 |
| card-Q | 0.044 | 0.036 | 0.025 | 1.047 |
| card-K | 0.058 | 0.047 | 0.038 | 1.063 |
| card-A | 0.057 | 0.044 | 0.034 | 1.059 |
| hand-left | 0.069 | 0.057 | 0.044 | 1.077 |
| hand-right | 0.069 | 0.052 | 0.038 | 1.074 |
| background felt | 0.105 | 0.078 | 0.067 | 1.114 |
| background banner | 0.145 | 0.140 | 0.107 | 1.174 |

Targets: all cards stay within roughly h 0.044–0.058 / rm 1.047–1.063 and both
hands within h 0.069 / rm ~1.07; background kept in its own higher-identity band.
Any reconstructed fill must land inside its family's band before review.
