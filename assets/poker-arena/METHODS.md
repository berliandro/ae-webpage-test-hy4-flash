# METHODS — research and technique choices

**Task:** decompose `Retro Pixel Art Poker Arena.png` into complete, independent
Phase 1 assets, inventing hidden pixels in strict service of the existing style.
**Status:** research phase complete; reconstruction in progress.
Generative/inpainting for hidden regions is explicitly authorised by the project
owner for this phase (override of the earlier deterministic-only constraint).

## 1. Research performed (online, published sources only)

The web-search integration returned no results for every query, so research was
done by direct fetch of authoritative reference pages. Sources read:

| Source | URL | What it informed |
|---|---|---|
| Wikipedia — Pixel art | `https://en.wikipedia.org/wiki/Pixel_art` | Deliberate per-pixel placement; limited palettes; line art vs block-in; 1×1/2×2 brushes; AA clusters; why soft-blur/smudge tools are considered non-pixel-art; lossless formats. |
| Wikipedia — Inpainting | `https://en.wikipedia.org/wiki/Inpainting` | Three algorithm families: **structural** (Bertalmio PDE / isophote continuation — propagates lines inward), **textural** (texture synthesis), **combined**; **exemplar-based** inpainting (Criminisi et al., CVPR 2003) auto-clones matching patches and reduces blur; deep/generative priors for content no longer present in the image. |
| Wikipedia — Texture synthesis | `https://en.wikipedia.org/wiki/Texture_synthesis` | Tiling produces seams and repetition; chaos mosaic blurs; **pixel-based** (Efros–Leung non-parametric sampling, Wei–Levoy) copies pixels with matching local neighbourhood; **patch-based** (image quilting, graph-cut textures) is faster and more effective; goals = no seams, no blocks, no visible repetition. |
| Wikipedia — Dither | `https://en.wikipedia.org/wiki/Dither` | Dither randomises quantisation error to avoid banding; clustered/halftone vs checkerboard/Bayer/blue-noise; error diffusion (Floyd–Steinberg, Atkinson); random per-pixel noise reads as "static" and is the failure mode to avoid. |
| Wikipedia — Color quantization | `https://en.wikipedia.org/wiki/Color_quantization` | Palette generation = clustering RGB/Lab points; nearest-colour mapping; median cut, octree, k-means, NeuQuant; frequently combined with dithering; Lab distance is more perceptual. |
| Wikipedia — Median cut | `https://en.wikipedia.org/wiki/Median_cut_algorithm` | Recursively split the colour bucket with the greatest channel range at its median; average each final bucket into a palette entry. |
| Wikipedia — Playing card | `https://en.wikipedia.org/wiki/Playing_card` | Card anatomy and history: indices/rank/suit in corners (edge indices enabled one-hand fans); court cards; corner rounding; custom decks. Confirms the rank/suit corner and the name/lane plaque are distinct functional zones. |

## 2. What I learned and will apply

**Pixel art.** Quality comes from deliberate pixel placement inside a restricted
palette, consistent line weight, and controlled AA. Soft blur, smudge and
gradient filters destroy the look. Reconstruction must therefore output hard,
palette-locked pixels — never smooth gradients.

**Palette discipline.** Derive a limited palette from the source (median cut,
then hand-role the colours), and draw only from it. This is the "colour script":
every invented pixel must be one of the documented source colours, used in the
role documented in `STYLE-NOTES.md`.

**Reconstruction of hidden content.** The hidden areas contain no source data.
Structural inpainting (PDE/isophote) is wrong for this image because it smears
hard pixel edges into gradients. Stochastic/random noise is wrong because it
reads as static. The right family is **exemplar / patch-based synthesis**: copy
real patches from the same card/banner/felt that have matching local context,
then stitch at hard pixel boundaries. Where no matching patch exists (e.g. a
finger hidden behind a card), a generative prior is required — now authorised —
but it must be constrained by the palette, outline weight and lighting contract
and reviewed at 100% zoom.

