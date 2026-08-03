---
name: Juris Lex
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#4a5f84'
  primary: '#000d25'
  on-primary: '#ffffff'
  primary-container: '#0b2345'
  on-primary-container: '#768bb3'
  inverse-primary: '#b2c7f2'
  secondary: '#745b04'
  on-secondary: '#ffffff'
  secondary-container: '#ffdc7e'
  on-secondary-container: '#78600a'
  tertiary: '#000a30'
  on-tertiary: '#ffffff'
  tertiary-container: '#001d60'
  on-tertiary-container: '#6e87db'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#b2c7f2'
  on-primary-fixed: '#021b3d'
  on-primary-fixed-variant: '#32476b'
  secondary-fixed: '#ffe08d'
  secondary-fixed-dim: '#e4c368'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b6c4ff'
  on-tertiary-fixed: '#00164e'
  on-tertiary-fixed-variant: '#264191'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
  button:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies the prestige of high-court institutions and the cutting-edge efficiency of top-tier international law firms. It is designed to evoke trust, authority, and intellectual rigor through a "Modern Institutional" aesthetic.

The visual language blends **Minimalism** with **Glassmorphism**. It utilizes expansive whitespace, precise alignment, and subtle translucent layers to signify transparency and modernity. The interface feels established yet progressive, moving away from bureaucratic clutter toward a streamlined, user-centric experience inspired by high-end technology and academic excellence.

## Colors

The palette is anchored by **Deep Navy (#0B2345)**, representing the weight of legal precedent and institutional stability. **Premium Gold (#C8A951)** is used sparingly as a "hallmark" color for excellence, status indicators, and primary calls to action.

**Refined Blue (#1E3A8A)** serves as an interaction accent, guiding the user through digital workflows without breaking the formal tone. Backgrounds remain pristine, utilizing **White (#FFFFFF)** for primary content surfaces and **Light Gray (#F8F9FB)** to distinguish secondary sections or background containers. High-contrast typography in **Dark Gray (#1F2937)** ensures maximum legibility and professional clarity.

## Typography

This design system employs a sophisticated dual-font strategy. **Playfair Display** is used for all editorial and structural headings. Its high-contrast serifs reflect traditional legal manuscripts and authoritative presence.

**Inter** provides a highly legible, neutral counterpoint for body copy, data, and functional labels. This combination ensures that while the document looks "Legal," it performs with the efficiency of a modern SaaS application. Tighten letter-spacing on large display titles for a more curated, editorial look.

## Layout & Spacing

The design system utilizes a strict **8-point spacing system** to maintain mathematical harmony. The layout philosophy is built on a **Fluid Grid** that transitions to a fixed container width of 1280px on desktop screens.

- **Desktop (1440px+):** 12-column grid, 64px side margins, 24px gutters.
- **Tablet (768px - 1024px):** 8-column grid, 32px side margins, 20px gutters.
- **Mobile (<768px):** 4-column grid, 16px side margins, 16px gutters.

Emphasis is placed on vertical "breathing room." Use `lg` (48px) and `xl` (80px) spacing between major sections to emphasize the premium, spacious quality of the content.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Glassmorphism**. 

1.  **Level 0 (Base):** Light Gray (#F8F9FB) or White background.
2.  **Level 1 (Cards):** White surfaces with a soft, highly diffused shadow (Blur: 30px, Y: 10px, Opacity: 4% Black). 
3.  **Level 2 (Modals/Overlays):** Glassmorphism effect using `backdrop-filter: blur(12px)` and a semi-transparent white fill (80% opacity). A 1px white border with 10% opacity should be added to simulate the edge of glass.

Avoid heavy shadows or dark outlines. The goal is to make elements appear as though they are floating on a clean, atmospheric plane.

## Shapes

The shape language is refined and approachable. The system-wide standard is a **16px corner radius** (`rounded-lg` per the variable mapping) for cards, profiles, and primary containers. 

Buttons and smaller interactive elements like input fields should follow a slightly smaller radius (8px or `rounded-md`) to appear more precise and functional. Search bars and pill-tags may use fully rounded (pill-shaped) edges to provide visual variety and emphasize their interactive nature.

## Components

- **Modern Cards:** No borders. Use Level 1 shadows on White backgrounds. Padding should be generous (24px or 32px). Titles in Playfair Display, subtext in Inter.
- **Profiles:** Circular or 16px rounded images. Use soft shadows to lift the profile card from the background. Include a "Gold" border accent for executive members.
- **Interactive Maps:** Use a custom-styled map with a "Midnight" or "Silver" theme to match the Navy palette. Markers should use the Secondary Gold color.
- **Timeline Design:** A single vertical Navy line (2px width). Milestones are represented by Gold hollow circles. Content alternates or stays right-aligned with ample horizontal padding.
- **Accordion FAQs:** Minimalist design with a thin gray separator. Use a "Plus/Minus" toggle in Navy. Active states can have a subtle Light Gray background tint.
- **Mega Footer:** A deep Navy background (#0B2345) with White and Gold text. Structure into 4-5 columns (Council, Services, Resources, Legal). Include a prominent section for "International Partnerships" with grayscale logos.
- **Input Fields:** 1px Light Gray border, 8px radius. On focus, the border transitions to Refined Blue with a soft blue outer glow.
- **Buttons:**
    - **Primary:** Navy background, White text, 8px radius.
    - **Secondary:** Gold background, Navy text (for high-prestige actions).
    - **Tertiary:** Refined Blue ghost buttons (no background, blue text).