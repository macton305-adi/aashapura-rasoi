# IMPLEMENTATION PLAN — Aashapura Rasoi Website

> **Status:** Draft — Awaiting Phase 1 approval before development begins.
>
> **Technology stack:** React · Vite · JavaScript · Custom CSS · Git · GitHub · Vercel
>
> This document is the engineering companion to `PROJECT_PLAN.md` and `DESIGN_SYSTEM.md`.

---

## 1. Recommended Project Structure

```
aashapura-rasoi/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── og-image.jpg                  # Open Graph share image (owner-approved)
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── fonts/                    # (empty — fonts loaded via Google Fonts CDN)
│   │   ├── icons/
│   │   │   ├── whatsapp.svg
│   │   │   ├── menu.svg
│   │   │   └── close.svg
│   │   └── images/
│   │       ├── logo.svg              # ⚠️ CONFIRM — owner to supply
│   │       ├── hero.webp             # ⚠️ CONFIRM — owner to supply
│   │       └── products/
│   │           └── placeholder.webp  # Dev placeholder only
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── NavDrawer.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── TiffinService.jsx
│   │   │   ├── BrandStory.jsx
│   │   │   ├── HowToOrder.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── TiffinCard.jsx
│   │   │   ├── MenuTabs.jsx
│   │   │   ├── OrderOverlay.jsx
│   │   │   ├── QuantityStepper.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── WhatsAppFAB.jsx
│   │   │   └── SkipLink.jsx
│   │   └── index.js                  # Barrel re-exports
│   │
│   ├── context/
│   │   └── OrderContext.jsx          # React context for order builder state
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.js           # Active section detection for nav
│   │   └── useReducedMotion.js       # Reads prefers-reduced-motion
│   │
│   ├── utils/
│   │   ├── whatsapp.js               # WhatsApp URL + message builder
│   │   └── formatters.js             # Price formatting, text truncation
│   │
│   ├── styles/
│   │   ├── tokens.css                # All CSS custom properties (colours, type, spacing)
│   │   ├── reset.css                 # Minimal CSS reset
│   │   ├── global.css                # Base element styles, typography, focus ring
│   │   └── animations.css            # Keyframes; wrapped in prefers-reduced-motion guard
│   │
│   ├── content/
│   │   ├── products.js               # Product data array (see Section 3)
│   │   ├── tiffin.js                 # Tiffin plan data
│   │   └── site.js                   # Site-wide config (name, tagline, social links)
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env                              # ⚠️ NEVER COMMIT — WhatsApp number here
├── .env.example                      # Committed — shows required keys, no values
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
├── PROJECT_PLAN.md
├── DESIGN_SYSTEM.md
└── IMPLEMENTATION_PLAN.md
```

---

## 2. Component Architecture

### Component responsibility map

```
App.jsx
  ├── <SkipLink />                    Accessibility — first DOM element
  ├── OrderContext.Provider           Wraps everything; provides order state
  ├── <Header />
  │     ├── Logo (img)
  │     ├── <nav> anchor links        Desktop inline nav
  │     ├── Order icon + badge        Opens OrderOverlay
  │     └── Hamburger → <NavDrawer />
  ├── <main>
  │     ├── <Hero />                  id="hero"
  │     ├── <FeaturedProducts />      id="featured"
  │     ├── <Menu />                  id="menu"
  │     │     └── <MenuTabs />
  │     │           └── [ProductCard] per category
  │     ├── <TiffinService />         id="tiffin"
  │     │     └── [TiffinCard]
  │     ├── <BrandStory />            id="about"
  │     ├── <HowToOrder />            id="how-to-order"
  │     └── <Contact />               id="contact"
  ├── <OrderOverlay />                Portal; conditionally rendered
  ├── <WhatsAppFAB />                 Fixed position; appears after hero leaves viewport
  └── <Footer />
```

### Data flow

```
content/products.js  →  FeaturedProducts, Menu (reads static data)
content/tiffin.js    →  TiffinService
content/site.js      →  Header, Footer, SEO meta tags, WhatsApp URLs

User action (Add to Order)
  → OrderContext.dispatch({ type: 'ADD_ITEM', payload: product })
  → OrderContext state updates
  → Header badge re-renders (aria-live announces new count)
  → OrderOverlay reflects new state

User action (Order on WhatsApp)
  → whatsapp.buildOrderUrl(items, VITE_WHATSAPP_NUMBER)
  → window.open(url, '_blank', 'noopener,noreferrer')
```

