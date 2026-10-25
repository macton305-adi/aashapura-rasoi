# PROJECT PLAN — Aashapura Rasoi Website (Phase 1)

> **Status:** Draft — Awaiting owner review and confirmation of all items marked ⚠️ CONFIRM.
>
> **Last updated:** 2026-10-25
>
> **Scope:** This document covers Phase 1 planning only. No code has been written.

---

## 1. Business Objective

Aashapura Rasoi is a home-based Gujarati food and tiffin business located in Mira Road East, Mumbai, Maharashtra, India. The business currently accepts orders via Instagram DMs and WhatsApp.

**Primary goal:** Build a mobile-first promotional website that converts visitors into WhatsApp enquiries and orders, while projecting a warm, premium, and trustworthy brand identity.

**Secondary goals:**
- Reduce repetitive enquiries by answering common questions on-site (products, prices, ordering steps, delivery areas).
- Establish a credible digital presence beyond Instagram.
- Enable easy shareability of product links and the tiffin service offer.

---

## 2. Target Audience

| Segment | Description | Primary Need |
|---|---|---|
| **Local families** | Mira Road East and surrounding areas | Reliable, home-cooked Gujarati tiffin service |
| **Working professionals** | Solo or shared accommodation residents | Convenient daily tiffin subscription |
| **Gujarati diaspora / foodies** | Seeking authentic regional snacks | Thepla, khakhra, and specialty items to order or gift |
| **Gift buyers** | Festival and occasion shoppers | Packaged snack assortments |

---

## 3. Website Scope — Version 1

### In scope
- Single-page promotional website (HTML/CSS/JS via React + Vite).
- Business introduction, product catalogue, and tiffin service information.
- WhatsApp-based ordering flow with pre-filled message generation.
- Responsive layout: mobile, tablet, desktop.
- Deployment on Vercel (preview + production).
- SEO basics: page title, meta description, Open Graph tags, structured data for local business.
- Accessibility: WCAG 2.1 AA target.

### Explicitly out of scope (Version 1)
- Customer accounts or authentication.
- Database or backend server of any kind.
- Online payment gateway.
- Admin dashboard or CMS.
- Real-time inventory management.
- Multi-page routing (beyond a single HTML document with section anchors).
- Blog or editorial content.

---

## 4. Page Structure

A single-page layout with in-page anchor navigation. All sections scroll sequentially on mobile; a sticky nav allows direct jumps on desktop.

```
┌─────────────────────────────────────┐
│  HEADER / NAV                       │  Sticky. Logo + anchor links + WhatsApp CTA button.
├─────────────────────────────────────┤
│  HERO                               │  Brand statement, tagline, primary order CTA.
├─────────────────────────────────────┤
│  FEATURED PRODUCTS                  │  3–4 hero product cards (owner-selected).
├─────────────────────────────────────┤
│  FULL MENU                          │  Tabbed or accordion by category:
│    ↳ Thepla                         │    Palak / Methi / Masala / other varieties.
│    ↳ Khakhra                        │    Varieties with size/weight options.
│    ↳ Other Snacks                   │    Additional items as confirmed by owner.
├─────────────────────────────────────┤
│  TIFFIN SERVICE                     │  Meal plan options, coverage, enquiry CTA.
├─────────────────────────────────────┤
│  BRAND STORY                        │  "Our Kitchen" — authenticity, family values.
├─────────────────────────────────────┤
│  HOW TO ORDER                       │  3-step visual guide (Browse → WhatsApp → Delivered).
├─────────────────────────────────────┤
│  CONTACT & FOOTER                   │  Location, social links, WhatsApp, legal note.
└─────────────────────────────────────┘
```

### Recommended additions (with rationale)
- **"Order Summary" mini-cart overlay:** Allows visitors to accumulate product selections before generating a single WhatsApp message. Reduces friction compared to ordering one item at a time. Implemented entirely in browser state (React context); no backend required.
- **Sticky WhatsApp FAB (Floating Action Button):** Persistent WhatsApp icon in the bottom-right corner on mobile. Industry standard for WhatsApp-based businesses; keeps the primary CTA always reachable without scrolling back to the nav.
- **Trust signals bar:** A slim strip below the hero showing 2–3 short trust statements (e.g., "100% homemade", "Fresh daily", "No preservatives"). These must be confirmed as accurate by the owner before use.

