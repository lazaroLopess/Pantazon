---
name: Architectural Commerce
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#374559'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f5d71'
  on-tertiary-container: '#c7d6ee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
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
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a high-performance headless e-commerce ecosystem. It balances the commercial vitality required for storefronts with the operational rigor needed for administrative interfaces. The personality is authoritative, reliable, and invisible—prioritizing user data and products over decorative flourishes.

The style is **Corporate Modern**, rooted in structural integrity and clarity. It avoids ephemeral trends like glassmorphism in favor of solid surfaces, purposeful white space, and a strict adherence to a logic-driven grid. The aesthetic reflects a "system of record" where precision and utility are the primary drivers of the user experience.

- **Target Audience:** Enterprise merchants, developers, and high-volume consumers.
- **Emotional Response:** Stability, efficiency, trust, and professional competence.

## Colors

The color palette is built on a foundation of "Navy and Blue," signaling industry-standard reliability. 

- **Primary Blue (#1D4ED8):** Used for primary actions, active states, and key brand touchpoints. 
- **Neutral Scale:** Uses a cool-gray spectrum to maintain a clean, "SaaS" feel. `#0F172A` serves as the anchor for headings and primary text, ensuring maximum legibility.
- **Functional Colors:** These are solid, high-visibility tokens used for system feedback and status indicators. They are never desaturated, ensuring critical information (like "Out of Stock" or "Payment Failed") is immediately recognizable.
- **Surface Strategy:** The Admin Dashboard utilizes `#F8FAFC` for page backgrounds to create a subtle contrast with white (`#FFFFFF`) data cards, while the Storefront leans more heavily on pure white for a crisp, boutique feel.

## Typography

This design system utilizes **Inter** for its exceptional legibility in UI environments and **Geist** for technical labels and data-heavy segments within the Admin Dashboard.

- **Scale:** The hierarchy is tight. Large display sizes are reserved for storefront marketing, while the admin side primarily utilizes `headline-sm` down to `label-sm`.
- **Labels:** Use Geist for all UI meta-data, table headers, and form labels. Its slightly more technical, mono-influenced character helps distinguish "system data" from "user content."
- **Weight:** Avoid using weights below 400 for accessibility. Headlines should consistently use 600 or 700 to provide a strong visual anchor on the page.

## Layout & Spacing

The layout is governed by a **strict 8px grid system**. All dimensions, padding, and margins must be multiples of 8 (or 4 for micro-adjustments).

- **Storefront Layout:** Uses a 12-column fluid grid with a max-width of 1280px. Margins are generous (32px+) to allow products to "breathe" and evoke a premium feel.
- **Admin Dashboard:** Uses a fixed sidebar (240px) with a fluid content area. Internal spacing is condensed to `md` (16px) to maximize data density without causing visual clutter.
- **Breakpoints:**
  - Mobile: < 640px (4 columns, 16px margins)
  - Tablet: 640px - 1024px (8 columns, 24px margins)
  - Desktop: > 1024px (12 columns, 32px margins)

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**.

- **Surfaces:** Level 0 is the background (`#F8FAFC`). Level 1 is the primary content card or container (`#FFFFFF`).
- **Shadows:** Use a single, elegant shadow style for floating elements like cards and dropdowns. 
  - *Standard Shadow:* `0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`. This uses a Navy tint in the shadow to maintain color harmony with the text.
- **Borders:** All containers at Level 1 should have a subtle 1px solid border (`#E2E8F0`) to define boundaries, especially in the Admin Dashboard where multiple data widgets may sit adjacent to one another.

## Shapes

The shape language is "Soft Professional." 

- **Base Radius:** 8px (`0.5rem`). This is applied to buttons, input fields, and standard cards.
- **Large Radius:** 16px (`1rem`). Used for larger storefront sections or promotional banners.
- **Zero Radius:** Never used. Even the most "industrial" elements of the dashboard should retain the 8px corner to remain approachable and modern.
- **Inputs:** Maintain the 8px radius consistently to match the action buttons, creating a cohesive form-factor.

## Components

- **Buttons:** 
  - *Primary:* Solid `#1D4ED8` with white text. 8px radius. High-contrast.
  - *Secondary:* Solid `#F1F5F9` with `#0F172A` text. No border.
  - *Outline:* 1px border `#E2E8F0` with `#0F172A` text.
- **Input Fields:** White background with `#E2E8F0` border. On focus, the border shifts to `#1D4ED8` with a 2px outer "halo" (ring) at 20% opacity.
- **Chips/Badges:** Small radius (4px) or fully rounded. Use subtle backgrounds for statuses (e.g., Success is light green background with dark green text) rather than high-saturation blocks, except for critical errors.
- **Cards:** White background, 1px border `#E2E8F0`, and the "Standard Shadow" defined in Elevation. In the Storefront, the shadow may be slightly more pronounced on hover to indicate interactivity.
- **Lists & Tables:** 
  - *Admin:* High-density tables with 12px vertical cell padding. Horizontal borders only.
  - *Storefront:* List items use 24px padding with soft dividers to facilitate quick scanning of product attributes.
- **Navigation:**
  - *Admin Sidebar:* Dark (`#0F172A`) with active states highlighted in Primary Blue.
  - *Storefront Header:* Clean white background with a bottom border and centered search functionality.