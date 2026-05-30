# VELA Studio — Demo Content Setup Guide

Follow these steps in order to fully populate the theme on a Shopify dev store.

---

## 1. Shop Settings (Admin → Settings)

| Field | Value |
|---|---|
| Store name | VELA Studio |
| Store currency | USD ($) |
| Unit system | Imperial |
| Timezone | (your timezone) |

---

## 2. Navigation Menus (Admin → Online Store → Navigation)

### `main-menu`
| Label | Link |
|---|---|
| New In | `/collections/new-in` |
| Dresses | `/collections/dresses` |
| Knitwear | `/collections/knitwear` |
| Outerwear | `/collections/outerwear` |
| Journal | `/blogs/journal` |

### `footer` (3 columns — create as nested menus)
**Column 1 — Shop**
| Label | Link |
|---|---|
| New Arrivals | `/collections/new-in` |
| Dresses | `/collections/dresses` |
| Knitwear | `/collections/knitwear` |
| Outerwear | `/collections/outerwear` |
| Accessories | `/collections/accessories` |
| Sale | `/collections/sale` |

**Column 2 — Studio**
| Label | Link |
|---|---|
| Our Story | `/pages/about` |
| Sustainability | `/pages/sustainability` |
| Journal | `/blogs/journal` |
| Size Guide | `/pages/size-guide` |

**Column 3 — Help**
| Label | Link |
|---|---|
| Shipping & Returns | `/pages/shipping-returns` |
| FAQs | `/pages/faqs` |
| Contact Us | `/pages/contact` |

### `legal`
| Label | Link |
|---|---|
| Privacy Policy | `/policies/privacy-policy` |
| Terms of Service | `/policies/terms-of-service` |
| Refund Policy | `/policies/refund-policy` |

---

## 3. Collections (Admin → Products → Collections)

Create each collection with the exact handle shown:

| Collection Title | Handle | Description |
|---|---|---|
| New In | `new-in` | The latest arrivals — updated every Thursday. |
| Dresses | `dresses` | From silk slip to structured midi. |
| Knitwear | `knitwear` | Considered textures for every season. |
| Outerwear | `outerwear` | Coats and jackets that earn their keep. |
| Tailoring | `tailoring` | Sharp lines, soft construction. |
| Accessories | `accessories` | The finishing thought. |
| Sale | `sale` | Select pieces, reduced. |
| Bestsellers | `bestsellers` | Our most-loved styles, always in stock. |

> **Tip:** Upload a square lifestyle image (1200×1200px) for each collection — used in the Featured Collections grid on the homepage.

---

## 4. Products

Create **12 products minimum** across the collections above. Each product should have:

- **2 images** (front + back or detail shot) at 900×1200px (3:4 ratio)
- **Size option** with values: `XS / S / M / L / XL`
- **Color option** (optional but recommended) — use plain CSS color names or hex values for swatches to render correctly (e.g. `Ivory`, `Black`, `Clay`, `Stone`)

### Product list

| Title | Collection(s) | Price | Compare Price | Colours |
|---|---|---|---|---|
| Silk Slip Dress | Dresses, New In, Bestsellers | $285 | — | Ivory, Black |
| Linen Midi Dress | Dresses, New In | $245 | — | Stone, Clay |
| Wrap Dress | Dresses, Sale | $165 | $245 | Ivory |
| Ribbed Merino Sweater | Knitwear, Bestsellers | $195 | — | Oatmeal, Black |
| Cable-Knit Cardigan | Knitwear, New In | $225 | — | Cream, Stone |
| Fine-Knit Turtleneck | Knitwear | $175 | — | Black, Taupe |
| Camel Wool Coat | Outerwear, Bestsellers | $485 | — | Camel |
| Leather Trench | Outerwear, Sale | $390 | $595 | Black |
| Tailored Blazer | Tailoring, New In | $320 | — | Ivory, Black |
| Wide-Leg Trouser | Tailoring | $245 | — | Stone, Black |
| Leather Belt | Accessories | $95 | — | Tan, Black |
| Silk Scarf | Accessories, New In | $85 | — | Ivory, Clay |

### Product descriptions (copy-paste examples)

**Silk Slip Dress**
> A study in simplicity. Cut from pure silk charmeuse with a fluid bias drape, this slip dress moves effortlessly from studio to supper. Adjustable straps, side seam pockets.

**Camel Wool Coat**
> Our most requested piece, year after year. Tailored in 100% Italian wool with a clean notch collar and single-button closure. Fully lined, with deep side pockets.

