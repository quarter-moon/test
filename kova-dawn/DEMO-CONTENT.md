# KOVA Dawn — Demo Content Guide

## Products to create in Shopify

Create these 8 products to match the KOVA design prototype:

### 1. Mira Wool Topcoat
- **Vendor:** Outerwear
- **Price:** $690
- **Tags:** New
- **Options:** Color (Camel, Ink, Stone), Size (XS, S, M, L, XL)
- **Unavailable variants:** XS, XL
- **Description:** A long-line wool topcoat tailored for fluid, considered movement. Cut from a midweight Italian wool blend with a soft drape, finished with horn buttons and a wide notched lapel.
- **Materials (metafield):** 70% virgin wool, 25% polyamide, 5% cashmere. Lining: 100% viscose. Dry clean only. Made in Portugal.

### 2. Sable Silk Blouse
- **Vendor:** Tops
- **Price:** $280
- **Options:** Color (Ivory, Clay, Ink), Size (XS, S, M, L)
- **Description:** A fluid silk blouse with a stand collar and concealed placket.
- **Materials:** 100% sandwashed silk. Hand wash cold or dry clean. Made in Italy.

### 3. Halden Pleated Trouser
- **Vendor:** Trousers
- **Price:** $320 (was $420)
- **Tags:** Sale
- **Options:** Color (Stone, Ink, Olive), Size (24, 26, 28, 30, 32)
- **Unavailable:** 24

### 4. Linea Cashmere Crew
- **Vendor:** Knitwear
- **Price:** $410
- **Tags:** New
- **Options:** Color (Oat, Ink, Mist, Clay), Size (XS, S, M, L)

### 5. Otto Calfskin Mule
- **Vendor:** Footwear
- **Price:** $360
- **Options:** Color (Ink, Clay), Size (36, 37, 38, 39, 40, 41)
- **Unavailable:** 36, 41

### 6. Ines Bias Linen Dress
- **Vendor:** Dresses
- **Price:** $380
- **Tags:** Eco
- **Options:** Color (Sand, Ink), Size (XS, S, M, L)

### 7. Carro Structured Tote
- **Vendor:** Accessories
- **Price:** $540
- **Options:** Color (Tan, Ink, Chalk), Size (One Size)

### 8. Verra Wool Midi Skirt
- **Vendor:** Skirts
- **Price:** $290
- **Options:** Color (Ink, Camel), Size (XS, S, M, L)
- **Unavailable:** L

---

## Collections to create

| Handle | Title | Products |
|---|---|---|
| `new-in` | New In | Mira Wool Topcoat, Sable Silk Blouse, Linea Cashmere Crew, Ines Bias Linen Dress |
| `clothing` | Clothing | All clothing items |
| `knitwear` | Knitwear | Linea Cashmere Crew |
| `accessories` | Accessories | Carro Structured Tote, Otto Calfskin Mule |
| `sale` | Sale | Halden Pleated Trouser |
| `tops` | Tops & Shirting | Sable Silk Blouse |
| `dresses` | Dresses | Ines Bias Linen Dress |
| `outerwear` | Outerwear | Mira Wool Topcoat |

---

## Navigation menu (main-menu)

- New In → /collections/new-in
- Clothing → /collections/clothing
- Knitwear → /collections/knitwear
- Accessories → /collections/accessories
- Sale → /collections/sale

---

## Pages to create

- **About** (handle: `about`) — uses page.about.json template
- **Size Guide** (handle: `size-guide`)
- **FAQ** (handle: `faq`)
- **Lookbook** (handle: `lookbook`)
- **Contact** (handle: `contact`)

---

## Color swatch metafields

To enable color swatches on product cards, add a metafield or use a swatch image file in the theme assets named after the color value (e.g. `ink.png`, `stone.png`, `clay.png`).

Alternatively, create a `settings_schema.json` swatch color map.

---

## Images

Use high-quality fashion photography at:
- Product images: 900×1200px minimum (3:4 ratio)
- Hero: 2400×1600px minimum (landscape)
- Collection tiles: 700×933px (3:4 ratio)
- Editorial split: 900×1125px (4:5 ratio)
