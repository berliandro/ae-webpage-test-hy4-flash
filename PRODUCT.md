# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

**Open — no implementation stack is established.** No language or framework is pre-committed. This is a shaping-stage decision to be made from the product and experience needs.

## Users

Primary audience: **Alter Ego / MPL Indonesia fans** who recognise the team and its players. For them the hero should reward fandom by putting them inside the hand rather than showing them a team page from a distance.

Secondary reality: the experience must remain **legible to newcomers** who do not know the roster. A visitor with no prior context should still understand the card-game conceit and the team identity without needing explanation.

## Product Purpose

The homepage hero is the only fully established experience at this stage. Its purpose is to make a visitor feel they are personally sitting at a high-stakes poker table, holding Alter Ego's five core players as five oversized collectible playing cards in their own hand. Success is the feeling of physical presence and participation — being *in* the game — not the efficient delivery of team information.

All remaining pages and sections are **undecided by design**. Do not assume a conventional esports team website structure; leave room for discovery during shaping. The eventual site should feel like an extension of the Alter Ego card-game universe.

## Positioning

The differentiating mechanism is the **first-person playing hand as the team**: five core players are represented as five premium playing cards (Ace, Jack, Queen, King, Ten) held by the visitor at a poker table, with the surrounding table, other players, and environment belonging to the same illustrated world. This is an atmospheric, cinematic experience rather than a generic esports information portal. It is an explicitly **distinct creative direction** from other MPL ID team website projects: do not reuse their visual identities, layouts, compositions, or established design patterns.

## Operating Context

The experience is encountered as a website homepage, primarily in the first viewport. It is visual and atmospheric rather than information-dense. No workflows, accounts, documents, or other usage rituals have been established. No other pages or sections have been defined.

## Capabilities and Constraints

**Non-negotiable experience principles** (captured from the brief, to be expanded only in shaping, not rewritten here):

- The hero is a **first-person POV of someone holding five playing cards**. Each card is one core player. The visitor sees the surrounding poker-table environment, including other people participating in the game.
- Cards are **oversized, premium playing cards** with identities Ace, Jack, Queen, King, Ten.
- **Depth of field**: the five cards are the focal point; the environment behind them is subtly blurred, loses sharpness progressively outside the focal plane, and is slightly darkened to strengthen hierarchy.
- **Lighting**: cinematic overhead lighting, focused illumination on cards and hands, natural shadows and dimensional lighting, darker surrounding environment for contrast.
- **Composition**: strong first-person perspective, convincing depth and spatial relationships, clear foreground / middle-ground / background separation; cards must feel physically present, not flat UI.
- **Motion**: subtle, restrained hand movement while holding the cards that reinforces the feeling of physically holding them; no distracting animation.
- Hands, fingers, table surfaces, surrounding players, and environmental elements must all feel like parts of **one illustrated world**.

**Portraits and cards:**

- No actual player photographs. Use stylised illustrated / cartoon character portraits consistent in illustration style, character proportions, rendering technique, lighting, colour treatment, card framing, and decorative details.
- Prioritise original illustrations or appropriately licensed artwork. No unauthorised photographs or misleading representations.
- Player identities, roles, and card assignments must be based on **verified roster information, not assumptions**. Do not invent player identities, roster information, statistics, or team history. Always distinguish verified facts from creative proposals.

**Additional players:**

- Verified roster evidence supports more than five registered players. If additional / substitute players are represented, they must be **optional cards near the bottom-left or bottom-right** of the hero, selectable to replace or fill a primary position, and must **not compete visually** with the five primary cards. Whether this interaction is included remains an open decision.

**Assets:**

- Establish an independent asset library: hands and fingers holding cards, other players at the table, poker-table environments, playing-card designs and decorative elements, illustrated player portraits, lighting, shadows, textures, and environmental detail.
- Prioritise a **coherent artistic direction** over individually attractive but incompatible assets. Assets need not come from one source, but any used together must be visually compatible.
- An existing reusable asset library is available; its handling rules are recorded in `ASSETS.md` and summarised in the project `AGENTS.md`. Assets are **resources, not design references** — they must never determine the pages, layout, artistic direction, required visual elements, or UX. Build to this product definition first, then inspect the library when a concrete asset is needed; reuse what fits, source independently (sub-agents permitted) when nothing fits, and verify licensing and visual compatibility. Never force an available asset into the design.

**Scope discipline:**

- Do not implement the homepage, generate production assets, or modify production code during initialization.
- Preserve unresolved product decisions instead of silently making assumptions.
- Typography, colour palette, full card design, illustration specification, environment art, textures, and transition details are intentionally **not** defined here; they belong to later visual-world work.

**Open decisions (preserved, not resolved):**

1. Which verified player maps to each of Ace / Jack / Queen / King / Ten — a **creative design decision, not a factual roster attribute**. It stays undecided until shaping.
2. Whether the additional / substitute card interaction is actually built.
3. What the remaining website pages or sections contain.
4. The implementation stack (see Stack).

## Brand Commitments

- Team identity: **Alter Ego**, a Mobile Legends: Bang Bang (MPL Indonesia) esports team. Slogan shown on Liquipedia: **#ALTERCHAMP**.
- The poker / card-game universe is a binding creative direction supplied by the user: the visitor is a player at the table, not a spectator.
- This project must establish its own visual identity and must not copy or reuse the user's other MPL ID team website projects.
- The user-supplied creative direction is recorded here as product truth; it is not a request to expand it into a full palette, type system, or component set at this stage.

## Evidence on Hand

