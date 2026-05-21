# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A WordPress **Full Site Editing (FSE) block theme** called **GAPTEC** for GAPTEC Electronic GmbH. It requires WordPress 6.4+, PHP 8.0+, and runs in a standard WordPress installation. There is no build step — all assets are plain PHP, CSS, HTML, and vanilla JS.

## Development

This theme is developed and tested inside a WordPress installation. To work on it:

- Drop the `gaptec-theme/` directory into `wp-content/themes/` of a local WordPress install (Local, Lando, or plain LAMP/LEMP).
- Activate the theme via **Appearance → Themes**.
- Templates and template parts are edited live in **Appearance → Editor** (Site Editor) or by editing the HTML files directly.
- PHP changes take effect immediately (no cache needed in development, though you may need to flush object/page cache on staging).

There is no npm/composer setup — no `package.json`, no `composer.json`.

## Architecture

```
gaptec-theme/
├── style.css            # Theme header + all frontend CSS (no preprocessor)
├── functions.php        # Theme setup, asset enqueuing, block patterns/styles, scroll-reveal inline script
├── theme.json           # Design tokens (colors, typography, spacing, shadows, block styles)
├── assets/
│   ├── css/editor-styles.css   # Block editor overrides
│   └── js/theme.js             # Minimal JS: IntersectionObserver scroll-reveal + sticky header shadow
├── templates/           # FSE page templates (HTML block markup)
├── parts/               # FSE template parts: header, footer, sidebar (HTML block markup)
└── patterns/            # Reusable block patterns: hero, stats-bar, cta-banner, feature-grid, testimonial
```

### Design Token Layer (`theme.json`)

All colors, fonts, spacing, and shadows are defined in `theme.json` and consumed as CSS custom properties (`--wp--preset--color--green`, `--wp--preset--font-family--barlow-condensed`, etc.). Do not hardcode these values in `style.css` — reference the preset variables instead.

Primary brand palette: `green` (#5cb800), `green-dark`, `green-deep`, `green-light`. Typography: **Barlow Condensed** (headings, buttons, labels — condensed, uppercase) and **Barlow** (body text).

### CSS Utility Classes (`style.css`)

Custom utility classes used across patterns and templates:
- `.gaptec-eyebrow` — small green label with a leading line
- `.gaptec-badge` — small tag/cert badge
- `.gaptec-card` / `.gaptec-card--dark` — card component (also registered as block style variations on `core/group`)
- `.gaptec-grid-bg` / `.gaptec-grid-bg--white` — subtle grid background pattern
- `.gaptec-reveal` — scroll-reveal element (toggled to `.is-visible` by IntersectionObserver in both `functions.php` footer script and `assets/js/theme.js`)
- `.gaptec-hide-mobile` / `.gaptec-hide-desktop` — responsive visibility helpers
- `.gaptec-stat-num` / `.gaptec-stat-label` — statistics display

### Block Style Variations (`functions.php`)

Registered on standard core blocks:
- `core/button`: `gaptec-outline`, `gaptec-deep`
- `core/group`: `gaptec-card`, `gaptec-card-dark`, `gaptec-grid-bg`
- `core/image`: `gaptec-rounded`
- `core/separator`: `gaptec-green`

### Block Patterns

Five patterns registered under the `gaptec` and `gaptec-sections` categories, located in `patterns/`: `hero`, `stats-bar`, `cta-banner`, `feature-grid`, `testimonial`. These are PHP files that output block HTML markup using `register_block_pattern()`.

### Navigation Menus

Three menus registered: `primary`, `footer`, `social`. Assign via **Appearance → Menus** or the Site Editor.

### Image Sizes

Custom sizes registered: `gaptec-hero` (1600×700 hard crop), `gaptec-card` (800×400), `gaptec-thumb` (400×300), `gaptec-portrait` (600×800).
