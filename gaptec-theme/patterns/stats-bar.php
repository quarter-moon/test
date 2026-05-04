<?php
/**
 * Title: Stats Bar
 * Slug: gaptec/stats-bar
 * Categories: gaptec, gaptec-sections
 * Keywords: stats, numbers, metrics, counter
 * Block Types: core/columns
 * Viewport Width: 1280
 * Description: Four-column stat bar showing key numbers with green accent.
 */
?>
<!-- wp:columns {"align":"full","isStackedOnMobile":false,"style":{"border":{"bottom":{"color":"var:preset|color|border","width":"1px","style":"solid"}},"spacing":{"blockGap":"0","padding":{"top":"0","bottom":"0","left":"0","right":"0"}}}} -->
<div class="wp-block-columns alignfull" style="border-bottom:1px solid var(--wp--preset--color--border)">

  <!-- wp:column {"style":{"border":{"right":{"color":"var:preset|color|border","width":"1px","style":"solid"}},"spacing":{"padding":{"top":"1.6rem","bottom":"1.6rem","left":"clamp(1rem,2.5vw,2rem)","right":"clamp(1rem,2.5vw,2rem)"}}}} -->
  <div class="wp-block-column" style="border-right:1px solid var(--wp--preset--color--border);padding:1.6rem clamp(1rem,2.5vw,2rem)">
    <!-- wp:html --><span class="gaptec-stat-num">0.1W–1kW</span><span class="gaptec-stat-label">Power Range</span><!-- /wp:html -->
  </div>
  <!-- /wp:column -->

  <!-- wp:column {"style":{"border":{"right":{"color":"var:preset|color|border","width":"1px","style":"solid"}},"spacing":{"padding":{"top":"1.6rem","bottom":"1.6rem","left":"clamp(1rem,2.5vw,2rem)","right":"clamp(1rem,2.5vw,2rem)"}}}} -->
  <div class="wp-block-column" style="border-right:1px solid var(--wp--preset--color--border);padding:1.6rem clamp(1rem,2.5vw,2rem)">
    <!-- wp:html --><span class="gaptec-stat-num">7</span><span class="gaptec-stat-label">Certifications</span><!-- /wp:html -->
  </div>
  <!-- /wp:column -->

  <!-- wp:column {"style":{"border":{"right":{"color":"var:preset|color|border","width":"1px","style":"solid"}},"spacing":{"padding":{"top":"1.6rem","bottom":"1.6rem","left":"clamp(1rem,2.5vw,2rem)","right":"clamp(1rem,2.5vw,2rem)"}}}} -->
  <div class="wp-block-column" style="border-right:1px solid var(--wp--preset--color--border);padding:1.6rem clamp(1rem,2.5vw,2rem)">
    <!-- wp:html --><span class="gaptec-stat-num">2010</span><span class="gaptec-stat-label">Founded</span><!-- /wp:html -->
  </div>
  <!-- /wp:column -->

  <!-- wp:column {"style":{"spacing":{"padding":{"top":"1.6rem","bottom":"1.6rem","left":"clamp(1rem,2.5vw,2rem)","right":"clamp(1rem,2.5vw,2rem)"}}}} -->
  <div class="wp-block-column" style="padding:1.6rem clamp(1rem,2.5vw,2rem)">
    <!-- wp:html --><span class="gaptec-stat-num">Custom</span><span class="gaptec-stat-label">Design Service</span><!-- /wp:html -->
  </div>
  <!-- /wp:column -->

</div>
<!-- /wp:columns -->