Roster research was performed on 2026-11-18 from the sources the user authorised: Liquipedia and the official MPL Indonesia / MLBB sites. Findings are labelled by confidence.

**Verified — official MPL Indonesia site** (`https://id-mpl.com/team/ae`, accessed 2026-11-18; "ROSTER SEASON 18"): eight registered players, with no starter/substitute designation — Nino (EXP Lane), Affan (Jungle), Reyy (Jungle), Dalvin (Midlane), Halim (Midlane), Dingarai (Gold Lane), Alexander (Roam), Ivann (Roam). Staff: xepher (Coach), STYX (Assistant Coach). Season 18 is the current season per `https://id-mpl.com`.

**Verified — Liquipedia active roster** (`https://liquipedia.net/mobilelegends/api.php?action=parse&page=Alter_Ego&prop=text&section=4&format=json`, cached 2026-11-18; individual player pages via the same API). All eight listed as Active, Indonesia:

| IGN | Real name | Role | Join date | Note |
|---|---|---|---|---|
| Nino | Syauki Fauzan Sumarno | EXP Lane | 2024-07-30 | Captain |
| Yazukee | Andi Muhammad Affan Wahyudi | Jungler | 2025-08-05 | Listed as "Affan" on the official MPL site |
| Reyy | Reynaldo Ferdiand | Jungler | 2026-03-04 | |
| Hijumee | Dalvin Ramadhana Putra | Middle | 2025-02-16 | Listed as "Dalvin" on the official MPL site |
| Cyruz | Muhammad Halim Adicondro | Middle | 2025-08-05 | Listed as "Halim" on the official MPL site; alias inferred from matching name and role, not directly confirmed |
| Arfy | Arifudin Dingarai Putra | Gold Lane | 2025-04-30 | Listed as "Dingarai" on the official MPL site |
| alekk | Alexander Owen Marcetami Buhe | Roamer | 2025-08-05 | Listed as "Alexander" on the official MPL site |
| Ivann | Vincentsius Ivan Adrianto | Roamer | 2026-08-02 | |

The two sources agree on the eight players and their roles; the official site publishes only short display names. **The official MPL roster is the authoritative source for registration** — it establishes who is registered on the Season 18 team. It is deliberately kept distinct from any source that identifies *starters and substitutes*: the official registration list does not mark that distinction.

**Season 18 lineup evidence — starters versus substitutes.** Per the user's review, the strongest current lineup evidence identifies the **primary five as Nino, Affan, Dalvin, Dingarai, and Alexander**, with **Reyy, Halim, and Ivann as substitutes**. These are the display names used on the official registration list. By alias they correspond to Nino, Yazukee, Hijumee, Arfy, and alekk as the primary five, and Reyy, Cyruz, and Ivann as substitutes. This is lineup evidence, not registration evidence, and is recorded separately from the authoritative official roster above. Which rank (Ace / Jack / Queen / King / Ten) each player holds is **not** a roster attribute and remains undecided.

**Corroborating — last explicitly labelled starting five.** The MPL Indonesia Season 17 page (`https://liquipedia.net/mobilelegends/api.php?action=parse&page=MPL/Indonesia/Season_17&prop=wikitext&format=json`, accessed 2026-11-18) labels starters and substitutes: **Nino (EXP, Captain), Yazukee (Jungler), Hijumee (Mid), Arfy (Gold), alekk (Roam)**; substitutes Reyy (Jungler) and Cyruz (Mid). The same five, with substitutes Rinee and Cyruz, are listed for the M7 World Championship (3–25 Jan 2026). Alter Ego's own Liquipedia gallery caption shows the M7 lineup left-to-right as Yazukee, alekk, Nino, Hijumee, Arfy. This historical labelled lineup corroborates the Season 18 primary-five evidence above by alias; it is supporting evidence, not the authoritative source for either registration or the current lineup.

**Unverified / deliberately unresolved:**

- The official MPL site does not designate starters or substitutes, so the Season 18 starter/substitute split rests on lineup evidence rather than on the authoritative registration source. The Season 18 Liquipedia page was rate-limited (HTTP 429) on 2026-11-18 and could not be used to corroborate it directly.
- Full real names are not published by the official MPL site; all real names above come from Liquipedia.
- The "Halim = Cyruz" alias is inferred from a matching real name and role, not directly confirmed.
- It is unverified whether "Rinee" (M7 substitute jungler) and "Reyy" are the same player.
- No team-authored roster post from Alter Ego's own social accounts was retrieved.
- No statistics, championships beyond those stated in the cited sources, or other team history should be invented.

## Product Principles

1. **The visitor is a player, not a spectator.** The hand, the table, and the other players must make the visitor feel personally seated in a high-stakes game.
2. **Five cards are the team.** The five primary players are the focal point; the surrounding world supports them and never steals focus.
3. **One coherent world, one illustrated language.** Every element — cards, portraits, hands, table, lighting, shadows, textures, motion — must belong to the same artistic identity. No generic esports UI, no mixed illustration styles.
4. **Verified truth over invention.** Roster facts come only from verified sources; any creative mapping is labelled as a proposal, never presented as fact.
5. **Stay in the universe, stay focused.** Shape only what the card-game experience requires; do not default to a conventional esports information portal, and keep other pages unresolved until deliberately designed.

## Accessibility & Inclusion

The experience must be legible to visitors who do not know the roster (confirmed with the audience decision). No other product-specific accessibility requirement has been established. Depth of field and darkened surroundings are atmosphere, not a mechanism for carrying essential information — applying that concretely is a later design decision.
