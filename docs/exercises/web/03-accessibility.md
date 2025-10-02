---
title: "Web Accessibility (WCAG) implementálás"
difficulty: intermediate
goals: ["WCAG guidelines", "Semantic HTML", "ARIA attributes", "Keyboard navigation", "Screen reader compatibility"]
estimatedMinutes: 40
starter: {
  "stackblitz": "https://stackblitz.com/edit/web-accessibility-demo?file=index.html",
  "codesandbox": "https://codesandbox.io/s/accessibility-practice",
  "dbfiddle": ""
}
---

# Web Accessibility (WCAG) Implementálás

## Feladat leírása

Fejlessz ki egy teljes mértékben accessible web alkalmazást, amely megfelel a WCAG 2.1 AA szint követelményeinek. Az alkalmazás egy könyvtári katalógus lesz, keresési funkcióval, szűrőkkel és részletes könyv információkkal.

## WCAG 2.1 Alapelvek

### 1. Perceivable (Észlelhető)
- Alternatív szöveg minden képhez
- Megfelelő színkontraszt
- Szöveg méretezhetősége
- Multimédia alternatívák

### 2. Operable (Használható)
- Keyboard navigation
- No seizure-inducing content
- Sufficient time limits
- Clear navigation

### 3. Understandable (Érthető)
- Readable text
- Predictable functionality
- Input assistance

### 4. Robust (Robusztus)
- Compatible with assistive technologies
- Valid, semantic markup

## Projekt struktúra

```
accessible-library/
├── index.html
├── css/
│   ├── styles.css
│   ├── high-contrast.css
│   └── print.css
├── js/
│   ├── main.js
│   ├── accessibility.js
│   ├── keyboard-navigation.js
│   └── screen-reader.js
├── images/
│   └── book-covers/
└── data/
    └── books.json
```

## Feladat 1: Semantic HTML Structure

### Proper Document Structure

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Library - Könyvtári Katalógus</title>
    <meta name="description" content="Kereshető könyvtári katalógus akadálymentességi funkcióval">

    <!-- Skip Links -->
    <style>
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
        }
        .skip-link:focus {
            top: 6px;
        }
    </style>

    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/high-contrast.css" media="(prefers-contrast: high)">
    <link rel="stylesheet" href="css/print.css" media="print">
