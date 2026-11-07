---
name: Kinetic Obsidian
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c3caac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8d9479'
  outline-variant: '#434933'
  surface-tint: '#a6d700'
  primary: '#ffffff'
  on-primary: '#273500'
  primary-container: '#bef500'
  on-primary-container: '#536d00'
  inverse-primary: '#4e6700'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3038'
  tertiary-container: '#e3e1ec'
  on-tertiary-container: '#63646c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bef500'
  primary-fixed-dim: '#a6d700'
  on-primary-fixed: '#151f00'
  on-primary-fixed-variant: '#3a4d00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e3e1ec'
  tertiary-fixed-dim: '#c6c5cf'
  on-tertiary-fixed: '#1a1b22'
  on-tertiary-fixed-variant: '#46464e'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-hero:
    fontFamily: Sora
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  stat-counter:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
  label-mono:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system blends **High-Contrast Bold** athletic power with refined **Glassmorphism** and dark-mode precision. Crafted for enterprise fitness operations, boutique performance centers, and elite athletic clubs, the system communicates uncompromising authority, momentum, and premium discipline.

The visual language rejects generic wellness tropes in favor of an intense, performance-driven aesthetic: deep void blacks, razor-sharp technical metrics, and high-voltage kinetic accents. Every surface feels engineered rather than decorated, mirroring the tactile precision of high-end gym equipment and telemetry hardware. 

The emotional response should be immediate: focused, energizing, disciplined, and technologically superior.

## Colors

The palette establishes an aggressive hierarchy built on a deep void baseline:

- **Primary Accent (`#C6FF00`)**: Electric Lime. Used purposefully for primary actions, active telemetry metrics, state changes, positive indicators, and high-impact key performance indicators. Never wash large surfaces in this color; use it as an electric current flowing through dark substrates.
- **Secondary Accent (`#FFFFFF`)**: Pure White. Provides stark, crisp contrast for critical metrics, primary headings, and maximum-clarity data values.
- **Muted Supporting Neutrals**: Zinc scales (`#A1A1AA`, `#71717A`) manage structural labels, secondary reading layers, tabular headers, and unselected states without competing with primary telemetry.
- **Canvas & Surface Tiering**:
  - Base Canvas: `#090909` (Obsidian baseline).
  - Primary Surface: `#151515` (Tier 1 navigation and card containers).
  - Elevated Surface: `#1E1E1E` (Dropdowns, modals, flyouts, and active row overlays).
- **Subtle Overlays & Keyline Borders**:
  - Structural Keyline: `rgba(255, 255, 255, 0.08)` for container boundaries.
  - Active/Energy Glow Border: `rgba(198, 255, 0, 0.25)` to signify active focus, selected states, and real-time live events.

## Typography

The typographic hierarchy combines the aggressive, architectural geometry of **Sora** for headlines, numerical stats, and brand marks, with the neutral clarity of **Inter** for dense tabular data, forms, and administrative controls.

- **Uppercase Tracking**: `label-caps` is deployed for dashboard metadata tags, section dividers, column headers, and telemetry labels. It must always be rendered in uppercase with tight, deliberate tracking (`0.1em`).
- **Tabular Numerics**: When displaying financial ledger metrics, rep counts, heart-rate zones, or locker allocations, apply tabular figures (`font-variant-numeric: tabular-nums`) across both `stat-counter` and `body-md` tokens to ensure stable column alignments during real-time data streaming.

## Layout & Spacing

The dashboard operates on a dynamic 12-column layout structured for high-density administrative workflows:

- **Desktop (1200px+)**: A dedicated 260px collapsible operational navigation sidebar, paired with a 12-column fluid content area. Gutter width stays fixed at `1.5rem` (`24px`), with outer canvas margins set to `2rem` (`32px`).
- **Tablet (768px - 1199px)**: The navigation collapses into an icon rail (72px width). The content grid switches to an 8-column layout with `1rem` gutters and `1.5rem` margins.
- **Mobile (Below 768px)**: The navigation transforms into a top-bar control with a full-screen drawer overlay. Content moves to a single or 2-column stacked flow using `gutter-mobile` (`0.75rem`) and `margin-mobile` (`1rem`).
- **Vertical Rhythm**: Card interiors use `space-lg` for structural separation, with `space-sm` for inline metric headers and tags. Grouped form inputs and nested metrics rely strictly on `space-md`.

## Elevation & Depth

Visual hierarchy does not use soft natural daylight shadows. Instead, it relies on dark tonal shifts, frosted glass layering, and neon luminescence:

