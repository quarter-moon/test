<?php
/**
 * Title: Testimonial – Engineer Quote
 * Slug: gaptec/testimonial
 * Categories: gaptec, gaptec-cards
 * Keywords: testimonial, quote, review, engineer, customer
 * Block Types: core/group
 * Viewport Width: 1280
 * Description: Centered testimonial block with large quote, attribution, and certification badges.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"surface","style":{"spacing":{"padding":{"top":"clamp(3rem,7vw,5rem)","bottom":"clamp(3rem,7vw,5rem)","left":"clamp(1rem,4vw,2.5rem)","right":"clamp(1rem,4vw,2.5rem)"}},"border":{"bottom":{"color":"var:preset|color|border","width":"1px","style":"solid"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-surface-background-color has-background" style="padding:clamp(3rem,7vw,5rem) clamp(1rem,4vw,2.5rem);border-bottom:1px solid var(--wp--preset--color--border)">

  <!-- wp:group {"align":"wide","style":{"spacing":{"blockGap":"1.5rem"}},"layout":{"type":"constrained","contentSize":"720px"}} -->
  <div class="wp-block-group alignwide">

    <!-- wp:paragraph {"align":"center","className":"gaptec-section-label"} -->
    <p class="has-text-align-center gaptec-section-label">What Engineers Say</p>
    <!-- /wp:paragraph -->

    <!-- wp:quote {"align":"center","style":{"typography":{"fontSize":"1.4rem","fontStyle":"normal","fontWeight":"300","lineHeight":"1.5"},"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"className":"is-style-plain","fontFamily":"barlow"} -->
    <blockquote class="wp-block-quote is-style-plain has-text-align-center" style="font-size:1.4rem;font-weight:300;line-height:1.5;padding:0">
      <p>"GAPTEC's DC-DC converters have been the go-to choice for our railway control systems for over five years. Short lead times, consistent quality, and a team that actually understands EN 50155."</p>
      <cite style="font-size:0.78rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--wp--preset--color--text-muted)">Senior Electronics Engineer, Rail OEM — Germany</cite>
    </blockquote>
    <!-- /wp:quote -->

    <!-- wp:group {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap","verticalAlignment":"center"},"style":{"spacing":{"blockGap":"0.5rem","margin":{"top":"1.5rem"}}}} -->
    <div class="wp-block-group" style="margin-top:1.5rem">
      <!-- wp:html -->
      <span class="gaptec-badge">EN 50155</span>
      <span class="gaptec-badge">3-Year Warranty</span>
      <span class="gaptec-badge">ISO 9001</span>
      <!-- /wp:html -->
    </div>
    <!-- /wp:group -->

  </div>
  <!-- /wp:group -->

</div>
<!-- /wp:group -->