**Texture (felt / banner).** Avoid tiling and random noise. Use neighbour-matching
synthesis at the same pixel grid, preserve the directional weave and the
overhead light falloff, and blend only at region boundaries so no polygonal
patch edges remain.

**Dithering.** The source uses fine clustered speckle, not checkerboard static.
Reconstructed felt/banner must continue the same speckle density and cluster
shape; no random per-pixel colour rejection.

**Card anatomy.** Zones are: outer border/edge, corner rank + suit index, portrait
field with crimson ornament, lower name plaque, thin separator rule, lane/role
zone with icon. Only the separator rule survives cleanup; the rest of the plaque
is blank stock.

## 3. Chosen pipeline (subject to Phil's review)

1. **Lock the style contract** — `STYLE-NOTES.md` (palette hexes, grid facts,
   line weight, lighting, card anatomy). Every reconstructed pixel is checked
   against it.
2. **Masks, not rectangles** — geometric/hand-refined alpha mattes for cards and
   hands so no background colour leaks into edges.
3. **Structure first, texture second** — rebuild outlines and large shapes, then
   fill interior texture with exemplar patches from the same object, quantised
   to the locked palette.
4. **Generative only where data is absent** — occluded fingers, banner behind the
   logo, occluded card corners; constrained by the palette/style contract and
   inspected at full scene, per asset and at zoom.
5. **Verification** — compare assembled preview to source at 1:1; move each card
   independently to check reconstructed surfaces; inspect the background at
   100% zoom for any trace of cards/hands.

## 3b. Coherent 1:1 transplant (new direction — research addendum)

Additional sources read for the current direction:

| Source | URL | Relevance |
|---|---|---|
| Wikipedia — PatchMatch | `https://en.wikipedia.org/wiki/PatchMatch` (Barnes et al., 2009) | Coherent nearest-neighbour field: good patch offsets are **propagated to neighbouring pixels** before random search. Structure and grain stay spatially coherent inside a region — the opposite of independent per-pixel choices. |
| Wikipedia — Gradient-domain image processing / Poisson image editing | `https://en.wikipedia.org/wiki/Poisson_image_editing` (Pérez, Gangnet & Blake, SIGGRAPH 2003) | Seamless cloning pastes **gradients** rather than pixel values and solves Poisson's equation; the seam becomes barely visible. Explains why a coherent patch with a feathered seam is preferable to synthesis. |
| Wikipedia — Texture synthesis (already cited) | — | Explicitly contrasts coherent patch-based methods with stochastic/chaos-mosaic noise, which produces the static seen in my failures. |

**Why the coherent 1:1 transplant should avoid the four observed artefacts:**

- *Concentric rings* came from luminance-quantised palette dithering — no dithering is used now.
- *Diagonal streaks* came from sampling a donor that contained the light beam and from propagation of a directional pattern — the new donor is one coherent, same-object patch pasted without scaling or propagation.
- *Static noise* came from independent per-pixel/per-block colour choices — a single real patch preserves the artist's own pixel-to-pixel correlation.
- *Hard patch edges* are handled by a 1–2 px seam feather plus per-row luminance calibration, borrowing the exact falloff already obtained from content-aware fill.

Method: paste a real source patch at exactly 1:1 (no resize, no resample, no new colours),
apply the measured per-row luminance delta, feather only the seam, re-draw the separator
line. Grain is *reused*, never generated.

## 3b-2. Affinity AI selection / depth research (2026-11-18)

