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
// WhatsApp Chat Widget
// ──────────────────────────────────────────────────────────────

add_action( 'wp_footer', function (): void { ?>
<div id="gaptec-wa">
  <div id="gaptec-wa-popup" hidden>
    <div class="gaptec-wa-header">
      <div class="gaptec-wa-header-icon">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="#fff" fill-opacity=".15"/>
          <path d="M18 6C11.373 6 6 11.373 6 18c0 2.09.548 4.05 1.504 5.748L6 30l6.44-1.487A11.94 11.94 0 0 0 18 30c6.627 0 12-5.373 12-12S24.627 6 18 6zm0 21.6a9.558 9.558 0 0 1-4.87-1.334l-.35-.207-3.624.837.872-3.52-.228-.362A9.566 9.566 0 0 1 8.4 18c0-5.29 4.31-9.6 9.6-9.6 5.29 0 9.6 4.31 9.6 9.6 0 5.29-4.31 9.6-9.6 9.6z" fill="#fff"/>
          <path d="M23.004 20.394c-.29-.145-1.713-.845-1.978-.941-.265-.097-.457-.145-.65.145-.192.29-.746.94-.914 1.133-.168.193-.337.217-.626.072-.29-.144-1.222-.45-2.328-1.438-.86-.768-1.44-1.716-1.61-2.006-.168-.29-.018-.447.127-.591.13-.13.29-.338.434-.507.145-.168.193-.29.29-.483.096-.193.048-.362-.024-.507-.073-.144-.65-1.567-.89-2.146-.234-.563-.472-.487-.65-.496l-.554-.01c-.193 0-.507.073-.772.362-.265.29-1.012.988-1.012 2.41 0 1.422 1.036 2.796 1.18 2.989.145.192 2.038 3.112 4.938 4.363.69.297 1.228.475 1.647.608.692.22 1.322.189 1.82.115.556-.083 1.713-.7 1.955-1.376.242-.675.242-1.254.169-1.375-.072-.12-.265-.193-.554-.338z" fill="#fff"/>
        </svg>
      </div>
      <div class="gaptec-wa-header-title">
        WhatsApp
        <div class="gaptec-wa-header-sub">Typically replies within minutes</div>
      </div>
      <button class="gaptec-wa-close" id="gaptec-wa-close" aria-label="<?php esc_attr_e( 'Close chat', 'gaptec' ); ?>">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="gaptec-wa-body">
      <div class="gaptec-wa-bubble"><?php esc_html_e( 'Hi, how can we help with your power needs?', 'gaptec' ); ?></div>
    </div>
    <div class="gaptec-wa-footer">
      <input type="text" class="gaptec-wa-input" id="gaptec-wa-input" placeholder="<?php esc_attr_e( 'Write your message…', 'gaptec' ); ?>" aria-label="<?php esc_attr_e( 'Message', 'gaptec' ); ?>">
      <a class="gaptec-wa-send" id="gaptec-wa-send" href="https://api.whatsapp.com/send/?phone=6567349393&type=phone_number" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Send on WhatsApp', 'gaptec' ); ?>">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
  </div>
  <button id="gaptec-wa-btn" aria-label="<?php esc_attr_e( 'Chat with us on WhatsApp', 'gaptec' ); ?>" aria-expanded="false">
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 1C7.268 1 1 7.268 1 15c0 2.43.638 4.71 1.752 6.688L1 29l7.54-1.74A13.94 13.94 0 0 0 15 29c7.732 0 14-6.268 14-14S22.732 1 15 1zm0 25.2a11.166 11.166 0 0 1-5.69-1.556l-.408-.242-4.228.978 1.017-4.107-.266-.422A11.163 11.163 0 0 1 3.8 15c0-6.18 5.02-11.2 11.2-11.2S26.2 8.82 26.2 15 21.18 26.2 15 26.2z" fill="#fff"/>
      <path d="M20.837 17.793c-.338-.169-2-.986-2.31-1.099-.31-.113-.534-.169-.759.169-.225.338-.87 1.098-1.067 1.322-.196.225-.393.253-.731.084-.338-.168-1.427-.526-2.717-1.678-1.004-.896-1.681-2.003-1.879-2.34-.197-.338-.021-.521.148-.69.153-.152.338-.394.507-.59.169-.197.225-.338.338-.564.113-.225.056-.422-.028-.59-.084-.17-.758-1.829-1.039-2.504-.273-.656-.55-.568-.758-.578l-.647-.012c-.225 0-.59.084-.9.422-.31.338-1.181 1.153-1.181 2.81 0 1.659 1.21 3.262 1.379 3.487.168.225 2.379 3.63 5.763 5.09.805.347 1.433.554 1.923.709.808.257 1.544.22 2.124.133.648-.097 2-.817 2.282-1.606.281-.788.281-1.463.197-1.605-.084-.141-.31-.225-.646-.394z" fill="#fff"/>
    </svg>
  </button>
</div>
<script>
(function () {
  var btn   = document.getElementById('gaptec-wa-btn');
  var popup = document.getElementById('gaptec-wa-popup');
  var close = document.getElementById('gaptec-wa-close');
  var input = document.getElementById('gaptec-wa-input');
  var send  = document.getElementById('gaptec-wa-send');

  function openPopup() {
    popup.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  function closePopup() {
    popup.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    popup.hidden ? openPopup() : closePopup();
  });

  close.addEventListener('click', closePopup);

  send.addEventListener('click', function () {
    var msg = input.value.trim();
    if (msg) {
      send.href = 'https://api.whatsapp.com/send/?phone=6567349393&text=' + encodeURIComponent(msg) + '&type=phone_number';
    }
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') send.click();
  });
})();
</script>
<?php }, 30 );

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