---

## 3. Content / Configuration Structure

### `src/content/products.js`

Each product is a plain JavaScript object. This file is the **single source of truth** for all product data.

```js
// Example shape — all prices and details MUST be confirmed by owner before use.
export const products = [
  {
    id: 'methi-thepla-200g',
    name: 'Methi Thepla',
    category: 'thepla',           // 'thepla' | 'khakhra' | 'snacks'
    featured: true,
    description: 'Soft, freshly prepared fenugreek flatbreads made from a family recipe.',
    weight: '200 g',              // ⚠️ CONFIRM
    price: null,                  // null until confirmed; renders as "Price on request"
    // price: 120,                // Set to a number (INR) once confirmed
    currency: 'INR',
    image: '/src/assets/images/products/methi-thepla.webp',
    imagePlaceholder: 'https://placehold.co/400x300/F2E9D2/8A8A7A?text=Methi+Thepla',
    imageAlt: 'Methi Thepla — soft fenugreek flatbreads stacked on a wooden board',
    available: true,
    tags: ['bestseller'],
  },
  // ... additional products
];

export const categories = [
  { id: 'thepla',  label: 'Thepla' },
  { id: 'khakhra', label: 'Khakhra' },
  { id: 'snacks',  label: 'Other Snacks' },
];
```

### `src/content/tiffin.js`

```js
// ⚠️ All details MUST be confirmed by owner before use.
export const tiffinPlans = [
  {
    id: 'daily-tiffin',
    name: 'Daily Tiffin',
    tagline: 'Fresh home-cooked meals delivered to your door.',
    price: null,                  // ⚠️ CONFIRM
    priceSuffix: '/ day',
    features: [
      'Home-cooked Gujarati meals',
      // ⚠️ CONFIRM all feature bullet points
    ],
    available: true,
  },
];
```

### `src/content/site.js`

```js
// Site-wide configuration — non-sensitive values only.
export const site = {
  name: 'Aashapura Rasoi',
  tagline: null,                  // ⚠️ CONFIRM: approved tagline from owner
  description: null,             // ⚠️ CONFIRM: meta description, ~155 chars
  location: {
    locality: 'Mira Road East',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    // fullAddress: null,         // ⚠️ CONFIRM: owner consent to publish
  },
  social: {
    instagram: null,             // ⚠️ CONFIRM: Instagram profile URL
  },
  // WhatsApp number is NOT stored here — it lives in .env only
};
```

### `.env.example` (committed to Git)

```
# Copy this file to .env and fill in the values.
# NEVER commit the .env file itself.

# WhatsApp business number in international format without + or spaces.
# Example: 919876543210 for +91 98765 43210
VITE_WHATSAPP_NUMBER=
```

### `.env` (never committed)

```
VITE_WHATSAPP_NUMBER=91XXXXXXXXXX   # ⚠️ CONFIRM with owner
```

---

## 4. WhatsApp Ordering Logic

### Design rules
1. The WhatsApp number is read exclusively from `import.meta.env.VITE_WHATSAPP_NUMBER` at build time.
2. If the environment variable is absent or empty, WhatsApp CTAs render as disabled with a visible note to the visitor: *"Ordering is temporarily unavailable. Please visit our Instagram."*
3. No order is "placed" by the website. The website generates a message and hands control to WhatsApp.
4. Every WhatsApp-opened page includes a visible disclaimer notice (see §FR-04 in `PROJECT_PLAN.md`).

### `src/utils/whatsapp.js`

```js
/**
 * Builds a WhatsApp deep-link URL with a pre-filled order message.
 *
 * @param {Array<{name: string, quantity: number, price: number|null}>} items
 * @param {string} waNumber  - From import.meta.env.VITE_WHATSAPP_NUMBER
 * @returns {string} WhatsApp URL or empty string if waNumber is missing
 */
export function buildOrderUrl(items, waNumber) {
  if (!waNumber) return '';

  const itemLines = items
    .map(({ name, quantity, price }) => {
      const priceText = price ? `₹${price}` : 'Price TBC';
      return `• ${name} × ${quantity} (${priceText})`;
    })
    .join('\n');

  const message = [
    'Hello Aashapura Rasoi! 🙏',
    'I would like to place the following order:',
    '',
    itemLines,
    '',
    'Please confirm availability and the total amount.',
    'Thank you!',
  ].join('\n');

  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a pre-filled tiffin enquiry URL.
 *
 * @param {string} waNumber
 * @returns {string}
 */
export function buildTiffinEnquiryUrl(waNumber) {
  if (!waNumber) return '';

  const message = [
    'Hello Aashapura Rasoi! 🙏',
    'I am interested in your tiffin service.',
    'Could you please share details about plans, pricing, and delivery in my area?',
    'Thank you!',
  ].join('\n');

  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}
```