**Ribbed Merino Sweater**
> Superfine merino in a close rib. Slightly cropped with a relaxed fit through the body. The kind of sweater you reach for without thinking.

### Metafields (optional but used in PDP Fabric & Care accordion)

Set `custom.fabric_care` (single-line text) on each product. Example values:

| Product | `custom.fabric_care` |
|---|---|
| Silk Slip Dress | Dry clean only. Do not wring. Store flat. |
| Ribbed Merino Sweater | Hand wash cold. Dry flat. Do not iron. |
| Camel Wool Coat | Dry clean only. Brush after wear. |

---

## 5. Pages (Admin → Online Store → Pages)

| Title | Handle | Notes |
|---|---|---|
| About | `about` | Brand story — referenced in editorial-2 on homepage |
| Size Guide | `size-guide` | Linked from PDP Size & Fit accordion |
| Sustainability | `sustainability` | Footer link |
| Shipping & Returns | `shipping-returns` | Footer help link |
| FAQs | `faqs` | Footer help link |
| Contact Us | `contact` | Footer help link |

---

## 6. Blog (Admin → Online Store → Blog Posts)

Blog handle: **`journal`** (must match — used in nav and blog template)

Create **4 articles** minimum:

| Title | Tag | Excerpt |
|---|---|---|
| How to Build a Capsule Wardrobe in 10 Pieces | Essay | The art of choosing less so that everything counts. |
| The Case for Buying Less, Better | Atelier | On slow fashion and the pieces that endure. |
| Spring Dressing: Three Ways | Style Notes | One dress. Three occasions. Zero stress. |
| Behind the Fabric: Our Italian Mill Partners | Craft | A visit to the mill behind our merino collection. |

Each article should have:
- A featured image (1200×800px landscape)
- A short excerpt (1–2 sentences)
- Body text (3–5 paragraphs)
- Author name
- At least one tag (used as category label in blog index)

---

## 7. Theme Settings (Admin → Online Store → Themes → Customize)

### Theme Settings → Social Media
| Field | Value |
|---|---|
| Instagram URL | `https://instagram.com/velastudio` |
| Pinterest URL | `https://pinterest.com/velastudio` |

### Theme Settings → Favicon
Upload a 32×32px PNG favicon.

### Theme Settings → OG / Social sharing image
Upload a 1200×630px banner image.

---

## 8. Homepage Section Wiring (Theme Editor)

After creating collections and products, open **Theme Editor → Home page** and set:

| Section | Setting | Value |
|---|---|---|
| Hero | CTA Primary URL | `/collections/new-in` |
| Hero | CTA Secondary URL | `/collections/all` |
| Category Strip → New In | Collection | `new-in` |
| Category Strip → Dresses | Collection | `dresses` |
| Category Strip → Knitwear | Collection | `knitwear` |
| Category Strip → Outerwear | Collection | `outerwear` |
| Category Strip → Tailoring | Collection | `tailoring` |
| Featured Collections → block 1 | Collection | `dresses` |
| Featured Collections → block 2 | Collection | `outerwear` |
| Featured Collections → block 3 | Collection | `knitwear` |
| Featured Collections → block 4 | Collection | `accessories` |
| New Arrivals | Collection | `new-in` |
| Editorial Banner 1 | Image | Lifestyle shot (1200×900px) |
| Bestsellers | Collection | `bestsellers` |
| Editorial Banner 2 | Image | Brand/atelier shot (1200×900px) |

---

## 9. Image Specs Summary

| Usage | Size | Ratio | Format |
|---|---|---|---|
| Product images | 900×1200px | 3:4 | JPG |
| Collection cover | 1200×1200px | 1:1 | JPG |
| Editorial banner | 1200×900px | 4:3 | JPG |
| Blog article hero | 1200×800px | 3:2 | JPG |
| OG / social share | 1200×630px | ~1.9:1 | JPG |
| Favicon | 32×32px | 1:1 | PNG |

---

## 10. Quick Install Checklist

- [ ] Upload `vela-theme.zip` → Admin → Themes → Add theme → Upload zip
- [ ] Create 8 collections with correct handles
- [ ] Create 12+ products assigned to collections
- [ ] Create `main-menu`, `footer`, `legal` nav menus
- [ ] Create 5 pages (about, size-guide, sustainability, shipping-returns, faqs)
- [ ] Create blog `journal` with 4+ articles
- [ ] Set social URLs in Theme Settings
- [ ] Upload favicon + OG image
- [ ] Wire homepage sections in Theme Editor
- [ ] Preview → Publish
