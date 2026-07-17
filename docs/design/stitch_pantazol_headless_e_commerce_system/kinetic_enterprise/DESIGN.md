---
name: Kinetic Enterprise
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

This design system is built on a **Corporate Modern** foundation with a lean towards **Minimalism**. It aims to evoke a sense of high-performance reliability, precision, and clarity. The target audience spans two distinct personas: the end-consumer seeking a frictionless storefront experience and the administrative operator managing complex logistics.

The aesthetic is defined by:
- **Functional Clarity:** Removing unnecessary ornamentation to focus on data and conversion.
- **Precision:** Tight alignment, consistent spacing scales, and sharp execution of interactive states.
- **Authority:** A sophisticated palette and structured hierarchy that feels institutional yet technologically advanced.
- **Hybridity:** A seamless transition between "Retail/Storefront" (expressive, spacious) and "Admin/Operations" (data-dense, utilitarian).

## Colors

The palette is anchored in high-contrast neutrals to ensure maximum legibility and a professional tone.

- **Primary (#0F172A):** A deep slate used for primary actions, headings, and high-impact UI elements. It represents stability.
- **Secondary (#3B82F6):** A vibrant blue used for interactive states, links, and accents. It provides a clear "action" scent.
- **Tertiary (#F8FAFC):** An off-white background slate used for surface differentiation in Admin panels and Storefront sections.
- **Neutral (#64748B):** Used for secondary text, borders, and icons that shouldn't compete for attention.

**Accessibility Note:** All text-on-background combinations must meet WCAG AA standards (4.5:1 ratio). Focus states use the Secondary color with a 2px offset ring to ensure visibility for keyboard-only users.

## Typography

The typography system uses a tri-font strategy to differentiate intent:

1.  **Hanken Grotesk (Headlines):** Sharp and contemporary. Used for large displays and section headers to establish authority.
2.  **Inter (Body):** Highly legible and neutral. Optimized for long-form reading in product descriptions or admin logs.
3.  **Geist (Labels/Code):** A technical monospaced-adjacent feel. Used for KPIs, status indicators, and administrative metadata.

Maintain a vertical rhythm by adhering strictly to the defined line heights. For mobile, scale down display and large headline sizes as defined in the tokens.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop and a **Fluid** model for mobile.

- **Desktop:** 12-column grid, 1280px max-width, 24px gutters. Content is centered with margin-auto.
- **Mobile:** 4-column fluid grid with 16px side margins.
- **Rhythm:** An 8pt spacing system (using a 4px base unit) governs all padding and margins. 

**Admin Exception:** The dashboard view uses a "Full Width" fluid layout with a sidebar (280px fixed width) and a main content area that expands to 100% of the viewport to accommodate wide operational tables.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** supplemented by **Ambient Shadows**.

- **Level 0 (Base):** Background color (`#FFFFFF` for Storefront, `#F8FAFC` for Admin).
- **Level 1 (Cards/Sections):** White background with a 1px border (`#E2E8F0`).
- **Level 2 (Hover/Active):** Subtle shadow (0 4px 6px -1px rgb(0 0 0 / 0.1)) to indicate interactivity.
- **Level 3 (Overlays/Modals):** High-diffusion shadow (0 20px 25px -5px rgb(0 0 0 / 0.1)) with a backdrop blur of 8px.

In Admin views, prefer 1px borders over shadows to maintain a "flat" and organized appearance for data-heavy views.

## Shapes

The design system uses a **Soft (0.25rem)** roundedness approach. 

- **Standard (4px):** Buttons, Input fields, Badges.
- **Large (8px):** Product Cards, Admin Tiles, Modals.
- **Extra Large (12px):** Hero sections or promotional banners.

This subtle rounding maintains the professional "Corporate" look while softening the edges for a more modern, approachable feel than 90-degree corners.

## Components

### Common Molecules
- **Buttons:** Primary (Solid Primary Color), Secondary (Outline), Ghost (Text only). Height: 40px (Standard), 32px (Small/Admin).
- **Inputs:** 1px border. Focus state: 2px Secondary color ring. Include floating labels or persistent top-aligned labels.
- **Badges/Status Indicators:** Pill-shaped with low-opacity background tints (e.g., Success = Green text on light green background).

### Storefront Components
- **Product Cards:** Vertical layout, Level 2 elevation on hover, prominent "Add to Cart" ghost button appearing on interaction.
- **Cart Lines:** Horizontal list items with 16px padding, subtle 1px dividers, and high-contrast price labels.

### Admin Components
- **KPI Cards:** Fixed aspect ratio, bold display-sm numbers, Geist label for the metric name, and a small trend sparkline.
- **Operational Tables:** Compact row heights (40px), sticky headers, striped rows for readability, and action icons in the final column.
- **Timelines:** Vertical 2px tracks with 8px circular nodes representing status changes (Order Placed -> Shipped -> Delivered).

**Focus States:** All interactive elements must show a `#3B82F6` 2px ring with a 2px offset when navigated via keyboard.