</head>
<body>
    <!-- Skip Navigation Links -->
    <nav aria-label="Skip links">
        <a href="#main-content" class="skip-link">Ugrás a fő tartalomhoz</a>
        <a href="#search-form" class="skip-link">Ugrás a keresőhöz</a>
        <a href="#filters" class="skip-link">Ugrás a szűrőkhöz</a>
    </nav>

    <!-- Main Header -->
    <header role="banner">
        <div class="container">
            <h1>
                <img src="images/logo.svg" alt="Könyvtár Logo" width="40" height="40">
                Accessible Library
            </h1>

            <!-- Accessibility Controls -->
            <div class="accessibility-controls" role="toolbar" aria-label="Accessibility controls">
                <button type="button" id="font-size-toggle" aria-label="Betűméret növelése">
                    <span aria-hidden="true">A+</span>
                </button>
                <button type="button" id="contrast-toggle" aria-label="Kontrasztos mód kapcsolása">
                    <span aria-hidden="true">🎨</span>
                </button>
                <button type="button" id="focus-toggle" aria-label="Focus indikátor erősítése">
                    <span aria-hidden="true">🔍</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Navigation -->
    <nav role="navigation" aria-label="Főmenü">
        <ul class="main-nav">
            <li><a href="#" aria-current="page">Katalógus</a></li>
            <li><a href="#">Új beszerzések</a></li>
            <li><a href="#">Népszerű könyvek</a></li>
            <li><a href="#">Ajánlások</a></li>
        </ul>
    </nav>

    <!-- Main Content -->
    <main id="main-content" role="main">
        <div class="container">
            <!-- Page Heading -->
            <header class="page-header">
                <h2>Könyvkatalógus</h2>
                <p>Keress és böngészd könyvtárunk gyűjteményét</p>
            </header>

            <!-- Search Section -->
            <section class="search-section" aria-labelledby="search-heading">
                <h3 id="search-heading" class="visually-hidden">Keresés</h3>

                <form id="search-form" role="search" aria-label="Könyvkeresés">
                    <div class="search-container">
                        <label for="search-input" class="search-label">
                            Keresés címre, szerzőre vagy ISBN-re
                        </label>
                        <div class="search-input-container">
                            <input
                                type="search"
                                id="search-input"
                                name="search"
                                placeholder="Pl: Java programozás, Tolkien, 978-0-123456-78-9"
                                aria-describedby="search-help search-results-summary"
                                autocomplete="off"
                            >
                            <button type="submit" aria-label="Keresés indítása">
                                <span aria-hidden="true">🔍</span>
                            </button>
                        </div>
                        <div id="search-help" class="help-text">
                            Használhatsz kulcsszavakat, teljes címet vagy szerzőnevet
                        </div>
                    </div>
                </form>
            </section>

            <!-- Filters Section -->
            <section class="filters-section" aria-labelledby="filters-heading">
                <h3 id="filters-heading">Szűrők</h3>

                <div id="filters" class="filters-container" role="group" aria-label="Könyvszűrők">
                    <!-- Category Filter -->
                    <fieldset class="filter-group">
                        <legend>Kategória</legend>
                        <div class="checkbox-group" role="group" aria-labelledby="category-legend">
                            <input type="checkbox" id="fiction" name="category" value="fiction">
                            <label for="fiction">Szépirodalom</label>

                            <input type="checkbox" id="non-fiction" name="category" value="non-fiction">
                            <label for="non-fiction">Szakkönyv</label>

                            <input type="checkbox" id="science" name="category" value="science">
                            <label for="science">Természettudomány</label>

                            <input type="checkbox" id="technology" name="category" value="technology">
                            <label for="technology">Technológia</label>
                        </div>
                    </fieldset>

                    <!-- Availability Filter -->
                    <fieldset class="filter-group">
                        <legend>Elérhetőség</legend>
                        <div class="radio-group" role="radiogroup" aria-labelledby="availability-legend">
                            <input type="radio" id="all-books" name="availability" value="all" checked>
                            <label for="all-books">Minden könyv</label>

                            <input type="radio" id="available-only" name="availability" value="available">
                            <label for="available-only">Csak elérhető</label>

                            <input type="radio" id="digital-only" name="availability" value="digital">
                            <label for="digital-only">Csak digitális</label>
                        </div>
                    </fieldset>

                    <!-- Sort Options -->
                    <div class="filter-group">
                        <label for="sort-select">Rendezés</label>
                        <select id="sort-select" name="sort" aria-describedby="sort-help">
                            <option value="relevance">Relevancia szerint</option>
                            <option value="title-asc">Cím (A-Z)</option>
                            <option value="title-desc">Cím (Z-A)</option>
                            <option value="author-asc">Szerző (A-Z)</option>
                            <option value="publication-desc">Legújabb előbb</option>
                            <option value="popularity">Népszerűség szerint</option>
                        </select>
                        <div id="sort-help" class="help-text">
                            Válaszd ki a könyvek megjelenési sorrendjét
                        </div>
                    </div>
                </div>
            </section>

            <!-- Search Results -->
            <section class="results-section" aria-labelledby="results-heading">
                <header class="results-header">
                    <h3 id="results-heading">Keresési eredmények</h3>
                    <div id="search-results-summary" aria-live="polite" aria-atomic="true">
                        <!-- Dynamic search results count -->
                    </div>
                </header>

                <!-- Results Grid -->
                <div id="books-grid" class="books-grid" role="region" aria-label="Könyvek listája">
                    <!-- Dynamic book cards will be inserted here -->
                </div>

                <!-- Load More Button -->
                <div class="load-more-container">
                    <button
                        type="button"
                        id="load-more-btn"
                        class="load-more-btn"
                        aria-describedby="load-more-help"
                    >
                        További könyvek betöltése
                    </button>
                    <div id="load-more-help" class="visually-hidden">
                        Nyomj Entert vagy szóközt a további könyvek betöltéséhez
                    </div>
                </div>
            </section>
        </div>
    </main>

    <!-- Book Details Modal -->
    <div
        id="book-modal"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        aria-hidden="true"
    >
        <div class="modal-backdrop" aria-hidden="true"></div>
        <div class="modal-content">
            <header class="modal-header">
                <h2 id="modal-title"><!-- Book title --></h2>
                <button
                    type="button"
                    class="modal-close"
                    aria-label="Modal bezárása"
                    data-close-modal
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </header>
            <div id="modal-description" class="modal-body">
                <!-- Book details content -->
            </div>
        </div>
    </div>

    <footer role="contentinfo">
        <div class="container">
            <p>&copy; 2024 Accessible Library. Minden jog fenntartva.</p>
            <nav aria-label="Footer links">
                <ul>
                    <li><a href="#">Adatvédelem</a></li>
                    <li><a href="#">Akadálymentességi nyilatkozat</a></li>
                    <li><a href="#">Kapcsolat</a></li>
                </ul>
            </nav>
        </div>
    </footer>

    <script src="js/example-main.js"></script>
    <script src="js/example-accessibility.js"></script>
    <script src="js/example-keyboard-navigation.js"></script>
