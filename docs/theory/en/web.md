# Web Development

## Brief Summary

Web development encompasses using HTML, CSS, and JavaScript technologies to create interactive websites and applications. Modern web development focuses on browser-server communication, responsive design, and user experience. Core technologies: HTML5 semantic elements, CSS3 advanced features (Grid, Flexbox), ES6+ JavaScript, HTTP protocol, and REST APIs. Common pitfalls include cross-browser compatibility, performance optimization, and security concerns.

## Concepts

### HTML {#html}

<div class="concept-section mental-model">

🧭 **Think of it this way**  
*HTML is like a house's structural framework: it defines where the walls, doors, and windows go, but not their colors or styles.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Semantic structure**: conveys content meaning, not just appearance
- **Accessibility**: foundation for screen readers and assistive technologies
- **SEO optimization**: search engines interpret pages based on HTML structure
- **Platform independence**: understood by all browsers and devices

</div>

<div class="runnable-model">

**Runnable mental model**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Essential meta tags for modern web -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern website example with semantic HTML5">
    <meta name="keywords" content="HTML5, semantic, accessibility, SEO">
    <meta name="author" content="Web Developer">
    
    <!-- Open Graph meta tags for social sharing -->
    <meta property="og:title" content="Modern Web Page">
    <meta property="og:description" content="Example of semantic HTML5 structure">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com">
    <meta property="og:type" content="website">
    
    <!-- Favicon and app icons -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    
    <!-- External stylesheets -->
    <link rel="stylesheet" href="/css/main.css">
    
    <title>Modern Web Page - Semantic HTML5 Example</title>
    
    <!-- Structured data for rich snippets -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Example Company",
        "url": "https://example.com",
        "logo": "https://example.com/logo.png"
    }
    </script>
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Page header with navigation -->
    <header role="banner" class="site-header">
        <div class="container">
            <div class="logo">
                <img src="/logo.png" alt="Company Logo" width="120" height="40">
            </div>
            
            <!-- Main navigation -->
            <nav role="navigation" aria-label="Main navigation">
                <button class="nav-toggle" aria-expanded="false" aria-controls="main-nav">
                    <span class="sr-only">Toggle navigation</span>
                    ☰
                </button>
                
                <ul id="main-nav" class="nav-list">
                    <li><a href="#home" aria-current="page">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Main content area -->
    <main id="main-content" role="main">
        <!-- Hero section -->
        <section class="hero" aria-labelledby="hero-heading">
            <div class="container">
                <h1 id="hero-heading">Welcome to Modern Web Development</h1>
                <p class="hero-subtitle">
                    Creating accessible, performant, and semantic web experiences
                </p>
                <a href="#services" class="cta-button" role="button">
                    Explore Our Services
                </a>
            </div>
        </section>
        
        <!-- About section -->
        <section id="about" aria-labelledby="about-heading">
            <div class="container">
                <h2 id="about-heading">About Our Approach</h2>
                
                <article class="feature-article">
                    <header>
                        <h3>Semantic HTML5</h3>
                        <time datetime="2024-10-06" pubdate>October 6, 2024</time>
                    </header>
                    
                    <p>
                        We use <strong>semantic HTML elements</strong> to create 
                        meaningful structure. This includes proper use of 
                        <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, 
                        <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, 
                        <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code> elements.
                    </p>
                    
                    <blockquote cite="https://www.w3.org/WAI/">
                        <p>
                            "The power of the Web is in its universality. 
                            Access by everyone regardless of disability is an essential aspect."
                        </p>
                        <footer>
                            — <cite>Tim Berners-Lee, W3C Director and inventor of the World Wide Web</cite>
                        </footer>
                    </blockquote>
                    
                    <!-- Code example -->
                    <figure>
                        <pre><code class="language-html">
&lt;article&gt;
    &lt;header&gt;
        &lt;h2&gt;Article Title&lt;/h2&gt;
        &lt;time datetime="2024-10-06"&gt;October 6, 2024&lt;/time&gt;
    &lt;/header&gt;
    &lt;p&gt;Article content...&lt;/p&gt;
&lt;/article&gt;
                        </code></pre>
                        <figcaption>Example of semantic HTML structure</figcaption>
                    </figure>
                </article>
            </div>
        </section>
        
        <!-- Services section with semantic lists -->
        <section id="services" aria-labelledby="services-heading">
            <div class="container">
                <h2 id="services-heading">Our Services</h2>
                
                <div class="services-grid">
                    <article class="service-card">
                        <header>
                            <h3>Web Design</h3>
                            <img src="/icons/design.svg" alt="Design icon" width="48" height="48">
                        </header>
                        <p>User-centered design with focus on accessibility and usability.</p>
                        <ul>
                            <li>Responsive design</li>
                            <li>User experience (UX)</li>
                            <li>Accessibility compliance</li>
                        </ul>
                    </article>
                    
                    <article class="service-card">
                        <header>
                            <h3>Development</h3>
                            <img src="/icons/code.svg" alt="Code icon" width="48" height="48">
                        </header>
                        <p>Modern web development with performance in mind.</p>
                        <ul>
                            <li>Semantic HTML5</li>
                            <li>Modern CSS & JavaScript</li>
                            <li>Progressive Web Apps</li>
                        </ul>
                    </article>
                    
                    <article class="service-card">
                        <header>
                            <h3>Optimization</h3>
                            <img src="/icons/speed.svg" alt="Speed icon" width="48" height="48">
                        </header>
                        <p>Performance optimization for better user experience.</p>
                        <ul>
                            <li>Core Web Vitals</li>
                            <li>SEO optimization</li>
                            <li>Performance monitoring</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
        
        <!-- Contact form with proper form structure -->
        <section id="contact" aria-labelledby="contact-heading">
            <div class="container">
                <h2 id="contact-heading">Get In Touch</h2>
                
                <form class="contact-form" action="/contact" method="post" novalidate>
                    <fieldset>
                        <legend>Contact Information</legend>
                        
                        <div class="form-group">
                            <label for="full-name">
                                Full Name <abbr title="required">*</abbr>
                            </label>
                            <input 
                                type="text" 
                                id="full-name" 
                                name="fullName" 
                                required 
                                aria-describedby="name-error"
                                autocomplete="name"
                            >
                            <div id="name-error" class="error-message" aria-live="polite"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="email-address">
                                Email Address <abbr title="required">*</abbr>
                            </label>
                            <input 
                                type="email" 
                                id="email-address" 
                                name="email" 
                                required 
                                aria-describedby="email-error"
                                autocomplete="email"
                            >
                            <div id="email-error" class="error-message" aria-live="polite"></div>
                        </div>
                        
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <select id="subject" name="subject" required>
                                <option value="">Please select a subject</option>
                                <option value="general">General Inquiry</option>
                                <option value="quote">Request Quote</option>
                                <option value="support">Technical Support</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">
                                Message <abbr title="required">*</abbr>
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="5" 
                                required
                                aria-describedby="message-error"
                                placeholder="Tell us about your project..."
                            ></textarea>
                            <div id="message-error" class="error-message" aria-live="polite"></div>
                        </div>
                        
                        <div class="form-group">
                            <input type="checkbox" id="newsletter" name="newsletter" value="yes">
                            <label for="newsletter">
                                Subscribe to our newsletter for web development tips
                            </label>
                        </div>
                    </fieldset>
                    
                    <div class="form-actions">
                        <button type="submit" class="submit-button">
                            Send Message
                        </button>
                        <button type="reset" class="reset-button">
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </main>
    
    <!-- Complementary content -->
    <aside class="sidebar" role="complementary" aria-labelledby="sidebar-heading">
        <h2 id="sidebar-heading">Related Resources</h2>
        
        <section aria-labelledby="recent-posts">
            <h3 id="recent-posts">Recent Blog Posts</h3>
            <ul>
                <li>
                    <a href="/blog/html5-semantic-elements">
                        HTML5 Semantic Elements Guide
                    </a>
                    <time datetime="2024-10-01">Oct 1, 2024</time>
                </li>
                <li>
                    <a href="/blog/accessibility-best-practices">
                        Web Accessibility Best Practices
                    </a>
                    <time datetime="2024-09-28">Sep 28, 2024</time>
                </li>
            </ul>
        </section>
        
        <section aria-labelledby="tools">
            <h3 id="tools">Recommended Tools</h3>
            <dl>
                <dt>HTML Validator</dt>
                <dd>
                    <a href="https://validator.w3.org/">W3C Markup Validator</a>
                </dd>
                
                <dt>Accessibility Checker</dt>
                <dd>
                    <a href="https://wave.webaim.org/">WAVE Web Accessibility Evaluator</a>
                </dd>
                
                <dt>Performance Testing</dt>
                <dd>
                    <a href="https://pagespeed.web.dev/">Google PageSpeed Insights</a>
                </dd>
            </dl>
        </section>
    </aside>
    
    <!-- Page footer -->
    <footer role="contentinfo" class="site-footer">
        <div class="container">
            <div class="footer-content">
                <section aria-labelledby="company-info">
                    <h3 id="company-info">Company Information</h3>
                    <address>
                        <strong>Example Web Development</strong><br>
                        123 Web Street<br>
                        Developer City, DC 12345<br>
                        <a href="tel:+1234567890">+1 (234) 567-890</a><br>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </address>
                </section>
                
                <section aria-labelledby="quick-links">
                    <h3 id="quick-links">Quick Links</h3>
                    <ul>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/accessibility">Accessibility Statement</a></li>
                        <li><a href="/sitemap">Sitemap</a></li>
                    </ul>
                </section>
                
                <section aria-labelledby="social-media">
                    <h3 id="social-media">Follow Us</h3>
                    <ul class="social-links">
                        <li>
                            <a href="https://twitter.com/example" aria-label="Follow us on Twitter">
                                <svg width="24" height="24" aria-hidden="true">
                                    <use href="#twitter-icon"></use>
                                </svg>
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/example" aria-label="View our GitHub">
                                <svg width="24" height="24" aria-hidden="true">
                                    <use href="#github-icon"></use>
                                </svg>
                                GitHub
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
            
            <div class="footer-bottom">
                <p>
                    &copy; <time datetime="2024">2024</time> Example Web Development. 
                    All rights reserved.
                </p>
                <p>
                    Built with <span aria-label="love">❤️</span> using semantic HTML5, 
                    accessible design, and modern web standards.
                </p>
            </div>
        </div>
    </footer>
    
    <!-- SVG sprite for icons -->
    <svg style="display: none;">
        <defs>
            <symbol id="twitter-icon" viewBox="0 0 24 24">
                <!-- Twitter icon path -->
            </symbol>
            <symbol id="github-icon" viewBox="0 0 24 24">
                <!-- GitHub icon path -->
            </symbol>
        </defs>
    </svg>
    
    <!-- JavaScript for enhanced functionality -->
    <script src="/js/main.js" defer></script>
    
    <!-- Service worker registration for PWA -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('SW registered'))
                    .catch(error => console.log('SW registration failed'));
            });
        }
    </script>
</body>
</html>
```
*Notice: Semantic elements (header, nav, main, section, article, aside, footer) structure content meaningfully for accessibility and SEO.*

</div>

<div class="concept-section myths">

<details>
<summary>🧯 <strong>Common myths / misconceptions</strong></summary>

<div>

- "HTML is just for structure, appearance doesn't matter" → Semantic HTML improves accessibility and SEO
- "Divs and spans are sufficient for everything" → Semantic elements provide meaning and context
- "HTML5 is just marketing, HTML4 was fine" → HTML5 adds crucial accessibility and semantic features

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Accessibility` · `SEO Optimization` · `Semantic Web` · `Progressive Enhancement` · `Web Standards`

