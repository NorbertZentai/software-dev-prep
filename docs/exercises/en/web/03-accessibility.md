---
title: "Web Accessibility (WCAG) Implementation"
difficulty: intermediate
goals: 
  - "WCAG guidelines"
  - "Semantic HTML" 
  - "ARIA attributes"
  - "Keyboard navigation"
  - "Screen reader compatibility"
estimatedMinutes: 40
starter:
  stackblitz: "https://stackblitz.com/edit/web-accessibility-demo?file=index.html"
  codesandbox: "https://codesandbox.io/s/accessibility-practice"
  dbfiddle: ""
---

# Web Accessibility (WCAG) Implementation

## Task Description

Develop a fully accessible web application that meets WCAG 2.1 AA level requirements.

## WCAG 2.1 Principles

### 1. Perceivable
- Alternative text for all images
- Adequate color contrast
- Text scalability

### 2. Operable  
- Keyboard navigation
- Clear navigation

### 3. Understandable
- Readable text
- Predictable functionality

### 4. Robust
- Compatible with assistive technologies
- Valid, semantic markup

## Project Structure

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

## Task 1: Semantic HTML Structure

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Library - Library Catalog</title>
    <meta name="description" content="Searchable library catalog with accessibility features">
</head>
<body>
    <!-- Skip Navigation Links -->
    <nav aria-label="Skip links">
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <a href="#search-form" class="skip-link">Skip to search</a>
    </nav>

    <!-- Main Header -->
    <header role="banner">
        <h1>Accessible Library</h1>
    </header>

    <!-- Main Content -->
    <main id="main-content" role="main">
        <section class="search-section" aria-labelledby="search-heading">
            <h2 id="search-heading">Search Books</h2>
            <form id="search-form" role="search" aria-label="Book search">
                <label for="search-input">Search by title, author, or ISBN</label>
                <input
                    type="search"
                    id="search-input"
                    name="search"
                    placeholder="e.g. Java programming, Tolkien"
                    autocomplete="off"
                >
                <button type="submit" aria-label="Start search">Search</button>
            </form>
        </section>
    </main>

    <footer role="contentinfo">
        <p>&copy; 2024 Accessible Library. All rights reserved.</p>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
```

## Task 2: ARIA Implementation

### Book Card with ARIA

```html
<article class="book-card" role="article" aria-labelledby="book-title-123">
    <div class="book-cover">
        <img
            src="images/book-covers/java-programming.jpg"
            alt="Java Programming book cover"
            loading="lazy"
            width="150"
            height="200"
        >
    </div>

    <div class="book-info">
        <h3 id="book-title-123" class="book-title">
            <a href="#" data-book-id="123">
                Effective Java: Programming Language Guide
            </a>
        </h3>

        <p class="book-author" aria-label="Author">Joshua Bloch</p>

        <div class="book-rating" role="img" aria-label="4.5 out of 5 stars">
            <span class="stars" aria-hidden="true">★★★★☆</span>
            <span class="rating-text">4.5/5 (247 reviews)</span>
        </div>

        <button
            type="button"
            class="btn-primary"
            data-action="reserve"
            data-book-id="123"
            aria-describedby="reserve-help-123"
        >
            Reserve Book
        </button>
        <div id="reserve-help-123" class="visually-hidden">
            Reserve Effective Java book at the library
        </div>
    </div>
</article>
```

## Task 3: Keyboard Navigation

Ensure all functionality is accessible via keyboard navigation.

## Task 4: Testing

Test with screen readers and automated accessibility tools.

## Checklist

- [ ] Semantic HTML5 elements used
- [ ] Proper heading hierarchy (h1-h6)
- [ ] ARIA labels and descriptions for all interactive elements
- [ ] Keyboard navigation for all functionality
- [ ] Screen reader compatible content
- [ ] Color contrast minimum 4.5:1 ratio
- [ ] Focus indicators clearly visible
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

## Next Steps

- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check with browser zoom at 200%
- [ ] Verify in high contrast mode

## Next Steps

- WCAG 2.1 AAA level compliance
- Voice control support
- Advanced ARIA patterns
- Automated accessibility testing in CI/CD
- User testing with real users with disabilities