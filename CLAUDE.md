@AGENTS.md

# Project rules

- **Always translate to ALL supported languages** when adding or modifying text content. The supported locales are: es, en, ca, fr, de, it, pt, sv, nb, da, pl. Never leave translations only in Spanish — all message files and blog posts must be updated together. Translations must reflect the brand's tone: direct, confident, conversational, never corporate or robotic.
- **NEVER cite unverified sources.** Any bibliography, study, statistic, or external data referenced in blog posts or website content MUST be verified as a real, trustworthy source before including it. Do not pull data from the internet without confirming it exists and is credible. If a source cannot be verified, do not include it. Use our own data or clearly state it is an estimate. 
This is a strict rule — no exceptions.

- **NEVER DO GIT PUSH** you can do adds and commits, but you can NEVER do git push

# Brand Guidelines — Controlá

## Typography
- **Font:** Albert Sans (Google Fonts), weights: 300, 400, 500, 600, 700, 800
- **CSS variable:** `--font-albert-sans`
- **ALL text on the site must use this font.** Never use system fonts or other typefaces for visible content.
- **H1 (Hero):** `clamp(2.6rem, 5.5vw, 4rem)` / weight 800 / line-height 1.08 / tracking -2px
- **H2 (Section titles):** `clamp(2rem, 4vw, 3rem)` / weight 800 / line-height 1.1 / tracking -1.5px
- **Section Labels:** 0.82rem / weight 600 / uppercase / tracking 1.5px / color azul
- **Body text:** 1.05rem / weight 400 / line-height 1.7
- **Small text:** 0.95rem or 0.85rem
- **Stat numbers:** `clamp(1.8rem, 3vw, 2.5rem)` / weight 800

## Color Palette
| Token | Hex | Use |
|-------|-----|-----|
| azul | #4141e2 | Primary, links, accents, section labels |
| azul-hover | #3333c0 | Hover state |
| azul-light | rgba(65,65,226,0.08) | Badge backgrounds |
| navy | #132342 | Headings, dark backgrounds |
| navy-mid | #1a2f54 | Form fields on dark bg |
| naranja | #e05e27 | Primary CTA, alerts, warnings |
| naranja-hover | #c84f1e | CTA hover |
| verde | #69ca90 | Success, savings, positive |
| gris | #e8edef | Light section backgrounds |
| gris-dark | #8899a6 | Muted text |
| texto | #2d3748 | Default body text |
| texto-light | #64748b | Secondary text |

## Buttons
- **Primary CTA:** bg-naranja, text-white, font-bold, py-4 px-11, rounded-xl, shadow, hover:-translate-y-0.5
- **Secondary:** bg-azul-light, text-azul, font-semibold, py-3 px-6, rounded-xl, hover:bg-azul hover:text-white
- **On dark bg:** bg-white, text-azul, font-bold, rounded-xl

## Cards & Surfaces
- Cards: bg-white, rounded-2xl, shadow-xl, p-6
- Rounded corners: buttons/inputs rounded-xl, cards rounded-2xl
- Status pills: rounded-full with color/10 backgrounds

## Sections
- Alternate bg-white and bg-gris for section backgrounds
- Max content width: max-w-[1200px]
- Section padding: py-[100px] px-6, mobile: py-[70px]
