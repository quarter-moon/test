# VELA Studio — Brand Assets Design Spec
**Version 1.0 | For Designer & Developer Use**

---

## 1. Favicon Suite

### Design
- **Symbol:** Letter "V" — Cormorant Garamond Light, centered
- **Background:** #1A1A1A (Ink)
- **Letter color:** #F5F4F2 (Stone)
- **Corner radius:** Proportional (8px at 64px size, scales down)

### Export Sizes

| File | Size | Usage |
|---|---|---|
| `favicon.ico` | 16×16 + 32×32 (multi-size) | Browser tab |
| `favicon-32.png` | 32×32 | Standard browsers |
| `favicon-64.png` | 64×64 | High-DPI displays |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `android-chrome-192.png` | 192×192 | Android home screen |
| `android-chrome-512.png` | 512×512 | PWA splash screen |
| `og-logo.png` | 400×400 | Social profile pictures |

### Variants
- **Primary:** Ink background (#1A1A1A) + Stone "V" (#F5F4F2)
- **Light:** Stone background (#F5F4F2) + Ink "V" (#1A1A1A) — for light UI contexts
- **Clay:** Clay background (#C4A882) + White "V" — campaign / seasonal use

### Shopify Upload
**Online Store → Preferences → Favicon**
Upload: `favicon-32.png` (Shopify auto-serves correct sizes)

---

## 2. OG Image (Social Share / Link Preview)

### Specs
- **Dimensions:** 1200 × 630px (1.91:1 ratio — Facebook, Twitter, LinkedIn standard)
- **File format:** JPG, 85% quality
- **Max file size:** 300KB

### Design
```
Background:    #1A1A1A solid
Corner marks:  32×32px L-shaped lines, #C4A882, 20px from edges, 1px stroke

Center (vertically + horizontally):
  VELA         — Cormorant Garamond Light, 96px, #F5F4F2, letter-spacing: 0.4em
  Studio       — DM Sans Light, 13px, #C4A882, ALL CAPS, letter-spacing: 0.22em
  ─────────    — 60px horizontal rule, #C4A882, 0.5px, margin: 20px auto
  Dressed with intention.
               — Cormorant Garamond Light Italic, 24px, rgba(245,244,242,0.65)

Bottom right:
  vela-studio.com
               — DM Sans, 11px, rgba(245,244,242,0.35), ALL CAPS, letter-spacing: 0.1em
```

### Meta tags for Shopify (theme.liquid)
```html
<meta property="og:title" content="VELA Studio — Dressed with Intention">
<meta property="og:description" content="Premium minimalist fashion. Effortless pieces for the modern woman.">
<meta property="og:image" content="{{ 'og-image.jpg' | asset_url }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{{ 'og-image.jpg' | asset_url }}">
```

### Shopify Upload
**Online Store → Preferences → Social sharing image**

---

## 3. Email Template System

### Master Layout Specs
- **Container width:** 600px
- **Background (outer):** #F0EEE9
- **Font stack:** 'DM Sans', Arial, sans-serif (body) / 'Georgia', serif (fallback for Cormorant)
- **All CSS:** Inline only (email client compatibility)
- **Images:** Hosted on Shopify CDN, absolute URLs

### Template Structure (top to bottom)

#### Pre-header Bar
```
Height:      36px
Background:  #1A1A1A
Left text:   Pre-header message — DM Sans, 11px, rgba(245,244,242,0.6), ALL CAPS
Right link:  "View in browser" — DM Sans, 10px, #C4A882, underline
Padding:     0 24px
```

#### Header
```
Background:  #F5F4F2
Padding:     32px 40px 24px
Text-align:  center
Border-bottom: 1px solid #E8E6E2

Logo:
  Text:      VELA
  Font:      Georgia, serif (email fallback), 28px, #1A1A1A
  Weight:    Normal (Light not available in email)
  Spacing:   letter-spacing: 8px
  Note:      Use image logo if web fonts not loading

Nav links (below logo):
  Links:     New In / Clothing / Sale / Account
  Font:      Arial, 9px, #888780, ALL CAPS, letter-spacing: 2px
  Gap:       20px between links
  Margin-top: 16px
```

#### Hero Section (dark)
```
Background:   #1A1A1A
Padding:      48px 40px
Text-align:   center

Category tag: Arial, 9px, #C4A882, ALL CAPS, letter-spacing: 4px, margin-bottom: 12px
Headline:     Georgia, 32px, #F5F4F2, line-height: 1.25, margin-bottom: 16px
              (2 lines max)
Body text:    Arial, 13px, rgba(245,244,242,0.65), line-height: 1.75
              max-width: 340px, centered, margin-bottom: 24px
CTA button:
  Background: #C4A882
  Text:       Arial, 10px, #FFFFFF, ALL CAPS, letter-spacing: 3px
  Padding:    14px 40px
  Border:     none
  Border-radius: 0 (sharp)
```

#### Product Grid (3-up)
```
Background:   #FFFFFF
Padding:      32px 24px
Title:        Arial, 10px, #888780, ALL CAPS, letter-spacing: 3px, centered, margin-bottom: 20px

3-column table layout (email-safe):
  Column width: 160px each, 10px gap
  Image:       160×213px (3:4 ratio), background #E8E6E2
  Name:        Georgia, 13px, #1A1A1A, margin-top: 8px, centered
  Price:       Arial, 11px, #888780, margin-top: 2px, centered
```

#### Secondary Banner (optional)
```
Background:   #F5F4F2 or #E8E6E2
Padding:      32px 40px
Layout:       50/50 — left image | right text
Image:        Full height left column
Text right:   Tag + Headline + CTA link
```

#### Footer
```
Background:   #1A1A1A
Padding:      28px 40px
Text-align:   center

Logo:
  Text:       VELA
  Font:       Georgia, 18px, rgba(245,244,242,0.45), letter-spacing: 8px
  Margin-bottom: 14px

Social links:
  Text:       Instagram · Pinterest · TikTok
  Font:       Arial, 9px, rgba(245,244,242,0.4), ALL CAPS, letter-spacing: 2px
  Margin-bottom: 16px

Legal:
  Text:       © 2025 VELA Studio · Unsubscribe · Privacy Policy
  Font:       Arial, 9px, rgba(245,244,242,0.25)
```

### Email Types to Create
| Template | Subject line formula | Hero color |
|---|---|---|
| Welcome | "Welcome to VELA Studio" | Ink (#1A1A1A) |
| New arrivals | "Just arrived: [collection name]" | Ink (#1A1A1A) |
| Sale / promo | "Up to X% off — today only" | Promo (#D94F3D) |
| Abandoned cart | "You left something behind" | Stone (#F5F4F2) |
| Order confirmation | "Your VELA order is confirmed" | Stone (#F5F4F2) |
| Shipping update | "Your order is on its way" | Stone (#F5F4F2) |
| Win-back | "We miss you." | Ink (#1A1A1A) |

### Shopify Email Settings
**Settings → Notifications → Customize**
- Upload logo image (400×100px, Stone bg version)
- Set accent color: #C4A882
- Set button color: #1A1A1A
- Set font: Arial (system — Shopify notification emails don't support custom fonts)

---

## 4. Social Media Profile Assets

### Instagram
- **Profile picture:** 110×110px (displays as circle) — "V" monogram, Ink bg
- **Story highlight covers:** 1080×1080px — "V" on Stone bg + category label
  - Categories: New In / Clothing / Dresses / Outerwear / Behind the Scenes / Press
- **Feed post template:** 1080×1080px (square) or 1080×1350px (portrait 4:5)
- **Reels cover:** 1080×1920px

### Pinterest
- **Profile picture:** 165×165px — "V" monogram, Ink bg
- **Pin template:** 1000×1500px (2:3) — product image top 75% + logo strip bottom 25%

### Twitter / X
- **Profile picture:** 400×400px — "V" monogram, Ink bg
- **Header image:** 1500×500px — VELA wordmark centered on Stone bg

---

## 5. Shopify Store Update Checklist

### Admin Settings
- [ ] **Settings → Store details** → Change name: "VELA Studio"
- [ ] **Settings → Store details** → Update contact email to vela domain
- [ ] **Settings → Checkout** → Update "Thank you" page messaging

### Online Store → Preferences
- [ ] Upload favicon (32×32 PNG)
- [ ] Update page title: "VELA Studio — Dressed with Intention"
- [ ] Update meta description: "Premium minimalist fashion for the modern woman. Free shipping on orders over $150."
- [ ] Upload OG image (1200×630 JPG)
- [ ] Update social sharing title + description

### Theme Editor
- [ ] Header → Update logo (upload SVG/PNG or update text logo to "VELA")
- [ ] Header → Update announcement bar text
- [ ] Footer → Update store name references
- [ ] Colors → Update primary color to #1A1A1A, accent to #C4A882

### Notification Emails (Settings → Notifications)
- [ ] Order confirmation → Upload new logo, update colors
- [ ] Shipping confirmation → Upload new logo, update colors
- [ ] Welcome email (if using Shopify Email) → Full template update

---

## 6. Asset File Naming Convention

```
vela-favicon-32.png
vela-favicon-64.png
vela-favicon-180.png        ← Apple touch icon
vela-favicon-512.png        ← PWA
vela-logo-dark.svg          ← Wordmark on dark bg (white)
vela-logo-light.svg         ← Wordmark on light bg (dark)
vela-logo-clay.svg          ← Clay variant
vela-monogram-dark.svg      ← V mark only
vela-og-image.jpg           ← 1200×630
vela-email-logo.png         ← 400×100, for email clients
vela-instagram-profile.png  ← 400×400
vela-twitter-header.jpg     ← 1500×500
```

---

*VELA Studio Brand Assets v1.0 — Confidential*