---

## 5. User Journeys

### Journey A — New visitor discovering a product (most common)
1. User arrives from an Instagram link or WhatsApp share on mobile.
2. Hero loads quickly; user reads brand tagline.
3. User scrolls to Featured Products and finds Methi Thepla.
4. User taps the product card to see detail (modal or expanded view) and price.
5. User taps "Add to Order."
6. User reviews the order summary overlay.
7. User taps "Order on WhatsApp" — WhatsApp opens with a pre-filled message.
8. User sends or edits the message.

### Journey B — Tiffin service enquiry
1. User arrives via a shared link or search.
2. User scrolls or taps nav link to "Tiffin Service."
3. User reads plan options, coverage, and pricing.
4. User taps "Enquire on WhatsApp" — WhatsApp opens with a pre-filled tiffin enquiry message.

### Journey C — Returning customer direct order
1. User opens the website directly (bookmark or saved link).
2. User navigates directly to "Menu."
3. User selects known items and quantities.
4. User opens order summary and sends WhatsApp message.

### Journey D — Gift buyer
1. User browses featured products and khakhra section.
2. User reads product descriptions.
3. User enquires about packaging or bulk quantities via WhatsApp.

---

## 6. Functional Requirements

### FR-01 Product catalogue
- Display all owner-confirmed products with name, short description, photo, weight/quantity, and price.
- Group products by category: Thepla, Khakhra, Other Snacks.
- Support at least one image per product.
- Prices must be owner-confirmed before publication; use `[PRICE TBC]` placeholder during development.

### FR-02 Product detail
- Tapping a product card opens a detail view (modal or expanded row) showing full description, variant options (if any), and ordering action.

### FR-03 Order builder
- Visitor can add/remove products and set quantities (1–99) before opening WhatsApp.
- An order summary count badge appears on a persistent order icon once any item is added.
- Order summary shows: item names, quantities, and a textual total (note that the total is indicative; the owner will confirm the actual price).

### FR-04 WhatsApp message generation
- Clicking "Order on WhatsApp" or "Enquire on WhatsApp" opens `https://wa.me/<WHATSAPP_NUMBER>?text=<encoded message>`.
- `WHATSAPP_NUMBER` is stored in a single configuration file and never hard-coded across components.
- The pre-filled message includes: business name, product list with quantities, and a disclaimer that the order is not confirmed until the business responds.
- The website displays a visible notice: *"Your order is not confirmed until Aashapura Rasoi replies on WhatsApp."*

### FR-05 Tiffin service section
- Describes available tiffin plans (⚠️ CONFIRM: plan types, coverage, pricing, minimum subscription period).
- Provides a separate "Enquire" CTA distinct from product ordering.
- Pre-filled WhatsApp message for tiffin enquiry is clearly labelled as an enquiry, not a confirmed booking.

### FR-06 Navigation
- Sticky header with anchor links to all major sections.
- Mobile: hamburger menu collapses into a slide-in drawer or full-screen overlay.
- Active section highlighting as user scrolls (Intersection Observer).
- "Skip to main content" link for keyboard and screen-reader users.

### FR-07 Contact information
- Display city and locality (Mira Road East, Mumbai, Maharashtra) — no full street address unless owner approves.
- Display ⚠️ CONFIRM: operating hours, delivery area boundaries.
- Link to Instagram profile.
- WhatsApp link.

### FR-08 SEO and metadata
- `<title>`: "Aashapura Rasoi – Homemade Gujarati Food & Tiffin | Mira Road East, Mumbai"
- Meta description: ~155 characters, owner-approved.
- Open Graph: title, description, image (owner-approved food photo).
- Local Business structured data (JSON-LD): name, type (`FoodEstablishment`), address, phone ⚠️ CONFIRM, URL.
- Canonical URL set to production domain once known.

### FR-09 Performance
- Lighthouse Performance score ≥ 85 on mobile (target).
- Images served in WebP format with `width`, `height`, and `loading="lazy"` attributes.
- Fonts loaded with `font-display: swap`.
- JS bundle split; Vite handles code-splitting automatically.

### FR-10 Accessibility
- WCAG 2.1 AA colour contrast on all text/background combinations.
- All interactive elements reachable and operable by keyboard.
- `aria-label` on icon-only buttons (e.g., WhatsApp FAB, close buttons).
- Focus ring visible on all focusable elements.
- Images: meaningful `alt` text for product photos; empty `alt=""` for decorative images.

