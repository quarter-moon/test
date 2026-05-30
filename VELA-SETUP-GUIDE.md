# VELA Studio — Manual Setup Guide
### For developers and merchants setting up the theme on a fresh Shopify store

---

## Before You Start

**What you need:**
- Shopify store (any plan, dev store is fine)
- The `vela-theme.zip` file
- The `vela-products.csv` file (product import)
- ~90 minutes to complete the full setup

**What the theme does for you automatically:**
- Shows placeholder photography (real editorial images) on every section before any content is loaded
- Displays 8 demo product cards on the homepage product grid
- Shows 3 demo journal articles on the journal section
- Renders placeholder images in the lookbook and category strip

> You can publish immediately after uploading the zip — it will look complete out of the box. The steps below wire up your real Shopify data.

---

## Step 1 — Upload the Theme

1. Go to **Admin → Online Store → Themes**
2. Click **Add theme → Upload zip file**
3. Upload `vela-theme.zip`
4. Click **Publish** once it appears in your theme list

---

## Step 2 — Import Products

This is the fastest way to get real products into the store.

1. Go to **Admin → Products**
2. Click **Import**
3. Upload `vela-products.csv`
4. Tick **"Overwrite any current products that have the same handle"** → **Import products**

The import creates **12 products** across Tailoring, Knitwear, Dresses, Tops, Outerwear, and Accessories — each with Size (XS–XL) and Colour variants, SKUs, descriptions, and Unsplash placeholder images.

> **After import:** Check **Admin → Products** and confirm all 12 products are active and published.

---

## Step 3 — Create Collections

Go to **Admin → Products → Collections** and create each collection below. The handle must match exactly — it's used in navigation links and the theme editor.

| Collection Title | Handle | Description to paste |
|---|---|---|
| New In | `new-in` | The latest arrivals — updated every Thursday. |
| Dresses | `dresses` | From silk slip to structured midi. |
| Knitwear | `knitwear` | Considered textures for every season. |
| Outerwear | `outerwear` | Coats and jackets that earn their keep. |
| Tailoring | `tailoring` | Sharp lines, soft construction. |
| Accessories | `accessories` | The finishing thought. |
| Bestsellers | `bestsellers` | Our most-loved styles, always in stock. |
| Sale | `sale` | Select pieces, reduced. |

**For each collection:**
- Set **Collection type → Manual**
- After saving, go to **Admin → Products** and add the relevant products to each collection

**Suggested product → collection assignments:**

| Product | Collections |
|---|---|
| The Brera Trouser | Tailoring, New In, Bestsellers |
| The Linen Camisole | New In, Tops |
| The Plaster Knit | Knitwear, New In |
| The Field Coat | Outerwear, Bestsellers |
| The Long Slip | Dresses, Bestsellers |
| The Camisole | Tops, Bestsellers |
| The Shirt Dress | Dresses, New In |
| The Ribbed Sweater | Knitwear, Bestsellers |
| The Wide-Leg Trouser | Tailoring |
| The Camel Coat | Outerwear, Bestsellers |
| The Silk Scarf | Accessories, New In |
| The Leather Belt | Accessories, Bestsellers |

> **Collection images:** Upload a portrait-orientation image (600×800px or 900×1200px) for each collection. This shows in the Category Strip section on the homepage. Use any clean fashion or still-life photography.

---

## Step 4 — Set Up Navigation

Go to **Admin → Online Store → Navigation**

### Create: `main-menu`

| Label | Link |
|---|---|
| New In | /collections/new-in |
| Dresses | /collections/dresses |
| Knitwear | /collections/knitwear |
| Outerwear | /collections/outerwear |
| Tailoring | /collections/tailoring |
| Sale | /collections/sale |
| Journal | /blogs/journal |

### Create: `secondary-menu`

| Label | Link |
|---|---|
| Our Story | /pages/about |
| Sustainability | /pages/sustainability |
| Size Guide | /pages/size-guide |

### Create footer column menus (or add directly in Theme Editor)

**Footer column 1 — handle: `footer-shop`**

| Label | Link |
|---|---|
| New Arrivals | /collections/new-in |
| Dresses | /collections/dresses |
| Knitwear | /collections/knitwear |
| Outerwear | /collections/outerwear |
| Accessories | /collections/accessories |
| Sale | /collections/sale |

**Footer column 2 — handle: `footer-studio`**

| Label | Link |
|---|---|
| Our Story | /pages/about |
| Sustainability | /pages/sustainability |
| Journal | /blogs/journal |
| Size Guide | /pages/size-guide |

**Footer column 3 — handle: `footer-help`**

| Label | Link |
|---|---|
| Shipping & Returns | /pages/shipping-returns |
| FAQs | /pages/faqs |
| Contact | /pages/contact |