</div>

### CSS {#css}

<div class="concept-section mental-model">

🎨 **Think of it this way**  
*CSS is like interior design for your HTML house: it controls colors, layouts, fonts, and how everything looks and feels.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Visual presentation**: controls how content appears across devices
- **Responsive design**: adapts layouts to different screen sizes
- **Performance**: efficient CSS reduces load times and improves user experience
- **Maintainability**: organized CSS makes styling changes easier

</div>

<div class="runnable-model">

**Modern CSS Showcase**
```css
/* CSS Custom Properties (Variables) */
:root {
    /* Design system colors */
    --primary-color: #2563eb;
    --primary-light: #3b82f6;
    --primary-dark: #1d4ed8;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    
    /* Typography scale */
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-family-mono: 'Fira Code', 'Monaco', 'Courier New', monospace;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    /* Spacing scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    
    /* Border radius */
    --radius-sm: 0.125rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    
    /* Transitions */
    --transition-fast: 150ms ease-in-out;
    --transition-medium: 250ms ease-in-out;
    --transition-slow: 350ms ease-in-out;
}

/* Modern CSS Reset */
*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
}

body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
canvas,
svg {
    display: block;
    max-width: 100%;
    height: auto;
}

input,
button,
textarea,
select {
    font: inherit;
}

/* Typography */
body {
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--text-color, #1f2937);
    background-color: var(--bg-color, #ffffff);
}

h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 600;
    margin-bottom: var(--space-4);
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

p {
    margin-bottom: var(--space-4);
}

/* Modern CSS Grid Layout */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-4);
}

.grid {
    display: grid;
    gap: var(--space-6);
}

/* Responsive grid system */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Auto-fit responsive grid */
.grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* CSS Flexbox Utilities */
.flex {
    display: flex;
}

.flex-col {
    flex-direction: column;
}

.items-center {
    align-items: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-center {
    justify-content: center;
}

.gap-4 {
    gap: var(--space-4);
}

/* Modern Card Component */
.card {
    background: var(--bg-color, white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--space-6);
    transition: transform var(--transition-medium), 
                box-shadow var(--transition-medium);
    border: 1px solid var(--border-color, #e5e7eb);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.card-header {
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.card-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--space-2);
}

.card-content {
    margin-bottom: var(--space-4);
}

/* Button System */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-6);
    font-size: var(--font-size-sm);
    font-weight: 500;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-decoration: none;
    transition: all var(--transition-fast);
    line-height: 1;
    white-space: nowrap;
}

.btn:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: white;
}

.btn-outline {
    background-color: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-outline:hover {
    background-color: var(--primary-color);
    color: white;
}

/* Modern Form Styling */
.form-group {
    margin-bottom: var(--space-6);
}

.form-label {
    display: block;
    font-weight: 500;
    margin-bottom: var(--space-2);
    color: var(--text-color);
}

.form-input {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid var(--border-color, #d1d5db);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-fast), 
                box-shadow var(--transition-fast);
}

.form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
}

.form-input:invalid {
    border-color: #ef4444;
}

.form-input:valid {
    border-color: #22c55e;
}

/* Navigation Component */
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) 0;
    background: var(--bg-color, white);
    border-bottom: 1px solid var(--border-color, #e5e7eb);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
    background-color: rgb(255 255 255 / 0.95);
}

.navbar-brand {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--primary-color);
    text-decoration: none;
}

.navbar-nav {
    display: flex;
    list-style: none;
    gap: var(--space-6);
}

.nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-color);
    background-color: rgb(37 99 235 / 0.1);
}

/* CSS Grid Advanced Layouts */
.sidebar-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "sidebar header"
        "sidebar main"
        "sidebar footer";
    min-height: 100vh;
    gap: var(--space-4);
}

.sidebar {
    grid-area: sidebar;
    background: var(--bg-secondary, #f8fafc);
    padding: var(--space-6);
}

.header {
    grid-area: header;
}

.main-content {
    grid-area: main;
    padding: var(--space-6);
}

.footer {
    grid-area: footer;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    :root {
        --text-color: #f9fafb;
        --bg-color: #111827;
        --bg-secondary: #1f2937;
        --border-color: #374151;
    }
    
    .navbar {
        background-color: rgb(17 24 39 / 0.95);
        border-color: var(--border-color);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 var(--space-3);
    }
    
    .grid-cols-2,
    .grid-cols-3,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
    
    .sidebar-layout {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
    }
    
    .navbar {
        flex-direction: column;
        gap: var(--space-4);
    }
    
    .navbar-nav {
        flex-direction: column;
        width: 100%;
    }
    
    h1 { font-size: var(--font-size-3xl); }
    h2 { font-size: var(--font-size-2xl); }
    h3 { font-size: var(--font-size-xl); }
}

/* Print Styles */
@media print {
    .navbar,
    .sidebar,
    .btn {
        display: none !important;
    }
    
    .main-content {
        grid-column: 1 / -1;
    }
    
    * {
        color: black !important;
        background: white !important;
    }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Focus-visible for keyboard navigation */
:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .btn {
        border: 2px solid currentColor;
    }
    
    .card {
        border: 2px solid currentColor;
    }
}

/* CSS Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Loading States */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Utility Classes */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

.text-primary { color: var(--primary-color); }
.text-secondary { color: var(--secondary-color); }

.bg-primary { background-color: var(--primary-color); }
.bg-secondary { background-color: var(--secondary-color); }

.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-full { border-radius: 9999px; }

.shadow { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }

/* Modern CSS Features */

/* CSS Subgrid (when supported) */
@supports (grid-template-rows: subgrid) {
    .card-grid {
        display: grid;
        grid-template-rows: subgrid;
    }
}

/* CSS Container Queries (when supported) */
@supports (container-type: inline-size) {
    .card-container {
        container-type: inline-size;
    }
    
    @container (min-width: 300px) {
        .card {
            display: flex;
            align-items: center;
        }
    }
}

/* CSS Logical Properties */
.content {
    margin-block-start: var(--space-4);
    margin-block-end: var(--space-4);
    padding-inline: var(--space-6);
}
```
*Notice: Modern CSS features including CSS Grid, Flexbox, custom properties, container queries, and accessibility considerations.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Best practices</strong></summary>

<div>

- **Use CSS custom properties** for design system consistency
- **Mobile-first responsive design** with progressive enhancement
- **Semantic class names** that describe purpose, not appearance
- **CSS Grid for layouts**, Flexbox for components
- **Optimize for Core Web Vitals** (LCP, FID, CLS)
- **Use modern CSS features** with progressive enhancement

</div>
</details>

</div>

<div class="concept-section common-pitfalls">

<details>
<summary>⚠️ <strong>Common pitfalls</strong></summary>

<div>

- **Using !important excessively** → Plan CSS specificity properly
- **Not considering accessibility** → Use focus styles, color contrast
- **Inline styles everywhere** → Maintain separation of concerns
- **Fixed pixel units** → Use relative units (rem, em, %) for scalability
- **Not testing on different devices** → Use responsive design testing

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Responsive Design` · `CSS Grid` · `Flexbox` · `Design Systems` · `Performance Optimization` · `Accessibility`

</div>

### JavaScript {#javascript}

<div class="concept-section mental-model">

⚡ **Think of it this way**  
*JavaScript is like the electrical system in your HTML house: it powers the lights, controls the appliances, and makes everything interactive.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Interactivity**: enables dynamic user experiences and real-time updates
- **Client-side logic**: reduces server load by handling validation and processing
- **Modern applications**: foundation for SPAs, PWAs, and complex web applications
- **Ecosystem**: vast ecosystem of libraries, frameworks, and tools

</div>

<div class="runnable-model">

**Modern JavaScript Showcase**
```javascript
// Modern ES6+ JavaScript Features

// 1. Variables and Constants
const API_BASE_URL = 'https://api.example.com';
let currentUser = null;
var globalCounter = 0; // Avoid var, use let/const

// 2. Arrow Functions and Function Expressions
const add = (a, b) => a + b;
const multiply = (a, b) => {
    const result = a * b;
    console.log(`${a} × ${b} = ${result}`);
    return result;
};

// 3. Template Literals
const userName = 'John Doe';
const welcomeMessage = `Welcome back, ${userName}! 
You have ${getUnreadCount()} unread messages.`;

// 4. Destructuring Assignment
const user = { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com',
    preferences: { theme: 'dark', notifications: true }
};

// Object destructuring
const { id, name, email } = user;
const { theme, notifications } = user.preferences;

// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...others] = colors;

// 5. Spread Operator
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4, 5, 6];

const originalObject = { a: 1, b: 2 };
const newObject = { ...originalObject, c: 3, d: 4 };

// 6. Default Parameters
function greetUser(name = 'Guest', greeting = 'Hello') {
    return `${greeting}, ${name}!`;
}

// 7. Rest Parameters
function calculateSum(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// 8. Classes and Inheritance
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
    
    // Getter
    get description() {
        return `${this.name} is a ${this.species}`;
    }
    
    // Setter
    set name(newName) {
        if (typeof newName === 'string' && newName.length > 0) {
            this._name = newName;
        }
    }
    
    // Static method
    static getSpeciesCount(animals) {
        return [...new Set(animals.map(animal => animal.species))].length;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog');
        this.breed = breed;
    }
    
    speak() {
        console.log(`${this.name} barks!`);
    }
    
    fetch() {
        console.log(`${this.name} fetches the ball!`);
    }
}

// 9. Promises and Async/Await
class ApiService {
    static async fetchUser(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
    
    static async fetchMultipleUsers(userIds) {
        try {
            const promises = userIds.map(id => this.fetchUser(id));
            const users = await Promise.all(promises);
            return users;
        } catch (error) {
            console.error('Error fetching multiple users:', error);
            throw error;
        }
    }
}

// 10. DOM Manipulation (Modern Approach)
class TodoApp {
    constructor() {
        this.todos = [];
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
    }
    
    bindEvents() {
        // Modern event delegation
        document.addEventListener('click', this.handleClick.bind(this));
        document.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Input debouncing
        const searchInput = document.querySelector('#search');
        if (searchInput) {
            searchInput.addEventListener('input', 
                this.debounce(this.handleSearch.bind(this), 300)
            );
        }
    }
    
    handleClick(event) {
        const { target } = event;
        
        // Modern event handling with data attributes
        if (target.matches('[data-action="delete"]')) {
            const todoId = target.closest('[data-todo-id]').dataset.todoId;
            this.deleteTodo(todoId);
        } else if (target.matches('[data-action="toggle"]')) {
            const todoId = target.closest('[data-todo-id]').dataset.todoId;
            this.toggleTodo(todoId);
        }
    }
    
    handleSubmit(event) {
        if (event.target.matches('#todo-form')) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const todoText = formData.get('todo-text');
            
            if (todoText.trim()) {
                this.addTodo(todoText.trim());
                event.target.reset();
            }
        }
    }
    
    addTodo(text) {
        const todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: new Date()
        };
        
        this.todos.push(todo);
        this.render();
        this.saveToStorage();
    }
    
    render(todosToRender = this.todos) {
        const todoList = document.querySelector('#todo-list');
        if (!todoList) return;
        
        // Modern DOM manipulation with template literals
        todoList.innerHTML = todosToRender.map(todo => `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" 
                 data-todo-id="${todo.id}">
                <input type="checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       data-action="toggle">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button type="button" 
                        class="delete-btn" 
                        data-action="delete">✕</button>
            </div>
        `).join('');
    }
    
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    saveToStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos to storage', error);
        }
    }
}