- Affinity MCP is live locally (built-in server on `::1:6767`, bridged to OpenCode with the dependency-free `affinity-sse-bridge.mjs`). Permissions: `fileSystem`, `network`, `genAI` all true; file root is the OneDrive Desktop.
- `selectSubject()` and `removeBackground()` are scriptable (`doc.selectSubject()`, `doc.removeBackground()`). They require a RasterNode; they are not counted against the monthly AI allowance (paid plan required). A working transparent-cutout export was saved to the Affinity script library as **`pixie-cutout-subject-v1`**.
- **`Select Sampled Depth` (Pixel > Select) has NO SDK command.** Evidence: the entire `commands.js` topic contains only `createDetectDepth()`, fixed `createRasterSelectShadows/Midtones/Highlights/...`, `createSelectSubject()` and `createRemoveBackground()` — no Near/Far parameters and no sampled-depth selection command. `search_sdk_hints` also found no documented pathway. The feature is UI-only; Affinity MCP has no UI-event API. Therefore a scripted Near/Far sweep is not possible through this MCP, and I will not fabricate one by substituting luminance thresholds.
- `detectDepth()` generates a greyscale depth map in place but exposes no Near/Far selection; combining it with the fixed shadow/midtone/highlight selectors is only a rough analogue, not the owner's technique.

## 3c. Credit-free generative research (final avenue — evidence)

Sources read (published docs/API references; no forum questions posted):

| Source | URL | Finding |
|---|---|---|
| Hugging Face Inference Endpoints docs | `https://huggingface.co/docs/inference-endpoints/index` | Managed, production deployment with billing/autoscaling. Not a free no-key inference service. |
| Pollinations platform README | `https://github.com/pollinations/pollinations` | Open source, but current API requires an `sk_` key and a Pollen/prepaid balance (`402 PAYMENT_REQUIRED` when exhausted). Quests can add balance but require a user account. No documented free no-key image-to-image/inpainting. |
| Pollinations API docs | `https://raw.githubusercontent.com/pollinations/pollinations/main/APIDOCS.md` | `POST /v1/images/edits` supports prompt-based image editing with reference images, but **Bearer `sk_` key required**; all generation endpoints require a key. Only model catalogues/media reads are key-free. |
| Stable Diffusion 2 Inpainting model card | `https://huggingface.co/stabilityai/stable-diffusion-2-inpainting` | Reference model for local inpainting; model card access required auth (401) in this environment. |
| PyTorch package index | `python -m pip index versions torch` | torch 2.9–2.15 available for this Python 3.14; install technically possible. |

Local feasibility measured on this machine: Intel i5-11300H (4C/8T), **7.7 GB RAM**, Intel Iris Xe iGPU with ~1 GB shared VRAM, no CUDA, 23.6 GB free on C:, 173 GB on D:, Python 3.14.5. A ~5 GB SD-inpainting checkpoint plus CPU-only diffusion at 1672×941 is not practical within this environment's memory and would risk style drift / new concepts, violating the style contract. No credit-free, mask-conditioned, style-locked inpainting service is documented or available.

**Conclusion:** no viable credit-free generative path exists here. All local deterministic, native-engine, transplant and quantisation methods have been tested and failed the 100% zoom grain requirement (see §4 and the session record). The remaining options require an external decision (layered source, credits, or a documented waiver).

## 3a-2. ACCOUNTABILITY: missed layer-decomposition tool (owner review, 2026-11-18)

**Finding:** the correct first tool for this job WAS documented from the start.
The SDK topic `commands.js` contains:

```
static createDecomposeLayer() {
    return new DocumentCommand(DocumentCommandApi.createDecomposeLayerCommand());
}
```

This is the scriptable form of the Layer-menu AI tool the owner used in the UI
("Compose Layers" / layer decomposition), which separated the scene into one
background + five cards with high fidelity. It appears in the very doc topic I
read repeatedly. I did not recognise it. `search_sdk_hints` was also misleading:
it answered that no single "Compose Layers AI" command existed and steered me to
`removeBackground()` / `selectSubject()` workflows, which I followed.

**Why I missed it:** I scanned `commands.js` only for inpainting/generative and
selection keywords (`depth`, `generative`, `selectSubject`, `removeBackground`,
`sampled`) and never inventoried layer-operation commands. I anchored on the
subset of the problem I could already see (masking/grain) instead of asking what
tool class would solve the whole decomposition first.

**Lesson / durable rule:** before any asset-decomposition task, inventory ALL
AI-relevant tools, especially layer operations. Check `createDecomposeLayer()`
(Compose Layers / Decompose Layer) FIRST — it separates scene layers with high
fidelity and is the correct first tool for decomposition. Only fall back to
selection/inpainting tools when decomposition is unavailable or insufficient.