### `src/context/OrderContext.jsx` — state shape

```js
// State shape
{
  items: [
    { productId: 'methi-thepla-200g', name: 'Methi Thepla', quantity: 2, price: 120 },
  ],
  isOverlayOpen: false,
}

// Actions
// { type: 'ADD_ITEM',    payload: product }
// { type: 'REMOVE_ITEM', payload: productId }
// { type: 'SET_QTY',     payload: { productId, quantity } }
// { type: 'CLEAR_ORDER' }
// { type: 'OPEN_OVERLAY' }
// { type: 'CLOSE_OVERLAY' }
```

### Order flow sequence

```
User clicks "Add to Order" on ProductCard
  → dispatch ADD_ITEM
  → Header badge count increments (aria-live announces)

User clicks order icon / badge
  → dispatch OPEN_OVERLAY
  → OrderOverlay renders as a portal over the page
  → Focus trapped inside overlay

User adjusts quantities using QuantityStepper
  → dispatch SET_QTY

User clicks "Send Order on WhatsApp"
  → buildOrderUrl(items, import.meta.env.VITE_WHATSAPP_NUMBER)
  → window.open(url, '_blank', 'noopener,noreferrer')
  → Overlay remains open (user may close manually)
  → Disclaimer remains visible
  → Order state is NOT cleared automatically
    (user may return from WhatsApp and continue)
```

---

## 5. GitHub and Vercel Deployment Workflow

### Repository setup

```bash
# One-time setup (run locally after owner approves plan)
git init
git remote add origin git@github.com:<owner>/<repo>.git   # private repo
git add .
git commit -m "chore: Phase 1 documentation"
git push -u origin main
```

### Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code only; protected branch |
| `dev` | Active development integration branch |
| `feat/<name>` | Individual feature branches; merged into `dev` via PR |
| `fix/<name>` | Bug-fix branches |

### Vite build commands

```bash
npm run dev      # Local dev server on http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

### Vercel configuration

1. Connect the GitHub repository to a Vercel project (owner's Vercel account).
2. Set **framework preset:** Vite.
3. Set **build command:** `npm run build`.
4. Set **output directory:** `dist`.
5. Add **Environment Variables** in Vercel project settings:
   - `VITE_WHATSAPP_NUMBER` → production WhatsApp number.
6. Enable **Preview Deployments** for all branches.
7. Set `X-Robots-Tag: noindex` on preview deployments only:
   - Use a `vercel.json` header rule scoped to non-production environments.

### `vercel.json` (initial)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "(?!aashapura-rasoi\\.vercel\\.app).*\\.vercel\\.app" }],
      "headers": [{ "key": "X-Robots-Tag", "value": "noindex" }]
    }
  ]
}
```

> [!NOTE]
> Update the `X-Robots-Tag` rule once the custom production domain is known. The production domain must be explicitly excluded so it is not accidentally blocked from indexing.

### Deployment checklist (before each production release)

- [ ] All `[PRICE TBC]` and `[IMAGE TBC]` placeholders removed.
- [ ] All ⚠️ CONFIRM items resolved.
- [ ] `VITE_WHATSAPP_NUMBER` set in Vercel environment (not in source code).
- [ ] `.env` not present in repository (confirmed by `.gitignore`).
- [ ] Lighthouse audit run on production URL.
- [ ] Open Graph image resolves correctly on WhatsApp and Facebook link preview.
- [ ] Custom domain configured and HTTPS active on Vercel.

---

## 6. Security Considerations