// 11. Error Handling and Performance
class PerformanceUtils {
    // Lazy loading images
    static observeImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Throttle function for scroll events
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// 12. Modern Web APIs
class ModernWebAPIs {
    // Geolocation
    static async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => reject(error),
                { timeout: 10000, enableHighAccuracy: true }
            );
        });
    }
    
    // Notifications
    static async requestNotificationPermission() {
        if (!('Notification' in window)) {
            throw new Error('Notifications not supported');
        }
        
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    
    static showNotification(title, options = {}) {
        if (Notification.permission === 'granted') {
            return new Notification(title, {
                icon: '/icon-192x192.png',
                badge: '/badge-72x72.png',
                ...options
            });
        }
    }
    
    // Service Worker
    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered successfully');
                return registration;
            } catch (error) {
                console.error('Service Worker registration failed', error);
                throw error;
            }
        }
    }
}

// 13. Application Initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize application
        const app = new TodoApp();
        app.loadFromStorage();
        
        // Initialize performance optimizations
        PerformanceUtils.observeImages();
        
        // Register service worker
        await ModernWebAPIs.registerServiceWorker();
        
        // Set up global error handling
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            event.preventDefault();
        });
        
        console.log('Application initialized successfully');
        
    } catch (error) {
        console.error('Application initialization failed:', error);
    }
});
```
*Notice: Modern JavaScript features including ES6+ syntax, async/await, classes, modules, and Web APIs integration.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Best practices</strong></summary>

<div>

- **Use const/let instead of var** for proper scoping
- **Prefer arrow functions** for concise syntax and lexical this
- **Use async/await** instead of callback hell
- **Implement error handling** with try/catch blocks
- **Optimize performance** with debouncing, throttling, and lazy loading
- **Use modern ES6+ features** for cleaner, more maintainable code

</div>
</details>

</div>

<div class="concept-section common-pitfalls">

<details>
<summary>⚠️ <strong>Common pitfalls</strong></summary>

<div>

- **Forgetting async/await error handling** → Always use try/catch
- **Memory leaks from event listeners** → Remove listeners when not needed
- **Blocking the main thread** → Use Web Workers for heavy computations
- **Not validating user input** → Sanitize and validate all inputs
- **Ignoring browser compatibility** → Use progressive enhancement

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`DOM Manipulation` · `Event Handling` · `Async Programming` · `ES6+ Features` · `Web APIs` · `Performance Optimization`

</div>

## HTTP Protocol {#http}

### HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

### Status Codes
- **200 OK**: Successful request
- **201 Created**: Resource successfully created
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication required
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### REST API Example
```javascript
// GET /api/users - Get all users
// GET /api/users/123 - Get specific user
// POST /api/users - Create new user
// PUT /api/users/123 - Update user
// DELETE /api/users/123 - Delete user

// Example API call
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('User created:', data))
.catch(error => console.error('Error:', error));
```

## Modern Web Development

### Single Page Applications (SPA)
- React, Vue.js, Angular
- Client-side routing
- Component-based architecture
- State management

## HTTP Protocol {#http-protocol}

<div class="concept-section mental-model">

🌐 **Think of it this way**  
*HTTP is like the postal system for the internet: it defines how messages are formatted, addressed, sent, and received between computers.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Universal communication**: standard protocol for web communication
- **Stateless design**: each request is independent, enabling scalability
- **Caching mechanisms**: improves performance through intelligent caching
- **Security extensions**: HTTPS provides encrypted communication

</div>

<div class="runnable-model">

**HTTP Communication Showcase**
```javascript
// Modern HTTP Client Implementation
class HTTPClient {
    constructor(baseURL = '', options = {}) {
        this.baseURL = baseURL;
        this.defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers
            },
            ...options
        };
    }
    
    // HTTP GET Request
    async get(endpoint, options = {}) {
        try {
            const url = this.buildURL(endpoint);
            const response = await fetch(url, {
                method: 'GET',
                ...this.defaultOptions,
                ...options
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // HTTP POST Request
    async post(endpoint, data, options = {}) {
        try {
            const url = this.buildURL(endpoint);
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                ...this.defaultOptions,
                ...options
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // HTTP PUT Request (Full Update)
    async put(endpoint, data, options = {}) {
        try {
            const url = this.buildURL(endpoint);
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                ...this.defaultOptions,
                ...options
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // HTTP PATCH Request (Partial Update)
    async patch(endpoint, data, options = {}) {
        try {
            const url = this.buildURL(endpoint);
            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(data),
                ...this.defaultOptions,
                ...options
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // HTTP DELETE Request
    async delete(endpoint, options = {}) {
        try {
            const url = this.buildURL(endpoint);
            const response = await fetch(url, {
                method: 'DELETE',
                ...this.defaultOptions,
                ...options
            });
            
            return await this.handleResponse(response);
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // File Upload with Progress
    async upload(endpoint, file, onProgress = null) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const xhr = new XMLHttpRequest();
            
            return new Promise((resolve, reject) => {
                xhr.upload.addEventListener('progress', (event) => {
                    if (onProgress && event.lengthComputable) {
                        const progress = (event.loaded / event.total) * 100;
                        onProgress(progress);
                    }
                });
                
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            resolve(response);
                        } catch {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(new Error(`Upload failed: ${xhr.status}`));
                    }
                };
                
                xhr.onerror = () => reject(new Error('Upload failed'));
                
                xhr.open('POST', this.buildURL(endpoint));
                xhr.send(formData);
            });
        } catch (error) {
            throw this.handleError(error);
        }
    }
    
    // Build full URL
    buildURL(endpoint) {
        if (endpoint.startsWith('http')) {
            return endpoint;
        }
        return `${this.baseURL}${endpoint}`;
    }
    
    // Handle HTTP Response
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        
        // Check if response is ok
        if (!response.ok) {
            const errorData = await this.extractErrorData(response);
            throw new HTTPError(
                response.status,
                response.statusText,
                errorData
            );
        }
        
        // Parse response based on content type
        if (contentType?.includes('application/json')) {
            return await response.json();
        } else if (contentType?.includes('text/')) {
            return await response.text();
        } else if (contentType?.includes('application/octet-stream')) {
            return await response.blob();
        } else {
            return response;
        }
    }
    
    // Extract error data from response
    async extractErrorData(response) {
        try {
            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch {
            return null;
        }
    }
    
    // Handle errors
    handleError(error) {
        if (error instanceof HTTPError) {
            return error;
        }
        
        if (error.name === 'AbortError') {
            return new HTTPError(0, 'Request Aborted', { message: 'Request was aborted' });
        }
        
        if (!navigator.onLine) {
            return new HTTPError(0, 'Network Error', { message: 'No internet connection' });
        }
        
        return new HTTPError(0, 'Unknown Error', { message: error.message });
    }
}

// Custom HTTP Error Class
class HTTPError extends Error {
    constructor(status, statusText, data) {
        super(`HTTP ${status}: ${statusText}`);
        this.name = 'HTTPError';
        this.status = status;
        this.statusText = statusText;
        this.data = data;
    }
}

// REST API Client Implementation
class RestAPIClient extends HTTPClient {
    constructor(baseURL, options = {}) {
        super(baseURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers
            },
            ...options
        });
    }
    
    // Resource-based operations
    async getResource(resource, id = null, params = {}) {
        const endpoint = id ? `/${resource}/${id}` : `/${resource}`;
        const queryString = this.buildQueryString(params);
        return this.get(`${endpoint}${queryString}`);
    }
    
    async createResource(resource, data) {
        return this.post(`/${resource}`, data);
    }
    
    async updateResource(resource, id, data) {
        return this.put(`/${resource}/${id}`, data);
    }
    
    async patchResource(resource, id, data) {
        return this.patch(`/${resource}/${id}`, data);
    }
    
    async deleteResource(resource, id) {
        return this.delete(`/${resource}/${id}`);
    }
    
    // Query string builder
    buildQueryString(params) {
        const queryParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    value.forEach(item => queryParams.append(key, item));
                } else {
                    queryParams.append(key, value);
                }
            }
        });
        
        const queryString = queryParams.toString();
        return queryString ? `?${queryString}` : '';
    }
}

// Usage Examples
const apiClient = new RestAPIClient('https://api.example.com/v1');

// Example: User Management
class UserService {
    static async getAllUsers(filters = {}) {
        return apiClient.getResource('users', null, filters);
    }
    
    static async getUserById(id) {
        return apiClient.getResource('users', id);
    }
    
    static async createUser(userData) {
        return apiClient.createResource('users', userData);
    }
    
    static async updateUser(id, userData) {
        return apiClient.updateResource('users', id, userData);
    }
    
    static async partialUpdateUser(id, updates) {
        return apiClient.patchResource('users', id, updates);
    }
    
    static async deleteUser(id) {
        return apiClient.deleteResource('users', id);
    }
    
    static async uploadUserAvatar(id, file, onProgress) {
        return apiClient.upload(`/users/${id}/avatar`, file, onProgress);
    }
}

// HTTP Status Codes Reference
const HTTP_STATUS = {
    // 1xx Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    
    // 2xx Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    PARTIAL_CONTENT: 206,
    
    // 3xx Redirection
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    
    // 4xx Client Error
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    
    // 5xx Server Error
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};

// HTTP Headers Management
class HTTPHeaders {
    static getAuthorizationHeader(token, type = 'Bearer') {
        return { 'Authorization': `${type} ${token}` };
    }
    
    static getCacheHeaders(maxAge = 3600) {
        return {
            'Cache-Control': `public, max-age=${maxAge}`,
            'Expires': new Date(Date.now() + maxAge * 1000).toUTCString()
        };
    }
    
    static getCORSHeaders(origin = '*') {
        return {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
        };
    }
    
    static getSecurityHeaders() {
        return {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'Content-Security-Policy': "default-src 'self'"
        };
    }
}

// Request Interceptors and Middleware
class RequestInterceptor {
    constructor() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }
    
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }
    
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
    }
    
    async processRequest(config) {
        let processedConfig = config;
        
        for (const interceptor of this.requestInterceptors) {
            processedConfig = await interceptor(processedConfig);
        }
        
        return processedConfig;
    }
    
    async processResponse(response) {
        let processedResponse = response;
        
        for (const interceptor of this.responseInterceptors) {
            processedResponse = await interceptor(processedResponse);
        }
        
        return processedResponse;
    }
}

// Example: Authentication Interceptor
const authInterceptor = (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers = {
            ...config.headers,
            ...HTTPHeaders.getAuthorizationHeader(token)
        };
    }
    return config;
};

// Example: Logging Interceptor
const loggingInterceptor = (response) => {
    console.log(`HTTP ${response.status} - ${response.url}`);
    return response;
};

