# Pavé Theme — Setup Guide

## 1. Upload the theme

1. Compress the `shopify-theme/` directory as a `.zip` file
2. In Shopify Admin → **Online Store → Themes**, click **Add theme → Upload zip file**
3. Upload the zip and click **Publish**

---

## 2. Import products

1. Go to **Products → Import**
2. Upload `demo-content/products.csv`
3. Click **Import products**

After import, manually create collections and assign products:

| Collection title | Handle | Products to include |
|---|---|---|
| Engagement Rings | `engagement` | soleil-solitaire, lumière-halo, bague-trois |
| Wedding Bands | `wedding` | eternel-band, plain-band |
| Everyday Fine | `everyday` | aurore-hoops, constellation-studs, empire-signet |
| Necklaces | `necklaces` | sève-pendant, rivière-necklace |
| Earrings | `earrings` | arc-drop-earrings, constellation-studs, aurore-hoops |
| Bracelets | `bracelets` | tennis-classique |
| New Arrivals | `new-arrivals` | soleil-solitaire, arc-drop-earrings, bague-trois |
| All Jewelry | `all` | (all products) |

---

## 3. Create blog posts

1. Go to **Online Store → Blog posts**
2. Make sure a blog called **"Journal"** with handle `journal` exists (create it if not)
3. Add the four posts from `demo-content/blog-posts.md`, using titles, handles, and body content as specified

---

## 4. Create navigation menus

### Main menu (handle: `main-menu`)

| Label | Link |
|---|---|
| Engagement | /collections/engagement |
| Rings | /collections/rings |
| Necklaces | /collections/necklaces |
| Earrings | /collections/earrings |
| Bracelets | /collections/bracelets |
| Journal | /blogs/journal |
| Contact | /pages/contact |

### Footer — Shop (handle: `footer-shop`)

Engagement, Wedding Bands, Everyday Fine, New Arrivals, All Jewelry

### Footer — The House (handle: `footer-house`)

Our Story, The Journal, Sustainability, Careers

### Footer — Service (handle: `footer-service`)

Care Guide, Size Guide, FAQ, Shipping & Returns, Contact

---

## 5. Create pages

| Title | Handle | Template |
|---|---|---|
| About | `about` | `page.about` |
| Contact | `contact` | `page.contact` |
| Size Guide | `size-guide` | `page` |
| Care Guide | `care-guide` | `page` |
| Shipping & Returns | `shipping-returns` | `page` |
| Privacy Policy | `privacy-policy` | `page` |
| Terms of Service | `terms-of-service` | `page` |

---

## 6. Configure theme settings

In **Online Store → Themes → Customize**, set:

- **Colors → Accent color**: `#B8975A`
- **Colors → Default color scheme**: Light (Ivory)
- **Header → Show announcement bar**: Yes
- **Product pages → Enable engraving**: Yes
- **Product pages → Show gift wrap**: Yes

---

## 7. Homepage sections

The homepage (`templates/index.json`) is pre-configured with:

1. **Announcement bar** — "Complimentary worldwide shipping on orders over $500 · Each piece certified by GIA or IGI"
2. **Hero** (split style) — Edit heading, subheading, and CTA text in Customize
3. **Collection tiles** — 4 tiles linking to Engagement, Wedding, Everyday, New Arrivals
4. **Featured products** — Set the collection to `new-arrivals`
5. **Product spotlight** — Set to the `tennis-classique` product
6. **Trust bar** — 4 trust items pre-configured
7. **Lookbook** — Edit image and text in Customize
8. **Newsletter** — "The Inner Circle" signup

---

## 8. Metafields (optional — for richer product data)

Product metafields are defined in `demo-content/products.csv` as column headers. Shopify will create them on import. You can also define them manually in **Settings → Custom data → Products**:

| Namespace & Key | Type | Description |
|---|---|---|
| `pave.badge` | Single line text | e.g. "New Arrival", "Bestseller", "Signature" |
| `pave.stone` | Single line text | e.g. "1.2ct Round Brilliant" |
| `pave.metal` | Single line text | e.g. "18k White Gold" |
| `pave.motif` | Single line text | SVG motif key for placeholder image |
| `pave.engraving` | True/false | Show engraving input on product page |
| `pave.cert_carat` | Single line text | Certificate carat weight |
| `pave.cert_cut` | Single line text | Certificate cut grade |
| `pave.cert_clarity` | Single line text | Certificate clarity grade |
| `pave.cert_color` | Single line text | Certificate colour grade |
| `pave.cert_report` | Single line text | GIA/IGI report number |
| `pave.detail_1` through `pave.detail_6` | Single line text | Bullet-point product details |
| `pave.pairs_with` | Single line text | Comma-separated product handles |
| `pave.care` | Multi-line text | Care instructions |

---

## Done

Your Pavé store is ready. The theme includes:
- Full responsive layout (mobile-first)
- Dark sticky header with cart drawer, search overlay, mobile nav
- All product page interactive features (gallery, size selector, engraving, gift wrap, accordion, certificate, size guide)
- Collection page with filter sidebar
- Blog / Journal with article pages
- About, Contact, Account, Cart pages
- Reveal-on-scroll animations
- Wishlist (localStorage)
- Toast notifications
- AJAX cart