| Risk | Mitigation |
|---|---|
| WhatsApp number exposure in source code | Stored only in `.env` (local) and Vercel env vars (CI/CD); never in JS source or `vercel.json` |
| `.env` committed to Git | `.gitignore` includes `.env`; `.env.example` committed instead |
| Client-side env vars in bundle | `VITE_` prefix makes them intentionally public at build time — acceptable for a non-sensitive WhatsApp number that is already visible on Instagram |
| XSS via pre-filled WhatsApp message | User input is never injected; message is built entirely from static product data; `encodeURIComponent` applied to the full message string |
| Open redirect | WhatsApp URLs use `wa.me` only; no user-controlled URL is constructed |
| Third-party script risk | No third-party analytics scripts in Version 1; Google Fonts loaded via `<link rel="preconnect">` + stylesheet only (no JS) |
| Build artefact exposure | Vercel `dist/` is publicly served; ensure no development-only data or credentials end up in the Vite build output |

---

## 7. Recommended Additional Dependencies

The project aims for minimal dependencies. The following are justified additions only:

| Package | Justification | Alternative |
|---|---|---|
| (none beyond React + Vite) | Version 1 requirements are met with CSS, React context, and vanilla JS | — |

**Do not add** until a clear need is established:
- UI component libraries (MUI, Chakra, shadcn) — custom CSS is faster to load and fully matches the design system.
- React Router — a single-page anchor-link site needs no client-side router.
- State management libraries (Redux, Zustand) — React context is sufficient for the order builder.
- Framer Motion — CSS transitions are enough for the planned animations.
- i18n libraries — English-only site in Version 1.

---

## 8. Ordered Implementation Milestones

### Milestone 0 — Prerequisites (before any code)
- [ ] Owner confirms all ⚠️ CONFIRM items in `PROJECT_PLAN.md`.
- [ ] Owner supplies logo SVG, hero image, and at least 3 product photos.
- [ ] Owner confirms WhatsApp number and Instagram URL.
- [ ] Owner approves brand tagline and meta description.
- [ ] Private GitHub repository created.
- [ ] Vercel project connected with production environment variable set.
- [ ] Phase 1 documentation approved by project lead.

---

### Milestone 1 — Project scaffold and design tokens
**Goal:** Running development server with all design tokens, reset, and global styles in place.

- [ ] `npm create vite@latest aashapura-rasoi -- --template react`
- [ ] Remove Vite boilerplate (CSS, SVG, counter component).
- [ ] Create `src/styles/tokens.css` with all design tokens from `DESIGN_SYSTEM.md`.
- [ ] Create `src/styles/reset.css` (modern minimal reset).
- [ ] Create `src/styles/global.css` (base typography, focus ring, skip link).
- [ ] Create `src/styles/animations.css` (keyframes + `prefers-reduced-motion` wrapper).
- [ ] Add Google Fonts `<link>` tags to `index.html`.
- [ ] Set `<html lang="en">`, `<title>`, and `<meta>` tags in `index.html`.
- [ ] Create `.env.example` and `.gitignore`.
- [ ] First commit: `chore: scaffold project and design tokens`.

---

### Milestone 2 — Content and configuration layer
**Goal:** All static content loadable from configuration files; no UI yet.

- [ ] Create `src/content/products.js` with all owner-confirmed products.
- [ ] Create `src/content/tiffin.js` with all tiffin plan data.
- [ ] Create `src/content/site.js` with site metadata.
- [ ] Create `src/utils/whatsapp.js` with `buildOrderUrl` and `buildTiffinEnquiryUrl`.
- [ ] Create `src/utils/formatters.js` with `formatPrice` (handles `null` price gracefully).
- [ ] Write unit tests for `whatsapp.js` and `formatters.js` (Vitest, in `src/utils/__tests__/`).
- [ ] Commit: `feat: content layer and WhatsApp utility`.

---

### Milestone 3 — Order context and state management
**Goal:** Order state works correctly before any UI is connected.

- [ ] Create `src/context/OrderContext.jsx` with reducer, actions, and provider.
- [ ] Expose `useOrder` hook from context.
- [ ] Write unit tests for the reducer covering all action types.
- [ ] Wrap `App.jsx` with `OrderContext.Provider`.
- [ ] Commit: `feat: order context and reducer`.

---

### Milestone 4 — Layout shell and navigation
**Goal:** Full page structure with working sticky nav and mobile drawer.

- [ ] `App.jsx` — render `<SkipLink>`, `<Header>`, `<main>`, `<Footer>` with section anchors.
- [ ] `Header.jsx` — logo, desktop nav links, order badge, WhatsApp button.
- [ ] `NavDrawer.jsx` — mobile slide-in, focus trap, backdrop dismiss, `aria-modal`.
- [ ] `Footer.jsx` — location, Instagram link, WhatsApp link, legal disclaimer.
- [ ] `SkipLink.jsx` — "Skip to main content", visible on focus.
- [ ] `useScrollSpy.js` — Intersection Observer tracking active section.
- [ ] `useReducedMotion.js` — returns boolean from `matchMedia`.
- [ ] Verify keyboard navigation: Tab through nav, open/close drawer, skip link works.
- [ ] Commit: `feat: layout shell, header, footer, nav drawer`.