// Example Usage
async function demonstrateHTTPCommunication() {
    try {
        // Create API client with interceptors
        const client = new RestAPIClient('https://jsonplaceholder.typicode.com');
        
        // Get all users
        const users = await UserService.getAllUsers({ page: 1, limit: 10 });
        console.log('Users:', users);
        
        // Get specific user
        const user = await UserService.getUserById(1);
        console.log('User:', user);
        
        // Create new user
        const newUser = await UserService.createUser({
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe'
        });
        console.log('Created user:', newUser);
        
        // Update user
        const updatedUser = await UserService.updateUser(1, {
            name: 'Jane Doe',
            email: 'jane@example.com'
        });
        console.log('Updated user:', updatedUser);
        
    } catch (error) {
        if (error instanceof HTTPError) {
            console.error(`HTTP Error ${error.status}:`, error.data);
        } else {
            console.error('Network Error:', error.message);
        }
    }
}
```
*Notice: Comprehensive HTTP communication including REST APIs, error handling, interceptors, and modern fetch patterns.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Best practices</strong></summary>

<div>

- **Use proper HTTP methods** (GET, POST, PUT, PATCH, DELETE)
- **Handle errors gracefully** with proper status code checking
- **Implement request/response interceptors** for authentication and logging
- **Use HTTPS** for secure communication
- **Implement caching strategies** to improve performance
- **Validate data** on both client and server side

</div>
</details>

</div>

<div class="concept-section common-pitfalls">

<details>
<summary>⚠️ <strong>Common pitfalls</strong></summary>

<div>

- **Not handling network errors** → Always implement proper error handling
- **Using wrong HTTP methods** → GET for retrieval, POST for creation, etc.
- **Ignoring HTTP status codes** → Check response status before processing
- **Not implementing timeouts** → Set reasonable request timeouts
- **Security vulnerabilities** → Validate inputs, use HTTPS, prevent CSRF

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`REST APIs` · `Status Codes` · `Headers` · `Authentication` · `Caching` · `Security`

</div>

### Progressive Web Apps (PWA) {#pwa}

<div class="concept-section mental-model">

📱 **Think of it this way**  
*PWAs are like hybrid applications: they look and feel like native mobile apps but are built with web technologies and run in browsers.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Cross-platform compatibility**: one codebase for all devices
- **Offline functionality**: works without internet connection
- **App-like experience**: installation, push notifications, full-screen mode
- **Performance**: fast loading and smooth interactions

</div>

<div class="runnable-model">

**PWA Implementation Showcase**
```javascript
// Service Worker Registration and Management
class ServiceWorkerManager {
    constructor() {
        this.registration = null;
        this.isUpdateAvailable = false;
    }
    
    async register() {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service Worker not supported');
        }
        
        try {
            this.registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/'
            });
            
            console.log('Service Worker registered successfully');
            
            // Listen for updates
            this.registration.addEventListener('updatefound', () => {
                this.handleUpdate();
            });
            
            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }
    
    handleUpdate() {
        const newWorker = this.registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.isUpdateAvailable = true;
                this.notifyUpdateAvailable();
            }
        });
    }
    
    notifyUpdateAvailable() {
        const updateBanner = document.createElement('div');
        updateBanner.innerHTML = `
            <div class="update-banner">
                <p>A new version is available!</p>
                <button onclick="this.parentElement.parentElement.updateApp()">Update</button>
                <button onclick="this.parentElement.remove()">Dismiss</button>
            </div>
        `;
        
        updateBanner.updateApp = () => {
            this.activateUpdate();
            updateBanner.remove();
        };
        
        document.body.appendChild(updateBanner);
    }
    
    async activateUpdate() {
        if (!this.registration?.waiting) return;
        
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}

// Push Notification Manager
class PushNotificationManager {
    constructor() {
        this.vapidPublicKey = 'your-vapid-public-key-here';
    }
    
    async requestPermission() {
        if (!('Notification' in window)) {
            throw new Error('Notifications not supported');
        }
        
        const permission = await Notification.requestPermission();
        
        if (permission !== 'granted') {
            throw new Error('Notification permission denied');
        }
        
        return permission;
    }
    
    async subscribe() {
        const registration = await navigator.serviceWorker.ready;
        
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
        });
        
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription);
        
        return subscription;
    }
    
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        
        return outputArray;
    }
    
    async sendSubscriptionToServer(subscription) {
        const response = await fetch('/api/push-subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
        });
        
        if (!response.ok) {
            throw new Error('Failed to send subscription to server');
        }
    }
}

// App Installation Manager
class InstallationManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            this.deferredPrompt = event;
            this.showInstallPromotion();
        });
        
        // Listen for appinstalled event
        window.addEventListener('appinstalled', () => {
            this.isInstalled = true;
            this.hideInstallPromotion();
            console.log('PWA was installed');
        });
        
        // Check if already installed
        this.checkIfInstalled();
    }
    
    checkIfInstalled() {
        // Check if running in standalone mode
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
        }
        
        // Check for iOS standalone mode
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
        }
    }
    
    showInstallPromotion() {
        if (this.isInstalled) return;
        
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <h3>Install App</h3>
                <p>Add this app to your home screen for a better experience</p>
                <button class="install-button">Install</button>
                <button class="dismiss-button">Maybe Later</button>
            </div>
        `;
        
        installBanner.querySelector('.install-button').addEventListener('click', () => {
            this.promptInstall();
        });
        
        installBanner.querySelector('.dismiss-button').addEventListener('click', () => {
            installBanner.remove();
        });
        
        document.body.appendChild(installBanner);
    }
    
    hideInstallPromotion() {
        const banner = document.querySelector('.install-banner');
        if (banner) {
            banner.remove();
        }
    }
    
    async promptInstall() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        
        this.deferredPrompt = null;
        this.hideInstallPromotion();
    }
}

// Offline Functionality Manager
class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.pendingRequests = [];
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processPendingRequests();
            this.updateOnlineStatus();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateOnlineStatus();
        });
    }
    
    updateOnlineStatus() {
        const statusElement = document.querySelector('.online-status');
        if (statusElement) {
            statusElement.textContent = this.isOnline ? 'Online' : 'Offline';
            statusElement.className = `online-status ${this.isOnline ? 'online' : 'offline'}`;
        }
    }
    
    async queueRequest(requestFunction) {
        if (this.isOnline) {
            try {
                return await requestFunction();
            } catch (error) {
                if (!navigator.onLine) {
                    this.pendingRequests.push(requestFunction);
                    throw new Error('Request queued for later - device is offline');
                }
                throw error;
            }
        } else {
            this.pendingRequests.push(requestFunction);
            throw new Error('Request queued - device is offline');
        }
    }
    
    async processPendingRequests() {
        const requests = [...this.pendingRequests];
        this.pendingRequests = [];
        
        for (const request of requests) {
            try {
                await request();
            } catch (error) {
                console.error('Failed to process pending request:', error);
                this.pendingRequests.push(request);
            }
        }
    }
}

// PWA App Class
class PWAApp {
    constructor() {
        this.serviceWorkerManager = new ServiceWorkerManager();
        this.pushManager = new PushNotificationManager();
        this.installManager = new InstallationManager();
        this.offlineManager = new OfflineManager();
    }
    
    async initialize() {
        try {
            // Register service worker
            await this.serviceWorkerManager.register();
            
            // Request notification permission
            try {
                await this.pushManager.requestPermission();
                await this.pushManager.subscribe();
            } catch (error) {
                console.log('Push notifications not enabled:', error.message);
            }
            
            // Setup app functionality
            this.setupAppShell();
            this.setupOfflineSupport();
            
            console.log('PWA initialized successfully');
        } catch (error) {
            console.error('PWA initialization failed:', error);
        }
    }
    
    setupAppShell() {
        // Create app shell structure
        const appShell = document.createElement('div');
        appShell.className = 'app-shell';
        appShell.innerHTML = `
            <header class="app-header">
                <h1>PWA Demo</h1>
                <div class="online-status"></div>
            </header>
            <main class="app-main">
                <div class="content">
                    <!-- App content will be loaded here -->
                </div>
            </main>
            <footer class="app-footer">
                <nav class="bottom-nav">
                    <button data-route="home">Home</button>
                    <button data-route="profile">Profile</button>
                    <button data-route="settings">Settings</button>
                </nav>
            </footer>
        `;
        
        document.body.appendChild(appShell);
        
        // Setup navigation
        this.setupNavigation();
        
        // Update online status
        this.offlineManager.updateOnlineStatus();
    }
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('[data-route]');
        
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const route = event.target.dataset.route;
                this.navigateTo(route);
            });
        });
    }
    
    navigateTo(route) {
        // Simple client-side routing
        const content = document.querySelector('.content');
        
        switch (route) {
            case 'home':
                content.innerHTML = '<h2>Home</h2><p>Welcome to the PWA!</p>';
                break;
            case 'profile':
                content.innerHTML = '<h2>Profile</h2><p>User profile information</p>';
                break;
            case 'settings':
                content.innerHTML = '<h2>Settings</h2><p>App settings and preferences</p>';
                break;
            default:
                content.innerHTML = '<h2>Page Not Found</h2>';
        }
        
        // Update active navigation
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-route="${route}"]`)?.classList.add('active');
    }
    
    setupOfflineSupport() {
        // Cache critical resources
        this.cacheResources([
            '/',
            '/styles/main.css',
            '/scripts/app.js',
            '/manifest.json'
        ]);
    }
    
    async cacheResources(urls) {
        if ('caches' in window) {
            const cache = await caches.open('pwa-cache-v1');
            await cache.addAll(urls);
        }
    }
}

// Web App Manifest (to be included in manifest.json)
const webAppManifest = {
    "name": "Progressive Web App Demo",
    "short_name": "PWA Demo",
    "description": "A demonstration of Progressive Web App features",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "orientation": "portrait-primary",
    "categories": ["productivity", "utilities"],
    "lang": "en",
    "dir": "ltr",
    "icons": [
        {
            "src": "/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable any"
        }
    ],
    "screenshots": [
        {
            "src": "/screenshots/desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
        },
        {
            "src": "/screenshots/mobile.png",
            "sizes": "360x640",
            "type": "image/png",
            "form_factor": "narrow"
        }
    ],
    "shortcuts": [
        {
            "name": "Create New",
            "short_name": "New",
            "description": "Create a new item",
            "url": "/new",
            "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }]
        }
    ]
};

// Initialize PWA
document.addEventListener('DOMContentLoaded', async () => {
    const app = new PWAApp();
    await app.initialize();
});
```
*Notice: Complete PWA implementation with service workers, push notifications, offline support, and app installation.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Best practices</strong></summary>

<div>

- **Design for offline-first** experience
- **Implement proper caching strategies** for different content types
- **Use app shell architecture** for fast initial load
- **Provide installation prompts** at appropriate moments
- **Handle update notifications** gracefully
- **Optimize for mobile performance** and touch interactions

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Service Workers` · `Web App Manifest` · `Offline Support` · `Push Notifications` · `App Installation`

</div>

### Performance Optimization {#performance}

<div class="concept-section mental-model">

🚀 **Think of it this way**  
*Web performance is like optimizing a race car: every component needs to be tuned for speed, efficiency, and smooth operation.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **User experience**: faster sites lead to better engagement and conversions
- **SEO ranking**: Google considers page speed as a ranking factor
- **Business impact**: slow sites lose users and revenue
- **Core Web Vitals**: essential metrics for modern web performance

</div>

<div class="runnable-model">