- **Layer 0 (Canvas Baseline)**: Solid `#090909`. Non-interactive backdrop.
- **Layer 1 (Card & Module Surfaces)**: Dark charcoal (`#151515`) set at `80%` opacity with a `16px` backdrop-filter blur (`blur(16px)`). Bound by a ghost border: `1px solid rgba(255, 255, 255, 0.08)`.
- **Layer 2 (Floating Modals, Drawers & Popovers)**: `#1E1E1E` surface with a `24px` backdrop blur. Edges are reinforced with `1px solid rgba(255, 255, 255, 0.14)`. Deep ambient shadow: `0 20px 40px -10px rgba(0, 0, 0, 0.85)`.
- **Active State / Kinetic Glow**: Focused items, selected rows, or running gym sessions cast a focused neon luminescence: `0 0 20px rgba(198, 255, 0, 0.15)`, accompanied by a high-contrast border: `1px solid rgba(198, 255, 0, 0.4)`.

## Shapes

The design system uses a controlled **Soft (`1`)** shape language to evoke precision equipment, cut carbon fiber, and technical monitors:

- Base inputs, buttons, panels, table rows, and dashboard modules strictly feature `0.25rem` (`4px`) to `0.5rem` (`8px`) corner radiuses.
- The lone exception is the **Pill Badge**: system tags, active status pills, and workout phase badges use a full pill radius (`9999px`) to create an immediate shape distinction against structural, squared-off analytical containers.

## Components

### Buttons
- **Primary Kinetic Action**: Solid `#C6FF00` background, pure black `#090909` text, `Sora` semi-bold, uppercase tracking. Hover: subtle scale and `box-shadow: 0 0 16px rgba(198, 255, 0, 0.35)`.
- **Secondary Ghost**: Transparent background, `1px solid rgba(255, 255, 255, 0.12)`, pure white `#FFFFFF` text. Hover: border shifts to `rgba(255, 255, 255, 0.35)` with background `rgba(255, 255, 255, 0.04)`.
- **Destructive**: Deep crimson wash (`rgba(239, 68, 68, 0.1)`), border `1px solid rgba(239, 68, 68, 0.3)`, text `#EF4444`.

### Stat Counters & Metric Cards
- Dark glass surface (`#151515` at 80% opacity, `1px solid rgba(255, 255, 255, 0.08)`).
- Top: `label-caps` in `#71717A` with contextual mini-icon.
- Center: Large `stat-counter` metric in `#FFFFFF` with optional `#C6FF00` live indicator dot.
- Bottom: Dynamic trend indicator badge showing upward/downward deltas.

### Badge Tags & Status Indicators
- **Active / Operational**: Pill-shaped (`rounded-full`), background `rgba(198, 255, 0, 0.12)`, text `#C6FF00`, border `1px solid rgba(198, 255, 0, 0.3)`. Accompanied by a pulsing 6px neon dot.
- **Muted / Off-Duty**: Pill-shaped, background `rgba(255, 255, 255, 0.05)`, text `#A1A1AA`, border `1px solid rgba(255, 255, 255, 0.08)`.

### Data Tables
- Header row: `#090909`, text `label-caps` in `#71717A`, bottom border `1px solid rgba(255, 255, 255, 0.08)`.
- Data rows: Alternating subtle hover states (`rgba(255, 255, 255, 0.02)`), bottom border `1px solid rgba(255, 255, 255, 0.04)`. Active row highlight utilizes a left border accent: `3px solid #C6FF00`.

### Form Inputs & Checkboxes
- **Inputs**: Background `#121212`, border `1px solid rgba(255, 255, 255, 0.1)`, text `#FFFFFF`, placeholder `#71717A`. Focus: border switches to `#C6FF00` with zero blur bleeding.
- **Checkboxes & Radios**: Custom square/round frames in `rgba(255, 255, 255, 0.15)`. Checked state fills `#C6FF00` with `#090909` checkmark glyph.

### Navigation (Sidebar & Header)
- **Collapsible Sidebar**: `#121212` background, right border `1px solid rgba(255, 255, 255, 0.06)`. Nav items feature `#71717A` typography, shifting to `#FFFFFF` text and a left-aligned `#C6FF00` kinetic notch on active state.
- **Header**: Sticky glass header (`backdrop-blur-md`, `rgba(9, 9, 9, 0.8)`), housing location switcher, real-time gym capacity gauge, and member search shortcut.