</body>
</html>
```

## Feladat 2: ARIA Attributes és Screen Reader Support

### Book Card Component with ARIA

```html
<!-- Book Card Template -->
<article class="book-card" role="article" aria-labelledby="book-title-123">
    <div class="book-cover">
        <img
            src="images/book-covers/java-programming.jpg"
            alt="Java Programming könyv borítója - kék háttér, kódsorok grafikai elemekkel"
            loading="lazy"
            width="150"
            height="200"
        >
        <div class="availability-badge" aria-label="Könyv elérhetősége">
            <span class="status available" aria-label="Elérhető">✓</span>
        </div>
    </div>

    <div class="book-info">
        <h4 id="book-title-123" class="book-title">
            <a href="#" data-book-id="123" aria-describedby="book-author-123">
                Effective Java: Programming Language Guide
            </a>
        </h4>

        <p id="book-author-123" class="book-author" aria-label="Szerző">
            <span aria-hidden="true">👤</span> Joshua Bloch
        </p>

        <div class="book-meta" aria-label="Könyv információk">
            <span class="publication-year" aria-label="Kiadás éve">
                <span aria-hidden="true">📅</span> 2017
            </span>
            <span class="isbn" aria-label="ISBN szám">
                <span aria-hidden="true">📖</span> 978-0-134-68599-1
            </span>
        </div>

        <div class="book-rating" role="img" aria-label="5 csillagból 4.5 csillag értékelés">
            <span class="stars" aria-hidden="true">
                ★★★★☆
            </span>
            <span class="rating-text">4.5/5 (247 értékelés)</span>
        </div>

        <p class="book-description">
            A Java programozási nyelv használatára vonatkozó legjobb gyakorlatok
            és design pattern-ek részletes bemutatása...
        </p>

        <div class="book-actions">
            <button
                type="button"
                class="btn-primary"
                data-action="reserve"
                data-book-id="123"
                aria-describedby="reserve-help-123"
            >
                Könyv foglalása
            </button>
            <div id="reserve-help-123" class="visually-hidden">
                Effective Java könyv foglalása a könyvtárban
            </div>

            <button
                type="button"
                class="btn-secondary"
                data-action="details"
                data-book-id="123"
                aria-describedby="details-help-123"
            >
                Részletek
            </button>
            <div id="details-help-123" class="visually-hidden">
                Effective Java könyv részletes információinak megjelenítése
            </div>
        </div>
    </div>
</article>
```

### Dynamic ARIA Live Regions

```javascript
// js/accessibility.js
class AccessibilityManager {
    constructor() {
        this.setupLiveRegions();
        this.setupKeyboardTraps();
        this.setupFocusManagement();
        this.setupAccessibilityControls();
    }

