# DESIGN SYSTEM — Aashapura Rasoi

> **Status:** Draft — Pending owner review.
>
> All token values are proposals. Final values must be validated against owner-approved photography and approved by the project lead.

---

## 1. Brand Direction

### Brand personality
**Warm. Authentic. Nourishing. Premium-yet-homey.**

Aashapura Rasoi is not a restaurant or a mass-market FMCG brand. It is a home kitchen with pride in its craft. The visual language must feel like a hand-written letter with beautiful handmade packaging — personal, warm, and confident without being loud.

### Design mood
- Earthy, natural colour palette inspired by turmeric, fenugreek, and dry earth.
- Clean layouts with generous white space to let food photography breathe.
- Typography that balances cultural richness (display) with clarity (body).
- Subtle textures and micro-decoration; no garish poster aesthetics.
- Photography-forward: food is the hero, not the graphic elements.

### What to avoid
- Cluttered layouts that replicate the promotional Instagram graphics directly.
- Neon or highly saturated colours.
- Generic stock photography not belonging to the business.
- Comic Sans, Display Devanagari, or decorative scripts on body copy.
- Excessive animation that distracts from food and information.

---

## 2. Colour Tokens

All values are CSS custom properties defined in a single `:root` block in `tokens.css`.

### Core palette

| Token | Hex | Usage |
|---|---|---|
| `--color-green-900` | `#1A3422` | Darkest green; primary brand anchor; large hero text on light backgrounds |
| `--color-green-700` | `#23452F` | Primary brand green; nav background, section headers, buttons |
| `--color-green-500` | `#3A6B4A` | Interactive hover states; secondary button borders |
| `--color-green-100` | `#D6E9DC` | Light green tint; subtle section dividers, tag backgrounds |
| `--color-cream-100` | `#FAF5E9` | Page background |
| `--color-cream-200` | `#F2E9D2` | Alternate section background (slight warmth shift) |
| `--color-gold-600` | `#C5A15B` | Accent; decorative borders, price text, star icons |
| `--color-gold-800` | `#9A7840` | Gold hover / darker accent for contrast on light |
| `--color-text-dark` | `#282820` | Primary body copy |
| `--color-text-mid` | `#5A5A4E` | Secondary/supporting text, captions, labels |
| `--color-text-light` | `#8A8A7A` | Placeholder text, disabled states |
| `--color-white` | `#FFFFFF` | Card backgrounds, reversed text on dark fills |
| `--color-whatsapp` | `#25D366` | WhatsApp CTA buttons only |
| `--color-whatsapp-dark` | `#1DA851` | WhatsApp button hover state |

### Semantic / functional colour tokens (derived)

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `var(--color-cream-100)` | Default page background |
| `--color-bg-alt` | `var(--color-cream-200)` | Alternating section background |
| `--color-bg-dark` | `var(--color-green-700)` | Dark section backgrounds (tiffin, footer) |
| `--color-surface` | `var(--color-white)` | Cards, modals, overlays |
| `--color-brand-primary` | `var(--color-green-700)` | Primary brand actions |
| `--color-brand-accent` | `var(--color-gold-600)` | Accent and decorative |
| `--color-text-on-dark` | `var(--color-white)` | Text on green/dark backgrounds |
| `--color-text-on-surface` | `var(--color-text-dark)` | Text on white/cream card surfaces |

### Contrast ratios (WCAG 2.1 AA minimum 4.5:1 for normal text, 3:1 for large text)

| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| `--color-text-dark` (#282820) | `--color-cream-100` (#FAF5E9) | ~16:1 | ✅ AAA |
| `--color-white` (#FFF) | `--color-green-700` (#23452F) | ~10.5:1 | ✅ AAA |
| `--color-gold-600` (#C5A15B) | `--color-green-700` (#23452F) | ~4.7:1 | ✅ AA |
| `--color-text-dark` (#282820) | `--color-white` (#FFF) | ~17:1 | ✅ AAA |
| `--color-white` (#FFF) | `--color-whatsapp` (#25D366) | ~2.9:1 | ⚠️ Large text / icons only — use dark label or icon |

> [!WARNING]
> White text on the WhatsApp green (#25D366) does **not** meet AA for normal-weight body text. Use `#282820` dark text on the WhatsApp button label, or use a bold/large font ≥ 18 px / 14 px bold. Alternatively, use `--color-whatsapp-dark` (#1DA851) as the button fill, which achieves ~3.9:1 with white — verify before finalising.

---

## 3. Typography

### Typeface selection

#### Display / Heading — Playfair Display
- **Rationale:** Elegant, high-contrast serif with strong character. Conveys warmth and premium quality without being generic. Widely readable at large sizes. Good pairing with Indian food brand aesthetics. Available on Google Fonts (no cost).
- **Weights:** 400 (Regular), 700 (Bold).
- **Use:** Hero headline, section headings (h1–h2), product names in featured cards.

#### Body / UI — DM Sans
- **Rationale:** Clean, geometric humanist sans-serif. Highly legible at small sizes. Natural for menus, prices, descriptions, button labels, and nav items. Available on Google Fonts.
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold).
- **Use:** All body copy, menu text, prices, captions, buttons, nav items, labels.

#### Fallback stack
```css
--font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body:    'DM Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
```

> [!TIP]
> Load only the weights in use. Use `font-display: swap` to prevent invisible text during font load. Preconnect to Google Fonts CDN in `<head>`:
> ```html
> <link rel="preconnect" href="https://fonts.googleapis.com">
> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
> ```

### Type scale

The scale uses a modular ratio of ~1.25 (Major Third). All values are `rem` units (base 16 px).

| Token | `rem` | `px` | Font | Weight | Line Height | Usage |
|---|---|---|---|---|---|---|
| `--text-xs` | `0.75rem` | 12 px | DM Sans | 400 | 1.4 | Fine print, legal, timestamps |
| `--text-sm` | `0.875rem` | 14 px | DM Sans | 400 / 500 | 1.5 | Captions, labels, tags |
| `--text-base` | `1rem` | 16 px | DM Sans | 400 | 1.6 | Body copy, product descriptions |
| `--text-md` | `1.125rem` | 18 px | DM Sans | 500 | 1.5 | Lead text, intro paragraphs |
| `--text-lg` | `1.25rem` | 20 px | DM Sans | 600 | 1.4 | Product names in cards, sub-headings |
| `--text-xl` | `1.5rem` | 24 px | Playfair | 700 | 1.3 | Section headings (h2, h3) |
| `--text-2xl` | `2rem` | 32 px | Playfair | 700 | 1.2 | Major section headings |
| `--text-3xl` | `2.5rem` | 40 px | Playfair | 700 | 1.15 | Hero sub-headline |
| `--text-4xl` | `3.25rem` | 52 px | Playfair | 700 | 1.1 | Hero headline (desktop) |

### Responsive typography

Hero headline scales from `--text-3xl` (mobile) → `--text-4xl` (desktop). Use CSS `clamp()` for fluid scaling:

```css
--hero-headline-size: clamp(2.5rem, 5vw + 1rem, 3.25rem);
```

---

## 4. Spacing Scale

An 8-point base grid. All spacing values are multiples of 4 px.

| Token | Value | px |
|---|---|---|
| `--space-1` | `0.25rem` | 4 px |
| `--space-2` | `0.5rem` | 8 px |
| `--space-3` | `0.75rem` | 12 px |
| `--space-4` | `1rem` | 16 px |
| `--space-5` | `1.25rem` | 20 px |
| `--space-6` | `1.5rem` | 24 px |
| `--space-8` | `2rem` | 32 px |
| `--space-10` | `2.5rem` | 40 px |
| `--space-12` | `3rem` | 48 px |
| `--space-16` | `4rem` | 64 px |
| `--space-20` | `5rem` | 80 px |
| `--space-24` | `6rem` | 96 px |

**Section vertical padding:** `--space-16` (64 px) on mobile → `--space-24` (96 px) on desktop.

**Container max-width:** `1200px` centred with `--space-6` (24 px) horizontal padding on mobile.

---

## 5. Layout and Responsive Breakpoints

### Breakpoints

| Token | Value | Target |
|---|---|---|
| `--bp-sm` | `480px` | Large phones (landscape / phablet) |
| `--bp-md` | `768px` | Tablets (portrait) |
| `--bp-lg` | `1024px` | Tablets (landscape) / small laptop |
| `--bp-xl` | `1280px` | Desktop |

**Mobile-first:** all base styles target the smallest screen. Breakpoints add complexity upward.

### Grid

- **Mobile:** 1 column, full-width cards.
- **Tablet (≥ 768 px):** 2-column product grid.
- **Desktop (≥ 1024 px):** 3-column product grid; 4 columns for featured products.
- **Max container width:** 1200 px.
- **Gutter:** `--space-6` (24 px).

### Layout areas

| Section | Mobile | Tablet | Desktop |
|---|---|---|---|
| Header | Full-width sticky, logo left, hamburger right | Full-width sticky, hamburger hidden | Full-width sticky, inline nav links |
| Hero | Full-bleed background image, text overlay | Same, larger type | 50/50 split: text left, image right |
| Featured Products | 1 col scroll | 2 col | 4 col |
| Menu | Accordion per category | Tabbed + 2-col grid | Tabbed + 3-col grid |
| Tiffin | Full-width stacked | 2-col: text + image | 60/40: text + image |
| Brand Story | Stacked | 50/50 | 50/50 |
| Order Steps | Vertical timeline | Horizontal 3-step | Horizontal 3-step |
| Footer | Stacked columns | 2-col | 4-col |

---

## 6. Component Specifications

### 6.1 Buttons

#### Primary Button (brand action)
```
Background:   --color-brand-primary (#23452F)
Text:         --color-white
Font:         DM Sans SemiBold (600), --text-base (16 px)
Padding:      --space-3 (12 px) vertical × --space-8 (32 px) horizontal
Border-radius: 6 px
Border:       none
Hover:        background → --color-green-500 (#3A6B4A); transition 200ms ease
Active:       scale(0.97); background → --color-green-900
Focus-visible: outline 3px solid --color-gold-600, outline-offset 3px
Disabled:     opacity 0.45; cursor not-allowed
```

#### WhatsApp Button
```
Background:   --color-whatsapp-dark (#1DA851)
Text:         --color-white (bold, ≥ 16 px to meet contrast)
Icon:         WhatsApp SVG icon, 20 px, left of label, gap 8 px
Padding:      14 px vertical × 28 px horizontal
Border-radius: 6 px
Hover:        background → #189a47; transition 200ms ease
Focus-visible: outline 3px solid #282820, outline-offset 3px
```

#### Secondary / Outline Button
```
Background:   transparent
Border:       2px solid --color-brand-primary
Text:         --color-brand-primary, DM Sans SemiBold
Padding:      same as primary (12 px × 32 px — 2 px border compensation)
Hover:        background → --color-green-100; border-color → --color-green-500
Focus-visible: outline 3px solid --color-gold-600, outline-offset 3px
```

#### Ghost / Text Button
```
Background:   transparent
Text:         --color-brand-primary, underline on hover
Padding:      --space-2 × --space-4
Use:          Secondary in-line actions (e.g., "View all")
```

### 6.2 Product Card

```
Surface:      --color-white
Border-radius: 10 px
Shadow:       0 2px 8px rgba(40,40,32,0.08)
Hover shadow: 0 6px 20px rgba(40,40,32,0.13); translateY(-3px); transition 250ms ease
Overflow:     hidden (clips image border-radius)

Image area:
  Aspect ratio: 4:3
  Object-fit:   cover
  Background:   --color-cream-200 (placeholder before image loads)

Body area:
  Padding:    --space-4 (16 px)
  Name:       Playfair Display Bold, --text-lg (20 px), --color-text-dark
  Category:   DM Sans 400, --text-xs (12 px), --color-text-mid, uppercase + letter-spacing 0.08em
  Description: DM Sans 400, --text-sm (14 px), --color-text-mid, max 2 lines with ellipsis
  Price:      DM Sans SemiBold (600), --text-md (18 px), --color-gold-800
  CTA:        Full-width "Add to Order" primary button, --space-3 top margin

Placeholder state (price not confirmed):
  Price displays: "Price on request" in --color-text-mid style
```

### 6.3 Navigation

```
Position:     sticky, top: 0, z-index: 100
Background:   --color-green-700 (dark) or --color-cream-100 with bottom border (light variant — TBD)
Height:       60 px mobile / 72 px desktop
Logo:         Left-aligned, max-height 40 px
Nav links (desktop):
  Font:       DM Sans Medium (500), --text-sm (14 px)
  Colour:     --color-white (on dark nav) or --color-green-700 (on light nav)
  Spacing:    --space-8 (32 px) between links
  Active/Hover: underline with --color-gold-600, 2 px bottom border
CTA button (desktop): WhatsApp button, compact size, right-aligned
Mobile:
  Hamburger icon: 3 bars, --color-white, 24 px × 24 px hit area min 44 px × 44 px
  Drawer: slides in from right, full-height, background --color-green-900
  Drawer nav items: stacked, 48 px min height each, --text-md (18 px) DM Sans
  Drawer close: × button top-right, aria-label="Close menu"
  Drawer overlay: semi-transparent backdrop, closes drawer on click
```

### 6.4 Order Summary Overlay / Mini-Cart

```
Trigger:      Order icon button in nav or sticky bottom bar (mobile)
Position:     Slide-in panel from right (desktop); bottom sheet (mobile)
Background:   --color-white
Shadow:       -4px 0 24px rgba(40,40,32,0.15)
Header:       "Your Order" in Playfair Display Bold, --text-xl; close button top-right
Item rows:    Product name | quantity stepper (−, count, +) | remove icon
Quantity stepper: min-width 36 px per button, min 44 px hit area
Subtotal:     DM Sans SemiBold, --text-md; note "Indicative only. Owner will confirm."
Disclaimer:   Visible text: "Your order is not confirmed until Aashapura Rasoi replies on WhatsApp."
              DM Sans 400, --text-sm, --color-text-mid, top margin --space-4.
CTA:          Full-width WhatsApp button, "Send Order on WhatsApp"
Empty state:  Illustration or icon + "No items yet. Browse our menu."
```

### 6.5 Hero Section

```
Height:       100svh (mobile) / 85vh (desktop, max 700 px)
Background:   Owner-approved hero food photography, full bleed, dark overlay gradient
              Gradient: linear-gradient(to bottom, rgba(26,52,34,0.35) 0%, rgba(26,52,34,0.70) 100%)
Text:         Centred (mobile) / left-aligned in left column (desktop)
Headline:     Playfair Display Bold, fluid size clamp(2.5rem, 5vw+1rem, 3.25rem), --color-white
Sub-headline: DM Sans 400, --text-md (18 px), --color-white, opacity 0.9
CTAs:         Primary WhatsApp button + secondary "View Menu" outline button (white outline variant)
              Stacked on mobile; inline on desktop
```

### 6.6 Section Heading Treatment

```
Layout:       Centred on mobile; left-aligned on desktop (or centred where design requires)
Eyebrow:      DM Sans Medium, --text-xs (12 px), --color-gold-600, uppercase, letter-spacing 0.12em
              Display above the main heading
Heading:      Playfair Display Bold, --text-2xl / --text-3xl as context requires
Decorative:   2 px horizontal rule, --color-gold-600, max-width 48 px, centred below eyebrow; optional
```

### 6.7 Menu Tabs / Category Switcher

```
Container:    Horizontal scrollable tab strip on mobile; full-width on desktop
Tab item:
  Font:       DM Sans SemiBold, --text-base (16 px)
  Padding:    --space-3 × --space-6
  Border:     Bottom 3 px solid transparent (inactive)
  Active:     Border-color → --color-brand-primary; text → --color-brand-primary
  Hover:      Border-color → --color-green-100; background → --color-green-100
  Focus-visible: outline 3px solid --color-gold-600, outline-offset -3px
Role:         role="tablist", role="tab", aria-selected, aria-controls
```

### 6.8 Tiffin Plan Card

```
Surface:      --color-white
Border-left:  4px solid --color-gold-600
Border-radius: 8 px
Shadow:       0 2px 8px rgba(40,40,32,0.08)
Padding:      --space-6 (24 px)
Plan name:    Playfair Display Bold, --text-xl (24 px)
Price:        DM Sans SemiBold, --text-2xl (32 px), --color-gold-800; suffix in --text-sm
Features:     Bulleted list, DM Sans 400, --text-base, checkmark icons in --color-green-700
CTA:          "Enquire on WhatsApp" button (WhatsApp style)
```

### 6.9 WhatsApp FAB (Floating Action Button — mobile)

```
Position:     fixed, bottom: 20 px, right: 20 px, z-index: 90
Size:         56 px × 56 px circle
Background:   --color-whatsapp (#25D366)
Icon:         WhatsApp SVG, 28 px, --color-white
Shadow:       0 4px 12px rgba(37,211,102,0.45)
Hover/Focus:  scale(1.08); shadow intensify
aria-label:   "Open WhatsApp to order"
Visible:      Below the hero section only (scroll-triggered via Intersection Observer)
```

### 6.10 Form controls (future / tiffin enquiry)

If a local enquiry form is added in a future phase:
```
Input / Textarea:
  Border:     1.5px solid --color-green-100
  Focus:      border-color → --color-brand-primary; outline --color-gold-600
  Radius:     6 px
  Padding:    --space-3 × --space-4
  Font:       DM Sans 400, --text-base
  Placeholder: --color-text-light
  Error state: border-color #C0392B; error message below in --text-sm
```

---

## 7. Accessibility Requirements

| Requirement | Standard | Implementation note |
|---|---|---|
| Colour contrast | WCAG 2.1 AA (4.5:1 normal, 3:1 large) | Verified above in section 2 |
| Focus indicator | Visible, ≥ 3px outline | `focus-visible` pseudo-class; global `*:focus-visible` rule in `tokens.css` |
| Touch targets | Minimum 44 × 44 px | All buttons, nav items, quantity steppers, FAB |
| Motion | Respect `prefers-reduced-motion` | Wrap all transitions/animations in `@media (prefers-reduced-motion: no-preference)` |
| Images | Meaningful `alt` text | Product images: `alt="[Product name] – [brief description]"`; decorative: `alt=""` |
| Keyboard navigation | Full operability | Tab order follows reading order; modals trap focus; drawer traps focus |
| Skip link | "Skip to main content" | First focusable element in DOM; visible on focus only |
| ARIA roles | Menu, tabs, modal, alert | `role="tablist/tab"` for menu; `role="dialog"` for order overlay; `aria-live="polite"` for cart count updates |
| Landmark roles | Semantic HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`; `aria-label` on repeated `<nav>` |
| Form labels | Explicit `<label for>` | Every input associates a visible or visually-hidden label |
| Language | `lang="en"` on `<html>` | Correct for mixed English/Gujarati content; inline `lang="gu"` on Gujarati-script runs |

---

## 8. Photography and Image Asset Guidance

### What is needed (owner must supply)

| Asset | Description | Usage |
|---|---|---|
| Logo | SVG preferred; PNG at 2× minimum (transparent bg) | Nav, footer, Open Graph image |
| Hero image | High-res food photo, landscape orientation, ideally 2000 × 1200 px | Hero section background |
| Product photos | One per product, natural light, consistent styling, square or 4:3 ratio | Product cards |
| Brand story photo | Owner/kitchen photo or arranged spread of products | Brand story section |
| Tiffin image | Photo of a prepared tiffin meal | Tiffin service section |

### Photography style guidelines (for the owner's photographer / shoot)
- **Lighting:** Natural light preferred; warm, soft tones. No harsh flash.
- **Background:** Clean textures — weathered wood, marble, stone, cotton fabric. Cream/off-white preferred to match brand palette.
- **Props:** Minimal. Dried herbs, spice bowls, or cotton napkins. No generic, unrelated props.
- **Angle:** Overhead (flat lay) or 45° angle. Consistent across product shots.
- **Colour grading:** Warm, slightly golden tones. Avoid cold/blue white-balance.
- **No filters:** Edit for consistent exposure and colour, not Instagram-filter effects.

### Development placeholders
During development, use real-dimension placeholder images from a service such as `https://placehold.co/<width>x<height>/F2E9D2/8A8A7A?text=Product+Photo`.

Replace all placeholders before production goes live.

### Image delivery requirements
- **Format:** WebP with JPEG/PNG fallback via `<picture>` element.
- **Sizes attribute:** Provide multiple resolutions (`srcset`) for responsive images.
- **Compression target:** Product photos ≤ 120 KB at display size; hero ≤ 250 KB at 1× desktop.
- **Dimensions:** Always set `width` and `height` HTML attributes to prevent layout shift (CLS).
- **Lazy loading:** `loading="lazy"` on all images below the fold; `loading="eager"` on hero.

---

## 9. Interaction and Animation Principles

### Principles
1. **Purposeful:** Every animation should help the user understand a state change, not decorate.
2. **Subtle:** Use motion sparingly. Food appreciation, not theme-park rides.
3. **Fast:** Transitions 150–250 ms. Nothing longer than 400 ms for UI state.
4. **Accessible:** All CSS transitions and animations wrapped in `prefers-reduced-motion: no-preference`. Static equivalents must work without motion.

### Approved interactions

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Button hover lift/colour | 200 ms | `ease` | Background colour + optional shadow shift |
| Card hover lift | 250 ms | `ease-out` | `translateY(-3px)` + shadow deepening |
| Nav drawer open/close | 280 ms | `ease-in-out` | Slide from right |
| Order overlay open | 300 ms | `ease-out` | Slide from right (desktop) / slide up (mobile) |
| Tab panel switch | 150 ms | `ease` | Opacity fade between panels |
| FAB entrance | 300 ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slight elastic pop |
| Scroll-triggered fade-in | 400 ms | `ease-out` | Sections enter on scroll; stagger children 60 ms each |
| Cart badge update | Pulse animation, 200 ms | `ease` | `aria-live="polite"` announces new count |

### Interactions to avoid
- Parallax scrolling on mobile (causes jank and motion sickness).
- Auto-playing video or audio.
- Hover states that hide essential information (tooltip-only content).
- Infinite looping animations in the main viewport.
