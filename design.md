# Design — NeoShopper

A locked design system for this app. Every screen reads it before changing UI.
Extend or amend this file when the system needs to grow; don't override per screen.
Tokens live in `constants/theme.ts` — the only file allowed to contain colour values.

## Genre
playful · tone: neo-brutal (heavy ink borders, hard offset shadows, flat fills)

## Macrostructure family
- App screens: **title + tool panel + ledger**. Big left-aligned title, one raised
  panel for the screen's main tool (add item / create list), then a flat list.
- Settings: stacked sections, no raised panels — inline forms are light-bordered surfaces.

## Theme
React Native can't parse `oklch()`, so `theme.ts` holds hex. OKLCH for reference:

| Token | Hex | OKLCH (approx.) | Job |
|---|---|---|---|
| `paper` | `#DFE5F2` | oklch(92% 0.02 265) | page background |
| `surface` | `#F7F9FC` | oklch(98% 0.005 265) | cards, inputs, tab bar |
| `ink` | `#14182B` | oklch(21% 0.04 275) | text, borders, shadows |
| `inkMuted` | `#4A5270` | oklch(45% 0.05 275) | secondary text (6.1:1 on paper) |
| `primary` | `#88AAEE` | oklch(73% 0.11 265) | constructive actions, active tab |
| `danger` | `#FF6B6B` | oklch(70% 0.18 22) | destructive actions **only** |
| `done` | `#4ECDC4` | oklch(77% 0.12 185) | checked items, progress |
| `highlight` | `#FFE66D` | oklch(92% 0.14 100) | quick-add toggle **only** |

Category swatches: the 12 in `theme.swatches`. Categories saved before the redesign
keep their stored colours (user data is not migrated).

## Typography
- Space Grotesk 700 (titles, labels, buttons) + 400 (body). One family on purpose.
- Numbers (counts, dates): `...tabular` from theme.
- Scale: 12 / 14 / 16 / 20 / 32. Headings are never italic.

## Spacing
4-pt scale: `space.xs 4 · sm 8 · md 12 · lg 16 · xl 24 · xxl 32`. Screen top padding
comes from `useSafeAreaInsets()`, never a fixed number.

## Depth
- `border.heavy` (3) + `shadow.hard` (4px offset) = pressable, top-level: buttons, list cards, the tool panel.
- `border.light` (2), no shadow = everything inside a raised thing. Never nest raised in raised.
- Shadows use `boxShadow` (new architecture), never `elevation`.

## Microinteractions stance
- Press: element translates 4,4 into its own shadow. No opacity fades.
- Selected: inverted (ink fill) for chips; pressed-in + check for swatch/icon pickers.
- Disabled: paper fill, dashed muted border. Buttons disable when their input is empty.
- Deletes are immediate + 6 s Undo snackbar (`useUndo`). No confirmation dialogs.
- Tab bar (`components/TabBar.tsx`): icon + label on one line, active tab is a
  `primary` block with a heavy ink border. Sized by content, never a fixed height.
- Silent success — no "Saved!" toasts.
- Touch targets ≥ 44 pt; icon-only buttons carry `accessibilityLabel`.

## CTA voice
- Primary: `primary` fill, heavy ink border, hard shadow, sentence case, ≤ 2 words ("New list", "Add item").
- Secondary: `surface` fill, same shape ("Cancel", "Add category").
- Danger: `danger` fill, placed at the end of the screen, never in the header.

## Logo
Source: `assets/images/logo.svg` — a flat cart with a checked basket, drawn in the
system (ink strokes, `primary` basket, hard offset shadow, `surface` wheel hubs).
Exports: `icon.png` (1024, opaque paper), `adaptive-icon.png` (Android foreground,
mark at 66 % inside the safe zone), `splash-icon.png` (mark at 50 %, transparent),
`favicon.png` (48). Regenerate all four from the SVG when the mark changes.

## What screens MUST share
Tokens from `theme.ts`, the Space Grotesk pair, the depth rules, the CTA voice,
safe-area top padding, the Undo pattern for deletes.