    setupLiveRegions() {
        // Create live regions for dynamic content
        this.createLiveRegion('search-status', 'polite');
        this.createLiveRegion('filter-status', 'polite');
        this.createLiveRegion('loading-status', 'assertive');
    }

    createLiveRegion(id, politeness) {
        if (document.getElementById(id)) return;

        const liveRegion = document.createElement('div');
        liveRegion.id = id;
        liveRegion.setAttribute('aria-live', politeness);
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message, type = 'polite') {
        const liveRegionId = type === 'assertive' ? 'loading-status' : 'search-status';
        const liveRegion = document.getElementById(liveRegionId);

        if (liveRegion) {
            liveRegion.textContent = message;

            // Clear the message after a short delay to allow for re-announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Focus management for dynamic content
    manageFocus(element, options = {}) {
        const {
            scroll = true,
            preventScroll = false,
            announceChange = true
        } = options;

        if (element && typeof element.focus === 'function') {
            element.focus({ preventScroll });

            if (announceChange) {
                const label = element.getAttribute('aria-label') ||
                             element.textContent ||
                             'Element focused';
                this.announceToScreenReader(`Focus moved to: ${label}`);
            }
        }
    }

    // Keyboard trap for modals
    setupKeyboardTraps() {
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.modal[aria-hidden="false"]');
            if (modal && e.key === 'Tab') {
                this.trapFocusInModal(e, modal);
            }
        });
    }