**Credit note:** the owner's single UI run used substantial AI allowance; my
earlier repeated manual tracing and failed AI fill tests consumed many more
turns and three Canva AI credits without producing equivalent separation.

## 3b-3. Browse MCP + Canva Magic Layers (learned 2026-11-18)

**Browse MCP:** tools are `status`, `tabs`, `navigate`, `snapshot`, `click`, `fill`,
`type`, `press`, `upload`, `eval`, `screenshot`, `wait_for`, `handoff`, plus network/
console/drag/hover/scroll/select. Loop = status → navigate/adopt tab → snapshot →
click → verify. `upload` rejects paths outside `%LOCALAPPDATA%\Temp\opencode`, so
copy source images there first. Snapshots default to `<main>`; side panels/dialogs
need `within: "body"` or explicit selectors. Login/2FA/captcha/payment → `handoff`.

**Canva:** logged-in Pro account was available at `canva.com`. Home → **Magic Layers**
("Select your media", images only) → upload → select image → opens a new editor tab
at the image's native size. Position → **Layers** tab lists separated elements.
Per-layer context menu has **Download selection**. Download dialog: PNG, Quality
**High**, Transparent background switch, Size slider 0.5–3.125×. Use **1×** to avoid
resampling (3.125× would upscale). Downloads land in `%USERPROFILE%\Downloads`.

**Verified results on the approved background layer** (exported from Affinity's
six-layer document with layers 1–5 hidden, 1672×941 RGBA, no resampling):
- Canva layer list: 17 unnamed `Image` layers (both hands among them), three named
  logo text layers **`MPL ID`, `Ego`, `Alter`**, and `Background`.
- Hand exports (PNG, High, 1×, transparent ON):
  - `work/poker/canva-hand-1.png` — 638×314 RGBA, 63.86% opaque, right hand.
  - `work/poker/canva-hand-2.png` — 618×314 RGBA, 65.81% opaque, left hand.
- Logo is present as exactly three separate text layers. Whether the emblem is a
  separate unnamed image was NOT verified.
- Clean-background export and logo deletion were NOT completed: the first logo
  deletion click timed out and the Browse MCP namespace became unavailable
  mid-task. No banner-hole verification was performed.

## 3b-4. Six-layer export mistake and correction (owner review, 2026-11-18)

**Mistake:** `work/poker/ai_layer_0..5.png` were six copies of the same background.
The first attempt used `render_selection` after assigning `doc.selection = layer`,
but that tool renders the spread region of the selection, not an isolated layer —
all six outputs were identical. A later export attempt hit `PERMISSION_DENIED`
because I used a temp path outside Affinity's Desktop file root.

**Correction:** for each of the six layers, hide the other five with
`d.setVisible(false, layer)`, show the target, export the whole document PNG to
the Desktop work folder, then restore all layers visible. Exports:
`work/poker/affinity_distinct_layer_0..5.png`, all 1672×941 RGBA, all six SHA-256
pixel hashes different. Layer 0 = background (100% opaque, full canvas); layers
1–5 = cards 10/J/Q/K/A with bounding boxes:
(173,384)-(509,849), (429,327)-(734,777), (682,302)-(962,734),
(891,319)-(1214,772), (1104,373)-(1487,861). These are the ground-truth card
silhouettes from Affinity's decomposition.

**Lesson / durable rule:** when isolating layers for export, never trust a render
tool to isolate by selection — verify each output is actually a different layer
with a pixel hash or diff check before proceeding. Also remember Affinity's file
root is the OneDrive Desktop, not the temp folder.

## 3b-5. Vector Craft MCP inventory and pixel-art test (2026-11-18)

No `vectorcraft` MCP namespace is exposed in this session. The local CLI
`C:\Program Files\VectorCraft\vectorcraft-cli.exe` exposes the same MCP over
stdio; use `scripts/mcp-client.mjs … tools/list` and `scripts/mcp-session.mjs`.