**Footer column 4 — handle: `footer-legal`**

| Label | Link |
|---|---|
| Privacy Policy | /policies/privacy-policy |
| Terms of Service | /policies/terms-of-service |
| Refund Policy | /policies/refund-policy |

---

## Step 5 — Create Pages

Go to **Admin → Online Store → Pages** and create each page below. The body content can be placeholder text for now.

| Page Title | Handle | Notes |
|---|---|---|
| About | `about` | Brand story — linked from footer and editorial sections |
| Size Guide | `size-guide` | Linked from PDP Size & Fit accordion |
| Sustainability | `sustainability` | Footer link |
| Shipping & Returns | `shipping-returns` | Footer link |
| FAQs | `faqs` | Footer link |
| Contact | `contact` | Footer link |

> **Tip:** Shopify auto-generates the handle from the title. Verify it matches exactly.

---

## Step 6 — Set Up the Journal Blog

1. Go to **Admin → Online Store → Blog posts**
2. Click **Manage blogs → Create blog**
3. Set the blog title: **Journal**
4. Set the handle: **`journal`** ← must be this exactly

Then create **4 articles** (minimum):

### Article 1
- **Title:** On buying nothing for sixty days, and what changed.
- **Author:** Mae Lindqvist
- **Tags:** The Edit
- **Excerpt:** A creative director's experiment in restraint — and the unexpected clarity it brought.
- **Body:** 3–5 paragraphs on capsule wardrobes, intentional purchasing, and slow fashion.

### Article 2
- **Title:** Milan, on the last Sunday of January.
- **Author:** Studio Team
- **Tags:** Travel
- **Excerpt:** Notes from the city that does quiet better than anyone.
- **Body:** Travelogue-style writing about research trips for the collection.

### Article 3
- **Title:** A morning in the mill with the Bianchi family, Como.
- **Author:** Ida Söderberg
- **Tags:** Fabric
- **Excerpt:** The mill that has woven for VELA since the beginning — a visit.
- **Body:** Behind-the-scenes story about the fabric sourcing process.

### Article 4
- **Title:** The case for buying less, better.
- **Author:** Mae Lindqvist
- **Tags:** Atelier
- **Excerpt:** On the quiet luxury of owning fewer things you actually reach for.
- **Body:** Brand philosophy piece on slow fashion and enduring design.

> Each article should have a **Featured image** at 1200×800px landscape. Use editorial or lifestyle photography.

---

## Step 7 — Theme Settings

Go to **Admin → Online Store → Themes → Customize → Theme settings**

### Social Media
| Setting | Value |
|---|---|
| Instagram URL | https://instagram.com/velastudio |
| Pinterest URL | https://pinterest.com/velastudio |
| TikTok URL | https://tiktok.com/@velastudio |