    trapFocusInModal(event, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    // Enhanced accessibility controls
    setupAccessibilityControls() {
        // Font size control
        const fontSizeToggle = document.getElementById('font-size-toggle');
        let currentFontSize = 1;

        fontSizeToggle?.addEventListener('click', () => {
            currentFontSize = currentFontSize >= 1.5 ? 1 : currentFontSize + 0.1;
            document.documentElement.style.fontSize = `${currentFontSize}rem`;

            const percentage = Math.round(currentFontSize * 100);
            this.announceToScreenReader(`Font size changed to ${percentage}%`);

            // Update button label
            fontSizeToggle.setAttribute('aria-label',
                `Betűméret: ${percentage}%. Kattints a további növeléshez`);
        });

        // High contrast mode
        const contrastToggle = document.getElementById('contrast-toggle');
        contrastToggle?.addEventListener('click', () => {
            const isHighContrast = document.body.classList.toggle('high-contrast');
            this.announceToScreenReader(
                isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled'
            );

            contrastToggle.setAttribute('aria-label',
                isHighContrast ? 'Normál kontrasztú mód bekapcsolása' : 'Kontrasztos mód bekapcsolása');
        });

        // Enhanced focus indicators
        const focusToggle = document.getElementById('focus-toggle');
        focusToggle?.addEventListener('click', () => {
            const isEnhanced = document.body.classList.toggle('enhanced-focus');
            this.announceToScreenReader(
                isEnhanced ? 'Enhanced focus indicators enabled' : 'Enhanced focus indicators disabled'
            );
        });
    }

    // Form validation with accessible error messages
    validateFormAccessibly(form) {
        const errors = {};
        let firstErrorElement = null;

        // Clear previous errors
        form.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('[aria-invalid="true"]').forEach(input => {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedby');
        });

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const label = form.querySelector(`label[for="${field.id}"]`)?.textContent || field.name;
                const errorMessage = `${label} kitöltése kötelező`;

                this.addErrorToField(field, errorMessage);
                errors[field.name] = errorMessage;

                if (!firstErrorElement) {
                    firstErrorElement = field;
                }
            }
        });

        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.isValidEmail(field.value)) {
                const errorMessage = 'Kérjük, adjon meg érvényes email címet';
                this.addErrorToField(field, errorMessage);
                errors[field.name] = errorMessage;

                if (!firstErrorElement) {
                    firstErrorElement = field;
                }
            }
        });

        // If there are errors, announce and focus first error
        if (Object.keys(errors).length > 0) {
            const errorCount = Object.keys(errors).length;
            this.announceToScreenReader(
                `Form validation failed. ${errorCount} error${errorCount > 1 ? 's' : ''} found.`,
                'assertive'
            );

            if (firstErrorElement) {
                firstErrorElement.focus();
            }

            return false;
        }

        return true;
    }

    addErrorToField(field, message) {
        field.setAttribute('aria-invalid', 'true');

        const errorId = `error-${field.id || field.name}`;
        const existingErrorId = field.getAttribute('aria-describedby') || '';

        field.setAttribute('aria-describedby', `${existingErrorId} ${errorId}`.trim());

        const errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');

        field.parentNode.appendChild(errorElement);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize accessibility manager
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});
```

## Feladat 3: Keyboard Navigation

### Advanced Keyboard Navigation

```javascript
// js/keyboard-navigation.js
class KeyboardNavigationManager {
    constructor() {
        this.currentFocusIndex = -1;
        this.focusableElements = [];
        this.setupKeyboardNavigation();
        this.setupCustomKeyboardShortcuts();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        // Update focusable elements when content changes
        const observer = new MutationObserver(() => {
            this.updateFocusableElements();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.updateFocusableElements();
    }

    updateFocusableElements() {
        this.focusableElements = Array.from(document.querySelectorAll(
            'button:not([disabled]), ' +
            '[href], ' +
            'input:not([disabled]), ' +
            'select:not([disabled]), ' +
            'textarea:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"]):not([disabled]), ' +
            'details summary'
        )).filter(element => {
            return this.isElementVisible(element) &&
                   this.isElementInTabOrder(element);
        });
    }

    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        return rect.width > 0 &&
               rect.height > 0 &&
               style.visibility !== 'hidden' &&
               style.display !== 'none';
    }

    isElementInTabOrder(element) {
        const tabIndex = element.getAttribute('tabindex');
        return tabIndex !== '-1';
    }

    handleKeyDown(event) {
        const { key, ctrlKey, altKey, shiftKey } = event;

        // Handle modal keyboard navigation
        if (this.isModalOpen()) {
            this.handleModalKeyboard(event);
            return;
        }

        // Grid navigation for book results
        if (this.isInBookGrid(event.target)) {
            this.handleGridNavigation(event);
            return;
        }

        // Custom keyboard shortcuts
        if (ctrlKey || altKey) {
            this.handleKeyboardShortcuts(event);
        }

        // Tab navigation enhancement
        if (key === 'Tab') {
            this.enhanceTabNavigation(event);
        }
    }

    // Grid navigation (arrow keys for book grid)
    handleGridNavigation(event) {
        const bookGrid = document.getElementById('books-grid');
        const bookCards = Array.from(bookGrid.querySelectorAll('.book-card'));
        const currentCard = event.target.closest('.book-card');
        const currentIndex = bookCards.indexOf(currentCard);

        if (currentIndex === -1) return;

        let targetIndex;
        const gridColumns = this.getGridColumns(bookGrid);

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                targetIndex = currentIndex > 0 ? currentIndex - 1 : bookCards.length - 1;
                break;

            case 'ArrowRight':
                event.preventDefault();
                targetIndex = currentIndex < bookCards.length - 1 ? currentIndex + 1 : 0;
                break;

            case 'ArrowUp':
                event.preventDefault();
                targetIndex = currentIndex - gridColumns;
                if (targetIndex < 0) {
                    targetIndex = Math.floor((bookCards.length - 1) / gridColumns) * gridColumns +
                                  (currentIndex % gridColumns);
                    if (targetIndex >= bookCards.length) {
                        targetIndex -= gridColumns;
                    }
                }
                break;

            case 'ArrowDown':
                event.preventDefault();
                targetIndex = currentIndex + gridColumns;
                if (targetIndex >= bookCards.length) {
                    targetIndex = currentIndex % gridColumns;
                }
                break;

            case 'Home':
                event.preventDefault();
                targetIndex = 0;
                break;

            case 'End':
                event.preventDefault();
                targetIndex = bookCards.length - 1;
                break;

            default:
                return;
        }

        const targetCard = bookCards[targetIndex];
        if (targetCard) {
            const focusableElement = targetCard.querySelector('a, button') || targetCard;
            focusableElement.focus();

            window.accessibilityManager.announceToScreenReader(
                `Navigated to book ${targetIndex + 1} of ${bookCards.length}`
            );
        }
    }