**Performance Optimization Showcase**
```javascript
// Performance Monitoring and Optimization
class PerformanceOptimizer {
    constructor() {
        this.metrics = new Map();
        this.observers = new Map();
        
        this.setupPerformanceObservers();
        this.measureCoreWebVitals();
    }
    
    // Core Web Vitals Measurement
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        this.observeLCP();
        
        // First Input Delay (FID)
        this.observeFID();
        
        // Cumulative Layout Shift (CLS)
        this.observeCLS();
        
        // First Contentful Paint (FCP)
        this.observeFCP();
        
        // Time to Interactive (TTI)
        this.observeTTI();
    }
    
    observeLCP() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            this.metrics.set('LCP', lastEntry.startTime);
            this.reportMetric('LCP', lastEntry.startTime);
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        this.observers.set('LCP', observer);
    }
    
    observeFID() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                this.metrics.set('FID', entry.processingStart - entry.startTime);
                this.reportMetric('FID', entry.processingStart - entry.startTime);
            });
        });
        
        observer.observe({ type: 'first-input', buffered: true });
        this.observers.set('FID', observer);
    }
    
    observeCLS() {
        let clsValue = 0;
        let clsEntries = [];
        
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsEntries.push(entry);
                    clsValue += entry.value;
                }
            });
            
            this.metrics.set('CLS', clsValue);
            this.reportMetric('CLS', clsValue);
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        this.observers.set('CLS', observer);
    }
    
    observeFCP() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.set('FCP', entry.startTime);
                    this.reportMetric('FCP', entry.startTime);
                }
            });
        });
        
        observer.observe({ type: 'paint', buffered: true });
        this.observers.set('FCP', observer);
    }
    
    observeTTI() {
        // Simplified TTI calculation
        if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
            let lastLongTask = 0;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    lastLongTask = Math.max(lastLongTask, entry.startTime + entry.duration);
                });
                
                // TTI is approximately when no long tasks occur for 5s after FCP
                const fcp = this.metrics.get('FCP') || 0;
                const tti = Math.max(fcp, lastLongTask);
                
                this.metrics.set('TTI', tti);
                this.reportMetric('TTI', tti);
            });
            
            observer.observe({ type: 'longtask', buffered: true });
            this.observers.set('TTI', observer);
        }
    }
    
    setupPerformanceObservers() {
        // Resource loading performance
        this.observeResourceTiming();
        
        // Navigation timing
        this.observeNavigationTiming();
        
        // User timing marks and measures
        this.observeUserTiming();
    }
    
    observeResourceTiming() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                if (entry.transferSize === 0) {
                    console.log(`Resource served from cache: ${entry.name}`);
                } else {
                    const loadTime = entry.responseEnd - entry.startTime;
                    if (loadTime > 1000) {
                        console.warn(`Slow resource load: ${entry.name} (${loadTime.toFixed(2)}ms)`);
                    }
                }
            });
        });
        
        observer.observe({ type: 'resource', buffered: true });
        this.observers.set('resource', observer);
    }
    
    observeNavigationTiming() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                const metrics = {
                    'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
                    'TCP Connection': entry.connectEnd - entry.connectStart,
                    'Request': entry.responseStart - entry.requestStart,
                    'Response': entry.responseEnd - entry.responseStart,
                    'DOM Processing': entry.domComplete - entry.domLoading,
                    'Load Event': entry.loadEventEnd - entry.loadEventStart
                };
                
                Object.entries(metrics).forEach(([name, value]) => {
                    this.reportMetric(`Navigation.${name}`, value);
                });
            });
        });
        
        observer.observe({ type: 'navigation', buffered: true });
        this.observers.set('navigation', observer);
    }
    
    observeUserTiming() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                console.log(`User timing - ${entry.name}: ${entry.duration || entry.startTime}ms`);
            });
        });
        
        observer.observe({ type: 'mark', buffered: true });
        observer.observe({ type: 'measure', buffered: true });
        this.observers.set('user-timing', observer);
    }
    
    reportMetric(name, value) {
        console.log(`Performance metric - ${name}: ${value.toFixed(2)}ms`);
        
        // Send to analytics service
        if (window.gtag) {
            window.gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: Math.round(value),
                custom_parameter: 'web_vitals'
            });
        }
    }
    
    // Performance optimization utilities
    static optimizeImages() {
        // Lazy loading implementation
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
    
    static preloadCriticalResources() {
        const criticalResources = [
            { href: '/styles/critical.css', as: 'style' },
            { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
            { href: '/api/user/profile', as: 'fetch', crossorigin: 'anonymous' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            Object.assign(link, resource);
            document.head.appendChild(link);
        });
    }
    
    static enableResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://api.example.com' },
            { rel: 'prefetch', href: '/page2.html' }
        ];
        
        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }
    
    // Code splitting and dynamic imports
    static async loadModuleWhenNeeded(moduleName) {
        try {
            performance.mark(`module-${moduleName}-start`);
            
            const module = await import(`./${moduleName}.js`);
            
            performance.mark(`module-${moduleName}-end`);
            performance.measure(
                `module-${moduleName}-load`,
                `module-${moduleName}-start`,
                `module-${moduleName}-end`
            );
            
            return module;
        } catch (error) {
            console.error(`Failed to load module ${moduleName}:`, error);
            throw error;
        }
    }
    
    // Memory optimization
    static cleanupMemory() {
        // Remove event listeners from unused elements
        const unusedElements = document.querySelectorAll('.unused');
        unusedElements.forEach(element => {
            element.removeEventListener('click', null);
            element.remove();
        });
        
        // Clear large data structures
        if (window.largeDataCache) {
            window.largeDataCache.clear();
        }
        
        // Suggest garbage collection (dev only)
        if (window.gc && process.env.NODE_ENV === 'development') {
            window.gc();
        }
    }
    
    // Bundle size analysis
    static analyzeBundleSize() {
        if ('PerformanceResourceTiming' in window) {
            const entries = performance.getEntriesByType('resource');
            const jsFiles = entries.filter(entry => entry.name.endsWith('.js'));
            
            const bundleAnalysis = jsFiles.map(entry => ({
                name: entry.name.split('/').pop(),
                size: entry.transferSize,
                loadTime: entry.responseEnd - entry.startTime,
                cached: entry.transferSize === 0
            }));
            
            console.table(bundleAnalysis);
            
            const totalSize = bundleAnalysis.reduce((sum, file) => sum + file.size, 0);
            console.log(`Total JS bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
        }
    }
}

// Image optimization utilities
class ImageOptimizer {
    static createResponsiveImages(images) {
        images.forEach(img => {
            const srcset = [
                `${img.dataset.src.replace('.jpg', '-400w.jpg')} 400w`,
                `${img.dataset.src.replace('.jpg', '-800w.jpg')} 800w`,
                `${img.dataset.src.replace('.jpg', '-1200w.jpg')} 1200w`
            ].join(', ');
            
            img.srcset = srcset;
            img.sizes = '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px';
        });
    }
    
    static convertToWebP(imgElement) {
        if (this.supportsWebP()) {
            const webpSrc = imgElement.src.replace(/\.(jpg|jpeg|png)$/, '.webp');
            
            const webpImg = new Image();
            webpImg.onload = () => {
                imgElement.src = webpSrc;
            };
            webpImg.onerror = () => {
                // Fallback to original format
                console.log('WebP not available, using original format');
            };
            webpImg.src = webpSrc;
        }
    }
    
    static supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
}

// Critical rendering path optimization
class CriticalPathOptimizer {
    static inlineCriticalCSS() {
        const criticalCSS = `
            /* Critical above-the-fold styles */
            body { font-family: -apple-system, sans-serif; margin: 0; }
            .header { background: #333; color: white; padding: 1rem; }
            .hero { min-height: 50vh; display: flex; align-items: center; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);
        
        // Load non-critical CSS asynchronously
        this.loadNonCriticalCSS();
    }
    
    static loadNonCriticalCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/styles/non-critical.css';
        link.media = 'print';
        link.onload = () => { link.media = 'all'; };
        
        document.head.appendChild(link);
    }
    
    static deferNonCriticalJS() {
        const scripts = [
            '/js/analytics.js',
            '/js/chat-widget.js',
            '/js/social-sharing.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });
    }
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', () => {
    const optimizer = new PerformanceOptimizer();
    
    // Apply optimizations
    PerformanceOptimizer.optimizeImages();
    PerformanceOptimizer.preloadCriticalResources();
    PerformanceOptimizer.enableResourceHints();
    
    CriticalPathOptimizer.inlineCriticalCSS();
    CriticalPathOptimizer.deferNonCriticalJS();
    
    // Clean up after 30 seconds
    setTimeout(() => {
        PerformanceOptimizer.cleanupMemory();
    }, 30000);
});

// Example usage for measuring custom operations
function measureOperation(name, operation) {
    performance.mark(`${name}-start`);
    
    const result = operation();
    
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    return result;
}

// Usage example
const result = measureOperation('data-processing', () => {
    // Some expensive operation
    return processLargeDataset();
});
```
*Notice: Comprehensive performance optimization including Core Web Vitals monitoring, resource optimization, and critical rendering path improvements.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Best practices</strong></summary>

<div>

- **Monitor Core Web Vitals** (LCP, FID, CLS) continuously
- **Optimize critical rendering path** with inline CSS and deferred JS
- **Implement lazy loading** for images and non-critical resources
- **Use resource hints** (preload, prefetch, preconnect)
- **Minimize and compress** assets (CSS, JS, images)
- **Enable browser caching** with proper cache headers

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Core Web Vitals` · `Resource Optimization` · `Caching` · `Lazy Loading` · `Critical Rendering Path`

</div>

### Web Security {#web-security}

<div class="concept-section mental-model">

🔒 **Think of it this way**  
*Web security is like building a fortress: you need multiple layers of protection, careful access control, and constant vigilance against attacks.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Data protection**: safeguards sensitive user information
- **Trust and compliance**: maintains user trust and regulatory compliance
- **Business continuity**: prevents costly security breaches
- **Reputation**: protects brand reputation from security incidents

</div>

<div class="runnable-model">

**Runnable mental model**
```html
<!-- CONTENT SECURITY POLICY (CSP) -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://trusted-cdn.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.example.com; 
               font-src 'self' https://fonts.googleapis.com;
               frame-ancestors 'none';
               base-uri 'self';
               form-action 'self';">

<!-- SECURITY HEADERS -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

<!-- HTTPS ENFORCEMENT -->
<script>
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
</script>

<!-- XSS PREVENTION -->
<script>
// Input sanitization function
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Safe DOM manipulation
function safelySetContent(element, content) {
    // Use textContent instead of innerHTML for user input
    element.textContent = content;
}

// Example: Safe user comment display
function displayUserComment(comment) {
    const commentElement = document.createElement('div');
    commentElement.className = 'user-comment';
    
    // Sanitize and safely set content
    const sanitizedComment = sanitizeInput(comment);
    commentElement.textContent = sanitizedComment;
    
    document.getElementById('comments').appendChild(commentElement);
}

// CSRF Protection
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// Add CSRF token to all AJAX requests
fetch('/api/user/update', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCSRFToken()
    },
    body: JSON.stringify({
        name: sanitizeInput(userInput.name),
        email: sanitizeInput(userInput.email)
    })
});
</script>

<!-- SECURE AUTHENTICATION -->
<script>
class SecureAuth {
    constructor() {
        this.tokenKey = 'auth_token';
        this.refreshKey = 'refresh_token';
    }
    
    // Secure token storage
    setTokens(accessToken, refreshToken) {
        // Use httpOnly cookies in production
        // This is simplified for demonstration
        sessionStorage.setItem(this.tokenKey, accessToken);
        localStorage.setItem(this.refreshKey, refreshToken);
    }
    
    // Automatic token refresh
    async refreshTokenIfNeeded() {
        const token = this.getAccessToken();
        if (!token || this.isTokenExpired(token)) {
            return await this.refreshAccessToken();
        }
        return token;
    }
    
    isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (e) {
            return true;
        }
    }
    
    async refreshAccessToken() {
        const refreshToken = localStorage.getItem(this.refreshKey);
        if (!refreshToken) {
            this.logout();
            return null;
        }
        
        try {
            const response = await fetch('/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            
            if (response.ok) {
                const { accessToken, refreshToken: newRefreshToken } = await response.json();
                this.setTokens(accessToken, newRefreshToken);
                return accessToken;
            } else {
                this.logout();
                return null;
            }
        } catch (error) {
            console.error('Token refresh failed:', error);
            this.logout();
            return null;
        }
    }
    
    logout() {
        sessionStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshKey);
        window.location.href = '/login';
    }
    
    getAccessToken() {
        return sessionStorage.getItem(this.tokenKey);
    }
}

