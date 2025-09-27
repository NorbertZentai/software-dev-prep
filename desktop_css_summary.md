# Desktop CSS Differences Summary

## Overview
Comparison between local and origin/main versions of `docs/styles/main.css`, filtered for desktop (≥1024px) and base styles only.

## Key Desktop Layout Changes

### 1. **CSS Variables & Responsive Design System**
- **NEW**: Added fluid spacing variables using `clamp()` for responsive sizing
  - `--space-fluid-xs` through `--space-fluid-xl`
  - `--mobile-padding`, `--mobile-margin`
- **NEW**: Responsive typography scale with `clamp()` functions
  - `--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-body`, `--fs-small`, `--fs-code`
- **NEW**: Line height system (`--lh-tight`, `--lh-normal`, `--lh-relaxed`)
- **NEW**: Layout variables for theory pages
  - `--theory-drawer-width`, `--theory-drawer-max-width`, `--mobile-tap-target`
- **NEW**: Breakpoint reference variables (`--bp-mobile`, `--bp-tablet`, `--bp-desktop`)

### 2. **Grid Layout & Positioning Changes**
- **MODIFIED**: Theory layout completely restructured from fixed positioning to CSS Grid
  - **Before**: Fixed positioned `#theory-sidebar` and `#theory-content` with absolute coordinates
  - **After**: `#app.theory-layout` uses CSS Grid (`grid-template-columns: 280px 1fr`)
- **NEW**: Theory drawer (`.theory-drawer`) uses `position: sticky` instead of fixed
- **NEW**: Theory content (`.theory-content`) no longer uses fixed positioning
- **NEW**: Max-width container (`max-width: 1400px`) for theory layout

### 3. **Sticky Positioning & Z-Index Updates**
- **MODIFIED**: Theory drawer positioning changed from `position: fixed` to `position: sticky`
  - **Before**: `position: fixed; top: calc(var(--header-height) + var(--space-md)); left: calc(...)`
  - **After**: `position: sticky; top: calc(var(--header-height) + var(--space-lg))`
- **MODIFIED**: Theory content no longer uses fixed positioning
- **MAINTAINED**: Z-index hierarchy (theory drawer: `z-index: 10`)

### 4. **Width & Sizing Changes**
- **NEW**: Consistent use of fluid spacing variables throughout
- **MODIFIED**: Theory drawer uses `height: fit-content` with `max-height` constraints
- **NEW**: Minimum tap target size (`--mobile-tap-target: 44px`) for interactive elements
- **IMPROVED**: Better responsive text sizing with `clamp()` functions

### 5. **Typography Improvements**
- **REPLACED**: Static font sizes with responsive `clamp()` based sizing
- **NEW**: Consistent line-height system using CSS custom properties
- **IMPROVED**: Better word-breaking and overflow handling for code blocks
- **NEW**: Scroll hints for code blocks (pseudo-elements with gradients)

### 6. **Enhanced Interactive Elements**
- **IMPROVED**: TOC links now have minimum tap target sizes
- **NEW**: Better focus states with box-shadows
- **IMPROVED**: Concept read toggles use responsive sizing
- **NEW**: Touch-action optimization for better mobile performance

### 7. **Content Container Updates**
- **IMPROVED**: Tables now use responsive wrapper with horizontal scrolling
- **NEW**: Better handling of media elements (images, iframes, videos)
- **IMPROVED**: Code blocks have better overflow handling and scroll hints
- **NEW**: Responsive padding and margins using fluid spacing

## Desktop-Specific Improvements

### Grid System
The most significant change is the move from fixed positioning to CSS Grid for theory pages:
- More flexible and maintainable layout
- Better responsive behavior
- Eliminates complex positioning calculations

### Sticky Positioning
Theory drawer now uses sticky positioning, which:
- Provides better scrolling behavior
- Eliminates viewport calculation issues
- Works better with different screen sizes

### Responsive Typography
Introduction of fluid typography using `clamp()`:
- Scales smoothly between breakpoints
- Reduces need for media query overrides
- Maintains readability across device sizes

## Impact on Desktop Layout (≥1024px)
- **Positive**: More maintainable grid-based layout system
- **Positive**: Better responsive behavior without breaking desktop experience
- **Positive**: Improved typography scaling and readability
- **Neutral**: Z-index hierarchy maintained for proper layering
- **Positive**: Better performance with CSS Grid vs. complex fixed positioning

## Files Affected
- `docs/styles/main.css` - Complete restructuring of theory page layout system