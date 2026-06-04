#!/usr/bin/env bash
# Pavé — Download demo images from Unsplash
# Run from the demo-content folder:  bash download-images.sh
# Images are saved to ./images/ — upload them all to Shopify Files.

set -e
BASE="https://images.unsplash.com"
OUT="images"
mkdir -p "$OUT"

dl() {
  local name="$1" url="$2"
  if [ -f "$OUT/$name" ]; then
    echo "  ✓ $name (already downloaded)"
  else
    echo "  ↓ $name"
    curl -fsSL "$url" -o "$OUT/$name"
  fi
}

echo ""
echo "Pavé — Downloading demo images"
echo "================================"

echo ""
echo "Homepage — Hero"
dl "hero-ring.jpg" \
  "$BASE/photo-1599643478518-a784e5dc4c8f?w=1200&h=1600&fit=crop&auto=format"

echo ""
echo "Homepage — Collection tiles"
dl "tile-engagement.jpg" \
  "$BASE/photo-1605100804763-247f67b3557e?w=1400&h=700&fit=crop&auto=format"
dl "tile-necklaces.jpg" \
  "$BASE/photo-1515562141027-7062a566a479?w=800&h=1000&fit=crop&auto=format"
dl "tile-earrings.jpg" \
  "$BASE/photo-1535632066927-3f04f35e4c0c?w=800&h=1000&fit=crop&auto=format"
dl "tile-bracelets.jpg" \
  "$BASE/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop&auto=format"

echo ""
echo "Homepage — Spotlight"
dl "spotlight-riviere.jpg" \
  "$BASE/photo-1617038260897-41a1f14a8ca0?w=900&h=900&fit=crop&auto=format"

echo ""
echo "Homepage — Lookbook / Atelier"
dl "lookbook-atelier.jpg" \
  "$BASE/photo-1589182373726-e4f658ab50f0?w=2000&h=1000&fit=crop&auto=format"

echo ""
echo "Blog featured images"
dl "blog-pave-setting.jpg" \
  "$BASE/photo-1617038260897-41a1f14a8ca0?w=1200&h=628&fit=crop&auto=format"
dl "blog-diamond-guide.jpg" \
  "$BASE/photo-1605100804763-247f67b3557e?w=1200&h=628&fit=crop&auto=format"
dl "blog-care-guide.jpg" \
  "$BASE/photo-1589128777073-263566ae5e4d?w=1200&h=628&fit=crop&auto=format"
dl "blog-stone-shapes.jpg" \
  "$BASE/photo-1573408301408-52188e8f4c8a?w=1200&h=628&fit=crop&auto=format"

echo ""
echo "================================"
echo "Done. $(ls $OUT | wc -l | tr -d ' ') images saved to ./$OUT/"
echo ""
echo "Next: Upload all files in ./$OUT/ to Shopify Admin → Content → Files"
echo "Then assign them in the theme editor following image-guide.md"
echo ""