// SECURE FILE UPLOAD
function secureFileUpload() {
    const fileInput = document.getElementById('fileUpload');
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (!file) return;
        
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            fileInput.value = '';
            return;
        }
        
        // Validate file size
        if (file.size > maxSize) {
            alert('File too large. Maximum size is 5MB.');
            fileInput.value = '';
            return;
        }
        
        // Additional security: check file signature
        const reader = new FileReader();
        reader.onload = function(e) {
            const arr = new Uint8Array(e.target.result).subarray(0, 4);
            let header = '';
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            
            // Basic file signature validation
            const validSignatures = {
                'ffd8ffe0': 'image/jpeg',
                'ffd8ffe1': 'image/jpeg',
                '89504e47': 'image/png',
                '47494638': 'image/gif'
            };
            
            if (!validSignatures[header]) {
                alert('File appears to be corrupted or invalid.');
                fileInput.value = '';
                return;
            }
            
            uploadFile(file);
        };
        
        reader.readAsArrayBuffer(file);
    });
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('csrf_token', getCSRFToken());
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-Token': getCSRFToken()
            }
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Upload successful:', result);
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Upload error:', error);
    }
}

// SECURE COMMUNICATION
class SecureAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.auth = new SecureAuth();
    }
    
    async request(endpoint, options = {}) {
        const token = await this.auth.refreshTokenIfNeeded();
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRFToken(),
                ...options.headers
            }
        };
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        
        if (response.status === 401) {
            this.auth.logout();
            throw new Error('Authentication required');
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// SECURITY MONITORING
class SecurityMonitor {
    constructor() {
        this.suspiciousActivity = [];
        this.init();
    }
    
    init() {
        // Monitor for suspicious activity
        this.detectRapidRequests();
        this.detectXSSAttempts();
        this.detectCSRFAttempts();
    }
    
    detectRapidRequests() {
        let requestCount = 0;
        const timeWindow = 60000; // 1 minute
        
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            requestCount++;
            
            setTimeout(() => requestCount--, timeWindow);
            
            if (requestCount > 100) { // More than 100 requests per minute
                this.reportSuspiciousActivity('rapid_requests', {
                    count: requestCount,
                    timestamp: Date.now()
                });
            }
            
            return originalFetch.apply(this, args);
        };
    }
    
    detectXSSAttempts() {
        // Monitor for script injection attempts
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const scriptTags = node.querySelectorAll('script');
                        if (scriptTags.length > 0) {
                            this.reportSuspiciousActivity('potential_xss', {
                                element: node.outerHTML.substring(0, 200),
                                timestamp: Date.now()
                            });
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    detectCSRFAttempts() {
        // Monitor for requests without proper CSRF tokens
        const originalSend = XMLHttpRequest.prototype.send;
        
        XMLHttpRequest.prototype.send = function(data) {
            if (this.method === 'POST' || this.method === 'PUT' || this.method === 'DELETE') {
                const hasCSRFToken = this.getRequestHeader('X-CSRF-Token') ||
                                   (data && data.includes('csrf_token'));
                
                if (!hasCSRFToken) {
                    securityMonitor.reportSuspiciousActivity('missing_csrf_token', {
                        method: this.method,
                        url: this.url,
                        timestamp: Date.now()
                    });
                }
            }
            
            return originalSend.call(this, data);
        };
    }
    
    reportSuspiciousActivity(type, details) {
        this.suspiciousActivity.push({ type, details });
        
        // Send to security monitoring service
        fetch('/security/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRFToken()
            },
            body: JSON.stringify({
                type,
                details,
                userAgent: navigator.userAgent,
                timestamp: Date.now(),
                url: window.location.href
            })
        }).catch(error => {
            console.error('Failed to report security incident:', error);
        });
    }
}

// Initialize security monitoring
const securityMonitor = new SecurityMonitor();
</script>

<!-- SECURITY BEST PRACTICES CHECKLIST -->
<!--
✅ Use HTTPS everywhere
✅ Implement Content Security Policy (CSP)
✅ Validate and sanitize all inputs
✅ Use secure authentication (JWT, OAuth)
✅ Implement CSRF protection
✅ Set secure HTTP headers
✅ Validate file uploads
✅ Monitor for suspicious activity
✅ Keep dependencies updated
✅ Implement rate limiting
✅ Use secure session management
✅ Encrypt sensitive data
-->
```
*Notice: Web security requires multiple layers of protection including input validation, secure communication, authentication, and continuous monitoring.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Security best practices</strong></summary>

<div>

- **HTTPS everywhere**: Force HTTPS with HSTS headers
- **Input validation**: Sanitize and validate all user inputs
- **Content Security Policy**: Implement strict CSP headers
- **Authentication**: Use secure token-based authentication
- **CSRF protection**: Include CSRF tokens in state-changing requests
- **Regular updates**: Keep all dependencies and frameworks updated

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`HTTPS` · `Input Validation` · `CSRF Protection` · `XSS Prevention` · `Authentication` · `Security Headers`

</div>

### Web APIs {#web-apis}

<div class="concept-section mental-model">

🌐 **Think of it this way**  
*Web APIs are like standardized electrical outlets: they provide consistent interfaces that different devices (applications) can plug into to access specific functionality.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Browser capabilities**: access native browser features from JavaScript
- **Enhanced UX**: create rich, interactive web applications
- **Performance**: offload tasks to browser-optimized implementations
- **Future-proofing**: use standardized APIs that evolve with the web platform

</div>

<div class="runnable-model">

**Runnable mental model**
```javascript
// GEOLOCATION API
class LocationService {
    constructor() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
        };
    }
    
    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    });
                },
                (error) => {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error('Location access denied by user'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error('Location information unavailable'));
                            break;
                        case error.TIMEOUT:
                            reject(new Error('Location request timed out'));
                            break;
                        default:
                            reject(new Error('Unknown geolocation error'));
                    }
                },
                this.options
            );
        });
    }
    
    watchPosition(callback) {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported');
        }
        
        return navigator.geolocation.watchPosition(
            callback,
            (error) => console.error('Location watch error:', error),
            this.options
        );
    }
    
    clearWatch(watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}

// NOTIFICATION API
class NotificationService {
    constructor() {
        this.permission = Notification.permission;
    }
    
    async requestPermission() {
        if ('Notification' in window) {
            this.permission = await Notification.requestPermission();
            return this.permission === 'granted';
        }
        return false;
    }
    
    async showNotification(title, options = {}) {
        if (this.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) {
                throw new Error('Notification permission denied');
            }
        }
        
        const defaultOptions = {
            icon: '/icon.png',
            badge: '/badge.png',
            vibrate: [200, 100, 200],
            requireInteraction: false,
            silent: false
        };
        
        const notification = new Notification(title, {
            ...defaultOptions,
            ...options
        });
        
        // Auto-close after 5 seconds if not interactive
        if (!options.requireInteraction) {
            setTimeout(() => notification.close(), 5000);
        }
        
        return notification;
    }
}

// WEB STORAGE API
class StorageService {
    constructor() {
        this.isLocalStorageAvailable = this.checkStorageAvailability('localStorage');
        this.isSessionStorageAvailable = this.checkStorageAvailability('sessionStorage');
    }
    
    checkStorageAvailability(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // Local Storage methods
    setLocal(key, value, expiration = null) {
        if (!this.isLocalStorageAvailable) {
            throw new Error('localStorage is not available');
        }
        
        const item = {
            value,
            timestamp: Date.now(),
            expiration
        };
        
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    getLocal(key) {
        if (!this.isLocalStorageAvailable) return null;
        
        try {
            const item = JSON.parse(localStorage.getItem(key));
            if (!item) return null;
            
            // Check expiration
            if (item.expiration && Date.now() > item.expiration) {
                localStorage.removeItem(key);
                return null;
            }
            
            return item.value;
        } catch (e) {
            return null;
        }
    }
    
    removeLocal(key) {
        if (this.isLocalStorageAvailable) {
            localStorage.removeItem(key);
        }
    }
    
    // Session Storage methods
    setSession(key, value) {
        if (!this.isSessionStorageAvailable) {
            throw new Error('sessionStorage is not available');
        }
        
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    getSession(key) {
        if (!this.isSessionStorageAvailable) return null;
        
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }
}

// FETCH API ENHANCED
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.defaultOptions = {
            timeout: 10000,
            retries: 3,
            retryDelay: 1000,
            ...options
        };
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...this.defaultOptions,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...this.defaultOptions.headers,
                ...options.headers
            }
        };
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);
        
        try {
            const response = await this.fetchWithRetry(url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    async fetchWithRetry(url, options) {
        let lastError;
        
        for (let i = 0; i <= options.retries; i++) {
            try {
                return await fetch(url, options);
            } catch (error) {
                lastError = error;
                
                if (i < options.retries) {
                    await new Promise(resolve => 
                        setTimeout(resolve, options.retryDelay * Math.pow(2, i))
                    );
                }
            }
        }
        
        throw lastError;
    }
    
    async get(endpoint, options = {}) {
        const response = await this.request(endpoint, {
            method: 'GET',
            ...options
        });
        return response.json();
    }
    
    async post(endpoint, data, options = {}) {
        const response = await this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
        return response.json();
    }
}

// WEB WORKERS API
class WorkerService {
    constructor() {
        this.workers = new Map();
    }
    
    createWorker(name, script) {
        if (typeof Worker === 'undefined') {
            throw new Error('Web Workers are not supported');
        }
        
        const worker = new Worker(script);
        this.workers.set(name, worker);
        
        return new Promise((resolve, reject) => {
            worker.onmessage = (e) => {
                if (e.data.type === 'ready') {
                    resolve(worker);
                }
            };
            
            worker.onerror = (error) => {
                reject(error);
            };
            
            // Send initialization message
            worker.postMessage({ type: 'init' });
        });
    }
    
    async executeInWorker(workerName, task, data) {
        const worker = this.workers.get(workerName);
        if (!worker) {
            throw new Error(`Worker '${workerName}' not found`);
        }
        
        return new Promise((resolve, reject) => {
            const taskId = Date.now() + Math.random();
            
            const handleMessage = (e) => {
                if (e.data.taskId === taskId) {
                    worker.removeEventListener('message', handleMessage);
                    
                    if (e.data.error) {
                        reject(new Error(e.data.error));
                    } else {
                        resolve(e.data.result);
                    }
                }
            };
            
            worker.addEventListener('message', handleMessage);
            
            worker.postMessage({
                type: 'task',
                taskId,
                task,
                data
            });
        });
    }
    
    terminateWorker(name) {
        const worker = this.workers.get(name);
        if (worker) {
            worker.terminate();
            this.workers.delete(name);
        }
    }
    
    terminateAllWorkers() {
        this.workers.forEach((worker, name) => {
            worker.terminate();
        });
        this.workers.clear();
    }
}

// INTERSECTION OBSERVER API
class LazyLoadService {
    constructor(options = {}) {
        this.options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1,
            ...options
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
        
        this.loadedElements = new Set();
    }
    
    observe(element) {
        if (this.loadedElements.has(element)) return;
        
        this.observer.observe(element);
    }
    
    unobserve(element) {
        this.observer.unobserve(element);
        this.loadedElements.delete(element);
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadElement(entry.target);
                this.observer.unobserve(entry.target);
                this.loadedElements.add(entry.target);
            }
        });
    }
    
    loadElement(element) {
        // Load images
        if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            element.onload = () => element.classList.add('loaded');
        }
        
        // Load background images
        if (element.dataset.bgSrc) {
            element.style.backgroundImage = `url(${element.dataset.bgSrc})`;
            element.classList.add('loaded');
        }
        
        // Load iframes
        if (element.tagName === 'IFRAME' && element.dataset.src) {
            element.src = element.dataset.src;
        }
        
        // Trigger custom load event
        element.dispatchEvent(new CustomEvent('lazyload', {
            detail: { element }
        }));
    }
    
    disconnect() {
        this.observer.disconnect();
        this.loadedElements.clear();
    }
}