    getGridColumns(grid) {
        const gridStyle = window.getComputedStyle(grid);
        const gridTemplateColumns = gridStyle.gridTemplateColumns;

        if (gridTemplateColumns !== 'none') {
            return gridTemplateColumns.split(' ').length;
        }

        // Fallback: calculate based on grid width and card width
        const gridWidth = grid.offsetWidth;
        const firstCard = grid.querySelector('.book-card');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(gridStyle.gap) || 0;
            return Math.floor((gridWidth + gap) / (cardWidth + gap));
        }

        return 3; // Default fallback
    }

    isInBookGrid(element) {
        return element.closest('#books-grid') !== null;
    }

    isModalOpen() {
        return document.querySelector('.modal[aria-hidden="false"]') !== null;
    }

    handleModalKeyboard(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeModal();
        }
    }

    setupCustomKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.matches('input, textarea, select')) return;

            // Custom shortcuts
            const shortcuts = {
                '/': () => {
                    e.preventDefault();
                    const searchInput = document.getElementById('search-input');
                    searchInput?.focus();
                    window.accessibilityManager.announceToScreenReader('Search field focused');
                },

                'f': () => {
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        const searchInput = document.getElementById('search-input');
                        searchInput?.focus();
                    }
                },

                'Escape': () => {
                    // Clear search or close any open dialogs
                    const searchInput = document.getElementById('search-input');
                    if (searchInput && searchInput.value) {
                        searchInput.value = '';
                        searchInput.dispatchEvent(new Event('input'));
                        window.accessibilityManager.announceToScreenReader('Search cleared');
                    }
                },

                '?': () => {
                    e.preventDefault();
                    this.showKeyboardShortcutsHelp();
                }
            };

            const shortcut = shortcuts[e.key];
            if (shortcut) {
                shortcut();
            }
        });
    }

    showKeyboardShortcutsHelp() {
        const helpContent = `
            <h3>Keyboard Shortcuts</h3>
            <dl>
                <dt>/</dt>
                <dd>Focus search field</dd>

                <dt>Ctrl+F</dt>
                <dd>Focus search field</dd>

                <dt>Tab / Shift+Tab</dt>
                <dd>Navigate between elements</dd>

                <dt>Arrow Keys</dt>
                <dd>Navigate book grid</dd>

                <dt>Enter / Space</dt>
                <dd>Activate buttons and links</dd>

                <dt>Escape</dt>
                <dd>Close modal or clear search</dd>

                <dt>Home / End</dt>
                <dd>Jump to first/last item in grid</dd>

                <dt>?</dt>
                <dd>Show this help</dd>
            </dl>
        `;

        this.showModal('Keyboard Navigation Help', helpContent);
    }

    enhanceTabNavigation(event) {
        // Add visual indicator for tab navigation
        document.body.classList.add('using-keyboard');

        // Remove class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        }, { once: true });
    }

    showModal(title, content) {
        const modal = document.getElementById('book-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        modalTitle.textContent = title;
        modalDescription.innerHTML = content;

        modal.setAttribute('aria-hidden', 'false');
        modal.style.display = 'flex';

        // Focus the modal
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        } else {
            modal.querySelector('.modal-close').focus();
        }
    }

    closeModal() {
        const modal = document.getElementById('book-modal');
        modal.setAttribute('aria-hidden', 'true');
        modal.style.display = 'none';

        // Return focus to the element that opened the modal
        if (this.modalTrigger) {
            this.modalTrigger.focus();
            this.modalTrigger = null;
        }
    }
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    window.keyboardManager = new KeyboardNavigationManager();
});
```

## Feladat 4: CSS Accessibility Features

### High Contrast and Responsive Design

```css
/* css/styles.css */

