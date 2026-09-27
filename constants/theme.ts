/* Hallmark · genre: playful · macrostructure: app shell (title + tool panel + ledger)
 * design-system: design.md · designed-as-app · tone: neo-brutal · anchor hue: blue 265
 * pre-emit critique: P4 H4 E4 S4 R4 V3
 *
 * React Native can't parse oklch(), so tokens are hex. OKLCH equivalents live in design.md.
 * Every colour and font in app/ and components/ comes from here — no inline hex.
 */

export const color = {
  paper: '#DFE5F2', // page background
  surface: '#F7F9FC', // cards, inputs, tab bar
  ink: '#14182B', // text, borders, hard shadows
  inkMuted: '#4A5270', // secondary text (6.1:1 on paper)
  primary: '#88AAEE', // constructive actions, active tab
  danger: '#FF6B6B', // destructive actions only
  done: '#4ECDC4', // checked items, progress
  highlight: '#FFE66D', // quick-add toggle only
} as const;

export const font = {
  regular: 'SpaceGrotesk-Regular',
  bold: 'SpaceGrotesk-Bold',
} as const;

export const text = { xs: 12, sm: 14, md: 16, lg: 20, display: 32 } as const;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 6, md: 8, lg: 12 } as const;

// Heavy borders + hard shadow = "you can press this". Light borders = everything inside.
export const border = { heavy: 3, light: 2 } as const;

export const shadow = {
  hard: `4px 4px 0px ${color.ink}`,
  small: `2px 2px 0px ${color.ink}`,
} as const;

// Swatches for new categories — tuned to the brand's lightness band.
export const swatches = [
  '#88AAEE', '#FF8A80', '#4ECDC4', '#FFE66D', '#FF8ED4', '#9BE08F',
  '#FFB36B', '#C4A7F5', '#7FD4F0', '#E8CFA0', '#B8F2C9', '#FFC2A8',
] as const;

export const tabular = { fontVariant: ['tabular-nums' as const] };