// USAGE EXAMPLES
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize services
    const locationService = new LocationService();
    const notificationService = new NotificationService();
    const storageService = new StorageService();
    const apiClient = new APIClient('https://api.example.com');
    const workerService = new WorkerService();
    const lazyLoadService = new LazyLoadService();
    
    // Use geolocation
    try {
        const position = await locationService.getCurrentPosition();
        console.log('Current position:', position);
        
        // Store location for offline use
        storageService.setLocal('lastLocation', position, Date.now() + 3600000); // 1 hour
    } catch (error) {
        console.error('Location error:', error.message);
    }
    
    // Show notification
    try {
        await notificationService.showNotification('Welcome!', {
            body: 'Thanks for visiting our website',
            icon: '/welcome-icon.png'
        });
    } catch (error) {
        console.error('Notification error:', error.message);
    }
    
    // API request
    try {
        const users = await apiClient.get('/users');
        console.log('Users:', users);
    } catch (error) {
        console.error('API error:', error.message);
    }
    
    // Lazy load images
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyLoadService.observe(img);
    });
});
```
*Notice: Modern Web APIs provide powerful capabilities for creating rich, performant web applications with native-like features.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Web API best practices</strong></summary>

<div>

- **Feature detection**: Always check API availability before use
- **Graceful degradation**: Provide fallbacks for unsupported features
- **Permission handling**: Request permissions appropriately and handle denials
- **Performance**: Use Web Workers for CPU-intensive tasks
- **Storage limits**: Handle storage quotas and cleanup old data
- **Security**: Validate data from all external sources

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Progressive Web Apps` · `Service Workers` · `Browser APIs` · `Offline Functionality` · `Native Integration`

</div>

## Concepts

**HTML**: Hypertext Markup Language providing semantic structure for web content. Modern HTML5 includes semantic elements, form validation, multimedia support, and accessibility features for creating well-structured, meaningful web pages.

**CSS**: Cascading Style Sheets for styling and layout. Modern CSS3 includes Flexbox and Grid for layout, responsive design with media queries, animations, custom properties (variables), and advanced selectors.

**JavaScript**: Programming language for web interactivity. ES6+ features include modules, classes, async/await, destructuring, and modern browser APIs for creating dynamic, interactive web applications.

**HTTP Protocol**: Communication protocol between browsers and servers. Includes methods (GET, POST, PUT, DELETE), status codes, headers, caching mechanisms, and security features like HTTPS and HTTP/2.

**Web Performance**: Optimization techniques for fast, efficient web applications. Core Web Vitals (LCP, FID, CLS), resource optimization, lazy loading, caching strategies, and critical rendering path optimization.

**Web Security**: Protection against common vulnerabilities including XSS, CSRF, injection attacks. Implementation of HTTPS, Content Security Policy, input validation, secure authentication, and security headers.

**Web APIs**: Browser interfaces for accessing device capabilities and advanced features. Includes Geolocation, Notifications, Web Storage, Fetch API, Web Workers, and Intersection Observer for enhanced functionality.

### Modern Web Frameworks {#modern-frameworks}

<div class="concept-section mental-model">

⚡ **Think of it this way**  
*Web frameworks are like pre-built toolkits for construction: instead of crafting every nail and screw yourself, you get standardized tools and patterns to build applications faster and more reliably.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Development speed**: pre-built components and patterns
- **Best practices**: established conventions and architecture
- **Community support**: extensive ecosystem and documentation
- **Maintainability**: structured, scalable application architecture

</div>

<div class="runnable-model">

**Runnable mental model**
```javascript
// REACT - Component-based UI framework
import React, { useState, useEffect, useCallback } from 'react';

// Custom hook for data fetching
function useAPI(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let cancelled = false;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const result = await response.json();
                
                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
        
        return () => {
            cancelled = true;
        };
    }, [url]);
    
    return { data, loading, error };
}

// Reusable component with TypeScript
interface UserCardProps {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    onEdit?: (user: any) => void;
    onDelete?: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const handleEdit = useCallback(() => {
        onEdit?.(user);
    }, [user, onEdit]);
    
    const handleDelete = useCallback(() => {
        if (window.confirm(`Delete user ${user.name}?`)) {
            onDelete?.(user.id);
        }
    }, [user.id, user.name, onDelete]);
    
    return (
        <div className={`user-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="user-card__header" onClick={() => setIsExpanded(!isExpanded)}>
                {user.avatar && (
                    <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="user-card__avatar"
                        loading="lazy"
                    />
                )}
                <div className="user-card__info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
                <button 
                    className="user-card__toggle"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    {isExpanded ? '−' : '+'}
                </button>
            </div>
            
            {isExpanded && (
                <div className="user-card__actions">
                    <button onClick={handleEdit} className="btn btn--primary">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn--danger">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

// Main application component
const UserManagement: React.FC = () => {
    const { data: users, loading, error } = useAPI('/api/users');
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    const handleUserEdit = useCallback((user) => {
        // Navigate to edit page or open modal
        console.log('Editing user:', user);
    }, []);
    
    const handleUserDelete = useCallback(async (userId) => {
        try {
            await fetch(`/api/users/${userId}`, { method: 'DELETE' });
            // Refresh data or update state
            window.location.reload();
        } catch (error) {
            alert('Failed to delete user');
        }
    }, []);
    
    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    
    return (
        <div className="user-management">
            <header className="user-management__header">
                <h1>User Management</h1>
                <input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </header>
            
            <div className="user-management__grid">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={handleUserEdit}
                            onDelete={handleUserDelete}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        {searchTerm ? 'No users match your search' : 'No users found'}
                    </div>
                )}
            </div>
        </div>
    );
};

// VUE.JS - Progressive framework example
const { createApp, ref, computed, onMounted } = Vue;

const TodoApp = {
    setup() {
        const todos = ref([]);
        const newTodo = ref('');
        const filter = ref('all');
        
        const filteredTodos = computed(() => {
            switch (filter.value) {
                case 'active':
                    return todos.value.filter(todo => !todo.completed);
                case 'completed':
                    return todos.value.filter(todo => todo.completed);
                default:
                    return todos.value;
            }
        });
        
        const addTodo = () => {
            if (newTodo.value.trim()) {
                todos.value.push({
                    id: Date.now(),
                    text: newTodo.value.trim(),
                    completed: false
                });
                newTodo.value = '';
            }
        };
        
        const removeTodo = (id) => {
            const index = todos.value.findIndex(todo => todo.id === id);
            if (index > -1) {
                todos.value.splice(index, 1);
            }
        };
        
        const toggleTodo = (id) => {
            const todo = todos.value.find(todo => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        };
        
        onMounted(() => {
            // Load todos from localStorage
            const saved = localStorage.getItem('todos');
            if (saved) {
                todos.value = JSON.parse(saved);
            }
        });
        
        // Save to localStorage when todos change
        watchEffect(() => {
            localStorage.setItem('todos', JSON.stringify(todos.value));
        });
        
        return {
            todos,
            newTodo,
            filter,
            filteredTodos,
            addTodo,
            removeTodo,
            toggleTodo
        };
    },
    
    template: `
        <div class="todo-app">
            <h1>Todo App</h1>
            
            <form @submit.prevent="addTodo" class="todo-form">
                <input 
                    v-model="newTodo"
                    placeholder="Add a new todo..."
                    class="todo-input"
                >
                <button type="submit" class="btn btn--primary">Add</button>
            </form>
            
            <div class="todo-filters">
                <button 
                    @click="filter = 'all'"
                    :class="{ active: filter === 'all' }"
                    class="filter-btn"
                >
                    All
                </button>
                <button 
                    @click="filter = 'active'"
                    :class="{ active: filter === 'active' }"
                    class="filter-btn"
                >
                    Active
                </button>
                <button 
                    @click="filter = 'completed'"
                    :class="{ active: filter === 'completed' }"
                    class="filter-btn"
                >
                    Completed
                </button>
            </div>
            
            <ul class="todo-list">
                <li 
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    :class="{ completed: todo.completed }"
                    class="todo-item"
                >
                    <input 
                        type="checkbox"
                        :checked="todo.completed"
                        @change="toggleTodo(todo.id)"
                    >
                    <span>{{ todo.text }}</span>
                    <button 
                        @click="removeTodo(todo.id)"
                        class="btn btn--danger btn--small"
                    >
                        Delete
                    </button>
                </li>
            </ul>
            
            <div v-if="filteredTodos.length === 0" class="empty-state">
                No todos {{ filter === 'all' ? '' : filter }}
            </div>
        </div>
    `
};

// ANGULAR - Component-based application
// user.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';

@Component({
    selector: 'app-user',
    template: `
        <div class="user-component" [class.loading]="loading">
            <div class="user-header">
                <h2>{{ user?.name || 'Loading...' }}</h2>
                <div class="user-actions">
                    <button (click)="onEdit.emit(user)" 
                            [disabled]="loading" 
                            class="btn btn-primary">
                        Edit
                    </button>
                    <button (click)="onDelete.emit(user?.id)" 
                            [disabled]="loading" 
                            class="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
            
            <div class="user-details" *ngIf="user">
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Role:</strong> {{ user.role | titlecase }}</p>
                <p><strong>Status:</strong> 
                    <span [class]="'status-' + user.status">
                        {{ user.status | titlecase }}
                    </span>
                </p>
            </div>
            
            <div class="loading-spinner" *ngIf="loading">
                Loading user data...
            </div>
        </div>
    `,
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() user: User | null = null;
    @Input() loading: boolean = false;
    @Output() onEdit = new EventEmitter<User>();
    @Output() onDelete = new EventEmitter<number>();
    
    ngOnInit(): void {
        // Component initialization logic
        console.log('User component initialized with:', this.user);
    }
}

// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = '/api/users';
    private usersSubject = new BehaviorSubject<User[]>([]);
    public users$ = this.usersSubject.asObservable();
    
    constructor(private http: HttpClient) {}
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            map(users => {
                this.usersSubject.next(users);
                return users;
            }),
            catchError(error => {
                console.error('Failed to load users:', error);
                throw error;
            })
        );
    }
    
    createUser(user: Partial<User>): Observable<User> {
        return this.http.post<User>(this.apiUrl, user).pipe(
            map(newUser => {
                const currentUsers = this.usersSubject.value;
                this.usersSubject.next([...currentUsers, newUser]);
                return newUser;
            })
        );
    }
    
    updateUser(id: number, updates: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, updates).pipe(
            map(updatedUser => {
                const currentUsers = this.usersSubject.value;
                const index = currentUsers.findIndex(u => u.id === id);
                if (index !== -1) {
                    currentUsers[index] = updatedUser;
                    this.usersSubject.next([...currentUsers]);
                }
                return updatedUser;
            })
        );
    }
    
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            map(() => {
                const currentUsers = this.usersSubject.value;
                const filteredUsers = currentUsers.filter(u => u.id !== id);
                this.usersSubject.next(filteredUsers);
            })
        );
    }
}