Server: VectorCraft 0.24.0, 33 tools: `command_list`, `command_run`,
`command_batch`, `doc_inspect`, `render_preview`, `ui_inspect`, `ui_screenshot`,
`list_commands`, `run_command`, `inspect_document`, `inspect_ui`, `select_tool`,
`pointer_gesture`, `draw_path`, `draw_shape`, `set_paint`, `press_key`,
`type_text`, `answer_dialog`, `invoke_menu`, `open_panel`, `screenshot`,
`open_file`, `save_file`, `export`, `add_text`, `apply_effect`, `pathfinder`,
`transform`, `create_graph`, `text_wrap`, `undo`, `redo`.

Pixel-relevant commands found in the registry: `object.setPixelAligned`,
`object.makePixelPerfect`, `view.pixelPreview`, `view.snapToPixel`,
`object.rasterize`, `imageTrace.make` / `makeAndExpand` / `presets` (15 presets:
Default, Auto Color, Flat Logo, Silhouettes, Line Art, Technical Drawing, …),
`object.cropImage`, `object.maskImage`. Opening a PNG creates a document whose
artboard is exactly the image size in points (Queen: 263×413), and `export` with
`scale:1` writes a PNG at 1 px per point — so the 1:1 grid is preserved.

Test on card-queen: Vector Craft `draw_shape` rectangles with `fill`/`stroke`
produced **flat beige boxes with vector outlines** — not genuine pixel art.
Using Vector Craft only to render pixel-aligned white zone masks
(`vc_queen_zones_mask.png`, 263×413) worked: masks were exactly 1:1 and drove
deterministic texture fills. The first-card preview
(`vc_queen_first_card.png`) has text removed and the separator line retained,
but donor-tile repetition remains, so it is **not approved**.

Conclusion: Vector Craft is useful for 1:1 masks, pixel-grid alignment checks and
hard-edged shape work; it cannot by itself supply the card's authentic pixel
texture. Use its masks, keep the final fills source-derived.

## 3b-6. Autonomous refinement milestone (2026-11-18, website building in parallel)

**Factor Craft:** not installed locally (only ArtCraft/PhotoCraft/VectorCraft in
`C:\Program Files`). Nothing to inventory yet.

**Vector Craft text masks for all five cards:** generated with `batch_text_masks.py`
— one `file.new` at the card's exact pixel size, a black full-canvas rectangle,
three white rectangles for rank/suit, name and role zones, exported PNG at
`scale:1`. Files: `work/poker/vc_masks/mask-{10,J,Q,K,A}.png`, each exactly the
source card dimensions. These are the pixel-aligned 1:1 zone masks.

**Interim text-clean cards:** `work/poker/interim/interim-textclean-{10,J,Q,K,A}.png`
— same dimensions as the source cards (263×410, 262×412, 263×413, 263×412,
274×370). Rank/suit, name, role text and icons removed; thin separator line
retained. Verification: every pixel **outside** the Vector Craft masks is
bit-identical to the source (max diff 0), and overall density remains within the
card band. **Status: interim / not approved** — the inpainted text zones are
smooth (no authentic pixel grain), so they violate STYLE-NOTES §7 texture
continuity. Do not publish as final.

Other fill experiments on card-queen were rejected and preserved as evidence:
`queen_text_refined.png` (exemplar matching → diagonal streaks and glyph ghosts),
`queen_text_grain.png` (donor residual → red blobs and dotted noise),
`vc_queen_text_test.png` (flat outlined vector rectangles).

**Ten card:** the ground-truth `affinity_distinct_layer_1.png` confirms the
Affinity AI left it incomplete (missing right/bottom portion); reconstruction
remains the hardest open item.

## 3b-11. Memory-bounded image pipeline (DeepSeek review, 2026-11-18)

`work/poker/finish_pass8.py` was rewritten to use `work/poker/batch_pipeline.py`.
The old version loaded several full canvases, built full-canvas boolean masks and
copied the whole output per zone. The new version:
- keeps one output canvas resident (`open_array`), never a set of images;
- prepares donor palette + high-frequency residual once per zone from only the
  small donor crop (`prepare_donor`);
