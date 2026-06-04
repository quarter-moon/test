# Pavé — Demo Image Guide

Every image slot on the site, with a hand-picked Unsplash photo and the exact download URL.
**Run `download-images.sh` (same folder) to fetch everything at once.**

---

## How to upload to Shopify

1. **Online Store → Files** — upload all images there first
2. Then reference them from the theme editor (each image picker points to a file you've uploaded)

---

## Homepage sections

### 1 · Hero image (split hero, right panel)
**Where:** Theme editor → Hero → Background / hero image
**Aspect ratio:** Portrait, ~3:4 works best (800 × 1060)

| File | Description |
|------|-------------|
| `hero-ring.jpg` | Close-up of woman's hand — solitaire diamond ring on clean cream background |

```
https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=1600&fit=crop&auto=format
```

---

### 2 · Collection tiles (4 tiles)

**Where:** Theme editor → Collection tiles → each tile → Image
First tile is wide (2:1), tiles 2–4 are portrait (4:5).

| File | Tile | Description |
|------|------|-------------|
| `tile-engagement.jpg` | Engagement Rings (wide) | Solitaire macro, white gold on black velvet |
| `tile-necklaces.jpg` | Necklaces | Diamond pendant on model's décolletage |
| `tile-earrings.jpg` | Earrings | Drop earring on model, warm-toned |
| `tile-bracelets.jpg` | Bracelets | Tennis bracelet draped on wrist |

```
# tile-engagement.jpg  (wide — 1400×700)
https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&h=700&fit=crop&auto=format

# tile-necklaces.jpg  (portrait — 800×1000)
https://images.unsplash.com/photo-1515562141027-7062a566a479?w=800&h=1000&fit=crop&auto=format

# tile-earrings.jpg  (portrait — 800×1000)
https://images.unsplash.com/photo-1535632066927-3f04f35e4c0c?w=800&h=1000&fit=crop&auto=format

# tile-bracelets.jpg  (portrait — 800×1000)
https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop&auto=format
```

---

### 3 · Product spotlight (dark feature section)
**Where:** Theme editor → Product spotlight → Override image (optional)
Set the **Product** picker to **Rivière Necklace** (`riviere-necklace`).
The override image shows in place of the SVG gem while the product is loading.

| File | Description |
|------|-------------|
| `spotlight-riviere.jpg` | Graduated diamond necklace, dark dramatic background |

```
https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&h=900&fit=crop&auto=format
```

---

### 4 · Lookbook / Atelier (full-bleed background)
**Where:** Theme editor → Lookbook / Atelier → Background image (optional)

| File | Description |
|------|-------------|
| `lookbook-atelier.jpg` | Jeweler's bench — tools, stones, warm light from above |

```
https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=2000&h=1000&fit=crop&auto=format
```

---

## Product images (for the CSV import)

The `products.csv` already has Unsplash URLs in the `Image Src` column.
Shopify will fetch these automatically on import — no manual upload needed.

If you want higher-res product images later, here are the handles and their current sources:

| Handle | Image URL |
|--------|-----------|
| `soleil-solitaire` | `photo-1605100804763-247f67b3557e` |
| `lumiere-halo` | `photo-1573408301408-52188e8f4c8a` |
| `eternel-band` | `photo-1589128777073-263566ae5e4d` |
| `arc-drop-earrings` | `photo-1535632066927-3f04f35e4c0c` |
| `constellation-studs` | `photo-1588444837495-c6cfeb53f32d` |
| `seve-pendant` | `photo-1515562141027-7062a566a479` |
| `tennis-classique` | `photo-1611591437281-460bfbe1220a` |
| `riviere-necklace` | `photo-1617038260897-41a1f14a8ca0` |
| `empire-signet` | `photo-1601121141418-b68e881b8f88` |
| `bague-trois` | `photo-1602752250015-52934bc45613` |
| `aurore-hoops` | `photo-1630018548010-22e70d0328c5` |
| `plain-band` | `photo-1547155375-da3e32b97de0` |

---

## Blog post images (optional)

If you want featured images on journal posts, these complement each article:

| Post handle | File | URL |
|-------------|------|-----|
| `anatomy-of-pave-setting` | `blog-pave-setting.jpg` | `photo-1617038260897-41a1f14a8ca0?w=1200&h=628&fit=crop` |
| `how-to-choose-a-diamond` | `blog-diamond-guide.jpg` | `photo-1605100804763-247f67b3557e?w=1200&h=628&fit=crop` |
| `caring-for-fine-jewelry` | `blog-care-guide.jpg` | `photo-1589128777073-263566ae5e4d?w=1200&h=628&fit=crop` |
| `choosing-stone-shape` | `blog-stone-shapes.jpg` | `photo-1573408301408-52188e8f4c8a?w=1200&h=628&fit=crop` |

---

## Quick visual summary

```
┌─────────────────────────────────────────────────────┐
│  HERO         hero-ring.jpg  (portrait, right panel) │
├─────────────────────────────────────────────────────┤
│  TILES  [tile-engagement.jpg — wide, 2 columns     ] │
│          [tile-necklaces] [tile-earrings] [tile-bracelets] │
├─────────────────────────────────────────────────────┤
│  PRODUCTS    pulled from CSV (automatic)             │
├─────────────────────────────────────────────────────┤
│  SPOTLIGHT   spotlight-riviere.jpg  (dark card)      │
├─────────────────────────────────────────────────────┤
│  LOOKBOOK    lookbook-atelier.jpg  (full-bleed bg)   │
└─────────────────────────────────────────────────────┘
```