// SVELTE - Reactive framework example
<!-- UserList.svelte -->
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    // Reactive stores
    const users = writable([]);
    const loading = writable(true);
    const error = writable(null);
    
    let searchQuery = '';
    
    // Reactive statements
    $: filteredUsers = $users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    async function loadUsers() {
        try {
            loading.set(true);
            const response = await fetch('/api/users');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const userData = await response.json();
            users.set(userData);
            error.set(null);
        } catch (err) {
            error.set(err.message);
            users.set([]);
        } finally {
            loading.set(false);
        }
    }
    
    async function deleteUser(id) {
        if (!confirm('Are you sure?')) return;
        
        try {
            await fetch(`/api/users/${id}`, { method: 'DELETE' });
            users.update(list => list.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    }
    
    onMount(loadUsers);
</script>

<div class="user-list">
    <header>
        <h1>Users</h1>
        <input
            bind:value={searchQuery}
            placeholder="Search users..."
            class="search-input"
        />
    </header>
    
    {#if $loading}
        <div class="loading">Loading users...</div>
    {:else if $error}
        <div class="error">Error: {$error}</div>
    {:else}
        <div class="users-grid">
            {#each filteredUsers as user (user.id)}
                <div class="user-card">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <div class="user-actions">
                        <button class="btn btn-primary">Edit</button>
                        <button 
                            class="btn btn-danger"
                            on:click={() => deleteUser(user.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            {:else}
                <div class="empty-state">
                    {searchQuery ? 'No users match your search' : 'No users found'}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .user-list {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .users-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
    
    .user-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }
    
    .user-card:hover {
        transform: translateY(-2px);
    }
    
    .search-input {
        width: 100%;
        max-width: 400px;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    
    .loading, .error, .empty-state {
        text-align: center;
        padding: 2rem;
    }
    
    .error {
        color: #dc3545;
    }
</style>
```
*Notice: Modern frameworks provide component-based architecture, reactive state management, and developer-friendly patterns for building scalable applications.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>Framework best practices</strong></summary>

<div>

- **Component composition**: Break UI into reusable, single-responsibility components
- **State management**: Use appropriate state management patterns (hooks, stores, services)
- **Performance**: Implement lazy loading, memoization, and optimized rendering
- **TypeScript**: Add type safety for better development experience
- **Testing**: Write unit tests for components and integration tests for workflows
- **Build optimization**: Configure bundling, code splitting, and asset optimization

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Component Architecture` · `State Management` · `Build Tools` · `TypeScript` · `Testing` · `Performance`

</div>

### Progressive Web Apps (PWA) {#pwa}

<div class="concept-section mental-model">

🚀 **Think of it this way**  
*PWAs are like native mobile apps disguised as websites: they can work offline, send notifications, and be installed on devices, but they're built with web technologies.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Native-like experience**: app-like behavior with web technology
- **Offline functionality**: works without internet connection
- **Cross-platform**: single codebase for all devices
- **Discoverable**: indexed by search engines unlike native apps

</div>

<div class="runnable-model">

**Runnable mental model**
```javascript
// SERVICE WORKER - The heart of PWA
// sw.js
const CACHE_NAME = 'pwa-cache-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/styles.css',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip external requests
    if (!request.url.startsWith(self.location.origin)) return;
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    // Update cache in background for API requests
                    if (request.url.includes('/api/')) {
                        fetchAndCache(request);
                    }
                    return cachedResponse;
                }
                
                // Network request for new resources
                return fetchAndCache(request);
            })
            .catch(() => {
                // Fallback for offline pages
                if (request.destination === 'document') {
                    return caches.match('/offline.html');
                }
                
                // Fallback for images
                if (request.destination === 'image') {
                    return caches.match('/icons/offline-image.png');
                }
                
                return new Response('Network error', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
    );
});

async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        
        // Clone response for caching
        const responseClone = response.clone();
        
        // Determine cache strategy
        const isAPI = request.url.includes('/api/');
        const cacheName = isAPI ? DYNAMIC_CACHE : STATIC_CACHE;
        
        // Cache successful responses
        if (response.status === 200) {
            const cache = await caches.open(cacheName);
            await cache.put(request, responseClone);
        }
        
        return response;
    } catch (error) {
        throw error;
    }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(handleBackgroundSync());
    }
});

async function handleBackgroundSync() {
    try {
        // Process queued offline actions
        const offlineActions = await getOfflineActions();
        
        for (const action of offlineActions) {
            await processOfflineAction(action);
        }
        
        await clearOfflineActions();
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: 'New update available!',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('PWA Notification', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            self.clients.openWindow('/notifications')
        );
    }
});

// PWA MAIN APPLICATION
// app.js
class PWAManager {
    constructor() {
        this.swRegistration = null;
        this.isOnline = navigator.onLine;
        this.offlineQueue = [];
        
        this.init();
    }
    
    async init() {
        // Register service worker
        await this.registerServiceWorker();
        
        // Setup offline handling
        this.setupOfflineHandling();
        
        // Setup install prompt
        this.setupInstallPrompt();
        
        // Setup push notifications
        await this.setupPushNotifications();
        
        // Setup background sync
        this.setupBackgroundSync();
    }
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                this.swRegistration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', this.swRegistration);
                
                // Handle updates
                this.swRegistration.addEventListener('updatefound', () => {
                    const newWorker = this.swRegistration.installing;
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            this.showUpdateAvailable();
                        }
                    });
                });
                
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
    
    setupOfflineHandling() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.processOfflineQueue();
            this.hideOfflineIndicator();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showOfflineIndicator();
        });
        
        // Intercept form submissions when offline
        document.addEventListener('submit', (event) => {
            if (!this.isOnline) {
                event.preventDefault();
                this.queueOfflineAction('form-submit', {
                    formData: new FormData(event.target),
                    url: event.target.action,
                    method: event.target.method
                });
            }
        });
    }
    
    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (event) => {
            // Prevent default install prompt
            event.preventDefault();
            deferredPrompt = event;
            
            // Show custom install button
            this.showInstallButton();
        });
        
        // Handle install button click
        document.addEventListener('click', async (event) => {
            if (event.target.id === 'install-button' && deferredPrompt) {
                // Show install prompt
                deferredPrompt.prompt();
                
                // Wait for user choice
                const result = await deferredPrompt.userChoice;
                console.log('Install prompt result:', result);
                
                deferredPrompt = null;
                this.hideInstallButton();
            }
        });
    }
    
    async setupPushNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted' && this.swRegistration) {
                try {
                    const subscription = await this.swRegistration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: this.urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                    });
                    
                    // Send subscription to server
                    await this.sendSubscriptionToServer(subscription);
                } catch (error) {
                    console.error('Push subscription failed:', error);
                }
            }
        }
    }
    
    setupBackgroundSync() {
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            // Background sync is available
            console.log('Background sync is supported');
        }
    }
    
    queueOfflineAction(type, data) {
        const action = {
            id: Date.now(),
            type,
            data,
            timestamp: new Date().toISOString()
        };
        
        this.offlineQueue.push(action);
        
        // Store in IndexedDB for persistence
        this.storeOfflineAction(action);
        
        // Register for background sync
        if (this.swRegistration && this.swRegistration.sync) {
            this.swRegistration.sync.register('background-sync');
        }
        
        this.showOfflineMessage(`Action queued for when you're back online`);
    }
    
    async processOfflineQueue() {
        while (this.offlineQueue.length > 0) {
            const action = this.offlineQueue.shift();
            
            try {
                await this.processOfflineAction(action);
                this.removeOfflineAction(action.id);
            } catch (error) {
                console.error('Failed to process offline action:', error);
                // Re-queue the action
                this.offlineQueue.unshift(action);
                break;
            }
        }
    }
    
    async processOfflineAction(action) {
        switch (action.type) {
            case 'form-submit':
                return await fetch(action.data.url, {
                    method: action.data.method,
                    body: action.data.formData
                });
            
            case 'api-request':
                return await fetch(action.data.url, action.data.options);
            
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }
    
    showOfflineIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.textContent = 'You are offline. Some features may be limited.';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f39c12;
            color: white;
            text-align: center;
            padding: 10px;
            z-index: 10000;
        `;
        document.body.appendChild(indicator);
    }
    
    hideOfflineIndicator() {
        const indicator = document.getElementById('offline-indicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    showUpdateAvailable() {
        const updateBanner = document.createElement('div');
        updateBanner.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background: #007bff; color: white; padding: 15px; border-radius: 5px; z-index: 10000;">
                <p>A new version is available!</p>
                <button onclick="location.reload()" style="background: white; color: #007bff; border: none; padding: 5px 10px; border-radius: 3px;">
                    Update
                </button>
            </div>
        `;
        document.body.appendChild(updateBanner);
    }
    
    showInstallButton() {
        if (!document.getElementById('install-button')) {
            const button = document.createElement('button');
            button.id = 'install-button';
            button.textContent = 'Install App';
            button.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 10000;
                cursor: pointer;
            `;
            document.body.appendChild(button);
        }
    }
    
    hideInstallButton() {
        const button = document.getElementById('install-button');
        if (button) {
            button.remove();
        }
    }
    
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        
        return outputArray;
    }
}

// WEB APP MANIFEST
// manifest.json
{
    "name": "Progressive Web App Demo",
    "short_name": "PWA Demo",
    "description": "A demo Progressive Web Application",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#007bff",
    "orientation": "portrait-primary",
    "icons": [
        {
            "src": "/icons/icon-72.png",
            "sizes": "72x72",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-96.png",
            "sizes": "96x96",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-128.png",
            "sizes": "128x128",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-384.png",
            "sizes": "384x384",
            "type": "image/png",
            "purpose": "maskable any"
        },
        {
            "src": "/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable any"
        }
    ],
    "categories": ["productivity", "utilities"],
    "lang": "en",
    "dir": "ltr",
    "screenshots": [
        {
            "src": "/screenshots/desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
        },
        {
            "src": "/screenshots/mobile.png",
            "sizes": "375x812",
            "type": "image/png",
            "form_factor": "narrow"
        }
    ]
}

// Initialize PWA
const pwaManager = new PWAManager();
```
*Notice: PWAs bridge the gap between web and native applications, providing app-like experiences while maintaining web advantages like discoverability and cross-platform compatibility.*

</div>

<div class="concept-section best-practices">

<details>
<summary>✅ <strong>PWA best practices</strong></summary>

<div>

- **Service Worker strategy**: Implement appropriate caching strategies for different content types
- **Offline experience**: Provide meaningful offline pages and functionality
- **App manifest**: Configure proper icons, colors, and display modes
- **Performance**: Optimize for fast loading and smooth interactions
- **Installation**: Provide clear install prompts and onboarding
- **Push notifications**: Use judiciously and provide value to users

</div>
</details>

</div>

<div class="concept-section connection-map">

🗺️ **Connection map**  
`Service Workers` · `Offline Strategy` · `Web App Manifest` · `Push Notifications` · `Installation` · `Caching`

</div>

## Summary

Modern web development encompasses a vast ecosystem of technologies, frameworks, and best practices for creating performant, secure, and user-friendly applications. From foundational HTML, CSS, and JavaScript to advanced concepts like PWAs and modern frameworks, developers need to master multiple layers of web technology.

Key areas include semantic HTML5 for structure, CSS3 for styling and layout (Flexbox, Grid), ES6+ JavaScript for interactivity, HTTP protocol understanding, performance optimization techniques, comprehensive security measures, and modern development workflows using frameworks like React, Vue, or Angular.

The evolution toward Progressive Web Apps represents the convergence of web and native app experiences, providing offline functionality, native-like features, and cross-platform compatibility while maintaining the web's inherent advantages of discoverability and ease of deployment.