---

### Milestone 5 — Hero section
**Goal:** Hero section renders correctly on all screen sizes with owner-supplied image.

- [ ] `Hero.jsx` — headline, tagline, dual CTAs (WhatsApp + View Menu anchor).
- [ ] Implement hero image as `<img>` with `loading="eager"`, `width`, `height`, `alt`.
- [ ] Dark overlay gradient applied via CSS (not inline style).
- [ ] Test on Chrome (Android emulation) and Safari (iOS emulation).
- [ ] Commit: `feat: hero section`.

---

### Milestone 6 — Product card and featured products
**Goal:** Product cards render with correct data, placeholder images, and "Add to Order" works.

- [ ] `ProductCard.jsx` — image, category label, name, description, price, CTA.
- [ ] `FeaturedProducts.jsx` — filters `products.js` for `featured: true`.
- [ ] `QuantityStepper.jsx` — accessible stepper component (keyboard, aria).
- [ ] "Add to Order" dispatches to `OrderContext`; badge in header updates.
- [ ] Placeholder images render for any product with no confirmed image.
- [ ] Commit: `feat: product card and featured products section`.

---

### Milestone 7 — Full menu with tabs
**Goal:** All product categories browsable; tab UI accessible.

- [ ] `Menu.jsx` — section shell with `<MenuTabs>` and filtered product grids.
- [ ] `MenuTabs.jsx` — `role="tablist"` / `role="tab"`, keyboard arrow-key navigation, `aria-controls`.
- [ ] Lazy-load product images below the fold.
- [ ] Commit: `feat: full menu section with tabbed categories`.

---

### Milestone 8 — Order overlay / mini-cart
**Goal:** Order overlay fully functional; WhatsApp message generated correctly.

- [ ] `OrderOverlay.jsx` — renders as React portal; slide-in from right (desktop), bottom sheet (mobile).
- [ ] Focus trapped while overlay is open; focus returns to trigger on close.
- [ ] Item rows with quantity steppers and remove buttons.
- [ ] Indicative subtotal with "prices are indicative" note.
- [ ] Disclaimer: *"Your order is not confirmed until Aashapura Rasoi replies on WhatsApp."*
- [ ] "Send Order on WhatsApp" calls `buildOrderUrl`; opens in new tab.
- [ ] Empty state rendering.
- [ ] Commit: `feat: order overlay and WhatsApp message generation`.

---

### Milestone 9 — Tiffin, brand story, how-to-order sections
**Goal:** All remaining content sections complete.

- [ ] `TiffinService.jsx` + `TiffinCard.jsx` — plan cards, feature lists, tiffin enquiry CTA.
- [ ] `BrandStory.jsx` — owner-supplied copy and image.
- [ ] `HowToOrder.jsx` — 3-step visual guide with icons.
- [ ] `Contact.jsx` — location, social links, operating hours (owner-confirmed).
- [ ] Commit: `feat: tiffin, brand story, how-to-order, contact sections`.

---

### Milestone 10 — WhatsApp FAB
**Goal:** Persistent mobile CTA visible after hero leaves viewport.

- [ ] `WhatsAppFAB.jsx` — fixed position, `aria-label`, Intersection Observer trigger.
- [ ] Hidden above the hero; animates in below it.
- [ ] Motion-safe animation guarded by `useReducedMotion`.
- [ ] Commit: `feat: WhatsApp floating action button`.

---

### Milestone 11 — SEO, metadata, and structured data
**Goal:** All SEO requirements met; site indexed correctly.

- [ ] `<title>`, `<meta name="description">` in `index.html`.
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- [ ] Local Business JSON-LD structured data in a `<script type="application/ld+json">` tag.
- [ ] `robots.txt` configured for production domain.
- [ ] `vercel.json` header rules applied.
- [ ] Verify with Google Rich Results Test and Facebook Sharing Debugger.
- [ ] Commit: `feat: SEO metadata and structured data`.

---