- processes each rectangular zone in 48-row bands (`iter_bands` /
  `pixelize_zone_banded`), allocating only band-local masks and 4,000-pixel
  chunks for nearest-palette lookup;
- assigns band results in place, deletes band temporaries and calls
  `gc.collect()` after every band;
- verifies with `lightweight_stats`, which streams bands and never builds a
  full-image diff or colour array.

Verified by tracemalloc: **28.7 MB peak** (old unbatched version peaked around
10 GB before DeepSeek's partial patch). Output still identical in structure:
all 16 zones completed, `outside_palette = 0` for every zone. Do not reuse the
old unbatched script logic.

## 3b-10. CORRECT Queen source — Affinity ground-truth layer 3 (Andro, 2026-11-18)

Andro corrected the source: the proper full Queen card is
`work/poker/affinity_distinct_layer_3.png` (bbox 682,302–962,734, cropped to
`work/poker/queen_groundtruth_full.png`, 280×432). Earlier `card-queen.png` was a
traced, cut version — do not use it as the base.

Final asset: `work/poker/queen-groundtruth-pixelart-4px.png` (280×432 RGBA);
zoom `queen-groundtruth-pixelart-4px-zoom.png`. Built by
`build_queen_from_groundtruth.py`: remove rank letter + suit with clean cream
pixels from the same card, restore the thin separator line on the low-res grid,
reduce to a 70×108 grid picking the most frequent existing palette colour per
4×4 block, snap all colours to the ground-truth layer's exact palette, nearest
upscale. Verification: 5,676 colours, all members of the source palette; every
4×4 block uniform; card outline complete on all sides; text gone; separator
present. This is the current Queen deliverable for review.

## 3b-9. GRID CONTRACT CHANGE — chunky pixel art (Andro, 2026-11-18)

Andro reviewed `queen-pixel-perfect.png` and said it still looked blurred: real
pixel art should have **big flat blocks**, each individual art pixel a single flat
colour. This explicitly supersedes STYLE-NOTES §7's earlier "1 source pixel = 1 art
pixel" decision for these card assets. The user's current instruction wins.

**New method (`work/poker/pixelate_queen.py`):** text-free card → choose a block
size B → reduce to a low-res grid by picking the most frequent existing source
colour in each B×B block → **snap every colour to the exact source palette** →
upscale with **NEAREST** (no filtering) → redraw the separator line on the low-res
grid. Output stays 263×413 px, but the effective art grid is 66×104 at B=4.

**Queen result:** `work/poker/queen-pixelart-4px.png`
(zoom `queen-pixelart-4px-zoom.png`). Verified: every 4×4 block is uniform, all
3,792 output colours are members of Queen's source palette, no blur/AA, text
removed, separator retained. Alternatives 6px and 8px were rendered and rejected
as too coarse (portrait detail lost). Blocks of 4px are the default.

This is the asset form to use for cards going forward. Earlier fine-grained
`queen-pixel-perfect.png` is retained as a palette/text-free intermediate only.

## 3b-8. First finished pixel-art card — Queen (Andro's focus, 2026-11-18)

**Research basis:** Wikipedia `Pixel art` — deliberate 1-pixel placement, one
colour at a time, avoid blur/smudge, limited palette, cluster/dither discipline.
This ruled out inpainting, exemplar smearing and vector rectangles.

**Method that worked:** Vector Craft generated the exact 1:1 zone mask
(`work/poker/vc_queen_zones_mask.png`, from 1-pixel-aligned rectangles at
`scale:1`). The three text zones were then filled with **real source pixels only**:
clean beige patches from the ground-truth Ten card's blank plaque
(`affinity_distinct_layer_1.png`), with 2×2 clusters from verified strictly-beige
Ten-plaque pixels injected to match the family's pixel density. Rank/suit zone
used Queen's own clean cream strip, mirrored-tiled. No resampling, no generated
colours, no blur.

**File:** `work/poker/queen-pixel-perfect.png` (263×413 RGBA).
Zoom proof: `work/poker/queen-pixel-perfect-zoom.png`.

**Verification:** pixels outside the Vector Craft mask are bit-identical to the
source (max diff 0); filled-zone adjacent-pixel density **h 0.0501 / v 0.0373**,
inside the documented Queen band (0.0449 / 0.0365). Rank, suit, player name, role
name and icon removed; only the thin separator line retained. Edges hard, no AA.

**Status: first finished card, awaiting Andro/Phil multi-scale review.**

## 3b-7. Background logo cleanup (autonomous, 2026-11-18)

Input: `work/poker/canva-background-holey.png` (Canva scene with logo layers and
hands deleted, 1672×941). PhotoCraft `select.rect` over the logo footprint
(690,28,295,222) + `edit.contentAwareFill` with `sampling:"rectangular"`,
`area:[560,20,560,210]`, seed 7, then PNG export at native size.
Output: `work/poker/background-nologo-interim.png` (1672×941, RGB).
Zoom: `work/poker/bg_clean_logo_zoom.png`. The logo, dark capsule and dashes are
gone and the amber light falloff / dark lower fold are preserved. **Status:
interim / not approved** — the filled banner is a smooth gradient without the
source's fine pixel grain (known STYLE-NOTES §7 violation). Hands are absent, as
required for a clean background.

## 3c-2. `work/poker/mask_cards.png` provenance and use (2026-11-18)

- **Provenance:** generated by `work/poker/detect.py` lines 12–21 — a plain colour
  threshold on the approved source (`brightness > 125`, `R > 140`, `R−B > 18`,
  `G > 95`, restricted to y 300–880, x 150–1520), written as an 8-bit white/black
  PNG. It is **not** AI-generated and not an edge detector. White = card-stock-like
  pixels; black = dark borders, portraits, red ornament and finger shadows.
- **What it shows:** visible card silhouettes, printed text shapes, and finger tips
  attached below the lower card edges. It contains **no pixel data for hidden
  regions** and cannot solve reconstruction.
- **Boundary test:** deriving a border from mask pixels (dark pixel with white on
  both sides) and comparing with the hand-traced black-border lines gave median
  deviations of 39 px (10–J), 17 px (J–Q), 14 px (Q–K) and 66 px (K–A); only
  84/404 and 35/364 rows yielded a usable mask border for 10–J and K–A. The
  Q/K zoom (`work/poker/qk_mask_vs_traced_zoom.png`) shows the mask-derived line
  jumping left into the crimson ornament while the traced line follows the actual
  border. **The mask does not materially improve separation** over the traced
  dark border; use it only as a visible-silhouette sanity check.
- **Z-order confirmed right-to-left:** 10 (z=0, backmost) → J (1) → Q (2) → K (3)
  → A (4, frontmost). Assembly draws in ascending z, so Ace is frontmost.

## 3d. Reconstruction workflow order and consistency contract (owner, 2026-11-18)

Order changed by the owner: **separate the cards first**, then reconstruct only
the missing/occluded portions with Affinity AI at the chosen grid, then
correct/re-quantise the filled areas into true pixel art aligned to that grid.
Verify each family's pixel density by measurement before sending previews.

The grid is 1 source pixel per art pixel at 1672×941 (no resampling). Family
contracts and the exact verification metrics are recorded in `STYLE-NOTES.md` §7.
AI fills must never introduce a different pixel density, softer AA-like edges,
or higher-quality distant details; the result is a starting point that is then
quantised back onto the grid and checked against the family statistics.

## 4. Explicitly rejected (evidence from passes 3–6)

- Clone/stretch of a clean patch → stretched blobs and visible repetition.
- Random per-pixel or 2×2 resampling of beige → "dotted static" in card plaques.
- Nearest-pixel propagation over large holes → duplicated face fragments and
  flat blocks (card-10 / card-jack).
- cv2 Telea inpainting on pixel art → smooth/blurry gradients and colour bleed.
- Broad colour masks for the background → erased surrounding players.
