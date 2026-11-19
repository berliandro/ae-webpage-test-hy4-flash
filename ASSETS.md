# Reusable Asset Library — Handling Rules

These rules are binding for all future work on this project. They were supplied by the user on 2026-11-18 and must be followed by every agent session.

## Location and contents

- **Reusable asset folder:** `D:\! Coding\~ shit projects\! reuseable assets`
- **Current contents (per the user):**
  - PNG portraits of the players.
  - PNG hero images for players. These are **not uniform** in dimensions or aspect ratios.
  - Alter Ego and other team icons.
- **Planned later addition:** a folder of SVG lane-position icons — EXP Laner, Jungler, Mid Laner, Gold Laner, Roamer. These SVGs are **not available yet**. Do not wait for them and do not block development on their absence; leave integration points flexible so they can be added later.

## Governing principle

Assets are **resources, not design references**.

Never use the contents of this folder to determine:

- what pages the website should have;
- what the website's layout should look like;
- the overall artistic direction;
- which visual elements the website must contain;
- what the user experience should be.

`PRODUCT.md` (and, once written, `DESIGN.md`) remain the source of truth. The website's product definition and approved creative direction override anything found in the asset folder.

## Workflow

1. Design and build the website according to the product brief and approved design direction.
2. Whenever an **actual asset is needed**, inspect the reusable asset folder first.
3. Reuse suitable existing assets where they fit the design.
4. If a required asset cannot be found, source it independently. Sub-agents may be used for asset research, or you may search yourself — choose whichever is more efficient.
5. Ensure externally sourced assets are appropriately licensed and visually compatible with the established artistic direction.

**Do not force an existing asset into the design just because it is available.**

## Handling considerations

- Inspect PNG dimensions and aspect ratios before using them. Do not assume player hero PNGs share identical dimensions or proportions.
- Handle cropping, scaling, positioning, and framing consistently where necessary.
- Preserve original assets. **Never overwrite or modify the files in the reusable source folder.**
- The existing player PNGs and hero images do **not** override the requirement for illustrated / cartoon-style player portraits. Evaluate whether they are suitable for the intended treatment before incorporating them.

## Development priority

Build the website and establish its visual identity first. Asset discovery and integration support the design; they do not dictate it. Do not postpone implementation while waiting for the lane SVG files.
