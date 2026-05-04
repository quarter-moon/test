<?php
/**
 * Title: Hero – Power Conversion
 * Slug: gaptec/hero
 * Categories: gaptec, gaptec-sections
 * Keywords: hero, header, banner, power, industrial
 * Block Types: core/group
 * Viewport Width: 1280
 * Description: Full-width hero section with headline, subheadline, product cards, and certification badges.
 */
?>
<!-- wp:group {"align":"full","className":"gaptec-grid-bg","style":{"spacing":{"padding":{"top":"clamp(3rem,7vw,5rem)","bottom":"clamp(2.5rem,5vw,4rem)","left":"clamp(1rem,4vw,2.5rem)","right":"clamp(1rem,4vw,2.5rem)"}},"border":{"bottom":{"color":"var:preset|color|border","width":"1px","style":"solid"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull gaptec-grid-bg" style="padding:clamp(3rem,7vw,5rem) clamp(1rem,4vw,2.5rem) clamp(2.5rem,5vw,4rem);border-bottom:1px solid var(--wp--preset--color--border)">

  <!-- wp:group {"align":"wide","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"constrained","contentSize":"700px","justifyContent":"left"}} -->
  <div class="wp-block-group alignwide">

    <!-- wp:paragraph {"className":"gaptec-eyebrow","style":{"spacing":{"margin":{"bottom":"1.2rem"}}}} -->
    <p class="gaptec-eyebrow" style="margin-bottom:1.2rem">Since 2010 · Germany</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {"level":1,"style":{"typography":{"fontStyle":"normal","fontWeight":"900","lineHeight":"0.93","letterSpacing":"-0.01em","textTransform":"uppercase"},"spacing":{"margin":{"bottom":"1.4rem"}}},"fontFamily":"barlow-condensed"} -->
    <h1 class="wp-block-heading" style="font-weight:900;line-height:0.93;letter-spacing:-0.01em;text-transform:uppercase;margin-bottom:1.4rem">Power Conversion<br><span style="color:var(--wp--preset--color--green)">Engineered</span><br>Precisely</h1>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"style":{"typography":{"fontSize":"clamp(0.9rem,2vw,1.05rem)","lineHeight":"1.75"},"spacing":{"margin":{"bottom":"2.2rem"}},"color":{"text":"#6b7280"}},"className":"hero-sub"} -->
    <p class="hero-sub" style="font-size:clamp(0.9rem,2vw,1.05rem);line-height:1.75;color:#6b7280;margin-bottom:2.2rem">Innovative designs. Premium quality. Micro-size converters from 0.1W to 1000W — for industrial, medical, railway, and telecom applications.</p>
    <!-- /wp:paragraph -->

    <!-- wp:columns {"style":{"spacing":{"blockGap":"0.7rem","margin":{"bottom":"2.5rem"}}},"className":"hero-cards"} -->
    <div class="wp-block-columns hero-cards" style="gap:0.7rem;margin-bottom:2.5rem">

      <!-- wp:column -->
      <div class="wp-block-column">
        <!-- wp:group {"className":"gaptec-card","style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"1.1rem","right":"1.1rem"}}},"layout":{"type":"flex","verticalAlignment":"center","flexWrap":"nowrap"}} -->
        <div class="wp-block-group gaptec-card" style="padding:1rem 1.1rem">
          <!-- wp:paragraph {"style":{"typography":{"fontSize":"1.5rem"},"spacing":{"margin":{"right":"0.5rem"}}}} --><p style="font-size:1.5rem;margin-right:0.5rem">⚡</p><!-- /wp:paragraph -->
          <!-- wp:group {"layout":{"type":"constrained"}} -->
          <div class="wp-block-group">
            <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","fontStyle":"normal","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.03em"},"spacing":{"margin":{"bottom":"0"}}}} --><p style="font-size:0.95rem;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0">AC-DC</p><!-- /wp:paragraph -->
            <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7rem"},"spacing":{"margin":{"top":"0.1rem"}}},"textColor":"text-muted"} --><p class="has-text-muted-color" style="font-size:0.7rem;margin-top:0.1rem">Power Supplies</p><!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:column -->

      <!-- wp:column -->
      <div class="wp-block-column">
        <!-- wp:group {"className":"gaptec-card","style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"1.1rem","right":"1.1rem"}}},"layout":{"type":"flex","verticalAlignment":"center","flexWrap":"nowrap"}} -->
        <div class="wp-block-group gaptec-card" style="padding:1rem 1.1rem">
          <!-- wp:paragraph {"style":{"typography":{"fontSize":"1.5rem"},"spacing":{"margin":{"right":"0.5rem"}}}} --><p style="font-size:1.5rem;margin-right:0.5rem">🔌</p><!-- /wp:paragraph -->
          <!-- wp:group {"layout":{"type":"constrained"}} -->
          <div class="wp-block-group">
            <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","fontStyle":"normal","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.03em"},"spacing":{"margin":{"bottom":"0"}}}} --><p style="font-size:0.95rem;font-weight:700;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:0">DC-DC Isolated</p><!-- /wp:paragraph -->
            <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.7rem"},"spacing":{"margin":{"top":"0.1rem"}}},"textColor":"text-muted"} --><p class="has-text-muted-color" style="font-size:0.7rem;margin-top:0.1rem">Converters</p><!-- /wp:paragraph -->
          </div>
          <!-- /wp:group -->
        </div>
        <!-- /wp:group -->
      </div>
      <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

    <!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem"},"blockGap":"0.5rem"},"border":{"top":{"color":"var:preset|color|border","width":"1px","style":"solid"}}},"layout":{"type":"flex","flexWrap":"wrap","verticalAlignment":"center"}} -->
    <div class="wp-block-group" style="padding-top:2rem;border-top:1px solid var(--wp--preset--color--border)">
      <!-- wp:html -->
      <span class="gaptec-badge">EN 60601</span>
      <span class="gaptec-badge">EN 50155</span>
      <span class="gaptec-badge">RoHS</span>
      <span class="gaptec-badge">UL</span>
      <span class="gaptec-badge">ISO</span>
      <span class="gaptec-badge">SCP</span>
      <!-- /wp:html -->
    </div>
    <!-- /wp:group -->

  </div>
  <!-- /wp:group -->

</div>
<!-- /wp:group -->