---

## 7. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | No backend server, database, or authentication system in Version 1. |
| NFR-02 | No credentials, API keys, or private contact numbers committed to any public repository. |
| NFR-03 | WhatsApp number stored in a `.env` file excluded from Git (`.gitignore`). Injected at build time via Vite `import.meta.env`. |
| NFR-04 | Initial page load (LCP) target: ≤ 2.5 s on a mid-range Android device on a 4G connection. |
| NFR-05 | Website must function without JavaScript for content browsing (progressive enhancement); only the order builder and WhatsApp link generation require JS. |
| NFR-06 | No third-party analytics, tracking pixels, or cookie consent requirements unless the owner opts in. |
| NFR-07 | Vercel preview deployments must not be publicly indexed (use `X-Robots-Tag: noindex` on preview URLs). |
| NFR-08 | All placeholder content (`[PRICE TBC]`, `[IMAGE TBC]`) must be replaced before the production URL is shared publicly. |

---

## 8. Assumptions and Owner Confirmation Checklist

The following items are **unconfirmed**. The website must not state them as facts until the owner explicitly approves each point.

| # | Item | Status |
|---|---|---|
| 1 | WhatsApp business number | ⚠️ CONFIRM |
| 2 | Complete product list with current names | ⚠️ CONFIRM |
| 3 | Current prices for all products | ⚠️ CONFIRM |
| 4 | Product weight / pack sizes | ⚠️ CONFIRM |
| 5 | Available product variants (e.g., thepla with/without oil) | ⚠️ CONFIRM |
| 6 | Tiffin plan types (daily / weekly / monthly) | ⚠️ CONFIRM |
| 7 | Tiffin plan pricing | ⚠️ CONFIRM |
| 8 | Tiffin delivery area / pin codes covered | ⚠️ CONFIRM |
| 9 | Operating / preparation days and hours | ⚠️ CONFIRM |
| 10 | Minimum order quantity or value | ⚠️ CONFIRM |
| 11 | Delivery method (self-pickup / delivery / both) | ⚠️ CONFIRM |
| 12 | Delivery charges (if any) | ⚠️ CONFIRM |
| 13 | Approved food claims (e.g., "no preservatives", "100% homemade") | ⚠️ CONFIRM |
| 14 | Brand tagline / headline approved for web use | ⚠️ CONFIRM |
| 15 | Brand story / "About Us" copy | ⚠️ CONFIRM |
| 16 | Approved product photography (original, owned by business) | ⚠️ CONFIRM |
| 17 | Logo in SVG or high-resolution PNG format | ⚠️ CONFIRM |
| 18 | Production domain name | ⚠️ CONFIRM |
| 19 | Instagram profile URL (for footer link) | ⚠️ CONFIRM |
| 20 | Owner consent to publish full street address online | ⚠️ CONFIRM |
| 21 | Owner consent to third-party analytics (if desired) | ⚠️ CONFIRM |
| 22 | Refund / cancellation policy (for footer or FAQ) | ⚠️ CONFIRM |

---

## 9. Acceptance Criteria

### Phase 1 (documentation) — complete when:
- [ ] `PROJECT_PLAN.md`, `DESIGN_SYSTEM.md`, and `IMPLEMENTATION_PLAN.md` are reviewed and approved by the owner/project lead.
- [ ] Owner confirmation checklist items are progressed to enable development to begin.

### Phase 2 (development) — complete when:
- [ ] All placeholder content replaced with owner-approved copy and assets.
- [ ] All ⚠️ CONFIRM items resolved.
- [ ] Lighthouse scores: Performance ≥ 85, Accessibility = 100, Best Practices ≥ 95, SEO = 100 on mobile.
- [ ] Website renders correctly on Chrome (Android), Safari (iOS), and Chrome/Firefox/Edge on desktop.
- [ ] All interactive elements operable by keyboard; no accessibility violations in automated scan (axe-core).
- [ ] WhatsApp link opens correctly with pre-filled message on both Android and iOS.
- [ ] Vercel production deployment live on confirmed domain.
- [ ] All placeholder content (`[PRICE TBC]`, `[IMAGE TBC]`) removed from production build.
- [ ] `.env` file not committed to any repository.