### Favicon
Upload a 32×32px PNG. Use a simple "V" lettermark in ink colour (#1A1A1A) on a stone background (#F5F4F2).

### OG / Social sharing image
Upload a 1200×630px image. Use the hero image or a clean product flat-lay.

---

## Step 8 — Wire Up Homepage Sections

Go to **Admin → Online Store → Themes → Customize → Home page**

Work through each section in order:

### Hero
| Setting | Value |
|---|---|
| Background image | Upload your hero image (1800×1000px minimum). The Unsplash placeholder shows until an image is uploaded. |
| Eyebrow | New Collection — Resort 26 |
| Headline | Dressed with intention. |
| Tagline | A wardrobe of twelve, photographed over three days, in a room with nothing in it. |
| Primary CTA label | Shop Resort 26 |
| Primary CTA URL | /collections/new-in |
| Secondary CTA label | Watch the film · 1:48 |
| Secondary CTA URL | # (or your video URL) |

### Marquee
No changes needed — pre-configured with brand copy.

### Category Strip
| Block | Collection setting |
|---|---|
| New In | new-in |
| Dresses | dresses |
| Knitwear | knitwear |
| Tailoring | tailoring |
| Outerwear | outerwear |

> Upload a category image to each block if you want to replace the Unsplash placeholder.

### New Arrivals (Featured Products)
| Setting | Value |
|---|---|
| Collection | new-in |
| Product limit | 8 |

### Editorial Banner
| Setting | Value |
|---|---|
| Image | Upload an atelier/studio shot (1200×900px). Placeholder shows until uploaded. |
| Eyebrow | A note from the studio |
| Headline | The discipline of fewer things, chosen well. |
| Body | Leave as default or customise with your brand story |
| CTA label | Our story |
| CTA URL | /pages/about |

### Lookbook
| Setting | Value |
|---|---|
| Left image | Portrait orientation, 600×800px |
| Centre image | Tall portrait, 700×900px |
| Right image | Portrait orientation, 600×800px |
| Eyebrow | Look 04 · Worn With Nothing |
| Title | An almost-uniform. |
| CTA label | View the full lookbook → |

> Unsplash editorial photos show as placeholders until you upload your own images.

### Bestsellers (Featured Products)
| Setting | Value |
|---|---|
| Collection | bestsellers |
| Product limit | 4 |

### Journal Preview
| Setting | Value |
|---|---|
| Blog | Journal (select from dropdown) |

> Once linked to the Journal blog, real articles auto-populate. Demo placeholder articles show until a blog is connected.

### Provenance, Atelier Quote, Newsletter
These are pre-configured with brand copy. Edit the text in the Theme Editor if needed — no images required.

---

## Step 9 — Header Settings

In the Theme Editor, click on the **Header** section:

| Setting | Value |
|---|---|
| Menu | main-menu |
| Secondary menu | secondary-menu |
| Transparent header on home | ✓ Enabled |
| Announcement text | Free shipping on orders over £150 |
| Announcement CTA | Learn more |
| Announcement CTA URL | /pages/shipping-returns |

---

## Step 10 — Footer Settings

In the Theme Editor, click the **Footer** section:

| Setting | Value |
|---|---|
| Footer column 1 menu | footer-shop |
| Footer column 1 title | Shop |
| Footer column 2 menu | footer-studio |
| Footer column 2 title | Studio |
| Footer column 3 menu | footer-help |
| Footer column 3 title | Help |
| Footer column 4 menu | footer-legal |
| Footer column 4 title | Legal |

---

## Final Checklist

Run through this before sending a preview link:

- [ ] Theme uploaded and published
- [ ] Products imported (12 products visible in Admin → Products)
- [ ] Products assigned to correct collections
- [ ] Collections created with correct handles (new-in, dresses, knitwear, outerwear, tailoring, accessories, bestsellers, sale)
- [ ] Collection images uploaded
- [ ] main-menu navigation created and linked
- [ ] secondary-menu created
- [ ] Footer menus created (footer-shop, footer-studio, footer-help, footer-legal)
- [ ] Pages created (about, size-guide, sustainability, shipping-returns, faqs, contact)
- [ ] Blog handle set to `journal`, minimum 4 articles published
- [ ] Theme settings: social media URLs added
- [ ] Theme settings: favicon uploaded
- [ ] Theme settings: OG image uploaded
- [ ] Homepage sections wired: Hero image, Category Strip collections, New Arrivals collection, Editorial Banner image, Bestsellers collection, Journal Preview blog
- [ ] Header announcement text set
- [ ] Footer menus wired in Theme Editor
- [ ] Preview on mobile and desktop — check hero, product grid, and footer
- [ ] Publish

---

## Image Specs Quick Reference

| Use | Dimensions | Format | Notes |
|---|---|---|---|
| Hero background | 1800 × 1000px | JPG | Landscape. Subject in upper-centre for safe zone. |
| Product images | 900 × 1200px | JPG | 3:4 ratio. White or stone background, or on-body. |
| Collection cover | 600 × 800px | JPG | Portrait. Used in Category Strip. |
| Editorial banner | 1200 × 900px | JPG | Landscape. Dark or neutral tones work best. |
| Lookbook left/right | 600 × 800px | JPG | Portrait 3:4. |
| Lookbook centre | 700 × 880px | JPG | Portrait 4:5, slightly taller. |
| Journal article | 1200 × 800px | JPG | Landscape 3:2. |
| OG / share image | 1200 × 630px | JPG | Used in social sharing and link previews. |
| Favicon | 32 × 32px | PNG | Lettermark or symbol. Transparent background. |

---

## Common Issues

**Hero shows Unsplash photo instead of my image**
→ Go to Theme Editor → Hero → upload a background image. The Unsplash image is a placeholder only.

**Product grid shows demo cards instead of real products**
→ In Theme Editor → New Arrivals → set the Collection to `new-in`. Make sure the collection has products assigned.

**Journal shows placeholder articles**
→ In Theme Editor → Journal Preview → set Blog to `Journal`. Make sure the blog handle is `journal` (lowercase, no spaces).

**Category strip shows placeholder images**
→ Upload images to each collection, or in Theme Editor → Category Strip → click each block → upload an override image.

**Footer shows empty columns**
→ In Theme Editor → Footer → assign the correct menu handle to each column (footer-shop, footer-studio, etc).

**Mega menu doesn't appear on hover**
→ Make sure the header menu (`main-menu`) has a link with the label **Shop** or **New In** — the mega menu triggers on those labels.