/* Base accessibility styles */
:root {
    --color-primary: #2563eb;
    --color-primary-dark: #1d4ed8;
    --color-text: #374151;
    --color-text-light: #6b7280;
    --color-background: #ffffff;
    --color-background-alt: #f9fafb;
    --color-border: #e5e7eb;
    --color-error: #dc2626;
    --color-success: #059669;

    /* Focus ring */
    --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.5);
    --focus-ring-dark: 0 0 0 3px rgba(147, 197, 253, 0.8);
}

/* Visually hidden utility */
.visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}

/* Skip links */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--color-text);
    color: var(--color-background);
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    font-weight: 600;
}

.skip-link:focus {
    top: 6px;
    box-shadow: var(--focus-ring);
}

/* Focus management */
*:focus {
    outline: none;
    box-shadow: var(--focus-ring);
}

/* Enhanced focus for keyboard users */
.using-keyboard *:focus,
.enhanced-focus *:focus {
    box-shadow: var(--focus-ring), 0 0 0 6px rgba(59, 130, 246, 0.2);
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
    :root {
        --color-primary: #000000;
        --color-text: #000000;
        --color-background: #ffffff;
        --color-border: #000000;
    }
}

.high-contrast {
    --color-primary: #000000 !important;
    --color-primary-dark: #000000 !important;
    --color-text: #000000 !important;
    --color-text-light: #000000 !important;
    --color-background: #ffffff !important;
    --color-background-alt: #ffffff !important;
    --color-border: #000000 !important;
    --focus-ring: 0 0 0 3px #000000 !important;
}

.high-contrast .book-card {
    border: 2px solid #000000 !important;
}

.high-contrast button {
    border: 2px solid #000000 !important;
    background: #ffffff !important;
    color: #000000 !important;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Large text support */
@media (min-width: 1200px) {
    html.large-text {
        font-size: 1.25rem;
    }
}

/* Error states */
[aria-invalid="true"] {
    border-color: var(--color-error) !important;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.error-message {
    color: var(--color-error);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.error-message::before {
    content: "⚠";
    flex-shrink: 0;
}

/* Loading states */
[aria-busy="true"] {
    position: relative;
    pointer-events: none;
}

[aria-busy="true"]::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Book grid accessibility */
.books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem 0;
}

.book-card {
    position: relative;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 1rem;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.book-card:hover,
.book-card:focus-within {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

/* Modal accessibility */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
}

.modal[aria-hidden="false"] {
    display: flex;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: relative;
    background: var(--color-background);
    border-radius: 8px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Print styles */
@media print {
    .accessibility-controls,
    .filters-section,
    .load-more-container {
        display: none !important;
    }

    .book-card {
        break-inside: avoid;
        border: 1px solid #000 !important;
        margin-bottom: 1rem;
    }
}
```

## Ellenőrző lista

- [ ] Semantic HTML5 elements használata
- [ ] Proper heading hierarchy (h1-h6)
- [ ] ARIA labels és descriptions minden interactive elemhez
- [ ] Keyboard navigation minden funkcióhoz
- [ ] Screen reader compatible content
- [ ] Color contrast minimum 4.5:1 ratio
- [ ] Focus indicators clearly visible
- [ ] Error messages accessible és descriptive
- [ ] Skip navigation links implemented
- [ ] Live regions for dynamic content
- [ ] Modal dialog trap focus properly
- [ ] Form validation accessible
- [ ] Alternative text for all images
- [ ] Responsive design mobile-friendly

## Testing Tools

### Automated Testing
```bash
# Install accessibility testing tools
npm install -g axe-core pa11y lighthouse

# Run automated accessibility tests
pa11y http://localhost:3000
axe http://localhost:3000
lighthouse http://localhost:3000 --only-categories=accessibility
```

### Manual Testing Checklist
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check with browser zoom at 200%
- [ ] Verify in high contrast mode
- [ ] Test with reduced motion settings
- [ ] Validate HTML markup
- [ ] Check color contrast with tools

## Következő lépések

- WCAG 2.1 AAA szint megfelelés
- Voice control támogatás
- Advanced ARIA patterns (combobox, treegrid)
- Automated accessibility testing CI/CD-be
- User testing valós fogyatékossággal élő felhasználókkal