### Milestone 12 — Performance, accessibility audit, and polish
**Goal:** Lighthouse scores meet acceptance criteria; no accessibility violations.

- [ ] Run Lighthouse on mobile (Chrome DevTools, simulated throttling).
- [ ] Target: Performance ≥ 85, Accessibility = 100, Best Practices ≥ 95, SEO = 100.
- [ ] Run axe-core accessibility scan; fix all violations.
- [ ] Manual keyboard navigation test: entire page, modal, tabs, drawer.
- [ ] Manual screen reader test (NVDA + Chrome on Windows; VoiceOver + Safari on iOS).
- [ ] Test WhatsApp link on physical Android and iOS devices.
- [ ] Test on Chrome (Android), Safari (iOS 16+), Chrome/Firefox/Edge (desktop).
- [ ] Image optimisation pass: all images WebP, correct `srcset`, sizes within target file size.
- [ ] Remove all `console.log` statements.
- [ ] Commit: `fix: a11y and performance audit fixes`.

---

### Milestone 13 — Production deployment
**Goal:** Site live on production domain with all placeholder content removed.

- [ ] Confirm all ⚠️ CONFIRM items resolved.
- [ ] Remove all `[PRICE TBC]` and `[IMAGE TBC]` placeholders.
- [ ] Merge `dev` → `main` via pull request.
- [ ] Vercel production deployment triggered automatically.
- [ ] Configure custom domain in Vercel; verify HTTPS.
- [ ] Update `og:url` and JSON-LD canonical URL to production domain.
- [ ] Verify Open Graph preview on WhatsApp, Instagram, Facebook.
- [ ] Confirm `X-Robots-Tag: noindex` is NOT applied to the production domain.
- [ ] Commit: `release: v1.0.0 production launch`.

---

## 9. Testing Checklist

### Functional
- [ ] All products display with correct name, description, weight, and price (or "Price on request").
- [ ] "Add to Order" increments cart badge; badge announces new count to screen reader.
- [ ] Quantity stepper: cannot go below 1; upper limit enforced (99).
- [ ] Remove item from order: item disappears from overlay; badge decrements.
- [ ] WhatsApp order URL opens correct number with correctly formatted message.
- [ ] WhatsApp tiffin enquiry URL opens with correct enquiry message.
- [ ] Nav drawer: opens, closes via × button, backdrop click, and Escape key.
- [ ] Order overlay: opens, closes via × button, backdrop click, and Escape key.
- [ ] Menu tabs: all categories switch correctly; keyboard arrow navigation works.
- [ ] Scroll spy: nav item for active section receives active style.
- [ ] WhatsApp FAB: hidden in hero viewport, visible below it.
- [ ] Skip link: visible on focus; click moves focus to `<main>`.
- [ ] `VITE_WHATSAPP_NUMBER` missing: WhatsApp CTAs are disabled with a message.

### Responsive
- [ ] iPhone SE (375 px) — no horizontal scroll, all text legible.
- [ ] iPhone 14 Pro (390 px) — standard test device.
- [ ] iPad (768 px) — tablet layout correct.
- [ ] Desktop 1280 px — full desktop layout.
- [ ] Desktop 1920 px — no runaway max-widths.

### Accessibility
- [ ] All colour combinations pass WCAG 2.1 AA contrast (verify with browser DevTools or Colour Contrast Analyser).
- [ ] All interactive elements reachable by Tab key.
- [ ] All modals/drawers trap focus correctly.
- [ ] All images have meaningful alt text (or `alt=""` where decorative).
- [ ] No axe-core violations (run in-browser extension or `@axe-core/react` in dev mode).
- [ ] `prefers-reduced-motion`: site is fully usable with motion disabled.

### Performance
- [ ] Lighthouse Performance ≥ 85 on mobile (simulated 4G).
- [ ] LCP ≤ 2.5 s (hero image is the likely LCP element — ensure `loading="eager"` + `fetchpriority="high"`).
- [ ] No layout shift from images (all have `width` + `height` attributes).
- [ ] Fonts use `font-display: swap`.
- [ ] Total JS bundle ≤ 150 KB (gzipped) — Vite bundle report (`vite-bundle-visualizer`).

### Cross-browser
- [ ] Chrome (latest, Android physical device)
- [ ] Safari (iOS 16+, physical device)
- [ ] Chrome (latest, Windows desktop)
- [ ] Firefox (latest, Windows desktop)
- [ ] Edge (latest, Windows desktop)
