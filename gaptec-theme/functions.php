<?php
/**
 * GAPTEC Theme – functions.php
 *
 * Sets up theme features, enqueues assets, and registers block patterns/categories.
 */

declare( strict_types = 1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GAPTEC_VERSION', '1.0.0' );
define( 'GAPTEC_DIR',     get_template_directory() );
define( 'GAPTEC_URI',     get_template_directory_uri() );

// ──────────────────────────────────────────────────────────────
// Theme Setup
// ──────────────────────────────────────────────────────────────

add_action( 'after_setup_theme', function (): void {

	load_theme_textdomain( 'gaptec', GAPTEC_DIR . '/languages' );

	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', [
		'comment-list',
		'comment-form',
		'search-form',
		'gallery',
		'caption',
		'style',
		'script',
	] );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo', [
		'height'               => 60,
		'width'                => 240,
		'flex-height'          => true,
		'flex-width'           => true,
		'unlink-homepage-logo' => true,
	] );

	add_editor_style( 'assets/css/editor-styles.css' );

	register_nav_menus( [
		'primary'  => __( 'Primary Navigation', 'gaptec' ),
		'footer'   => __( 'Footer Navigation', 'gaptec' ),
		'social'   => __( 'Social Links', 'gaptec' ),
	] );

	add_image_size( 'gaptec-hero',     1600, 700,  true );
	add_image_size( 'gaptec-card',     800,  400,  true );
	add_image_size( 'gaptec-thumb',    400,  300,  true );
	add_image_size( 'gaptec-portrait', 600,  800,  true );
} );

// ──────────────────────────────────────────────────────────────
// Enqueue Assets
// ──────────────────────────────────────────────────────────────

add_action( 'wp_enqueue_scripts', function (): void {

	// Google Fonts
	wp_enqueue_style(
		'gaptec-fonts',
		'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap',
		[],
		null
	);

	// Main stylesheet
	wp_enqueue_style(
		'gaptec-style',
		get_stylesheet_uri(),
		[ 'gaptec-fonts' ],
		GAPTEC_VERSION
	);

	// Theme script
	wp_enqueue_script(
		'gaptec-theme',
		GAPTEC_URI . '/assets/js/theme.js',
		[],
		GAPTEC_VERSION,
		[ 'strategy' => 'defer' ]
	);
} );

// ──────────────────────────────────────────────────────────────
// Block Pattern Categories
// ──────────────────────────────────────────────────────────────

add_action( 'init', function (): void {

	register_block_pattern_category( 'gaptec', [
		'label'       => __( 'GAPTEC', 'gaptec' ),
		'description' => __( 'Patterns for the GAPTEC Electronic website.', 'gaptec' ),
	] );

	register_block_pattern_category( 'gaptec-sections', [
		'label'       => __( 'GAPTEC Sections', 'gaptec' ),
		'description' => __( 'Full-width section patterns.', 'gaptec' ),
	] );

	register_block_pattern_category( 'gaptec-cards', [
		'label'       => __( 'GAPTEC Cards', 'gaptec' ),
		'description' => __( 'Card and grid patterns.', 'gaptec' ),
	] );
} );

// ──────────────────────────────────────────────────────────────
// Block Style Variations
// ──────────────────────────────────────────────────────────────

add_action( 'init', function (): void {

	// Buttons
	register_block_style( 'core/button', [
		'name'  => 'gaptec-outline',
		'label' => __( 'Outline', 'gaptec' ),
	] );

	register_block_style( 'core/button', [
		'name'  => 'gaptec-deep',
		'label' => __( 'Deep Green', 'gaptec' ),
	] );

	// Groups
	register_block_style( 'core/group', [
		'name'  => 'gaptec-card',
		'label' => __( 'Card', 'gaptec' ),
	] );

	register_block_style( 'core/group', [
		'name'  => 'gaptec-card-dark',
		'label' => __( 'Dark Card', 'gaptec' ),
	] );

	register_block_style( 'core/group', [
		'name'  => 'gaptec-grid-bg',
		'label' => __( 'Grid Background', 'gaptec' ),
	] );

	// Images
	register_block_style( 'core/image', [
		'name'  => 'gaptec-rounded',
		'label' => __( 'Rounded', 'gaptec' ),
	] );

	// Separators
	register_block_style( 'core/separator', [
		'name'  => 'gaptec-green',
		'label' => __( 'Green', 'gaptec' ),
	] );
} );

// ──────────────────────────────────────────────────────────────
// Excerpt length
// ──────────────────────────────────────────────────────────────

add_filter( 'excerpt_length', fn() => 25 );
add_filter( 'excerpt_more',   fn() => '…' );

// ──────────────────────────────────────────────────────────────
// Scroll-reveal observer script (inline, tiny)
// ──────────────────────────────────────────────────────────────

add_action( 'wp_footer', function (): void { ?>
<script>
(function(){
  var els = document.querySelectorAll('.gaptec-reveal');
  if (!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  els.forEach(function(el){ io.observe(el); });
})();
</script>
<?php }, 20 );

// ──────────────────────────────────────────────────────────────
// Custom block editor assets
// ──────────────────────────────────────────────────────────────

add_action( 'enqueue_block_editor_assets', function (): void {
	wp_enqueue_style(
		'gaptec-editor-fonts',
		'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500;600&display=swap',
		[],
		null
	);
} );
