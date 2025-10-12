# Web Development

## Brief Summary

Web development encompasses using HTML, CSS, and JavaScript technologies to create interactive websites and applications. Modern web development focuses on browser-server communication, responsive design, and user experience. Core technologies: HTML5 semantic elements, CSS3 advanced features (Grid, Flexbox), ES6+ JavaScript, HTTP protocol, and REST APIs. Common pitfalls include cross-browser compatibility, performance optimization, and security concerns.

## Concepts

### HTML {#html}

<div class="concept-section definition">

📋 **Concept Definition**  
**HyperText Markup Language** defining structure and semantics of web content. **Elements**: tags (<tagname>), attributes (id, class, data-*), semantic tags (header, nav, main, article, section, footer). **HTML5**: video, audio, canvas, SVG, form validation, local storage APIs. **Document structure**: <!DOCTYPE html>, <html>, <head> (metadata, title, links), <body> (content). **Forms**: input types (text, email, date, file), validation attributes (required, pattern, min/max). **Accessibility**: ARIA attributes (role, aria-label), semantic tags aid screen readers. **Best practices**: semantic HTML for meaning, validate markup, avoid inline styles, use alt for images, proper heading hierarchy (h1-h6).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Cascading Style Sheets** for styling HTML presentation. **Selectors**: element (p), class (.class), id (#id), attribute ([type="text"]), pseudo-classes (:hover, :nth-child), pseudo-elements (::before, ::after). **Box model**: content, padding, border, margin, box-sizing. **Layout**: **Flexbox** (1D layout, flex containers), **Grid** (2D layout, grid template areas), positioning (static, relative, absolute, fixed, sticky). **Responsive design**: media queries, viewport units (vw, vh), mobile-first approach. **Preprocessors**: Sass, LESS (variables, nesting, mixins). **Modern features**: CSS variables (--color), animations, transitions, transforms. **Specificity**: inline (1000) > id (100) > class (10) > element (1).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**High-level, interpreted programming language** for web interactivity. **ES6+ features**: arrow functions, destructuring, spread operator, template literals, async/await, modules (import/export), classes. **DOM manipulation**: querySelector, addEventListener, createElement, classList. **Event handling**: bubbling, capturing, delegation, preventDefault. **Async programming**: callbacks, Promises, async/await, fetch API. **Data types**: primitives (string, number, boolean, null, undefined, symbol, bigint), objects, arrays. **Scope**: global, function, block (let/const). **Closures**: functions accessing outer scope. **Prototype-based inheritance**: prototypal chain, __proto__. **Frameworks**: React, Vue, Angular. **Runtime**: browser (V8, SpiderMonkey), Node.js (server-side).

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Application-layer protocol** for client-server communication on the web. **Methods**: GET (retrieve), POST (create), PUT (update/replace), PATCH (partial update), DELETE (remove), HEAD (metadata), OPTIONS (CORS preflight). **Status codes**: 1xx (informational), 2xx (success: 200 OK, 201 Created), 3xx (redirection: 301 Moved, 304 Not Modified), 4xx (client error: 400 Bad Request, 401 Unauthorized, 404 Not Found), 5xx (server error: 500 Internal Server Error, 503 Service Unavailable). **Headers**: request (Accept, Authorization, Cookie), response (Content-Type, Set-Cookie, Cache-Control), general (Date, Connection). **HTTP/2**: multiplexing, header compression, server push. **HTTP/3**: QUIC protocol, UDP-based. **HTTPS**: TLS/SSL encryption for secure communication.

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

<div class="concept-section definition">

� **Concept Definition**  
**Web applications with native-like capabilities** using modern web technologies. **Requirements**: HTTPS, service worker, web app manifest (manifest.json). **Service worker**: JavaScript proxy intercepting network requests, enables offline functionality, background sync, push notifications. **Manifest**: app metadata (name, icons, theme color, display mode: standalone/fullscreen). **Capabilities**: installable (add to home screen), offline-first (cache assets), push notifications, background sync, camera/geolocation access. **Caching strategies**: cache-first, network-first, stale-while-revalidate. **Lighthouse**: audit tool for PWA compliance. **Use cases**: Twitter Lite, Starbucks, Uber. **vs Native apps**: single codebase, no app store approval, smaller size, but limited API access.

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

<div class="concept-section definition">

� **Concept Definition**  
**Techniques for improving web page speed and efficiency.** **Core Web Vitals**: **LCP** (Largest Contentful Paint <2.5s), **FID** (First Input Delay <100ms), **CLS** (Cumulative Layout Shift <0.1). **Resource optimization**: minification (CSS, JS), compression (gzip, Brotli), image formats (WebP, AVIF), lazy loading (images, iframes), code splitting (dynamic imports). **Caching**: HTTP cache headers (Cache-Control, ETag), service workers, CDN. **Critical rendering path**: minimize critical resources, defer non-critical CSS/JS, preload key assets. **JavaScript optimization**: tree shaking, code splitting, avoid blocking main thread. **Performance budgets**: set size limits for assets. **Tools**: Lighthouse, WebPageTest, Chrome DevTools Performance panel.

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

<div class="concept-section definition">

� **Concept Definition**  
**Practices protecting web applications from attacks.** **Common vulnerabilities**: **XSS** (Cross-Site Scripting: inject malicious scripts, prevent with sanitization/CSP), **CSRF** (Cross-Site Request Forgery: unauthorized actions, prevent with tokens), **SQL Injection** (malicious SQL, use parameterized queries), **Clickjacking** (trick users into clicking, X-Frame-Options header). **Security headers**: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Content-Type-Options (nosniff). **Authentication**: JWT tokens, OAuth2, session management, secure cookies (httpOnly, secure, sameSite). **HTTPS**: TLS/SSL encryption, certificate validation. **Input validation**: sanitize user input, whitelist allowed values. **OWASP Top 10**: industry standard vulnerability list.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**Browser-provided JavaScript interfaces** for accessing device/browser features. **Common APIs**: **Fetch** (HTTP requests replacing XMLHttpRequest), **Geolocation** (navigator.geolocation), **Web Storage** (localStorage, sessionStorage), **IndexedDB** (client-side database), **Web Workers** (background threads), **Service Workers** (offline, push notifications), **Notifications** (system notifications), **Intersection Observer** (viewport visibility), **WebSockets** (bidirectional communication), **Canvas/WebGL** (graphics), **Web Audio** (sound processing), **Payment Request** (checkout). **Permissions**: user consent required for sensitive APIs (location, camera, notifications). **Feature detection**: check API availability before use.

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

<div class="concept-section definition">

📋 **Concept Definition**  
**JavaScript libraries/frameworks** for building complex web applications. **React**: component-based library, virtual DOM, JSX, hooks (useState, useEffect), unidirectional data flow. **Vue**: progressive framework, template syntax, reactive data binding, composition API. **Angular**: full framework, TypeScript-based, dependency injection, RxJS observables. **Component architecture**: reusable UI components, props/events, state management. **State management**: Redux (React), Vuex/Pinia (Vue), NgRx (Angular), or modern: Zustand, Jotai. **Routing**: React Router, Vue Router, Angular Router (SPAs). **Build tools**: Vite (fast dev server), Webpack (bundler), Rollup. **SSR/SSG**: Next.js (React), Nuxt.js (Vue), Angular Universal. **Best practices**: component composition, separation of concerns, performance optimization.

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

<div class="concept-section definition">

� **Concept Definition**  
**Web applications with native-like capabilities** using modern web technologies. **Requirements**: HTTPS, service worker, web app manifest (manifest.json). **Service worker**: JavaScript proxy intercepting network requests, enables offline functionality, background sync, push notifications. **Manifest**: app metadata (name, icons, theme color, display mode: standalone/fullscreen). **Capabilities**: installable (add to home screen), offline-first (cache assets), push notifications, background sync, camera/geolocation access. **Caching strategies**: cache-first, network-first, stale-while-revalidate. **Lighthouse**: audit tool for PWA compliance. **Use cases**: Twitter Lite, Starbucks, Uber. **vs Native apps**: single codebase, no app store approval, smaller size, but limited API access.

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

### Advanced CSS Techniques and Modern Layouts {#advanced-css-layouts}
<!-- tags: css, grid, flexbox, animations, responsive, custom-properties -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced CSS encompasses modern layout systems, animations, and architectural patterns for scalable styling. **CSS Grid** provides two-dimensional layouts, **Flexbox** handles one-dimensional arrangements, **CSS Custom Properties** enable dynamic theming, **CSS-in-JS** allows component-scoped styles. **Container Queries** enable responsive components, **CSS Layers** manage specificity, **CSS Houdini** extends styling capabilities. Modern patterns include **BEM methodology**, **CSS modules**, **Styled Components**.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Layout control**: Precise positioning and responsive design
- **Performance**: Efficient rendering and smooth animations
- **Maintainability**: Organized, scalable CSS architecture
- **User experience**: Polished interactions and visual feedback

</div>

<div class="runnable-model" data-filter="advanced-css">

**Runnable mental model**
```css
/* 1. ADVANCED CSS GRID LAYOUTS */

/* Complex grid system with named areas */
.dashboard-layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 250px 1fr 200px;
  gap: 20px;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Responsive grid with container queries */
@container (max-width: 768px) {
  .dashboard-layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

/* CSS Subgrid for complex layouts */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 4;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-image { grid-row: 1; }
.card-title { grid-row: 2; }
.card-content { grid-row: 3; }
.card-actions { grid-row: 4; }

/* 2. ADVANCED FLEXBOX PATTERNS */

/* Auto-sizing flex items with content-based distribution */
.dynamic-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 auto;
  min-width: 200px;
  max-width: 400px;
}

/* Sticky footer with flexbox */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}

/* Perfect centering with modern techniques */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Alternative with CSS Grid */
  display: grid;
  place-items: center;
}

/* 3. CSS CUSTOM PROPERTIES AND THEMING */

:root {
  /* Color system */
  --color-primary-h: 220;
  --color-primary-s: 85%;
  --color-primary-l: 60%;
  
  --color-primary: hsl(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l));
  --color-primary-dark: hsl(var(--color-primary-h), var(--color-primary-s), calc(var(--color-primary-l) - 20%));
  --color-primary-light: hsl(var(--color-primary-h), var(--color-primary-s), calc(var(--color-primary-l) + 20%));
  
  /* Typography scale */
  --font-size-base: 1rem;
  --font-size-scale: 1.25;
  --font-size-xs: calc(var(--font-size-base) / var(--font-size-scale) / var(--font-size-scale));
  --font-size-sm: calc(var(--font-size-base) / var(--font-size-scale));
  --font-size-lg: calc(var(--font-size-base) * var(--font-size-scale));
  --font-size-xl: calc(var(--font-size-base) * var(--font-size-scale) * var(--font-size-scale));
  
  /* Spacing system */
  --space-unit: 0.5rem;
  --space-xs: calc(var(--space-unit) * 0.5);
  --space-sm: var(--space-unit);
  --space-md: calc(var(--space-unit) * 2);
  --space-lg: calc(var(--space-unit) * 4);
  --space-xl: calc(var(--space-unit) * 8);
  
  /* Animation timing */
  --animation-duration-fast: 150ms;
  --animation-duration-normal: 300ms;
  --animation-duration-slow: 500ms;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark theme implementation */
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
  --color-surface: #2d2d2d;
  
  color-scheme: dark;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-surface: #f5f5f5;
  
  color-scheme: light;
}

/* Theme-aware component */
.button {
  background: var(--color-primary);
  color: var(--color-bg);
  border: none;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-base);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--animation-duration-fast) var(--animation-easing);
}

.button:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 4. ADVANCED ANIMATIONS AND INTERACTIONS */

/* Complex keyframe animations */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(0);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-bounce-in {
  animation: bounceIn var(--animation-duration-slow) var(--animation-easing);
}

/* Scroll-based animations with CSS */
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-out;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Advanced hover effects */
.card-hover {
  position: relative;
  overflow: hidden;
  transition: transform var(--animation-duration-normal) var(--animation-easing);
}

.card-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left var(--animation-duration-slow) var(--animation-easing);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
}

.card-hover:hover::before {
  left: 100%;
}

/* 5. MODERN CSS ARCHITECTURE PATTERNS */

/* BEM Methodology */
.block {
  /* Block styles */
}

.block__element {
  /* Element styles */
}

.block__element--modifier {
  /* Modified element styles */
}

/* CSS Modules approach */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.container.fluid {
  max-width: none;
}

/* Component-based styling */
.component {
  /* Base component styles */
  isolation: isolate; /* Create new stacking context */
}

.component[data-variant="primary"] {
  /* Primary variant */
}

.component[data-size="large"] {
  /* Large size modifier */
}

/* 6. RESPONSIVE DESIGN WITH CONTAINER QUERIES */

.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  .sidebar-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

@container sidebar (min-width: 400px) {
  .sidebar-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Media queries for global layout */
@media (max-width: 768px) {
  :root {
    --space-unit: 0.375rem;
    --font-size-base: 0.9rem;
  }
}

@media (min-width: 1200px) {
  :root {
    --space-unit: 0.625rem;
    --font-size-base: 1.1rem;
  }
}

/* 7. CSS LOGICAL PROPERTIES */

.block {
  margin-block-start: var(--space-md);
  margin-block-end: var(--space-lg);
  padding-inline: var(--space-md);
  border-inline-start: 3px solid var(--color-primary);
}

/* 8. MODERN CSS FEATURES */

/* CSS Layers for cascade management */
@layer reset, base, components, utilities, overrides;

@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
}

@layer components {
  .button {
    /* Component styles */
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .sr-only { 
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
}

/* CSS Nesting */
.navigation {
  background: var(--color-surface);
  
  & ul {
    list-style: none;
    padding: 0;
    
    & li {
      display: inline-block;
      
      & a {
        display: block;
        padding: var(--space-sm) var(--space-md);
        text-decoration: none;
        color: var(--color-text);
        
        &:hover {
          background: var(--color-primary);
          color: var(--color-bg);
        }
        
        &[aria-current="page"] {
          font-weight: bold;
          background: var(--color-primary-light);
        }
      }
    }
  }
}

/* CSS Houdini - Paint API example */
.gradient-border {
  background: paint(gradient-border);
  --gradient-colors: #ff6b6b, #4ecdc4, #45b7d1;
  --border-width: 3px;
}

/* CSS Scroll Snap */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1rem;
}

.carousel-item {
  min-width: 300px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* CSS Containment */
.widget {
  contain: layout style;
}

.heavy-component {
  contain: strict;
}
```

```javascript
// JavaScript for advanced CSS interactions

// Theme switcher with CSS custom properties
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.applyTheme(this.currentTheme);
    this.setupToggle();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  setupToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.observeElements();
  }

  observeElements() {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Container Query polyfill helper
class ContainerQueryManager {
  constructor() {
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.setupContainers();
  }

  setupContainers() {
    const containers = document.querySelectorAll('[data-container]');
    containers.forEach(container => {
      this.resizeObserver.observe(container);
    });
  }

  handleResize(entries) {
    entries.forEach(entry => {
      const { inlineSize } = entry.contentBoxSize[0];
      const container = entry.target;
      
      // Apply size-based classes
      container.classList.toggle('container-sm', inlineSize < 400);
      container.classList.toggle('container-md', inlineSize >= 400 && inlineSize < 600);
      container.classList.toggle('container-lg', inlineSize >= 600);
    });
  }
}

// CSS-in-JS alternative implementation
class StyleManager {
  constructor() {
    this.styleSheet = document.createElement('style');
    document.head.appendChild(this.styleSheet);
    this.rules = new Map();
  }

  addRule(selector, styles) {
    const cssText = Object.entries(styles)
      .map(([prop, value]) => `${this.kebabCase(prop)}: ${value}`)
      .join('; ');
    
    const rule = `${selector} { ${cssText} }`;
    this.rules.set(selector, rule);
    this.updateStyleSheet();
  }

  removeRule(selector) {
    this.rules.delete(selector);
    this.updateStyleSheet();
  }

  updateStyleSheet() {
    this.styleSheet.textContent = Array.from(this.rules.values()).join('\n');
  }

  kebabCase(str) {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }
}

// Progressive enhancement for CSS animations
class AnimationEnhancer {
  constructor() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setupAnimations();
  }

  setupAnimations() {
    if (this.prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduce-motion');
    }

    this.prefersReducedMotion.addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    });
  }
}

// Initialize all managers
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new ScrollAnimations();
  new ContainerQueryManager();
  new AnimationEnhancer();
});
```
*Notice: Advanced CSS techniques should be used progressively, ensuring fallbacks for older browsers and respecting user preferences.*

</div>

### Modern JavaScript ES6+ and Browser APIs {#modern-javascript-apis}
<!-- tags: javascript, es6, apis, modules, async, webapi -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern JavaScript encompasses ES6+ features and comprehensive Browser APIs for rich web applications. **ES6+ features**: Classes, modules, destructuring, async/await, template literals, arrow functions. **Browser APIs**: Fetch, Storage, Geolocation, File API, Web Workers, Intersection Observer, Resize Observer, Payment Request. **Module systems**: ES modules, dynamic imports, tree shaking. **Async patterns**: Promises, async/await, concurrent execution, streaming.*

</div>

<div class="runnable-model" data-filter="modern-js">

**Runnable mental model**
```javascript
// 1. ADVANCED ES6+ FEATURES AND PATTERNS

// Class-based architecture with private fields
class DataManager {
  // Private fields
  #cache = new Map();
  #observers = new Set();
  #apiBaseUrl;

  constructor(apiBaseUrl) {
    this.#apiBaseUrl = apiBaseUrl;
  }

  // Private method
  #notifyObservers(event, data) {
    this.#observers.forEach(observer => {
      if (typeof observer[event] === 'function') {
        observer[event](data);
      }
    });
  }

  // Public methods with advanced features
  async fetchData(endpoint, options = {}) {
    const cacheKey = `${endpoint}:${JSON.stringify(options)}`;
    
    // Check cache first
    if (this.#cache.has(cacheKey)) {
      return this.#cache.get(cacheKey);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeout || 5000);

      const response = await fetch(`${this.#apiBaseUrl}/${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      this.#cache.set(cacheKey, data);
      this.#notifyObservers('dataFetched', { endpoint, data });
      
      return data;
    } catch (error) {
      this.#notifyObservers('error', { endpoint, error });
      throw error;
    }
  }

  // Observer pattern implementation
  subscribe(observer) {
    this.#observers.add(observer);
    return () => this.#observers.delete(observer);
  }

  // Generator for paginated data
  async* paginatedFetch(endpoint, pageSize = 10) {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const data = await this.fetchData(endpoint, {
        params: { page, limit: pageSize }
      });

      yield data.items;
      
      hasMore = data.items.length === pageSize;
      page++;
    }
  }
}

// 2. ADVANCED ASYNC PATTERNS

// Concurrent execution with proper error handling
async function concurrentDataFetch(urls) {
  const fetchPromises = urls.map(async (url, index) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      return { index, data: await response.json(), success: true };
    } catch (error) {
      return { index, error: error.message, success: false };
    }
  });

  return await Promise.allSettled(fetchPromises);
}

// Retry mechanism with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Stream processing with async iterators
async function processStream(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      yield chunk;
    }
  } finally {
    reader.releaseLock();
  }
}

// 3. MODERN MODULE PATTERNS

// Dynamic imports with error handling
class ModuleLoader {
  static cache = new Map();
  
  static async loadModule(modulePath) {
    if (this.cache.has(modulePath)) {
      return this.cache.get(modulePath);
    }

    try {
      const module = await import(modulePath);
      this.cache.set(modulePath, module);
      return module;
    } catch (error) {
      console.error(`Failed to load module ${modulePath}:`, error);
      throw error;
    }
  }

  static async loadConditionally(condition, modulePath) {
    if (condition) {
      return this.loadModule(modulePath);
    }
    return null;
  }
}

// Feature detection and progressive enhancement
const FeatureDetector = {
  supportsWebP: () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  },

  supportsIntersectionObserver: () => 'IntersectionObserver' in window,
  
  supportsServiceWorker: () => 'serviceWorker' in navigator,
  
  supportsWebAssembly: () => 'WebAssembly' in window,

  async loadPolyfills() {
    const polyfills = [];
    
    if (!this.supportsIntersectionObserver()) {
      polyfills.push(import('./polyfills/intersection-observer.js'));
    }
    
    if (!window.fetch) {
      polyfills.push(import('./polyfills/fetch.js'));
    }

    return Promise.all(polyfills);
  }
};

// 4. ADVANCED BROWSER APIS

// File handling with drag and drop
class FileHandler {
  constructor(dropZone) {
    this.dropZone = dropZone;
    this.setupEventListeners();
  }

  setupEventListeners() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, this.preventDefaults, false);
    });

    this.dropZone.addEventListener('drop', this.handleDrop.bind(this), false);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  async handleDrop(e) {
    const dt = e.dataTransfer;
    const files = [...dt.files];

    for (const file of files) {
      await this.processFile(file);
    }
  }

  async processFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.size > maxSize) {
      throw new Error('File too large');
    }

    const arrayBuffer = await file.arrayBuffer();
    const hash = await this.calculateHash(arrayBuffer);
    
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      hash,
      data: arrayBuffer
    };
  }

  async calculateHash(arrayBuffer) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

// Web Workers for heavy computations
class WorkerManager {
  constructor() {
    this.workers = new Map();
  }

  async createWorker(name, script) {
    if (this.workers.has(name)) {
      return this.workers.get(name);
    }

    const worker = new Worker(script);
    this.workers.set(name, worker);

    // Wrapper for promise-based communication
    worker.postMessage = (data) => {
      return new Promise((resolve, reject) => {
        const id = Math.random().toString(36).substr(2, 9);
        
        const handler = (event) => {
          if (event.data.id === id) {
            worker.removeEventListener('message', handler);
            if (event.data.error) {
              reject(new Error(event.data.error));
            } else {
              resolve(event.data.result);
            }
          }
        };

        worker.addEventListener('message', handler);
        worker.postMessage({ id, ...data });
      });
    };

    return worker;
  }

  terminateWorker(name) {
    const worker = this.workers.get(name);
    if (worker) {
      worker.terminate();
      this.workers.delete(name);
    }
  }

  terminateAll() {
    this.workers.forEach((worker, name) => {
      this.terminateWorker(name);
    });
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observer = new PerformanceObserver(this.handlePerformanceEntry.bind(this));
    this.setupObserver();
  }

  setupObserver() {
    this.observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
  }

  handlePerformanceEntry(list) {
    for (const entry of list.getEntries()) {
      this.metrics.set(entry.name, {
        duration: entry.duration,
        startTime: entry.startTime,
        entryType: entry.entryType
      });
    }
  }

  mark(name) {
    performance.mark(name);
  }

  measure(name, startMark, endMark) {
    performance.measure(name, startMark, endMark);
  }

  getMetric(name) {
    return this.metrics.get(name);
  }

  getAllMetrics() {
    return Object.fromEntries(this.metrics);
  }

  // Core Web Vitals monitoring
  getCoreWebVitals() {
    return new Promise((resolve) => {
      const vitals = {};

      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        vitals.lcp = entries[entries.length - 1].startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0];
        vitals.fid = firstInput.processingStart - firstInput.startTime;
      }).observe({ entryTypes: ['first-input'], buffered: true });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        vitals.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'], buffered: true });

      setTimeout(() => resolve(vitals), 3000);
    });
  }
}

// 5. STORAGE AND CACHING STRATEGIES

class StorageManager {
  constructor() {
    this.supportsIndexedDB = 'indexedDB' in window;
    this.db = null;
  }

  async initIndexedDB(dbName = 'AppDB', version = 1) {
    if (!this.supportsIndexedDB) {
      throw new Error('IndexedDB not supported');
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('cache')) {
          const store = db.createObjectStore('cache', { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async setItem(key, value, expiryTime = null) {
    const item = {
      id: key,
      value,
      timestamp: Date.now(),
      expiry: expiryTime ? Date.now() + expiryTime : null
    };

    const transaction = this.db.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    
    return new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getItem(key) {
    const transaction = this.db.transaction(['cache'], 'readonly');
    const store = transaction.objectStore('cache');
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const item = request.result;
        if (!item) {
          resolve(null);
          return;
        }

        // Check expiry
        if (item.expiry && Date.now() > item.expiry) {
          this.removeItem(key);
          resolve(null);
          return;
        }

        resolve(item.value);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async removeItem(key) {
    const transaction = this.db.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearExpired() {
    const transaction = this.db.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    const index = store.index('timestamp');
    
    const now = Date.now();
    const range = IDBKeyRange.upperBound(now);
    
    return new Promise((resolve, reject) => {
      const request = index.openCursor(range);
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const item = cursor.value;
          if (item.expiry && now > item.expiry) {
            cursor.delete();
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}

// 6. REAL-TIME COMMUNICATION

class WebSocketManager {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      ...options
    };
    this.ws = null;
    this.reconnectAttempts = 0;
    this.messageQueue = [];
    this.listeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.flushMessageQueue();
        this.emit('connected');
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit('message', data);
          
          if (data.type) {
            this.emit(data.type, data.payload);
          }
        } catch (error) {
          this.emit('error', error);
        }
      };

      this.ws.onclose = (event) => {
        this.emit('disconnected', event);
        
        if (!event.wasClean && this.shouldReconnect()) {
          this.reconnect();
        }
      };

      this.ws.onerror = (error) => {
        this.emit('error', error);
        reject(error);
      };
    });
  }

  send(data) {
    const message = JSON.stringify(data);
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.ws.send(message);
    }
  }

  shouldReconnect() {
    return this.reconnectAttempts < this.options.maxReconnectAttempts;
  }

  async reconnect() {
    this.reconnectAttempts++;
    
    await new Promise(resolve => 
      setTimeout(resolve, this.options.reconnectInterval)
    );
    
    try {
      await this.connect();
    } catch (error) {
      if (this.shouldReconnect()) {
        this.reconnect();
      } else {
        this.emit('maxReconnectAttemptsReached');
      }
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
    }
  }
}

// Usage examples
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize managers
  const dataManager = new DataManager('https://api.example.com');
  const fileHandler = new FileHandler(document.getElementById('drop-zone'));
  const performanceMonitor = new PerformanceMonitor();
  const storageManager = new StorageManager();
  await storageManager.initIndexedDB();

  // Load polyfills if needed
  await FeatureDetector.loadPolyfills();

  // Setup WebSocket connection
  const wsManager = new WebSocketManager('wss://api.example.com/ws');
  wsManager.on('message', (data) => {
    console.log('Received:', data);
  });

  try {
    await wsManager.connect();
  } catch (error) {
    console.error('WebSocket connection failed:', error);
  }

  // Monitor Core Web Vitals
  const vitals = await performanceMonitor.getCoreWebVitals();
  console.log('Core Web Vitals:', vitals);
});
```
*Notice: Modern JavaScript features should be used with appropriate polyfills and feature detection for broader browser compatibility.*

</div>

### HTTP Protocol and Web Standards {#http-web-standards}
<!-- tags: http, rest, graphql, websockets, performance, caching -->

<div class="concept-section definition">

📋 **Concept Definition**  
*HTTP (Hypertext Transfer Protocol) is the foundation of web communication, defining request-response cycles between clients and servers. **HTTP/1.1** introduced persistent connections and chunked encoding, **HTTP/2** added multiplexing and server push, **HTTP/3** uses QUIC for improved performance. **REST** architectural style uses HTTP methods (GET, POST, PUT, DELETE) for resource manipulation. **GraphQL** provides flexible query language for APIs. **WebSockets** enable real-time bidirectional communication.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: Understanding HTTP optimization techniques
- **API design**: Proper REST and GraphQL implementation
- **Real-time features**: WebSocket communication patterns
- **Caching strategies**: Effective use of HTTP caching headers

</div>

<div class="runnable-model" data-filter="http-standards">

**Runnable mental model**
```javascript
// 1. ADVANCED HTTP CLIENT IMPLEMENTATION

class HTTPClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...options
    };
    
    this.interceptors = {
      request: [],
      response: [],
      error: []
    };
    
    this.cache = new Map();
    this.pendingRequests = new Map();
  }

  // Request interceptor
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  // Response interceptor
  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  // Error interceptor
  addErrorInterceptor(interceptor) {
    this.interceptors.error.push(interceptor);
  }

  async request(url, options = {}) {
    const fullURL = `${this.baseURL}${url}`;
    const config = { ...this.defaultOptions, ...options };
    
    // Apply request interceptors
    let requestConfig = config;
    for (const interceptor of this.interceptors.request) {
      requestConfig = await interceptor(requestConfig);
    }

    // Check cache for GET requests
    if (requestConfig.method === 'GET' || !requestConfig.method) {
      const cacheKey = this.getCacheKey(fullURL, requestConfig);
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      // Deduplicate identical pending requests
      if (this.pendingRequests.has(cacheKey)) {
        return this.pendingRequests.get(cacheKey);
      }
    }

    const requestPromise = this.executeRequest(fullURL, requestConfig);
    
    // Store pending request for deduplication
    const cacheKey = this.getCacheKey(fullURL, requestConfig);
    this.pendingRequests.set(cacheKey, requestPromise);
    
    try {
      const response = await requestPromise;
      this.pendingRequests.delete(cacheKey);
      
      // Apply response interceptors
      let processedResponse = response;
      for (const interceptor of this.interceptors.response) {
        processedResponse = await interceptor(processedResponse);
      }
      
      // Cache GET responses
      if ((!requestConfig.method || requestConfig.method === 'GET') && response.ok) {
        this.setCache(cacheKey, processedResponse, requestConfig.cacheTime);
      }
      
      return processedResponse;
    } catch (error) {
      this.pendingRequests.delete(cacheKey);
      
      // Apply error interceptors
      for (const interceptor of this.interceptors.error) {
        error = await interceptor(error);
      }
      
      throw error;
    }
  }

  async executeRequest(url, config) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new HTTPError(response.status, response.statusText, response);
      }

      // Clone response for potential retries
      const clonedResponse = response.clone();
      
      try {
        const data = await response.json();
        return { ...clonedResponse, data };
      } catch (e) {
        // If JSON parsing fails, return text
        const text = await clonedResponse.text();
        return { ...clonedResponse, data: text };
      }
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new HTTPError(408, 'Request Timeout');
      }
      
      // Retry logic
      if (config.retries > 0 && this.shouldRetry(error)) {
        await this.delay(config.retryDelay);
        return this.executeRequest(url, { ...config, retries: config.retries - 1 });
      }
      
      throw error;
    }
  }

  shouldRetry(error) {
    return error.status >= 500 || error.name === 'TypeError';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getCacheKey(url, config) {
    return `${url}:${JSON.stringify(config.params || {})}`;
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data, cacheTime = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      expiry: Date.now() + cacheTime
    });
  }

  // HTTP method helpers
  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

class HTTPError extends Error {
  constructor(status, message, response = null) {
    super(message);
    this.name = 'HTTPError';
    this.status = status;
    this.response = response;
  }
}

// 2. REST API CLIENT WITH ADVANCED FEATURES

class RESTClient extends HTTPClient {
  constructor(baseURL, options = {}) {
    super(baseURL, options);
    this.setupDefaultInterceptors();
  }

  setupDefaultInterceptors() {
    // Add authentication token
    this.addRequestInterceptor(async (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        };
      }
      return config;
    });

    // Handle token refresh
    this.addErrorInterceptor(async (error) => {
      if (error.status === 401) {
        try {
          await this.refreshToken();
          // Retry original request
          return this.request(error.config.url, error.config);
        } catch (refreshError) {
          // Redirect to login
          window.location.href = '/login';
        }
      }
      throw error;
    });

    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      this.addRequestInterceptor(async (config) => {
        console.log('Request:', config);
        return config;
      });

      this.addResponseInterceptor(async (response) => {
        console.log('Response:', response);
        return response;
      });
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await this.post('/auth/refresh', { token: refreshToken });
    localStorage.setItem('authToken', response.data.accessToken);
    return response.data;
  }

  // Resource methods with pagination
  async getResource(resource, params = {}) {
    return this.get(`/${resource}`, { params });
  }

  async getResourceById(resource, id, params = {}) {
    return this.get(`/${resource}/${id}`, { params });
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

  // Pagination helper
  async *paginateResource(resource, params = {}) {
    let page = 1;
    const limit = params.limit || 20;

    while (true) {
      const response = await this.getResource(resource, {
        ...params,
        page,
        limit
      });

      yield response.data.items;

      if (response.data.items.length < limit) break;
      page++;
    }
  }

  // Batch operations
  async batchCreate(resource, items) {
    return this.post(`/${resource}/batch`, { items });
  }

  async batchUpdate(resource, updates) {
    return this.patch(`/${resource}/batch`, { updates });
  }

  async batchDelete(resource, ids) {
    return this.delete(`/${resource}/batch`, { ids });
  }
}

// 3. GRAPHQL CLIENT IMPLEMENTATION

class GraphQLClient {
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    };
    this.cache = new Map();
  }

  async query(query, variables = {}, options = {}) {
    const config = { ...this.defaultOptions, ...options };
    const body = JSON.stringify({ query, variables });
    
    // Simple cache based on query + variables
    const cacheKey = this.getCacheKey(query, variables);
    if (config.useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: config.headers,
        body
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new GraphQLError(result.errors);
      }

      if (config.useCache) {
        this.cache.set(cacheKey, result);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async mutation(mutation, variables = {}, options = {}) {
    // Mutations typically shouldn't be cached
    return this.query(mutation, variables, { ...options, useCache: false });
  }

  getCacheKey(query, variables) {
    return `${query}:${JSON.stringify(variables)}`;
  }

  clearCache() {
    this.cache.clear();
  }

  // Subscription support (requires WebSocket)
  subscribe(subscription, variables = {}, handlers = {}) {
    const ws = new WebSocket(this.endpoint.replace('http', 'ws'));
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'start',
        payload: { query: subscription, variables }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'data' && handlers.onData) {
        handlers.onData(data.payload);
      } else if (data.type === 'error' && handlers.onError) {
        handlers.onError(data.payload);
      }
    };

    ws.onerror = (error) => {
      if (handlers.onError) handlers.onError(error);
    };

    return () => ws.close();
  }
}

class GraphQLError extends Error {
  constructor(errors) {
    super(errors.map(e => e.message).join(', '));
    this.name = 'GraphQLError';
    this.errors = errors;
  }
}

// 4. HTTP/2 AND HTTP/3 OPTIMIZATIONS

class ModernHTTPClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.supportsPush = 'serviceWorker' in navigator;
    this.supportsHTTP2 = this.detectHTTP2Support();
  }

  detectHTTP2Support() {
    // Feature detection for HTTP/2
    return 'fetch' in window && 'ReadableStream' in window;
  }

  // Server Push simulation
  async requestWithPush(url, pushResources = []) {
    if (!this.supportsPush) {
      return fetch(`${this.baseURL}${url}`);
    }

    // Pre-fetch related resources
    const pushPromises = pushResources.map(resource => 
      fetch(`${this.baseURL}${resource}`)
        .then(response => response.blob())
        .then(blob => {
          // Store in cache for later use
          if ('caches' in window) {
            return caches.open('push-cache').then(cache => {
              cache.put(resource, new Response(blob));
            });
          }
        })
        .catch(console.error)
    );

    // Start all requests concurrently
    const [mainResponse] = await Promise.all([
      fetch(`${this.baseURL}${url}`),
      ...pushPromises
    ]);

    return mainResponse;
  }

  // Multiplexing simulation for HTTP/1.1
  async multiplexRequests(requests) {
    const maxConcurrent = 6; // Browser limit
    const results = [];
    
    for (let i = 0; i < requests.length; i += maxConcurrent) {
      const batch = requests.slice(i, i + maxConcurrent);
      const batchPromises = batch.map(req => 
        fetch(`${this.baseURL}${req.url}`, req.options)
      );
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    return results;
  }

  // Stream processing for large responses
  async streamRequest(url, onChunk) {
    const response = await fetch(`${this.baseURL}${url}`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        onChunk(chunk);
      }
    } finally {
      reader.releaseLock();
    }
  }
}

// 5. CACHING STRATEGIES

class CacheManager {
  constructor() {
    this.strategies = {
      'cache-first': this.cacheFirst.bind(this),
      'network-first': this.networkFirst.bind(this),
      'cache-only': this.cacheOnly.bind(this),
      'network-only': this.networkOnly.bind(this),
      'stale-while-revalidate': this.staleWhileRevalidate.bind(this)
    };
  }

  async cacheFirst(request, cacheName = 'default') {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) return cached;
    
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  }

  async networkFirst(request, cacheName = 'default') {
    try {
      const response = await fetch(request);
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      return response;
    } catch (error) {
      const cache = await caches.open(cacheName);
      const cached = await cache.match(request);
      if (cached) return cached;
      throw error;
    }
  }

  async cacheOnly(request, cacheName = 'default') {
    const cache = await caches.open(cacheName);
    return cache.match(request);
  }

  async networkOnly(request) {
    return fetch(request);
  }

  async staleWhileRevalidate(request, cacheName = 'default') {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    // Always fetch to update cache
    const fetchPromise = fetch(request).then(response => {
      cache.put(request, response.clone());
      return response;
    });
    
    // Return cached version immediately if available
    if (cached) {
      return cached;
    }
    
    // Otherwise wait for network
    return fetchPromise;
  }

  getStrategy(strategyName) {
    return this.strategies[strategyName] || this.networkFirst;
  }
}

// 6. WEBSOCKET ADVANCED PATTERNS

class WebSocketPool {
  constructor(urls, options = {}) {
    this.urls = urls;
    this.options = {
      maxConnections: urls.length,
      reconnectDelay: 5000,
      heartbeatInterval: 30000,
      ...options
    };
    this.connections = new Map();
    this.loadBalancer = new RoundRobinBalancer(urls);
    this.messageQueue = [];
  }

  async connect() {
    const promises = this.urls.slice(0, this.options.maxConnections).map(url => {
      return this.createConnection(url);
    });
    
    await Promise.all(promises);
  }

  async createConnection(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        this.connections.set(url, {
          socket: ws,
          isAlive: true,
          url
        });
        
        this.setupHeartbeat(ws, url);
        resolve(ws);
      };
      
      ws.onmessage = (event) => {
        this.handleMessage(event, url);
      };
      
      ws.onclose = () => {
        this.connections.delete(url);
        this.reconnect(url);
      };
      
      ws.onerror = reject;
    });
  }

  setupHeartbeat(ws, url) {
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      } else {
        clearInterval(interval);
      }
    }, this.options.heartbeatInterval);
  }

  send(message) {
    const connection = this.loadBalancer.next();
    if (connection && connection.socket.readyState === WebSocket.OPEN) {
      connection.socket.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  broadcast(message) {
    this.connections.forEach(connection => {
      if (connection.socket.readyState === WebSocket.OPEN) {
        connection.socket.send(JSON.stringify(message));
      }
    });
  }

  handleMessage(event, url) {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'pong') {
        const connection = this.connections.get(url);
        if (connection) connection.isAlive = true;
        return;
      }
      
      this.onMessage(data, url);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  onMessage(data, url) {
    // Override in subclass
    console.log('Message from', url, ':', data);
  }

  async reconnect(url) {
    setTimeout(async () => {
      try {
        await this.createConnection(url);
        this.flushMessageQueue();
      } catch (error) {
        console.error('Reconnection failed:', error);
        this.reconnect(url);
      }
    }, this.options.reconnectDelay);
  }

  flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      this.send(this.messageQueue.shift());
    }
  }

  disconnect() {
    this.connections.forEach(connection => {
      connection.socket.close();
    });
    this.connections.clear();
  }
}

class RoundRobinBalancer {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }

  next() {
    const item = this.items[this.index];
    this.index = (this.index + 1) % this.items.length;
    return item;
  }
}

// Usage examples
document.addEventListener('DOMContentLoaded', async () => {
  // REST API client
  const api = new RESTClient('https://api.example.com');
  
  try {
    const users = await api.getResource('users', { page: 1, limit: 10 });
    console.log('Users:', users);
    
    const newUser = await api.createResource('users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', newUser);
  } catch (error) {
    console.error('API Error:', error);
  }

  // GraphQL client
  const graphql = new GraphQLClient('https://api.example.com/graphql');
  
  const query = `
    query GetUsers($limit: Int!) {
      users(limit: $limit) {
        id
        name
        email
      }
    }
  `;
  
  try {
    const result = await graphql.query(query, { limit: 10 });
    console.log('GraphQL result:', result.data);
  } catch (error) {
    console.error('GraphQL Error:', error);
  }

  // WebSocket pool
  const wsPool = new WebSocketPool([
    'wss://api1.example.com/ws',
    'wss://api2.example.com/ws'
  ]);
  
  wsPool.onMessage = (data, url) => {
    console.log('Message from', url, ':', data);
  };
  
  try {
    await wsPool.connect();
    wsPool.send({ type: 'subscribe', channel: 'updates' });
  } catch (error) {
    console.error('WebSocket Error:', error);
  }
});
```

```http
# HTTP/2 Server Push Example (Server-side)
HTTP/2 200 OK
Content-Type: text/html
Link: </style.css>; rel=preload; as=style
Link: </script.js>; rel=preload; as=script
Link: </image.png>; rel=preload; as=image

# HTTP Cache Headers
HTTP/1.1 200 OK
Cache-Control: public, max-age=31536000, immutable
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT
Vary: Accept-Encoding

# HTTP/3 with QUIC (Conceptual)
:status: 200
content-type: application/json
server: nginx/1.21
alt-svc: h3=":443"; ma=2592000

# RESTful API Design Examples

# Resource Collection
GET /api/v1/users?page=1&limit=20&sort=name&filter=active
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "next": "/api/v1/users?page=2",
    "last": "/api/v1/users?page=5"
  }
}

# Error Response
HTTP/1.1 400 Bad Request
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}

# Content Negotiation
GET /api/users/1
Accept: application/json
Accept: application/xml
Accept: text/csv

# Rate Limiting Headers
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```
*Notice: HTTP optimization requires understanding of browser behavior, network conditions, and proper implementation of caching strategies.*

</div>

### Web Performance Optimization {#web-performance}
<!-- tags: performance, optimization, loading, caching, metrics -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Web performance optimization focuses on reducing load times and improving user experience. **Critical Rendering Path** optimization minimizes render-blocking resources, **Resource Hints** (preload, prefetch, preconnect) improve loading efficiency, **Code Splitting** reduces bundle sizes, **Image Optimization** uses modern formats (WebP, AVIF), **Service Workers** enable caching strategies. **Core Web Vitals** (LCP, FID, CLS) measure user experience. **Bundle analyzers** identify optimization opportunities.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **User experience**: Faster sites improve engagement and conversion
- **SEO rankings**: Performance is a Google ranking factor
- **Mobile experience**: Critical for slower networks and devices
- **Business impact**: Every 100ms delay can reduce conversion by 1%

</div>

<div class="runnable-model" data-filter="performance">

**Runnable mental model**
```javascript
// 1. PERFORMANCE MONITORING AND MEASUREMENT

class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.setupObservers();
  }

  setupObservers() {
    // Core Web Vitals monitoring
    this.setupLCPObserver();
    this.setupFIDObserver();
    this.setupCLSObserver();
    this.setupTTFBObserver();
    
    // Resource timing
    this.setupResourceObserver();
    
    // Navigation timing
    this.setupNavigationObserver();
  }

  setupLCPObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.set('lcp', {
          value: lastEntry.startTime,
          element: lastEntry.element,
          timestamp: Date.now()
        });
        
        this.reportMetric('lcp', lastEntry.startTime);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', observer);
    }
  }

  setupFIDObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0];
        const fid = firstInput.processingStart - firstInput.startTime;
        
        this.metrics.set('fid', {
          value: fid,
          timestamp: Date.now()
        });
        
        this.reportMetric('fid', fid);
      });
      
      observer.observe({ entryTypes: ['first-input'], buffered: true });
      this.observers.set('fid', observer);
    }
  }

  setupCLSObserver() {
    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries = [];
    
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            
            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.set('cls', {
                value: clsValue,
                timestamp: Date.now()
              });
              this.reportMetric('cls', clsValue);
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['layout-shift'], buffered: true });
      this.observers.set('cls', observer);
    }
  }

  setupTTFBObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entry = entryList.getEntries()[0];
        const ttfb = entry.responseStart - entry.requestStart;
        
        this.metrics.set('ttfb', {
          value: ttfb,
          timestamp: Date.now()
        });
        
        this.reportMetric('ttfb', ttfb);
      });
      
      observer.observe({ entryTypes: ['navigation'], buffered: true });
      this.observers.set('ttfb', observer);
    }
  }

  setupResourceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          this.analyzeResource(entry);
        }
      });
      
      observer.observe({ entryTypes: ['resource'], buffered: true });
      this.observers.set('resource', observer);
    }
  }

  setupNavigationObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entry = entryList.getEntries()[0];
        this.analyzeNavigation(entry);
      });
      
      observer.observe({ entryTypes: ['navigation'], buffered: true });
      this.observers.set('navigation', observer);
    }
  }

  analyzeResource(entry) {
    const resourceMetrics = {
      name: entry.name,
      type: entry.initiatorType,
      size: entry.transferSize,
      duration: entry.duration,
      cached: entry.transferSize === 0 && entry.decodedBodySize > 0
    };

    // Identify performance issues
    if (entry.duration > 1000) {
      this.reportIssue('slow-resource', resourceMetrics);
    }

    if (entry.transferSize > 1024 * 1024) { // > 1MB
      this.reportIssue('large-resource', resourceMetrics);
    }
  }

  analyzeNavigation(entry) {
    const navigationMetrics = {
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      loadComplete: entry.loadEventEnd - entry.loadEventStart,
      domInteractive: entry.domInteractive - entry.fetchStart,
      firstPaint: this.getFirstPaint(),
      firstContentfulPaint: this.getFirstContentfulPaint()
    };

    this.metrics.set('navigation', navigationMetrics);
  }

  getFirstPaint() {
    const paint = performance.getEntriesByType('paint')
      .find(entry => entry.name === 'first-paint');
    return paint ? paint.startTime : null;
  }

  getFirstContentfulPaint() {
    const paint = performance.getEntriesByType('paint')
      .find(entry => entry.name === 'first-contentful-paint');
    return paint ? paint.startTime : null;
  }

  reportMetric(name, value) {
    // Send to analytics
    if (window.gtag) {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        custom_parameter: 'core_web_vitals'
      });
    }

    // Log for debugging
    console.log(`Performance Metric - ${name.toUpperCase()}: ${value.toFixed(2)}ms`);
  }

  reportIssue(type, details) {
    console.warn(`Performance Issue - ${type}:`, details);
    
    // Send to monitoring service
    if (window.Sentry) {
      Sentry.addBreadcrumb({
        category: 'performance',
        message: `Performance issue: ${type}`,
        data: details,
        level: 'warning'
      });
    }
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// 2. RESOURCE OPTIMIZATION

class ResourceOptimizer {
  constructor() {
    this.setupLazyLoading();
    this.setupPreloading();
    this.setupImageOptimization();
  }

  setupLazyLoading() {
    // Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      // Lazy load iframes
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            observer.unobserve(iframe);
          }
        });
      });

      document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframeObserver.observe(iframe);
      });
    }
  }

  loadImage(img) {
    const tempImage = new Image();
    
    tempImage.onload = () => {
      img.src = tempImage.src;
      img.classList.add('loaded');
    };
    
    tempImage.onerror = () => {
      img.classList.add('error');
      // Fallback image
      if (img.dataset.fallback) {
        img.src = img.dataset.fallback;
      }
    };

    // Support for responsive images
    if (img.dataset.srcset) {
      tempImage.srcset = img.dataset.srcset;
    }
    
    tempImage.src = img.dataset.src;
  }

  setupPreloading() {
    // Preload critical resources
    this.preloadCriticalAssets();
    
    // Prefetch likely next pages
    this.setupPrefetching();
  }

  preloadCriticalAssets() {
    const criticalAssets = [
      { href: '/fonts/main.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
      { href: '/css/critical.css', as: 'style' },
      { href: '/js/critical.js', as: 'script' }
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      Object.assign(link, asset);
      document.head.appendChild(link);
    });
  }

  setupPrefetching() {
    // Prefetch on hover
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href]');
      if (link && !link.dataset.prefetched) {
        this.prefetchPage(link.href);
        link.dataset.prefetched = 'true';
      }
    });

    // Prefetch visible links
    if ('IntersectionObserver' in window) {
      const linkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target;
            this.prefetchPage(link.href);
            linkObserver.unobserve(link);
          }
        });
      });

      document.querySelectorAll('a[href^="/"]').forEach(link => {
        linkObserver.observe(link);
      });
    }
  }

  prefetchPage(url) {
    if (this.shouldPrefetch(url)) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    }
  }

  shouldPrefetch(url) {
    // Don't prefetch external links
    if (url.startsWith('http') && !url.includes(window.location.hostname)) {
      return false;
    }
    
    // Don't prefetch large files
    const largeSuffixes = ['.pdf', '.zip', '.mp4', '.avi'];
    if (largeSuffixes.some(suffix => url.endsWith(suffix))) {
      return false;
    }
    
    // Check connection quality
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.saveData) {
        return false;
      }
    }
    
    return true;
  }

  setupImageOptimization() {
    // Modern format detection and serving
    this.detectImageSupport();
    
    // Responsive image optimization
    this.optimizeResponsiveImages();
  }

  detectImageSupport() {
    const formats = ['webp', 'avif', 'jp2'];
    
    formats.forEach(format => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      
      const dataURL = canvas.toDataURL(`image/${format}`);
      const supported = dataURL.indexOf(`data:image/${format}`) === 0;
      
      if (supported) {
        document.documentElement.classList.add(`supports-${format}`);
      }
    });
  }

  optimizeResponsiveImages() {
    // Generate srcset for responsive images
    document.querySelectorAll('img[data-responsive]').forEach(img => {
      const baseSrc = img.dataset.responsive;
      const sizes = [320, 640, 960, 1280, 1920];
      
      const srcset = sizes.map(size => {
        return `${baseSrc}?w=${size} ${size}w`;
      }).join(', ');
      
      img.srcset = srcset;
      img.sizes = '(max-width: 320px) 280px, (max-width: 640px) 600px, (max-width: 960px) 920px, (max-width: 1280px) 1240px, 1880px';
    });
  }
}

// 3. CODE SPLITTING AND BUNDLE OPTIMIZATION

class BundleOptimizer {
  constructor() {
    this.loadedModules = new Set();
    this.moduleCache = new Map();
  }

  async loadModule(modulePath, condition = true) {
    if (!condition) return null;
    
    if (this.loadedModules.has(modulePath)) {
      return this.moduleCache.get(modulePath);
    }

    try {
      const module = await import(modulePath);
      this.loadedModules.add(modulePath);
      this.moduleCache.set(modulePath, module);
      return module;
    } catch (error) {
      console.error(`Failed to load module ${modulePath}:`, error);
      throw error;
    }
  }

  async loadConditional(modules) {
    const loadPromises = Object.entries(modules).map(([key, config]) => {
      if (config.condition()) {
        return this.loadModule(config.path).then(module => ({ key, module }));
      }
      return Promise.resolve({ key, module: null });
    });

    const results = await Promise.all(loadPromises);
    return results.reduce((acc, { key, module }) => {
      acc[key] = module;
      return acc;
    }, {});
  }

  // Route-based code splitting
  async loadRouteModule(route) {
    const routeModules = {
      '/dashboard': () => import('./pages/Dashboard.js'),
      '/profile': () => import('./pages/Profile.js'),
      '/admin': () => import('./pages/Admin.js'),
      '/analytics': () => import('./pages/Analytics.js')
    };

    const loader = routeModules[route];
    if (!loader) {
      throw new Error(`No module found for route: ${route}`);
    }

    return await loader();
  }

  // Feature-based code splitting
  async loadFeature(featureName) {
    const features = {
      'advanced-charts': {
        path: './features/charts/index.js',
        condition: () => window.innerWidth > 768
      },
      'video-player': {
        path: './features/video/player.js',
        condition: () => 'HTMLVideoElement' in window
      },
      'rich-editor': {
        path: './features/editor/index.js',
        condition: () => true
      },
      'payment-gateway': {
        path: './features/payment/index.js',
        condition: () => window.location.protocol === 'https:'
      }
    };

    const feature = features[featureName];
    if (!feature) {
      throw new Error(`Feature ${featureName} not found`);
    }

    if (feature.condition()) {
      return await this.loadModule(feature.path);
    }

    return null;
  }

  // Progressive enhancement loader
  async enhanceProgressively() {
    const enhancements = [
      {
        name: 'intersection-observer',
        test: () => 'IntersectionObserver' in window,
        load: () => import('./polyfills/intersection-observer.js')
      },
      {
        name: 'resize-observer',
        test: () => 'ResizeObserver' in window,
        load: () => import('./polyfills/resize-observer.js')
      },
      {
        name: 'web-animations',
        test: () => 'animate' in HTMLElement.prototype,
        load: () => import('./polyfills/web-animations.js')
      }
    ];

    const missing = enhancements.filter(enhancement => !enhancement.test());
    
    if (missing.length > 0) {
      console.log('Loading polyfills for:', missing.map(e => e.name));
      await Promise.all(missing.map(enhancement => enhancement.load()));
    }
  }
}

// 4. CACHING STRATEGIES

class CacheManager {
  constructor() {
    this.strategies = new Map();
    this.setupDefaultStrategies();
  }

  setupDefaultStrategies() {
    // Cache-first for static assets
    this.addStrategy('static-assets', {
      pattern: /\.(css|js|png|jpg|jpeg|gif|woff2|woff)$/,
      strategy: 'cache-first',
      cacheName: 'static-assets-v1',
      maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
    });

    // Network-first for API calls
    this.addStrategy('api-calls', {
      pattern: /\/api\//,
      strategy: 'network-first',
      cacheName: 'api-cache-v1',
      maxAge: 5 * 60 * 1000 // 5 minutes
    });

    // Stale-while-revalidate for pages
    this.addStrategy('pages', {
      pattern: /\/(?!api\/)/,
      strategy: 'stale-while-revalidate',
      cacheName: 'pages-cache-v1',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }

  addStrategy(name, config) {
    this.strategies.set(name, config);
  }

  async handleRequest(request) {
    const url = new URL(request.url);
    
    for (const [name, strategy] of this.strategies) {
      if (strategy.pattern.test(url.pathname)) {
        return await this[strategy.strategy](request, strategy);
      }
    }

    // Default to network
    return await fetch(request);
  }

  async cacheFirst(request, strategy) {
    const cache = await caches.open(strategy.cacheName);
    const cached = await cache.match(request);
    
    if (cached && !this.isExpired(cached, strategy.maxAge)) {
      return cached;
    }

    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (cached) {
        return cached; // Return stale cache on network error
      }
      throw error;
    }
  }

  async networkFirst(request, strategy) {
    const cache = await caches.open(strategy.cacheName);
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }
      throw error;
    }
  }

  async staleWhileRevalidate(request, strategy) {
    const cache = await caches.open(strategy.cacheName);
    const cached = await cache.match(request);
    
    // Always start fetch in background
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    // Return cached version immediately if available
    if (cached) {
      return cached;
    }

    // Otherwise wait for network
    return await fetchPromise;
  }

  isExpired(response, maxAge) {
    const dateHeader = response.headers.get('date');
    if (!dateHeader) return false;
    
    const responseTime = new Date(dateHeader).getTime();
    return Date.now() - responseTime > maxAge;
  }

  async clearExpiredCache() {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        const strategy = Array.from(this.strategies.values())
          .find(s => s.cacheName === cacheName);
        
        if (strategy && this.isExpired(response, strategy.maxAge)) {
          await cache.delete(request);
        }
      }
    }
  }
}

// 5. CRITICAL RENDERING PATH OPTIMIZATION

class CriticalPathOptimizer {
  constructor() {
    this.criticalCSS = '';
    this.setupCriticalPath();
  }

  setupCriticalPath() {
    this.inlinekriticalCSS();
    this.deferNonCriticalCSS();
    this.optimizeJavaScript();
    this.preconnectToOrigins();
  }

  inlineCriticalCSS() {
    // Extract and inline critical CSS
    const criticalStyles = this.extractCriticalStyles();
    
    if (criticalStyles) {
      const style = document.createElement('style');
      style.textContent = criticalStyles;
      document.head.insertBefore(style, document.head.firstChild);
    }
  }

  extractCriticalStyles() {
    // This would typically be done during build time
    // Here's a runtime approach for demonstration
    const criticalSelectors = [
      'body', 'html', '.header', '.navigation',
      '.hero', '.above-fold', '.critical'
    ];

    const styles = [];
    
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type === CSSRule.STYLE_RULE) {
            const selector = rule.selectorText;
            if (criticalSelectors.some(critical => selector.includes(critical))) {
              styles.push(rule.cssText);
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheets may throw errors
        continue;
      }
    }

    return styles.join('\n');
  }

  deferNonCriticalCSS() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    
    stylesheets.forEach(link => {
      link.rel = 'preload';
      link.as = 'style';
      link.onload = () => {
        link.rel = 'stylesheet';
        link.onload = null;
      };
    });
  }

  optimizeJavaScript() {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script[src]:not([data-critical])');
    
    scripts.forEach(script => {
      if (!script.async && !script.defer) {
        script.defer = true;
      }
    });

    // Remove render-blocking scripts
    this.removeRenderBlockingScripts();
  }

  removeRenderBlockingScripts() {
    const blockingScripts = document.querySelectorAll('script[data-render-blocking]');
    
    blockingScripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src;
      newScript.async = true;
      
      // Load after page load
      window.addEventListener('load', () => {
        document.head.appendChild(newScript);
      });
      
      script.remove();
    });
  }

  preconnectToOrigins() {
    const origins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.example.com',
      'https://cdn.example.com'
    ];

    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = true;
      document.head.appendChild(link);
    });
  }

  // Resource prioritization
  prioritizeResources() {
    // High priority for critical resources
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach(img => {
      if ('fetchPriority' in img) {
        img.fetchPriority = 'high';
      }
    });

    // Low priority for non-critical resources
    const nonCriticalImages = document.querySelectorAll('img[data-priority="low"]');
    nonCriticalImages.forEach(img => {
      if ('fetchPriority' in img) {
        img.fetchPriority = 'low';
      }
    });
  }
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', () => {
  const performanceTracker = new PerformanceTracker();
  const resourceOptimizer = new ResourceOptimizer();
  const bundleOptimizer = new BundleOptimizer();
  const cacheManager = new CacheManager();
  const criticalPathOptimizer = new CriticalPathOptimizer();

  // Progressive enhancement
  bundleOptimizer.enhanceProgressively();

  // Clean up expired cache periodically
  setInterval(() => {
    cacheManager.clearExpiredCache();
  }, 60 * 60 * 1000); // Every hour

  // Report performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = performanceTracker.getMetrics();
      console.log('Performance Metrics:', metrics);
    }, 3000); // Wait for metrics to stabilize
  });

  // Handle visibility changes for performance tracking
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Send final metrics before page unload
      const metrics = performanceTracker.getMetrics();
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/analytics/performance', JSON.stringify(metrics));
      }
    }
  });
});
```

```css
/* Performance-optimized CSS patterns */

/* 1. Critical CSS (inlined in <head>) */
.critical-above-fold {
  /* Only styles for above-the-fold content */
  display: block;
  margin: 0;
  padding: 0;
}

/* 2. CSS containment for performance */
.widget {
  contain: layout style;
}

.isolated-component {
  contain: strict;
}

/* 3. GPU acceleration hints */
.animated-element {
  transform: translateZ(0); /* Force GPU layer */
  will-change: transform; /* Hint for optimization */
}

.scroll-element {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

/* 4. Optimized animations */
@keyframes optimizedFade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: optimizedFade 0.3s ease-out;
}

/* 5. Layout optimization */
.prevent-layout-shift {
  aspect-ratio: 16 / 9; /* Prevent CLS for images/videos */
}

.placeholder {
  min-height: 200px; /* Reserve space */
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* 6. Font optimization */
@font-face {
  font-family: 'OptimizedFont';
  src: url('/fonts/font.woff2') format('woff2'),
       url('/fonts/font.woff') format('woff');
  font-display: swap; /* Ensure text remains visible during font load */
  unicode-range: U+0000-00FF; /* Only load needed characters */
}

/* 7. Image optimization classes */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s;
}

.lazy-image.loaded {
  opacity: 1;
}

/* 8. Reduce paint complexity */
.complex-element {
  /* Avoid expensive properties during animations */
  transform: translateZ(0);
}

.avoid-paint-on-scroll {
  position: fixed; /* Remove from scroll paint */
  transform: translate3d(0, 0, 0);
}
```
*Notice: Performance optimization should be data-driven, using real user metrics to identify and prioritize improvements.*

</div>

### Advanced JavaScript Frameworks and Libraries {#modern-js-frameworks}
<!-- tags: frameworks, react, vue, angular, svelte, next, nuxt, libraries -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern JavaScript frameworks provide structured approaches to building complex web applications. **React** uses virtual DOM and component-based architecture with hooks, **Vue** offers progressive adoption with reactive data binding, **Angular** provides full framework with TypeScript and dependency injection, **Svelte** compiles to vanilla JavaScript for performance. **Next.js** adds SSR/SSG to React, **Nuxt** does the same for Vue, **meta-frameworks** handle routing, data fetching, and deployment.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Developer productivity**: Structured patterns and tooling speed development
- **Performance**: Optimized rendering and state management
- **Maintainability**: Component-based architecture improves code organization
- **Ecosystem**: Rich libraries and community support

</div>

<div class="runnable-model" data-filter="js-frameworks">

**Runnable mental model**
```typescript
// 1. REACT ADVANCED PATTERNS

// Custom Hooks for Complex State Logic
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Advanced data fetching hook with caching and error handling
function useAdvancedFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Map<string, T>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cached = cacheRef.current.get(url);
    if (cached) {
      setData(cached);
      setLoading(false);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Cache the result
      cacheRef.current.set(url, result);
      
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    cacheRef.current.delete(url);
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch };
}

// Advanced intersection observer hook
function useIntersectionObserver(
  targetRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      setEntry(entry);
    }, options);

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [targetRef, options]);

  return { isIntersecting, entry };
}

// Virtual scrolling hook for large lists
function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(items.length, start + visibleCount + overscan * 2);

    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const virtualItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index,
      offsetTop: (visibleRange.start + index) * itemHeight
    }));
  }, [items, visibleRange, itemHeight]);

  const totalHeight = items.length * itemHeight;

  return {
    virtualItems,
    totalHeight,
    setScrollTop,
    visibleRange
  };
}

// Advanced component patterns
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Render Props Pattern
interface DataProviderProps<T> {
  children: (data: {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  url: string;
}

function DataProvider<T>({ children, url }: DataProviderProps<T>) {
  const fetchResult = useAdvancedFetch<T>(url);
  return <>{children(fetchResult)}</>;
}

// Compound Component Pattern
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: React.ReactNode }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
}

// Higher-Order Component for authentication
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/auth/check');
          setIsAuthenticated(response.ok);
        } catch {
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <div>Please log in to access this page.</div>;
    }

    return <Component {...props} />;
  };
}

// Usage examples
const UserManagement: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(elementRef);

  return (
    <div>
      <Tabs defaultTab="users">
        <TabList>
          <Tab id="users">Users</Tab>
          <Tab id="roles">Roles</Tab>
          <Tab id="permissions">Permissions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel id="users">
            <DataProvider<User[]> url="/api/users">
              {({ data, loading, error, refetch }) => {
                if (loading) return <div>Loading users...</div>;
                if (error) return <div>Error: {error.message}</div>;

                return (
                  <div>
                    <button onClick={refetch}>Refresh</button>
                    <UserList users={data || []} />
                  </div>
                );
              }}
            </DataProvider>
          </TabPanel>

          <TabPanel id="roles">
            <RoleManagement />
          </TabPanel>

          <TabPanel id="permissions">
            <PermissionManagement />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <div ref={elementRef}>
        {isIntersecting && <LazyLoadedComponent />}
      </div>
    </div>
  );
};

// 2. VUE.JS ADVANCED PATTERNS

// Vue 3 Composition API with TypeScript
import { ref, reactive, computed, watch, onMounted, provide, inject } from 'vue';

// Advanced composable for form handling
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const values = reactive<T>({ ...initialValues });
  const errors = ref<Partial<Record<keyof T, string>>>({});
  const touched = ref<Partial<Record<keyof T, boolean>>>({});
  const isSubmitting = ref(false);

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  const isDirty = computed(() => {
    return Object.keys(values).some(key => 
      values[key] !== initialValues[key]
    );
  });

  function setFieldValue<K extends keyof T>(field: K, value: T[K]) {
    values[field] = value;
    touched.value[field] = true;
    validateField(field);
  }

  function setFieldError<K extends keyof T>(field: K, error: string) {
    errors.value[field] = error;
  }

  function clearFieldError<K extends keyof T>(field: K) {
    delete errors.value[field];
  }

  function validateField<K extends keyof T>(field: K) {
    // Custom validation logic would go here
    // For example, email validation
    if (field === 'email' && values[field]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values[field] as string)) {
        setFieldError(field, 'Invalid email format');
      } else {
        clearFieldError(field);
      }
    }
  }

  function resetForm() {
    Object.assign(values, initialValues);
    errors.value = {};
    touched.value = {};
    isSubmitting.value = false;
  }

  async function submitForm(onSubmit: (values: T) => Promise<void>) {
    isSubmitting.value = true;
    
    // Validate all fields
    Object.keys(values).forEach(key => validateField(key as keyof T));
    
    if (isValid.value) {
      try {
        await onSubmit(values);
        resetForm();
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    isSubmitting.value = false;
  }

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    isSubmitting,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateField,
    resetForm,
    submitForm
  };
}

// Advanced data fetching composable
export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  options: {
    immediate?: boolean;
    watch?: any[];
    transform?: (data: T) => any;
  } = {}
) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const pending = ref(false);

  const execute = async () => {
    pending.value = true;
    error.value = null;

    try {
      const result = await fetcher();
      data.value = options.transform ? options.transform(result) : result;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error');
    } finally {
      pending.value = false;
    }
  };

  const refresh = () => execute();

  onMounted(() => {
    if (options.immediate !== false) {
      execute();
    }
  });

  if (options.watch) {
    watch(options.watch, execute);
  }

  return {
    data: readonly(data),
    error: readonly(error),
    pending: readonly(pending),
    execute,
    refresh
  };
}

// Vue component with advanced patterns
export default defineComponent({
  name: 'AdvancedUserComponent',
  setup() {
    // Form handling
    const userForm = useForm({
      name: '',
      email: '',
      role: 'user' as 'admin' | 'user'
    });

    // Data fetching
    const { data: users, pending, refresh } = useAsyncData(
      () => fetch('/api/users').then(res => res.json()),
      { immediate: true }
    );

    // Virtual scrolling for large lists
    const containerRef = ref<HTMLElement>();
    const itemHeight = 50;
    const containerHeight = 400;

    const { virtualItems, totalHeight, setScrollTop } = useVirtualScrolling(
      users.value || [],
      itemHeight,
      containerHeight
    );

    // Provide/inject pattern for deep component communication
    const userContext = {
      users,
      refresh,
      createUser: async (userData: any) => {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        refresh();
      }
    };

    provide('userContext', userContext);

    return {
      userForm,
      users,
      pending,
      refresh,
      containerRef,
      virtualItems,
      totalHeight,
      setScrollTop
    };
  },

  render() {
    return (
      <div class="user-management">
        <form onSubmit={this.userForm.submitForm}>
          <input
            v-model={this.userForm.values.name}
            placeholder="Name"
            class={this.userForm.errors.name ? 'error' : ''}
          />
          {this.userForm.errors.name && (
            <span class="error-message">{this.userForm.errors.name}</span>
          )}

          <input
            v-model={this.userForm.values.email}
            type="email"
            placeholder="Email"
            class={this.userForm.errors.email ? 'error' : ''}
          />
          {this.userForm.errors.email && (
            <span class="error-message">{this.userForm.errors.email}</span>
          )}

          <button type="submit" disabled={this.userForm.isSubmitting}>
            {this.userForm.isSubmitting ? 'Creating...' : 'Create User'}
          </button>
        </form>

        <div 
          ref="containerRef"
          class="virtual-list"
          style={{ height: `${this.containerHeight}px`, overflow: 'auto' }}
          onScroll={(e) => this.setScrollTop(e.target.scrollTop)}
        >
          <div style={{ height: `${this.totalHeight}px`, position: 'relative' }}>
            {this.virtualItems.map(({ item, index, offsetTop }) => (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: `${offsetTop}px`,
                  height: `${this.itemHeight}px`,
                  width: '100%'
                }}
              >
                <UserCard user={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
});

// 3. ANGULAR ADVANCED PATTERNS

// Advanced Angular service with dependency injection
@Injectable({
  providedIn: 'root'
})
export class AdvancedDataService {
  private readonly baseUrl = 'https://api.example.com';
  private cache = new Map<string, Observable<any>>();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    @Inject('API_CONFIG') private apiConfig: ApiConfig
  ) {}

  // Generic HTTP method with caching and error handling
  request<T>(
    method: string,
    endpoint: string,
    options: {
      body?: any;
      params?: HttpParams;
      useCache?: boolean;
      timeout?: number;
    } = {}
  ): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const cacheKey = `${method}:${url}:${JSON.stringify(options.params)}`;

    // Return cached response for GET requests
    if (method === 'GET' && options.useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const request$ = this.http.request<T>(method, url, {
      body: options.body,
      params: options.params,
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    }).pipe(
      timeout(options.timeout || 10000),
      retry(3),
      catchError(this.handleError.bind(this)),
      tap(response => {
        if (method === 'GET' && options.useCache) {
          this.cache.set(cacheKey, of(response));
        }
      })
    );

    if (method === 'GET' && options.useCache) {
      this.cache.set(cacheKey, request$);
    }

    return request$;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }

    this.notificationService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

// Advanced Angular component with reactive forms and custom validators
@Component({
  selector: 'app-advanced-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name">
        <mat-error *ngIf="userForm.get('name')?.errors?.['required']">
          Name is required
        </mat-error>
        <mat-error *ngIf="userForm.get('name')?.errors?.['minlength']">
          Name must be at least 2 characters
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" type="email">
        <mat-error *ngIf="userForm.get('email')?.errors?.['required']">
          Email is required
        </mat-error>
        <mat-error *ngIf="userForm.get('email')?.errors?.['email']">
          Invalid email format
        </mat-error>
        <mat-error *ngIf="userForm.get('email')?.errors?.['emailTaken']">
          Email is already taken
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="userForm.get('password')?.errors?.['required']">
          Password is required
        </mat-error>
        <mat-error *ngIf="userForm.get('password')?.errors?.['passwordStrength']">
          Password must contain uppercase, lowercase, number and special character
        </mat-error>
      </mat-form-field>

      <button 
        mat-raised-button 
        color="primary" 
        type="submit"
        [disabled]="userForm.invalid || isSubmitting"
      >
        {{ isSubmitting ? 'Creating...' : 'Create User' }}
      </button>
    </form>
  `
})
export class AdvancedFormComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dataService: AdvancedDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailTakenValidator.bind(this)]],
      password: ['', [Validators.required, this.passwordStrengthValidator]]
    });

    // Watch for form value changes
    this.userForm.valueChanges.pipe(
      debounceTime(300),
      takeUntilDestroyed()
    ).subscribe(values => {
      console.log('Form values changed:', values);
    });
  }

  // Custom async validator
  emailTakenValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    return this.dataService.request<{ exists: boolean }>('GET', `/users/check-email`, {
      params: new HttpParams().set('email', control.value),
      useCache: true
    }).pipe(
      map(response => response.exists ? { emailTaken: true } : null),
      catchError(() => of(null))
    );
  }

  // Custom sync validator
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    
    return valid ? null : { passwordStrength: true };
  }

  async onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      try {
        await this.dataService.request('POST', '/users', {
          body: this.userForm.value
        }).toPromise();
        
        this.userForm.reset();
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    }
  }
}

// 4. SVELTE ADVANCED PATTERNS

// Svelte store with advanced features
import { writable, derived, readable } from 'svelte/store';

// Custom store with persistence
function createPersistedStore<T>(key: string, initialValue: T) {
  const { subscribe, set, update } = writable(initialValue);

  // Load from localStorage on client
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    if (stored) {
      set(JSON.parse(stored));
    }
  }

  return {
    subscribe,
    set: (value: T) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
      set(value);
    },
    update: (updater: (value: T) => T) => {
      update(value => {
        const newValue = updater(value);
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
        return newValue;
      });
    }
  };
}

// Advanced async store
function createAsyncStore<T>(fetcher: () => Promise<T>) {
  const { subscribe, set } = writable<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: false,
    error: null
  });

  const load = async () => {
    set({ data: null, loading: true, error: null });
    
    try {
      const data = await fetcher();
      set({ data, loading: false, error: null });
    } catch (error) {
      set({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Unknown error')
      });
    }
  };

  return {
    subscribe,
    load,
    reload: load
  };
}

// Svelte component with advanced patterns
<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  interface User {
    id: string;
    name: string;
    email: string;
  }

  // Props
  export let users: User[] = [];
  export let pageSize = 10;

  // Local state
  let currentPage = 0;
  let searchTerm = '';
  let selectedUsers = new Set<string>();
  let sortField: keyof User = 'name';
  let sortDirection: 'asc' | 'desc' = 'asc';

  // Event dispatcher
  const dispatch = createEventDispatcher<{
    userSelected: { user: User };
    usersDeleted: { userIds: string[] };
  }>();

  // Reactive statements
  $: filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  $: sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    return aValue < bValue ? -modifier : aValue > bValue ? modifier : 0;
  });

  $: paginatedUsers = sortedUsers.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  $: totalPages = Math.ceil(sortedUsers.length / pageSize);
  $: hasSelection = selectedUsers.size > 0;

  // Functions
  function toggleSort(field: keyof User) {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
  }

  function toggleSelection(userId: string) {
    if (selectedUsers.has(userId)) {
      selectedUsers.delete(userId);
    } else {
      selectedUsers.add(userId);
    }
    selectedUsers = new Set(selectedUsers);
  }

  function selectAll() {
    selectedUsers = new Set(paginatedUsers.map(user => user.id));
  }

  function clearSelection() {
    selectedUsers = new Set();
  }

  function deleteSelected() {
    dispatch('usersDeleted', { userIds: Array.from(selectedUsers) });
    clearSelection();
  }

  onMount(() => {
    console.log('UserTable mounted');
  });
</script>

<div class="user-table">
  <!-- Search and controls -->
  <div class="controls">
    <input
      type="text"
      placeholder="Search users..."
      bind:value={searchTerm}
      class="search-input"
    />
    
    {#if hasSelection}
      <div class="selection-controls" transition:fade>
        <span>{selectedUsers.size} selected</span>
        <button on:click={deleteSelected} class="btn-danger">
          Delete Selected
        </button>
        <button on:click={clearSelection} class="btn-secondary">
          Clear Selection
        </button>
      </div>
    {/if}
  </div>

  <!-- Table -->
  <table class="table">
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            on:change={selectedUsers.size === paginatedUsers.length ? clearSelection : selectAll}
            checked={selectedUsers.size === paginatedUsers.length}
            indeterminate={selectedUsers.size > 0 && selectedUsers.size < paginatedUsers.length}
          />
        </th>
        <th on:click={() => toggleSort('name')} class="sortable">
          Name
          {#if sortField === 'name'}
            <span class="sort-indicator">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
          {/if}
        </th>
        <th on:click={() => toggleSort('email')} class="sortable">
          Email
          {#if sortField === 'email'}
            <span class="sort-indicator">
              {sortDirection === 'asc' ? '↑' : '↓'}
            </span>
          {/if}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each paginatedUsers as user (user.id)}
        <tr
          class:selected={selectedUsers.has(user.id)}
          transition:fly={{ y: 20, duration: 300 }}
          animate:flip={{ duration: 300 }}
        >
          <td>
            <input
              type="checkbox"
              checked={selectedUsers.has(user.id)}
              on:change={() => toggleSelection(user.id)}
            />
          </td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button
              on:click={() => dispatch('userSelected', { user })}
              class="btn-primary"
            >
              Edit
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Pagination -->
  <div class="pagination">
    <button
      on:click={() => currentPage--}
      disabled={currentPage === 0}
      class="btn-secondary"
    >
      Previous
    </button>
    
    <span>Page {currentPage + 1} of {totalPages}</span>
    
    <button
      on:click={() => currentPage++}
      disabled={currentPage >= totalPages - 1}
      class="btn-secondary"
    >
      Next
    </button>
  </div>
</div>

<style>
  .user-table {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .search-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .selection-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }

  .table th,
  .table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .sortable {
    cursor: pointer;
    user-select: none;
  }

  .sortable:hover {
    background-color: #f5f5f5;
  }

  .sort-indicator {
    margin-left: 0.5rem;
  }

  .selected {
    background-color: #e3f2fd;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .btn-primary {
    background-color: #007bff;
    color: white;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }

  .btn-danger {
    background-color: #dc3545;
    color: white;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .btn-secondary:hover {
    background-color: #545b62;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
```
*Notice: Framework choice should align with project requirements, team expertise, and long-term maintenance considerations.*

</div>

### Modern Web APIs and Browser Features {#modern-web-apis}
<!-- tags: web-apis, browser-features, pwa, service-workers, web-components, wasm -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern web APIs provide native browser capabilities for advanced functionality. **Service Workers** enable offline functionality and background processing, **Web Components** create reusable custom elements, **Progressive Web Apps (PWA)** combine web and native app features, **WebAssembly (WASM)** runs near-native performance code, **Web Workers** handle heavy computations off main thread, **Intersection Observer** efficiently tracks element visibility, **Payment Request API** simplifies checkout flows.*

</div>

<div class="runnable-model" data-filter="web-apis">

**Runnable mental model**
```typescript
// 1. SERVICE WORKERS FOR PWA FUNCTIONALITY

// service-worker.js
const CACHE_NAME = 'myapp-v1.2.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/main.css',
  '/scripts/app.js',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
];

const API_CACHE_STRATEGY = {
  '/api/users': 'network-first',
  '/api/posts': 'cache-first',
  '/api/settings': 'cache-only'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE
            )
            .map(cacheName => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Old caches cleaned up');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests with specific strategies
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static assets
  if (STATIC_ASSETS.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Default strategy for other requests
  event.respondWith(handleDefaultRequest(request));
});

// Network-first strategy for critical data
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Cache-first strategy for static content
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request)
      .then(response => {
        if (response.ok) {
          caches.open(cacheName).then(cache => {
            cache.put(request, response);
          });
        }
      })
      .catch(() => {}); // Ignore background update errors
    
    return cachedResponse;
  }
  
  // If not in cache, fetch from network
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

async function handleApiRequest(request) {
  const url = new URL(request.url);
  const strategy = getApiCacheStrategy(url.pathname);
  
  switch (strategy) {
    case 'network-first':
      return networkFirst(request, DYNAMIC_CACHE);
    case 'cache-first':
      return cacheFirst(request, DYNAMIC_CACHE);
    case 'cache-only':
      return caches.match(request) || new Response('Offline', { status: 503 });
    default:
      return fetch(request);
  }
}

function getApiCacheStrategy(pathname) {
  for (const [pattern, strategy] of Object.entries(API_CACHE_STRATEGY)) {
    if (pathname.startsWith(pattern)) {
      return strategy;
    }
  }
  return 'network-first';
}

async function handleStaticAsset(request) {
  return cacheFirst(request, STATIC_CACHE);
}

async function handleDefaultRequest(request) {
  return networkFirst(request, DYNAMIC_CACHE);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Get pending actions from IndexedDB
  const pendingActions = await getPendingActions();
  
  for (const action of pendingActions) {
    try {
      await processAction(action);
      await removePendingAction(action.id);
    } catch (error) {
      console.error('Failed to process background action:', error);
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push message received');
  
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New notification',
    icon: '/images/icons/icon-192.png',
    badge: '/images/icons/badge-72.png',
    tag: data.tag || 'default',
    data: data.data || {},
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/images/icons/dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Notification', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification.tag);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// 2. WEB COMPONENTS WITH CUSTOM ELEMENTS

// Advanced custom element with Shadow DOM
class AdvancedDataTable extends HTMLElement {
  private shadow: ShadowRoot;
  private data: any[] = [];
  private columns: TableColumn[] = [];
  private currentPage = 0;
  private pageSize = 10;
  private sortColumn: string | null = null;
  private sortDirection: 'asc' | 'desc' = 'asc';

  static get observedAttributes() {
    return ['data', 'columns', 'page-size'];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
    this.attachEventListeners();
  }

  connectedCallback() {
    console.log('Data table connected to DOM');
    this.updateFromAttributes();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateFromAttributes();
      this.render();
    }
  }

  private updateFromAttributes() {
    const dataAttr = this.getAttribute('data');
    if (dataAttr) {
      try {
        this.data = JSON.parse(dataAttr);
      } catch (error) {
        console.error('Invalid data attribute:', error);
      }
    }

    const columnsAttr = this.getAttribute('columns');
    if (columnsAttr) {
      try {
        this.columns = JSON.parse(columnsAttr);
      } catch (error) {
        console.error('Invalid columns attribute:', error);
      }
    }

    const pageSizeAttr = this.getAttribute('page-size');
    if (pageSizeAttr) {
      this.pageSize = parseInt(pageSizeAttr, 10) || 10;
    }
  }

  private attachEventListeners() {
    this.shadow.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: Event) {
    const target = event.target as HTMLElement;
    
    if (target.classList.contains('sort-header')) {
      this.handleSort(target.dataset.column!);
    } else if (target.classList.contains('page-btn')) {
      this.handlePageChange(parseInt(target.dataset.page!, 10));
    }
  }

  private handleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.render();
    this.dispatchEvent(new CustomEvent('sort-changed', {
      detail: { column: this.sortColumn, direction: this.sortDirection }
    }));
  }

  private handlePageChange(page: number) {
    this.currentPage = page;
    this.render();
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: { page: this.currentPage }
    }));
  }

  private getSortedData() {
    if (!this.sortColumn) return this.data;

    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortColumn!];
      const bVal = b[this.sortColumn!];
      const modifier = this.sortDirection === 'asc' ? 1 : -1;

      if (aVal < bVal) return -modifier;
      if (aVal > bVal) return modifier;
      return 0;
    });
  }

  private getPaginatedData() {
    const sortedData = this.getSortedData();
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return sortedData.slice(start, end);
  }

  private render() {
    const paginatedData = this.getPaginatedData();
    const totalPages = Math.ceil(this.data.length / this.pageSize);

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .table-container {
          overflow-x: auto;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        th {
          background: #f8fafc;
          font-weight: 600;
          position: sticky;
          top: 0;
        }

        .sort-header {
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sort-header:hover {
          background: #e2e8f0;
        }

        .sort-indicator {
          font-size: 12px;
          opacity: 0.6;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .page-btn {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          background: white;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
        }

        .page-btn:hover {
          background: #f1f5f9;
        }

        .page-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          font-size: 14px;
          color: #64748b;
        }
      </style>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.columns.map(column => `
                <th>
                  ${column.sortable ? `
                    <div class="sort-header" data-column="${column.key}">
                      ${column.title}
                      <span class="sort-indicator">
                        ${this.sortColumn === column.key 
                          ? (this.sortDirection === 'asc' ? '↑' : '↓')
                          : '↕'
                        }
                      </span>
                    </div>
                  ` : column.title}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${paginatedData.map(row => `
              <tr>
                ${this.columns.map(column => `
                  <td>${this.formatCellValue(row[column.key], column)}</td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${totalPages > 1 ? `
          <div class="pagination">
            <button 
              class="page-btn" 
              data-page="${this.currentPage - 1}"
              ${this.currentPage === 0 ? 'disabled' : ''}
            >
              Previous
            </button>

            ${Array.from({ length: totalPages }, (_, i) => `
              <button 
                class="page-btn ${i === this.currentPage ? 'active' : ''}" 
                data-page="${i}"
              >
                ${i + 1}
              </button>
            `).join('')}

            <button 
              class="page-btn" 
              data-page="${this.currentPage + 1}"
              ${this.currentPage >= totalPages - 1 ? 'disabled' : ''}
            >
              Next
            </button>

            <span class="page-info">
              Page ${this.currentPage + 1} of ${totalPages}
            </span>
          </div>
        ` : ''}
      </div>
    `;
  }

  private formatCellValue(value: any, column: TableColumn): string {
    if (column.formatter) {
      return column.formatter(value);
    }

    if (column.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }

    if (column.type === 'currency' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }

    return String(value || '');
  }

  // Public API
  public setData(data: any[]) {
    this.data = data;
    this.currentPage = 0;
    this.render();
  }

  public setColumns(columns: TableColumn[]) {
    this.columns = columns;
    this.render();
  }

  public getCurrentPage() {
    return this.currentPage;
  }

  public getTotalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }
}

interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'currency';
  formatter?: (value: any) => string;
}

// Register the custom element
customElements.define('advanced-data-table', AdvancedDataTable);

// 3. WEB WORKERS FOR HEAVY COMPUTATIONS

// worker.js - Web Worker for data processing
class DataProcessor {
  private cache = new Map<string, any>();

  async processLargeDataset(data: any[], operations: DataOperation[]) {
    const cacheKey = this.generateCacheKey(data, operations);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const result = await this.applyOperations(data, operations);
    this.cache.set(cacheKey, result);
    
    return result;
  }

  private async applyOperations(data: any[], operations: DataOperation[]) {
    let processedData = data;

    for (const operation of operations) {
      switch (operation.type) {
        case 'filter':
          processedData = await this.filterData(processedData, operation.predicate);
          break;
        case 'sort':
          processedData = await this.sortData(processedData, operation.field, operation.direction);
          break;
        case 'group':
          processedData = await this.groupData(processedData, operation.field);
          break;
        case 'aggregate':
          processedData = await this.aggregateData(processedData, operation.aggregations);
          break;
        case 'transform':
          processedData = await this.transformData(processedData, operation.transformer);
          break;
      }

      // Yield control periodically to prevent blocking
      if (processedData.length > 1000) {
        await this.yieldControl();
      }
    }

    return processedData;
  }

  private async filterData(data: any[], predicate: (item: any) => boolean) {
    const result = [];
    const batchSize = 1000;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const filteredBatch = batch.filter(predicate);
      result.push(...filteredBatch);

      if (i % (batchSize * 10) === 0) {
        await this.yieldControl();
        self.postMessage({
          type: 'progress',
          progress: (i / data.length) * 100
        });
      }
    }

    return result;
  }

  private async sortData(data: any[], field: string, direction: 'asc' | 'desc') {
    // Use merge sort for large datasets to avoid stack overflow
    return this.mergeSort(data, (a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      const modifier = direction === 'asc' ? 1 : -1;

      if (aVal < bVal) return -modifier;
      if (aVal > bVal) return modifier;
      return 0;
    });
  }

  private async mergeSort(arr: any[], compare: (a: any, b: any) => number): Promise<any[]> {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = await this.mergeSort(arr.slice(0, mid), compare);
    const right = await this.mergeSort(arr.slice(mid), compare);

    return this.merge(left, right, compare);
  }

  private merge(left: any[], right: any[], compare: (a: any, b: any) => number): any[] {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (compare(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }

  private async yieldControl() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  private generateCacheKey(data: any[], operations: DataOperation[]): string {
    const dataHash = this.hashData(data);
    const operationsHash = this.hashOperations(operations);
    return `${dataHash}-${operationsHash}`;
  }

  private hashData(data: any[]): string {
    // Simple hash for demo - use proper hashing in production
    return data.length.toString() + JSON.stringify(data.slice(0, 3));
  }

  private hashOperations(operations: DataOperation[]): string {
    return JSON.stringify(operations);
  }
}

interface DataOperation {
  type: 'filter' | 'sort' | 'group' | 'aggregate' | 'transform';
  predicate?: (item: any) => boolean;
  field?: string;
  direction?: 'asc' | 'desc';
  aggregations?: Record<string, (items: any[]) => any>;
  transformer?: (item: any) => any;
}

// Web Worker message handling
const processor = new DataProcessor();

self.addEventListener('message', async (event) => {
  const { type, data, operations, id } = event.data;

  try {
    switch (type) {
      case 'process':
        const result = await processor.processLargeDataset(data, operations);
        self.postMessage({
          type: 'result',
          id,
          data: result
        });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      id,
      error: error.message
    });
  }
});

// Main thread usage
class WorkerManager {
  private worker: Worker;
  private pendingTasks = new Map<string, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
  }>();

  constructor() {
    this.worker = new Worker('/workers/data-processor.js');
    this.worker.addEventListener('message', this.handleWorkerMessage.bind(this));
  }

  async processData(data: any[], operations: DataOperation[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      
      this.pendingTasks.set(id, { resolve, reject });
      
      this.worker.postMessage({
        type: 'process',
        id,
        data,
        operations
      });
    });
  }

  private handleWorkerMessage(event: MessageEvent) {
    const { type, id, data, error, progress } = event.data;

    switch (type) {
      case 'result':
        const task = this.pendingTasks.get(id);
        if (task) {
          task.resolve(data);
          this.pendingTasks.delete(id);
        }
        break;

      case 'error':
        const errorTask = this.pendingTasks.get(id);
        if (errorTask) {
          errorTask.reject(new Error(error));
          this.pendingTasks.delete(id);
        }
        break;

      case 'progress':
        // Handle progress updates
        this.onProgress?.(progress);
        break;
    }
  }

  onProgress?: (progress: number) => void;

  terminate() {
    this.worker.terminate();
  }
}

// Usage example
const workerManager = new WorkerManager();

workerManager.onProgress = (progress) => {
  console.log(`Processing: ${progress.toFixed(1)}%`);
};

// Process large dataset
const largeDataset = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  value: Math.random() * 1000,
  category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
}));

const operations: DataOperation[] = [
  {
    type: 'filter',
    predicate: (item) => item.value > 500
  },
  {
    type: 'sort',
    field: 'value',
    direction: 'desc'
  }
];

workerManager.processData(largeDataset, operations)
  .then(result => {
    console.log('Processed data:', result);
  })
  .catch(error => {
    console.error('Processing error:', error);
  });
```
*Notice: Modern web APIs enable sophisticated web applications that rival native apps in functionality and performance.*

</div>

### Advanced Development Practices and Architecture {#advanced-dev-practices}
<!-- tags: architecture, micro-frontends, testing, accessibility, security, deployment -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Advanced web development practices ensure scalable, maintainable, and secure applications. **Micro-frontends** enable independent team development and deployment, **module federation** shares code between applications, **design systems** ensure consistent UI components, **progressive enhancement** provides baseline functionality for all users. **Web security** protects against XSS, CSRF, and other vulnerabilities, **accessibility (a11y)** ensures inclusive user experiences, **performance budgets** maintain optimal loading times.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Scalability**: Architecture supports growing teams and complexity
- **Maintainability**: Code remains manageable as applications evolve
- **Security**: Protection against vulnerabilities and attacks
- **Inclusivity**: Applications work for users with diverse abilities

</div>

<div class="runnable-model" data-filter="advanced-practices">

**Runnable mental model**
```typescript
// 1. MICRO-FRONTENDS ARCHITECTURE

// Module Federation Configuration (Webpack 5)
// host-app/webpack.config.js
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        userManagement: 'userManagement@http://localhost:3001/remoteEntry.js',
        productCatalog: 'productCatalog@http://localhost:3002/remoteEntry.js',
        orderProcessing: 'orderProcessing@http://localhost:3003/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        '@mui/material': { singleton: true },
        'react-router-dom': { singleton: true },
      },
    }),
  ],
};

// user-management/webpack.config.js
module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'userManagement',
      filename: 'remoteEntry.js',
      exposes: {
        './UserManagement': './src/UserManagement',
        './UserProfile': './src/components/UserProfile',
        './UserStore': './src/store/userStore',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        '@mui/material': { singleton: true },
      },
    }),
  ],
};

// Advanced Micro-Frontend Communication
// shared/EventBus.ts
class MicroFrontendEventBus {
  private listeners: Map<string, Set<Function>> = new Map();
  private eventHistory: Array<{ event: string; data: any; timestamp: number }> = [];

  // Subscribe to events
  subscribe(event: string, callback: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete(callback);
        if (eventListeners.size === 0) {
          this.listeners.delete(event);
        }
      }
    };
  }

  // Publish events
  publish(event: string, data?: any): void {
    const eventData = {
      event,
      data,
      timestamp: Date.now(),
    };

    // Store in history
    this.eventHistory.push(eventData);
    
    // Keep only last 100 events
    if (this.eventHistory.length > 100) {
      this.eventHistory.shift();
    }

    // Notify all listeners
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }

    // Also emit as custom DOM event for cross-framework compatibility
    window.dispatchEvent(new CustomEvent(`mf:${event}`, {
      detail: data
    }));
  }

  // Get event history
  getEventHistory(eventType?: string): Array<any> {
    if (eventType) {
      return this.eventHistory.filter(e => e.event === eventType);
    }
    return [...this.eventHistory];
  }

  // Clear event history
  clearHistory(): void {
    this.eventHistory = [];
  }
}

// Global event bus instance
export const eventBus = new MicroFrontendEventBus();

// State sharing between micro-frontends
// shared/SharedState.ts
interface SharedState {
  user: User | null;
  theme: 'light' | 'dark';
  language: string;
  permissions: string[];
}

class MicroFrontendStateManager {
  private state: SharedState;
  private subscribers: Set<(state: SharedState) => void> = new Set();

  constructor(initialState: SharedState) {
    this.state = { ...initialState };
    
    // Persist state to localStorage
    this.loadStateFromStorage();
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  getState(): SharedState {
    return { ...this.state };
  }

  setState(updates: Partial<SharedState>): void {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...updates };

    // Persist to localStorage
    localStorage.setItem('mf-shared-state', JSON.stringify(this.state));

    // Notify subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in state subscriber:', error);
      }
    });

    // Emit event for cross-micro-frontend communication
    eventBus.publish('state:updated', { prevState, newState: this.state });
  }

  subscribe(callback: (state: SharedState) => void): () => void {
    this.subscribers.add(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private loadStateFromStorage(): void {
    try {
      const stored = localStorage.getItem('mf-shared-state');
      if (stored) {
        const parsedState = JSON.parse(stored);
        this.state = { ...this.state, ...parsedState };
      }
    } catch (error) {
      console.error('Error loading state from storage:', error);
    }
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'mf-shared-state' && event.newValue) {
      try {
        const newState = JSON.parse(event.newValue);
        this.state = newState;
        this.subscribers.forEach(callback => callback(this.state));
      } catch (error) {
        console.error('Error handling storage change:', error);
      }
    }
  }
}

export const sharedState = new MicroFrontendStateManager({
  user: null,
  theme: 'light',
  language: 'en',
  permissions: []
});

// Micro-frontend wrapper component
// shared/MicroFrontendWrapper.tsx
interface MicroFrontendWrapperProps {
  name: string;
  host: string;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
  timeout?: number;
}

const MicroFrontendWrapper: React.FC<MicroFrontendWrapperProps> = ({
  name,
  host,
  fallback = <div>Loading...</div>,
  onError,
  timeout = 10000
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadMicroFrontend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Set timeout for loading
        timeoutId = setTimeout(() => {
          const timeoutError = new Error(`Timeout loading micro-frontend: ${name}`);
          setError(timeoutError);
          onError?.(timeoutError);
        }, timeout);

        // Dynamic import of micro-frontend
        const module = await import(/* webpackIgnore: true */ `${host}/remoteEntry.js`);
        const MicroComponent = module.default || module[name];

        if (!MicroComponent) {
          throw new Error(`Component ${name} not found in micro-frontend`);
        }

        clearTimeout(timeoutId);
        setComponent(() => MicroComponent);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMicroFrontend();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [name, host, timeout, onError]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (error) {
    return (
      <div className="micro-frontend-error">
        <h3>Failed to load {name}</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!Component) {
    return <div>Component not available</div>;
  }

  return <Component />;
};

// 2. DESIGN SYSTEM IMPLEMENTATION

// Design System Foundation
// design-system/tokens/tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827',
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
};

// Component Library with Design Tokens
// design-system/components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'loading' | 'disabled';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  state = 'default',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-primary-600 text-white
      hover:bg-primary-700 active:bg-primary-800
      focus:ring-primary-500
    `,
    secondary: `
      bg-gray-100 text-gray-900
      hover:bg-gray-200 active:bg-gray-300
      focus:ring-gray-500
    `,
    outline: `
      border border-gray-300 bg-transparent text-gray-700
      hover:bg-gray-50 active:bg-gray-100
      focus:ring-gray-500
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 active:bg-gray-200
      focus:ring-gray-500
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };

  const isLoading = state === 'loading';
  const isDisabled = state === 'disabled' || isLoading;

  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
      `}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="mr-2">
          <LoadingSpinner size="sm" />
        </div>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

// 3. COMPREHENSIVE ACCESSIBILITY IMPLEMENTATION

// Accessibility utilities
// utils/accessibility.ts
class AccessibilityManager {
  private announceElement: HTMLElement | null = null;

  constructor() {
    this.createAnnounceElement();
    this.setupKeyboardNavigation();
  }

  // Screen reader announcements
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.announceElement) {
      this.createAnnounceElement();
    }

    if (this.announceElement) {
      this.announceElement.setAttribute('aria-live', priority);
      this.announceElement.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (this.announceElement) {
          this.announceElement.textContent = '';
        }
      }, 1000);
    }
  }

  // Focus management
  focusElement(element: HTMLElement | null, options?: FocusOptions): void {
    if (element) {
      element.focus(options);
      this.announce(`Focused on ${this.getElementLabel(element)}`);
    }
  }

  trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }

      if (event.key === 'Escape') {
        container.dispatchEvent(new CustomEvent('escape-key'));
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  // Color contrast checking
  checkColorContrast(foreground: string, background: string): {
    ratio: number;
    level: 'AA' | 'AAA' | 'fail';
  } {
    const ratio = this.calculateContrastRatio(foreground, background);
    
    let level: 'AA' | 'AAA' | 'fail' = 'fail';
    if (ratio >= 7) {
      level = 'AAA';
    } else if (ratio >= 4.5) {
      level = 'AA';
    }

    return { ratio, level };
  }

  // Alternative text validation
  validateAltText(altText: string, imageContext?: string): {
    isValid: boolean;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
    let isValid = true;

    if (!altText || altText.trim().length === 0) {
      isValid = false;
      suggestions.push('Provide descriptive alternative text');
    }

    if (altText.toLowerCase().includes('image of') || 
        altText.toLowerCase().includes('picture of')) {
      suggestions.push('Remove redundant phrases like "image of" or "picture of"');
    }

    if (altText.length > 125) {
      suggestions.push('Consider shorter alternative text (under 125 characters)');
    }

    if (altText.toLowerCase() === 'image' || 
        altText.toLowerCase() === 'photo') {
      isValid = false;
      suggestions.push('Provide more descriptive alternative text');
    }

    return { isValid, suggestions };
  }

  private createAnnounceElement(): void {
    this.announceElement = document.createElement('div');
    this.announceElement.setAttribute('aria-live', 'polite');
    this.announceElement.setAttribute('aria-atomic', 'true');
    this.announceElement.style.position = 'absolute';
    this.announceElement.style.left = '-10000px';
    this.announceElement.style.width = '1px';
    this.announceElement.style.height = '1px';
    this.announceElement.style.overflow = 'hidden';
    document.body.appendChild(this.announceElement);
  }

  private setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (event) => {
      // Skip links navigation
      if (event.altKey && event.key === 's') {
        this.showSkipLinks();
      }

      // Focus visible elements on Tab
      if (event.key === 'Tab') {
        this.highlightFocusedElement();
      }
    });
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = `
      button:not([disabled]),
      [href],
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      [tabindex]:not([tabindex="-1"]):not([disabled]),
      details,
      summary
    `;

    return Array.from(container.querySelectorAll(selector))
      .filter(element => this.isVisible(element)) as HTMLElement[];
  }

  private isVisible(element: Element): boolean {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && 
           style.visibility !== 'hidden' && 
           style.opacity !== '0';
  }

  private getElementLabel(element: HTMLElement): string {
    return element.getAttribute('aria-label') ||
           element.getAttribute('title') ||
           element.textContent?.trim() ||
           element.tagName.toLowerCase();
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    const luminance1 = this.getLuminance(color1);
    const luminance2 = this.getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getLuminance(color: string): number {
    // Simplified luminance calculation
    // In production, use a proper color parsing library
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private showSkipLinks(): void {
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
      (link as HTMLElement).focus();
    });
  }

  private highlightFocusedElement(): void {
    // Add visual focus indicator for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
    `;
    
    if (!document.querySelector('#focus-styles')) {
      style.id = 'focus-styles';
      document.head.appendChild(style);
    }
  }
}

export const accessibilityManager = new AccessibilityManager();

// Accessible Modal Component
// components/AccessibleModal.tsx
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  initialFocus?: React.RefObject<HTMLElement>;
}

const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnOverlayClick = true,
  initialFocus
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const contentId = useId();
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Trap focus within modal
      const cleanup = accessibilityManager.trapFocus(modalRef.current!);
      
      // Focus initial element or first focusable element
      if (initialFocus?.current) {
        initialFocus.current.focus();
      }

      // Announce modal opening
      accessibilityManager.announce(`${title} dialog opened`);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        cleanup();
        document.body.style.overflow = '';
        
        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }

        // Announce modal closing
        accessibilityManager.announce(`${title} dialog closed`);
      };
    }
  }, [isOpen, title, initialFocus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={titleId}
      aria-describedby={contentId}
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          ref={modalRef}
          className={`
            relative w-full ${sizeClasses[size]}
            bg-white rounded-lg shadow-xl
            transform transition-all
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 id={titleId} className="text-xl font-semibold">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
              aria-label={`Close ${title} dialog`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div id={contentId} className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// 4. PERFORMANCE MONITORING AND OPTIMIZATION

// Performance monitoring service
class WebPerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
    this.monitorCoreWebVitals();
    this.trackUserInteractions();
  }

  // Track custom metrics
  trackMetric(name: string, value: number, tags?: Record<string, string>): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    this.metrics.get(name)!.push(value);

    // Send to analytics service
    this.sendToAnalytics('custom_metric', {
      name,
      value,
      tags,
      timestamp: Date.now()
    });
  }

  // Track page load performance
  trackPageLoad(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp_connection: navigation.connectEnd - navigation.connectStart,
        tls_handshake: navigation.connectEnd - navigation.secureConnectionStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        dom_load: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        page_load: navigation.loadEventEnd - navigation.navigationStart
      };

      Object.entries(metrics).forEach(([name, value]) => {
        this.trackMetric(`page_load.${name}`, value);
      });
    });
  }

  // Monitor resource loading
  trackResourcePerformance(): void {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    resources.forEach(resource => {
      const duration = resource.responseEnd - resource.startTime;
      const type = this.getResourceType(resource.name);
      
      this.trackMetric(`resource.${type}.duration`, duration, {
        url: resource.name,
        size: resource.transferSize?.toString() || '0'
      });
    });
  }

  // Get performance summary
  getPerformanceSummary(): Record<string, any> {
    const summary: Record<string, any> = {};
    
    this.metrics.forEach((values, name) => {
      summary[name] = {
        count: values.length,
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        p95: this.percentile(values, 95)
      };
    });

    return summary;
  }

  private initializeObserver(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.processPerformanceEntry(entry);
        });
      });

      // Observe different entry types
      ['measure', 'navigation', 'resource', 'paint', 'largest-contentful-paint'].forEach(type => {
        try {
          this.observer!.observe({ entryTypes: [type] });
        } catch (e) {
          // Entry type not supported
        }
      });
    }
  }

  private monitorCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      this.trackMetric('web_vitals.lcp', lcp.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        const fid = (entry as any).processingStart - entry.startTime;
        this.trackMetric('web_vitals.fid', fid);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      this.trackMetric('web_vitals.cls', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private trackUserInteractions(): void {
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.trackMetric(`user_interaction.${eventType}`, 1);
      }, { passive: true });
    });
  }

  private processPerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        this.trackMetric('navigation.duration', entry.duration);
        break;
      case 'resource':
        const resourceEntry = entry as PerformanceResourceTiming;
        this.trackMetric('resource.duration', resourceEntry.duration, {
          type: this.getResourceType(resourceEntry.name)
        });
        break;
      case 'paint':
        this.trackMetric(`paint.${entry.name}`, entry.startTime);
        break;
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'style';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) return 'image';
    if (url.includes('api/')) return 'api';
    return 'other';
  }

  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) return sorted[lower];
    
    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  private sendToAnalytics(event: string, data: any): void {
    // Send to your analytics service
    if (typeof gtag !== 'undefined') {
      gtag('event', event, data);
    }

    // Or send to your custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data, timestamp: Date.now() })
    }).catch(() => {
      // Silently handle analytics errors
    });
  }
}

export const performanceMonitor = new WebPerformanceMonitor();

// Usage example
performanceMonitor.trackPageLoad();
performanceMonitor.trackResourcePerformance();

// Track custom business metrics
performanceMonitor.trackMetric('checkout.completion_time', 1500);
performanceMonitor.trackMetric('search.results_count', 25);
```
*Notice: Advanced web development practices require balancing developer experience, performance, accessibility, and security considerations.*

</div>

### Modern Deployment and Production Strategies {#deployment-production}
<!-- tags: deployment, ci-cd, edge-computing, cdn, monitoring, optimization -->

<div class="concept-section definition">

📋 **Concept Definition**  
*Modern deployment strategies ensure reliable, fast, and scalable web applications. **Static Site Generation (SSG)** pre-builds pages for optimal performance, **Server-Side Rendering (SSR)** improves SEO and initial load times, **Edge computing** brings content closer to users, **Content Delivery Networks (CDN)** distribute static assets globally. **Blue-green deployments** minimize downtime, **canary releases** test changes gradually, **feature flags** enable controlled rollouts, **monitoring and alerting** track application health.*

</div>

<div class="concept-section why-important">

💡 **Why it matters?**
- **Performance**: Fast loading times improve user experience and SEO
- **Reliability**: Deployment strategies minimize downtime and failures
- **Scalability**: Infrastructure handles traffic spikes and growth
- **Global reach**: Content delivery optimized for worldwide users

</div>

<div class="runnable-model" data-filter="deployment">

**Runnable mental model**
```yaml
# 1. MODERN CI/CD PIPELINE FOR WEB APPLICATIONS

# .github/workflows/web-deployment.yml
name: Web Application Deployment

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Quality checks and testing
  quality-checks:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Type checking
      run: npm run type-check

    - name: Linting
      run: npm run lint

    - name: Code formatting
      run: npm run format:check

    - name: Security audit
      run: npm audit --audit-level high

    - name: Unit tests
      run: npm run test:coverage

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  # Build and test different deployment targets
  build-matrix:
    runs-on: ubuntu-latest
    needs: quality-checks
    strategy:
      matrix:
        target: [static, ssr, edge]
        include:
        - target: static
          build_command: npm run build:static
          output_dir: dist-static
        - target: ssr
          build_command: npm run build:ssr
          output_dir: dist-ssr
        - target: edge
          build_command: npm run build:edge
          output_dir: dist-edge

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build for ${{ matrix.target }}
      run: ${{ matrix.build_command }}

    - name: Run build tests
      run: npm run test:build --target=${{ matrix.target }}

    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-${{ matrix.target }}
        path: ${{ matrix.output_dir }}
        retention-days: 7

  # Performance testing
  performance-tests:
    runs-on: ubuntu-latest
    needs: build-matrix
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Download static build
      uses: actions/download-artifact@v3
      with:
        name: build-static
        path: dist

    - name: Start preview server
      run: |
        npm install -g serve
        serve -s dist -l 3000 &
        sleep 10

    - name: Run Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        configPath: '.lighthouserc.js'
        uploadArtifacts: true
        temporaryPublicStorage: true

    - name: Bundle size analysis
      run: |
        npm install -g bundlesize
        bundlesize

  # Security scanning
  security-scan:
    runs-on: ubuntu-latest
    needs: build-matrix
    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

    - name: OWASP ZAP security scan
      uses: zaproxy/action-baseline@v0.7.0
      with:
        target: 'https://staging.example.com'

  # Deploy to staging
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [quality-checks, build-matrix, performance-tests]
    if: github.ref == 'refs/heads/develop'
    environment: staging

    steps:
    - name: Deploy to Vercel staging
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        scope: staging
        alias-domains: staging.example.com

    - name: Run E2E tests against staging
      run: |
        npm install -g playwright
        PLAYWRIGHT_BASE_URL=https://staging.example.com npm run test:e2e

  # Production deployment
  deploy-production:
    runs-on: ubuntu-latest
    needs: [quality-checks, build-matrix, performance-tests, security-scan]
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
    - name: Download static build
      uses: actions/download-artifact@v3
      with:
        name: build-static
        path: dist

    - name: Deploy to production
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'

    - name: Warm up CDN cache
      run: |
        curl -X POST "${{ secrets.CDN_PURGE_ENDPOINT }}" \
          -H "Authorization: Bearer ${{ secrets.CDN_TOKEN }}" \
          -H "Content-Type: application/json" \
          -d '{"purge_everything": true}'

    - name: Update monitoring
      run: |
        curl -X POST "${{ secrets.MONITORING_WEBHOOK }}" \
          -H "Content-Type: application/json" \
          -d '{
            "event": "deployment",
            "version": "${{ github.sha }}",
            "environment": "production",
            "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
          }'

# 2. ADVANCED CDN AND EDGE CONFIGURATION

# cloudflare-workers/edge-handler.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cache = caches.default;

    // Check cache first
    let response = await cache.match(request);
    if (response) {
      // Add cache hit header
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...response.headers,
          'X-Cache': 'HIT',
          'X-Cache-Date': new Date().toISOString()
        }
      });
      return response;
    }

    // Geographic routing
    const country = request.cf?.country;
    const continent = request.cf?.continent;
    
    // Route EU traffic to EU servers for GDPR compliance
    if (continent === 'EU') {
      url.hostname = 'eu-api.example.com';
    } else if (continent === 'AS') {
      url.hostname = 'asia-api.example.com';
    }

    // A/B testing at the edge
    const abTest = await handleABTesting(request, env);
    if (abTest.redirect) {
      return Response.redirect(abTest.redirect, 302);
    }

    // Security headers and bot protection
    const securityCheck = await checkSecurity(request, env);
    if (!securityCheck.allowed) {
      return new Response('Blocked', { status: 403 });
    }

    // Forward request to origin
    const modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: {
        ...request.headers,
        'X-Forwarded-Country': country,
        'X-AB-Test': abTest.variant,
        'X-User-Segment': securityCheck.userSegment
      },
      body: request.body
    });

    response = await fetch(modifiedRequest);

    // Modify response based on edge logic
    response = await enhanceResponse(response, request, env);

    // Cache static assets
    if (shouldCache(request, response)) {
      const cacheKey = new Request(request.url, request);
      const cacheResponse = response.clone();
      
      // Set cache headers
      cacheResponse.headers.set('Cache-Control', getCacheControl(request));
      cacheResponse.headers.set('X-Cache', 'MISS');
      
      ctx.waitUntil(cache.put(cacheKey, cacheResponse));
    }

    return response;
  }
};

async function handleABTesting(request, env) {
  const url = new URL(request.url);
  const userSegment = getUserSegment(request);
  
  // Get or create user ID for consistent A/B testing
  const userId = getUserId(request);
  const hash = await hashUserId(userId);
  const variant = hash % 100 < 50 ? 'A' : 'B';

  // Store variant in KV storage for analytics
  await env.AB_TESTS.put(`user:${userId}`, JSON.stringify({
    variant,
    timestamp: Date.now(),
    path: url.pathname
  }), { expirationTtl: 86400 }); // 24 hours

  // Route specific paths based on variant
  if (url.pathname === '/pricing' && variant === 'B') {
    return { redirect: '/pricing-v2', variant };
  }

  return { variant };
}

async function checkSecurity(request, env) {
  const ip = request.headers.get('CF-Connecting-IP');
  const userAgent = request.headers.get('User-Agent') || '';
  
  // Check IP reputation
  const ipReputation = await env.IP_REPUTATION.get(ip);
  if (ipReputation === 'malicious') {
    return { allowed: false, reason: 'IP blocked' };
  }

  // Bot detection
  if (isBot(userAgent)) {
    // Allow good bots, block bad ones
    const goodBots = ['Googlebot', 'Bingbot', 'facebookexternalhit'];
    const isGoodBot = goodBots.some(bot => userAgent.includes(bot));
    
    if (!isGoodBot) {
      return { allowed: false, reason: 'Bot blocked' };
    }
  }

  // Rate limiting
  const rateLimitKey = `rate_limit:${ip}`;
  const requests = await env.RATE_LIMIT.get(rateLimitKey);
  const requestCount = requests ? parseInt(requests) : 0;
  
  if (requestCount > 100) { // 100 requests per minute
    return { allowed: false, reason: 'Rate limited' };
  }

  // Increment counter
  await env.RATE_LIMIT.put(rateLimitKey, (requestCount + 1).toString(), {
    expirationTtl: 60
  });

  return { 
    allowed: true, 
    userSegment: determineUserSegment(request)
  };
}

async function enhanceResponse(response, request, env) {
  const url = new URL(request.url);
  
  // Add security headers
  const headers = new Headers(response.headers);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://analytics.example.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.example.com"
  ].join('; ');
  headers.set('Content-Security-Policy', csp);

  // Feature Policy
  const featurePolicy = [
    "camera 'none'",
    "microphone 'none'",
    "geolocation 'self'",
    "payment 'self'"
  ].join(', ');
  headers.set('Permissions-Policy', featurePolicy);

  // Performance hints
  if (url.pathname === '/') {
    headers.set('Link', [
      '</css/critical.css>; rel=preload; as=style',
      '</js/app.js>; rel=preload; as=script',
      '</api/user>; rel=prefetch'
    ].join(', '));
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function shouldCache(request, response) {
  const url = new URL(request.url);
  const cacheableExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.woff', '.woff2'];
  
  return request.method === 'GET' && 
         response.status === 200 &&
         (cacheableExtensions.some(ext => url.pathname.endsWith(ext)) ||
          url.pathname.startsWith('/static/'));
}

function getCacheControl(request) {
  const url = new URL(request.url);
  
  if (url.pathname.includes('index.html')) {
    return 'public, max-age=0, must-revalidate';
  }
  
  if (url.pathname.includes('/static/')) {
    return 'public, max-age=31536000, immutable';
  }
  
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    return 'public, max-age=86400';
  }
  
  return 'public, max-age=3600';
}

# 3. MONITORING AND ANALYTICS INTEGRATION

// monitoring/real-user-monitoring.ts
class RealUserMonitoring {
  private config: RUMConfig;
  private sessionId: string;
  private userId: string | null = null;
  private pageLoadStart: number;

  constructor(config: RUMConfig) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.pageLoadStart = performance.now();
    
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Page load monitoring
    this.trackPageLoad();
    
    // User interaction monitoring
    this.trackUserInteractions();
    
    // Error monitoring
    this.trackErrors();
    
    // Performance monitoring
    this.trackPerformanceMetrics();
    
    // Business metrics
    this.trackBusinessEvents();
  }

  private trackPageLoad(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const metrics = {
        session_id: this.sessionId,
        user_id: this.userId,
        page_url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
        
        // Timing metrics
        dns_lookup_time: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp_connection_time: navigation.connectEnd - navigation.connectStart,
        tls_handshake_time: navigation.connectEnd - navigation.secureConnectionStart,
        server_response_time: navigation.responseStart - navigation.requestStart,
        dom_parsing_time: navigation.domContentLoadedEventStart - navigation.responseEnd,
        dom_content_loaded_time: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        page_load_time: navigation.loadEventEnd - navigation.navigationStart,
        
        // Resource metrics
        transfer_size: navigation.transferSize,
        encoded_body_size: navigation.encodedBodySize,
        decoded_body_size: navigation.decodedBodySize,
        
        // User agent info
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        device_pixel_ratio: window.devicePixelRatio,
        connection_type: (navigator as any).connection?.effectiveType || 'unknown'
      };

      this.sendMetrics('page_load', metrics);
    });
  }

  private trackUserInteractions(): void {
    let interactionCount = 0;
    
    ['click', 'scroll', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        interactionCount++;
        
        const metrics = {
          session_id: this.sessionId,
          user_id: this.userId,
          interaction_type: eventType,
          interaction_count: interactionCount,
          timestamp: Date.now(),
          target_element: this.getElementSelector(event.target as Element),
          page_url: window.location.href
        };

        // Sample interactions to avoid overwhelming the analytics
        if (Math.random() < 0.1) { // 10% sampling
          this.sendMetrics('user_interaction', metrics);
        }
      }, { passive: true });
    });

    // Track time on page
    let timeOnPage = 0;
    const timeInterval = setInterval(() => {
      timeOnPage += 10;
      
      // Send periodic heartbeat
      if (timeOnPage % 30 === 0) { // Every 30 seconds
        this.sendMetrics('time_on_page', {
          session_id: this.sessionId,
          user_id: this.userId,
          time_on_page: timeOnPage,
          page_url: window.location.href,
          timestamp: Date.now()
        });
      }
    }, 10000);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      clearInterval(timeInterval);
      
      this.sendMetrics('page_unload', {
        session_id: this.sessionId,
        user_id: this.userId,
        total_time_on_page: timeOnPage,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    });
  }

  private trackErrors(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.sendMetrics('javascript_error', {
        session_id: this.sessionId,
        user_id: this.userId,
        error_message: event.message,
        error_filename: event.filename,
        error_line: event.lineno,
        error_column: event.colno,
        error_stack: event.error?.stack,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.sendMetrics('promise_rejection', {
        session_id: this.sessionId,
        user_id: this.userId,
        rejection_reason: event.reason?.toString(),
        rejection_stack: event.reason?.stack,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    });

    // Resource loading errors
    document.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        
        this.sendMetrics('resource_error', {
          session_id: this.sessionId,
          user_id: this.userId,
          resource_url: (target as any).src || (target as any).href,
          resource_type: target.tagName.toLowerCase(),
          page_url: window.location.href,
          timestamp: Date.now()
        });
      }
    }, true);
  }

  private trackPerformanceMetrics(): void {
    // Core Web Vitals
    this.trackCoreWebVitals();
    
    // Custom performance marks
    this.trackCustomPerformanceMarks();
    
    // Long tasks
    this.trackLongTasks();
  }

  private trackCoreWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      
      this.sendMetrics('core_web_vitals', {
        session_id: this.sessionId,
        user_id: this.userId,
        metric_name: 'lcp',
        metric_value: lcp.startTime,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        const fid = (entry as any).processingStart - entry.startTime;
        
        this.sendMetrics('core_web_vitals', {
          session_id: this.sessionId,
          user_id: this.userId,
          metric_name: 'fid',
          metric_value: fid,
          page_url: window.location.href,
          timestamp: Date.now()
        });
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      
      this.sendMetrics('core_web_vitals', {
        session_id: this.sessionId,
        user_id: this.userId,
        metric_name: 'cls',
        metric_value: clsValue,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private trackBusinessEvents(): void {
    // E-commerce events
    window.addEventListener('purchase', ((event: CustomEvent) => {
      this.sendMetrics('business_event', {
        session_id: this.sessionId,
        user_id: this.userId,
        event_type: 'purchase',
        event_data: event.detail,
        page_url: window.location.href,
        timestamp: Date.now()
      });
    }) as EventListener);

    // Form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className || 'unknown';
      
      this.sendMetrics('business_event', {
        session_id: this.sessionId,
        user_id: this.userId,
        event_type: 'form_submission',
        event_data: { form_id: formId },
        page_url: window.location.href,
        timestamp: Date.now()
      });
    });
  }

  private sendMetrics(type: string, data: any): void {
    // Send to multiple endpoints
    const endpoints = [
      this.config.primaryEndpoint,
      ...(this.config.backupEndpoints || [])
    ];

    endpoints.forEach((endpoint, index) => {
      // Use sendBeacon for reliability, fallback to fetch
      const payload = JSON.stringify({ type, data });
      
      if (index === 0) {
        // Primary endpoint
        if (navigator.sendBeacon) {
          navigator.sendBeacon(endpoint, payload);
        } else {
          fetch(endpoint, {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
          }).catch(() => {
            // Silently handle failures
          });
        }
      } else {
        // Backup endpoints with delay
        setTimeout(() => {
          fetch(endpoint, {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json' }
          }).catch(() => {
            // Silently handle failures
          });
        }, index * 1000);
      }
    });

    // Also store in local storage as backup
    if (this.config.enableLocalStorage) {
      this.storeMetricsLocally(type, data);
    }
  }

  private storeMetricsLocally(type: string, data: any): void {
    try {
      const stored = localStorage.getItem('rum_metrics') || '[]';
      const metrics = JSON.parse(stored);
      
      metrics.push({ type, data, timestamp: Date.now() });
      
      // Keep only last 100 metrics
      if (metrics.length > 100) {
        metrics.splice(0, metrics.length - 100);
      }
      
      localStorage.setItem('rum_metrics', JSON.stringify(metrics));
    } catch (error) {
      // Handle storage errors silently
    }
  }

  // Utility methods
  private generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getElementSelector(element: Element): string {
    if (!element) return 'unknown';
    
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  // Public API
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public trackCustomEvent(eventName: string, eventData: any): void {
    this.sendMetrics('custom_event', {
      session_id: this.sessionId,
      user_id: this.userId,
      event_name: eventName,
      event_data: eventData,
      page_url: window.location.href,
      timestamp: Date.now()
    });
  }
}

interface RUMConfig {
  primaryEndpoint: string;
  backupEndpoints?: string[];
  enableLocalStorage?: boolean;
  sampleRate?: number;
}

// Initialize RUM
const rum = new RealUserMonitoring({
  primaryEndpoint: 'https://analytics.example.com/metrics',
  backupEndpoints: ['https://backup-analytics.example.com/metrics'],
  enableLocalStorage: true,
  sampleRate: 0.1
});

// Export for global use
(window as any).rum = rum;
```
*Notice: Modern deployment strategies require balancing performance, reliability, security, and developer experience for optimal user outcomes.*

</div>

---

### Advanced Web Security {#advanced-web-security}
<!-- tags: security, owasp, csrf, xss, authentication -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Advanced web security encompasses comprehensive protection strategies against modern threats through defense-in-depth approaches**. **OWASP Top 10**: injection attacks, authentication breaks, sensitive data exposure, XXE, broken access control, security misconfigurations, XSS, insecure deserialization, vulnerable components, insufficient logging. **Content Security Policy (CSP)**: directive-based policy preventing code injection. **Subresource Integrity (SRI)**: cryptographic verification of external resources. **HTTPS enforcement**: certificate management, HSTS, certificate pinning. **Authentication patterns**: OAuth 2.0, OpenID Connect, JWT implementation, session management. **Authorization models**: RBAC, ABAC, zero-trust architecture.

</div>

<div class="runnable-model" data-filter="security">

**Runnable mental model**
```typescript
// === CONTENT SECURITY POLICY (CSP) ===

// Advanced CSP configuration
const cspConfig = {
  directives: {
    // Script sources - strict policy
    'script-src': [
      "'self'",
      "'unsafe-eval'", // Only if absolutely necessary
      "'nonce-{NONCE_VALUE}'", // Dynamic nonce for inline scripts
      'https://trusted-cdn.com',
      'https://analytics.google.com'
    ],
    
    // Style sources
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for some CSS-in-JS libraries
      'https://fonts.googleapis.com'
    ],
    
    // Image sources
    'img-src': [
      "'self'",
      'data:', // For base64 images
      'https:',
      'blob:' // For dynamically generated images
    ],
    
    // Font sources
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    
    // Connect sources (AJAX, WebSocket, EventSource)
    'connect-src': [
      "'self'",
      'https://api.example.com',
      'wss://websocket.example.com'
    ],
    
    // Frame sources
    'frame-src': [
      "'none'" // Prevent embedding unless specifically allowed
    ],
    
    // Object sources (for plugins)
    'object-src': ["'none'"],
    
    // Base URI restriction
    'base-uri': ["'self'"],
    
    // Form action restriction
    'form-action': ["'self'"],
    
    // Upgrade insecure requests
    'upgrade-insecure-requests': []
  }
};

// CSP implementation middleware (Express)
const cspMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Generate nonce for this request
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  
  // Build CSP header
  const cspString = Object.entries(cspConfig.directives)
    .map(([directive, sources]) => {
      const sourceList = sources
        .map(source => source.replace('{NONCE_VALUE}', nonce))
        .join(' ');
      return `${directive} ${sourceList}`;
    })
    .join('; ');
  
  res.setHeader('Content-Security-Policy', cspString);
  next();
};

// React component with CSP-safe inline scripts
const SecureComponent: React.FC = () => {
  const nonce = useContext(NonceContext);
  
  return (
    <div>
      <h1>Secure Component</h1>
      <script nonce={nonce}>
        {`
          // Inline script with nonce
          console.log('This script is CSP-compliant');
        `}
      </script>
    </div>
  );
};

// === XSS PREVENTION ===

// Input sanitization utility
class XSSProtection {
  private static readonly DANGEROUS_TAGS = [
    'script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea'
  ];
  
  private static readonly DANGEROUS_ATTRIBUTES = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'
  ];
  
  // HTML sanitization
  static sanitizeHTML(input: string): string {
    // Use DOMPurify for production applications
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  }
  
  // Advanced HTML sanitization with allowlist
  static sanitizeHTMLAdvanced(input: string, allowedTags: string[] = []): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    
    const walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node: Element) => {
          const tagName = node.tagName.toLowerCase();
          
          // Remove dangerous tags
          if (this.DANGEROUS_TAGS.includes(tagName) && !allowedTags.includes(tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Remove dangerous attributes
          for (const attr of Array.from(node.attributes)) {
            if (this.DANGEROUS_ATTRIBUTES.some(dangerous => 
              attr.name.toLowerCase().includes(dangerous))) {
              node.removeAttribute(attr.name);
            }
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    while (walker.nextNode()) {
      // Processing happens in acceptNode
    }
    
    return doc.body.innerHTML;
  }
  
  // URL sanitization
  static sanitizeURL(url: string): string {
    try {
      const parsed = new URL(url);
      
      // Only allow safe protocols
      if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
        return '#';
      }
      
      return parsed.toString();
    } catch {
      return '#';
    }
  }
  
  // CSS sanitization
  static sanitizeCSS(css: string): string {
    // Remove potentially dangerous CSS properties
    const dangerousPatterns = [
      /expression\s*\(/gi,
      /javascript\s*:/gi,
      /vbscript\s*:/gi,
      /data\s*:/gi,
      /@import/gi,
      /binding\s*:/gi
    ];
    
    let sanitized = css;
    dangerousPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });
    
    return sanitized;
  }
}

// React component with XSS protection
const UGCDisplay: React.FC<{ content: string; allowBasicFormatting?: boolean }> = ({ 
  content, 
  allowBasicFormatting = false 
}) => {
  const sanitizedContent = useMemo(() => {
    if (allowBasicFormatting) {
      return XSSProtection.sanitizeHTMLAdvanced(content, ['b', 'i', 'u', 'em', 'strong', 'p']);
    }
    return XSSProtection.sanitizeHTML(content);
  }, [content, allowBasicFormatting]);
  
  return (
    <div 
      className="ugc-content"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

// === CSRF PROTECTION ===

// CSRF token management
class CSRFProtection {
  private static readonly TOKEN_HEADER = 'X-CSRF-Token';
  private static readonly TOKEN_STORAGE_KEY = 'csrf_token';
  
  // Generate cryptographically secure token
  static generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Store token securely
  static storeToken(token: string): void {
    // Use sessionStorage for tokens (more secure than localStorage)
    sessionStorage.setItem(this.TOKEN_STORAGE_KEY, token);
  }
  
  // Retrieve stored token
  static getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_STORAGE_KEY);
  }
  
  // Validate token format
  static isValidToken(token: string): boolean {
    return /^[a-f0-9]{64}$/.test(token);
  }
  
  // Add CSRF token to fetch requests
  static async secureRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('CSRF token not found');
    }
    
    const headers = new Headers(options.headers);
    headers.set(this.TOKEN_HEADER, token);
    
    return fetch(url, {
      ...options,
      headers,
      credentials: 'same-origin' // Ensure cookies are sent
    });
  }
}

// Express middleware for CSRF protection
const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET') {
    // Generate and set token for GET requests
    const token = CSRFProtection.generateToken();
    res.locals.csrfToken = token;
    res.cookie('csrf_token', token, {
      httpOnly: false, // Accessible to JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return next();
  }
  
  // Verify token for state-changing requests
  const tokenFromHeader = req.headers['x-csrf-token'] as string;
  const tokenFromCookie = req.cookies.csrf_token;
  
  if (!tokenFromHeader || tokenFromHeader !== tokenFromCookie) {
    return res.status(403).json({ error: 'CSRF token mismatch' });
  }
  
  next();
};

// React hook for CSRF protection
const useCSRFProtection = () => {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    // Get token from cookie or generate new one
    const existingToken = CSRFProtection.getToken();
    if (existingToken && CSRFProtection.isValidToken(existingToken)) {
      setToken(existingToken);
    } else {
      // Request new token from server
      fetch('/api/csrf-token', { credentials: 'same-origin' })
        .then(res => res.json())
        .then(data => {
          CSRFProtection.storeToken(data.token);
          setToken(data.token);
        });
    }
  }, []);
  
  const secureRequest = useCallback(async (url: string, options: RequestInit = {}) => {
    return CSRFProtection.secureRequest(url, options);
  }, []);
  
  return { token, secureRequest };
};

// === SECURE AUTHENTICATION ===

// JWT token management with security best practices
class SecureJWTManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes
  
  // Store tokens securely
  static storeTokens(accessToken: string, refreshToken: string): void {
    // Store access token in memory (most secure)
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    
    // Store refresh token in httpOnly cookie (if available)
    // This should be set by the server
    document.cookie = `${this.REFRESH_TOKEN_KEY}=${refreshToken}; HttpOnly; Secure; SameSite=Strict`;
  }
  
  // Get access token
  static getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  
  // Parse JWT payload without verification (for client-side checks only)
  static parseJWTPayload(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
  
  // Check if token is expired (with buffer)
  static isTokenExpired(token: string): boolean {
    const payload = this.parseJWTPayload(token);
    if (!payload || !payload.exp) return true;
    
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return (expiryTime - this.TOKEN_EXPIRY_BUFFER) <= currentTime;
  }
  
  // Refresh token automatically
  static async refreshToken(): Promise<string | null> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Include httpOnly refresh token cookie
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      
      const data = await response.json();
      const newAccessToken = data.accessToken;
      
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, newAccessToken);
      return newAccessToken;
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }
  
  // Clear all tokens
  static clearTokens(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
    // Clear refresh token cookie
    document.cookie = `${this.REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  // Get valid token (with automatic refresh)
  static async getValidToken(): Promise<string | null> {
    let token = this.getAccessToken();
    
    if (!token) return null;
    
    if (this.isTokenExpired(token)) {
      token = await this.refreshToken();
    }
    
    return token;
  }
}

// Axios interceptor for automatic token management
const setupAuthInterceptors = (axiosInstance: any) => {
  // Request interceptor to add auth token
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = await SecureJWTManager.getValidToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );
  
  // Response interceptor to handle auth errors
  axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      if (error.response?.status === 401) {
        // Try to refresh token
        const newToken = await SecureJWTManager.refreshToken();
        
        if (newToken) {
          // Retry original request with new token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance.request(error.config);
        } else {
          // Redirect to login
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(error);
    }
  );
};

// === SECURE COMMUNICATION ===

// WebSocket security implementation
class SecureWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private heartbeatInterval: number | null = null;
  
  constructor(
    private url: string,
    private protocols?: string[],
    private options: {
      heartbeatInterval?: number;
      maxReconnectAttempts?: number;
      validateOrigin?: boolean;
    } = {}
  ) {
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
  }
  
  async connect(): Promise<void> {
    try {
      // Get authentication token
      const token = await SecureJWTManager.getValidToken();
      if (!token) {
        throw new Error('No valid authentication token');
      }
      
      // Add token to WebSocket URL
      const wsUrl = new URL(this.url);
      wsUrl.searchParams.set('token', token);
      
      // Validate origin if required
      if (this.options.validateOrigin) {
        wsUrl.searchParams.set('origin', window.location.origin);
      }
      
      this.ws = new WebSocket(wsUrl.toString(), this.protocols);
      
      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
      
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      throw error;
    }
  }
  
  private handleOpen(): void {
    console.log('Secure WebSocket connected');
    this.reconnectAttempts = 0;
    
    // Start heartbeat
    if (this.options.heartbeatInterval) {
      this.startHeartbeat();
    }
  }
  
  private handleMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      
      // Validate message structure
      if (!this.isValidMessage(data)) {
        console.warn('Invalid message received:', data);
        return;
      }
      
      // Handle different message types
      switch (data.type) {
        case 'heartbeat':
          this.sendHeartbeat();
          break;
        case 'data':
          this.handleDataMessage(data);
          break;
        default:
          console.warn('Unknown message type:', data.type);
      }
      
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  }
  
  private handleError(error: Event): void {
    console.error('WebSocket error:', error);
  }
  
  private handleClose(): void {
    console.log('WebSocket connection closed');
    
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    // Attempt to reconnect
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        console.log(`Reconnection attempt ${this.reconnectAttempts}`);
        this.connect();
      }, Math.pow(2, this.reconnectAttempts) * 1000); // Exponential backoff
    }
  }
  
  private isValidMessage(data: any): boolean {
    return data && typeof data === 'object' && typeof data.type === 'string';
  }
  
  private handleDataMessage(data: any): void {
    // Process application-specific data
    console.log('Received data:', data);
  }
  
  private startHeartbeat(): void {
    this.heartbeatInterval = window.setInterval(() => {
      this.sendHeartbeat();
    }, this.options.heartbeatInterval!);
  }
  
  private sendHeartbeat(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'heartbeat', timestamp: Date.now() }));
    }
  }
  
  public sendMessage(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket not connected');
    }
  }
  
  public disconnect(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// === SECURITY HEADERS ===

// Security headers middleware
const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS filtering
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy
  res.setHeader('Permissions-Policy', 
    'geolocation=(), microphone=(), camera=(), payment=(), usb=()');
  
  // HSTS (only on HTTPS)
  if (req.secure) {
    res.setHeader('Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
};

// === RATE LIMITING ===

// Advanced rate limiting with different strategies
class AdvancedRateLimiter {
  private slidingWindow = new Map<string, number[]>();
  private tokenBucket = new Map<string, { tokens: number; lastRefill: number }>();
  
  // Sliding window rate limiting
  slidingWindowLimit(
    identifier: string, 
    maxRequests: number, 
    windowMs: number
  ): boolean {
    const now = Date.now();
    const window = this.slidingWindow.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = window.filter(timestamp => now - timestamp < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    this.slidingWindow.set(identifier, validRequests);
    
    return true;
  }
  
  // Token bucket rate limiting
  tokenBucketLimit(
    identifier: string,
    capacity: number,
    refillRate: number
  ): boolean {
    const now = Date.now();
    let bucket = this.tokenBucket.get(identifier);
    
    if (!bucket) {
      bucket = { tokens: capacity, lastRefill: now };
      this.tokenBucket.set(identifier, bucket);
    }
    
    // Refill tokens based on time passed
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = Math.floor(timePassed / 1000 * refillRate);
    
    bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
    
    if (bucket.tokens >= 1) {
      bucket.tokens--;
      return true;
    }
    
    return false; // No tokens available
  }
}
```

</div>

---

### Modern Web Standards {#modern-web-standards}
<!-- tags: web-standards, web-components, pwa, wasm -->

<div class="concept-section definition">

📋 **Concept Definition**  
**Modern web standards enable platform-native capabilities through standardized APIs and technologies**. **Web Components**: custom elements, shadow DOM, HTML templates for reusable components. **Progressive Web Apps (PWAs)**: service workers, web app manifest, push notifications, background sync. **WebAssembly (WASM)**: near-native performance for compute-intensive tasks. **Web Workers**: offload processing to background threads. **Intersection Observer**: efficient scroll-based animations and lazy loading. **Resize Observer**: responsive component behavior. **Payment Request API**: streamlined checkout experiences. **Web Share API**: native sharing capabilities.

</div>

<div class="runnable-model" data-filter="web-standards">

**Runnable mental model**
```typescript
// === WEB COMPONENTS ===

// Custom element with shadow DOM
class AdvancedTooltip extends HTMLElement {
  private shadow: ShadowRoot;
  private content: string = '';
  private position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  
  constructor() {
    super();
    
    // Create shadow DOM
    this.shadow = this.attachShadow({ mode: 'closed' });
    
    // Create template
    this.shadow.innerHTML = `
      <style>
        :host {
          position: relative;
          display: inline-block;
        }
        
        .tooltip {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          z-index: 1000;
          padding: 8px 12px;
          background-color: #333;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          white-space: nowrap;
          transition: opacity 0.3s, visibility 0.3s;
          pointer-events: none;
        }
        
        .tooltip::after {
          content: '';
          position: absolute;
          border: 5px solid transparent;
        }
        
        .tooltip[data-position="top"] {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 5px;
        }
        
        .tooltip[data-position="top"]::after {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-top-color: #333;
        }
        
        .tooltip[data-position="bottom"] {
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 5px;
        }
        
        .tooltip[data-position="bottom"]::after {
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-bottom-color: #333;
        }
        
        :host(:hover) .tooltip {
          visibility: visible;
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .tooltip {
            transition: none;
          }
        }
      </style>
      
      <slot></slot>
      <div class="tooltip" data-position="${this.position}">
        ${this.content}
      </div>
    `;
  }
  
  static get observedAttributes() {
    return ['content', 'position'];
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'content':
          this.content = newValue;
          this.updateTooltip();
          break;
        case 'position':
          this.position = newValue as any;
          this.updateTooltip();
          break;
      }
    }
  }
  
  private updateTooltip() {
    const tooltip = this.shadow.querySelector('.tooltip');
    if (tooltip) {
      tooltip.textContent = this.content;
      tooltip.setAttribute('data-position', this.position);
    }
  }
  
  connectedCallback() {
    this.updateTooltip();
    
    // Add keyboard accessibility
    this.setAttribute('tabindex', '0');
    
    this.addEventListener('focus', this.showTooltip.bind(this));
    this.addEventListener('blur', this.hideTooltip.bind(this));
    this.addEventListener('keydown', this.handleKeydown.bind(this));
  }
  
  disconnectedCallback() {
    this.removeEventListener('focus', this.showTooltip);
    this.removeEventListener('blur', this.hideTooltip);
    this.removeEventListener('keydown', this.handleKeydown);
  }
  
  private showTooltip() {
    const tooltip = this.shadow.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.visibility = 'visible';
      tooltip.style.opacity = '1';
    }
  }
  
  private hideTooltip() {
    const tooltip = this.shadow.querySelector('.tooltip') as HTMLElement;
    if (tooltip) {
      tooltip.style.visibility = 'hidden';
      tooltip.style.opacity = '0';
    }
  }
  
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.blur();
    }
  }
}

// Register custom element
customElements.define('advanced-tooltip', AdvancedTooltip);

// Usage in HTML
/*
<advanced-tooltip content="This is a helpful tooltip" position="top">
  Hover or focus me
</advanced-tooltip>
*/

// === PROGRESSIVE WEB APP (PWA) ===

// Service Worker with advanced caching strategies
class PWAServiceWorker {
  private static readonly CACHE_PREFIX = 'pwa-cache-';
  private static readonly STATIC_CACHE = `${this.CACHE_PREFIX}static-v1`;
  private static readonly DYNAMIC_CACHE = `${this.CACHE_PREFIX}dynamic-v1`;
  private static readonly API_CACHE = `${this.CACHE_PREFIX}api-v1`;
  
  static install(event: ExtendableEvent) {
    const staticAssets = [
      '/',
      '/static/css/main.css',
      '/static/js/main.js',
      '/static/images/icon-192.png',
      '/static/images/icon-512.png',
      '/manifest.json'
    ];
    
    event.waitUntil(
      caches.open(this.STATIC_CACHE)
        .then(cache => cache.addAll(staticAssets))
        .catch(error => console.error('Cache installation failed:', error))
    );
  }
  
  static activate(event: ExtendableEvent) {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith(this.CACHE_PREFIX) &&
              ![this.STATIC_CACHE, this.DYNAMIC_CACHE, this.API_CACHE].includes(cacheName)
            )
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
  
  static fetch(event: FetchEvent) {
    const request = event.request;
    const url = new URL(request.url);
    
    // API requests - network first, cache fallback
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(this.networkFirstStrategy(request, this.API_CACHE));
      return;
    }
    
    // Static assets - cache first
    if (request.destination === 'script' || 
        request.destination === 'style' || 
        request.destination === 'image') {
      event.respondWith(this.cacheFirstStrategy(request, this.STATIC_CACHE));
      return;
    }
    
    // HTML pages - network first, cache fallback
    if (request.destination === 'document') {
      event.respondWith(this.networkFirstStrategy(request, this.DYNAMIC_CACHE));
      return;
    }
    
    // Default - network only
    event.respondWith(fetch(request));
  }
  
  private static async cacheFirstStrategy(request: Request, cacheName: string): Promise<Response> {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (error) {
      // Return offline fallback if available
      return await this.getOfflineFallback(request);
    }
  }
  
  private static async networkFirstStrategy(request: Request, cacheName: string): Promise<Response> {
    try {
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return await this.getOfflineFallback(request);
    }
  }
  
  private static async getOfflineFallback(request: Request): Promise<Response> {
    if (request.destination === 'document') {
      const offlinePage = await caches.match('/offline.html');
      return offlinePage || new Response('Offline', { status: 503 });
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              showUpdateNotification();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}

// PWA install prompt
class PWAInstallManager {
  private deferredPrompt: any = null;
  
  constructor() {
    this.setupInstallPrompt();
  }
  
  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallButton();
    });
    
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      this.hideInstallButton();
      this.deferredPrompt = null;
    });
  }
  
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }
    
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    this.deferredPrompt = null;
    return outcome === 'accepted';
  }
  
  private showInstallButton() {
    const button = document.getElementById('install-button');
    if (button) {
      button.style.display = 'block';
      button.addEventListener('click', () => this.promptInstall());
    }
  }
  
  private hideInstallButton() {
    const button = document.getElementById('install-button');
    if (button) {
      button.style.display = 'none';
    }
  }
}

// === WEBASSEMBLY INTEGRATION ===

// WebAssembly module wrapper
class WasmImageProcessor {
  private module: any = null;
  private initialized = false;
  
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Load WebAssembly module
      const wasmModule = await import('./image-processor.wasm');
      this.module = await wasmModule.default();
      this.initialized = true;
      
      console.log('WebAssembly module loaded successfully');
    } catch (error) {
      console.error('Failed to load WebAssembly module:', error);
      throw error;
    }
  }
  
  async processImage(imageData: ImageData, filterType: string): Promise<ImageData> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    const { width, height, data } = imageData;
    
    // Allocate memory in WebAssembly
    const inputPtr = this.module._malloc(data.length);
    const outputPtr = this.module._malloc(data.length);
    
    try {
      // Copy image data to WebAssembly memory
      this.module.HEAPU8.set(data, inputPtr);
      
      // Call WebAssembly function based on filter type
      let result: number;
      switch (filterType) {
        case 'blur':
          result = this.module._blur_filter(inputPtr, outputPtr, width, height);
          break;
        case 'sharpen':
          result = this.module._sharpen_filter(inputPtr, outputPtr, width, height);
          break;
        case 'edge':
          result = this.module._edge_detection(inputPtr, outputPtr, width, height);
          break;
        default:
          throw new Error(`Unknown filter type: ${filterType}`);
      }
      
      if (result !== 0) {
        throw new Error('WebAssembly processing failed');
      }
      
      // Copy processed data back
      const processedData = new Uint8ClampedArray(
        this.module.HEAPU8.buffer,
        outputPtr,
        data.length
      ).slice();
      
      return new ImageData(processedData, width, height);
      
    } finally {
      // Free allocated memory
      this.module._free(inputPtr);
      this.module._free(outputPtr);
    }
  }
  
  destroy(): void {
    if (this.module && this.module._cleanup) {
      this.module._cleanup();
    }
    this.module = null;
    this.initialized = false;
  }
}

// Web Worker for heavy computations
class ComputeWorker {
  private worker: Worker;
  private taskId = 0;
  private pendingTasks = new Map<number, { resolve: Function; reject: Function }>();
  
  constructor(workerScript: string) {
    this.worker = new Worker(workerScript);
    this.worker.onmessage = this.handleMessage.bind(this);
    this.worker.onerror = this.handleError.bind(this);
  }
  
  private handleMessage(event: MessageEvent) {
    const { taskId, result, error } = event.data;
    const task = this.pendingTasks.get(taskId);
    
    if (task) {
      this.pendingTasks.delete(taskId);
      
      if (error) {
        task.reject(new Error(error));
      } else {
        task.resolve(result);
      }
    }
  }
  
  private handleError(error: ErrorEvent) {
    console.error('Web Worker error:', error);
  }
  
  async execute<T>(operation: string, data: any): Promise<T> {
    const taskId = ++this.taskId;
    
    return new Promise((resolve, reject) => {
      this.pendingTasks.set(taskId, { resolve, reject });
      
      this.worker.postMessage({
        taskId,
        operation,
        data
      });
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pendingTasks.has(taskId)) {
          this.pendingTasks.delete(taskId);
          reject(new Error('Operation timeout'));
        }
      }, 30000);
    });
  }
  
  terminate(): void {
    this.worker.terminate();
    this.pendingTasks.clear();
  }
}

// === INTERSECTION OBSERVER ===

// Advanced lazy loading with Intersection Observer
class LazyLoader {
  private observer: IntersectionObserver;
  private elements = new WeakSet<Element>();
  
  constructor(
    private options: {
      rootMargin?: string;
      threshold?: number;
      loadingClass?: string;
      loadedClass?: string;
      errorClass?: string;
    } = {}
  ) {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: options.rootMargin || '50px',
        threshold: options.threshold || 0.1
      }
    );
  }
  
  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting && this.elements.has(entry.target)) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
        this.elements.delete(entry.target);
      }
    });
  }
  
  private async loadElement(element: Element) {
    const img = element as HTMLImageElement;
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    
    if (!src) return;
    
    // Add loading class
    if (this.options.loadingClass) {
      img.classList.add(this.options.loadingClass);
    }
    
    try {
      // Preload image
      const preloadImg = new Image();
      
      if (srcset) {
        preloadImg.srcset = srcset;
      }
      
      await new Promise((resolve, reject) => {
        preloadImg.onload = resolve;
        preloadImg.onerror = reject;
        preloadImg.src = src;
      });
      
      // Apply loaded image
      img.src = src;
      if (srcset) {
        img.srcset = srcset;
      }
      
      // Update classes
      if (this.options.loadingClass) {
        img.classList.remove(this.options.loadingClass);
      }
      if (this.options.loadedClass) {
        img.classList.add(this.options.loadedClass);
      }
      
      // Dispatch loaded event
      img.dispatchEvent(new CustomEvent('lazyloaded', { bubbles: true }));
      
    } catch (error) {
      console.error('Failed to load image:', error);
      
      if (this.options.loadingClass) {
        img.classList.remove(this.options.loadingClass);
      }
      if (this.options.errorClass) {
        img.classList.add(this.options.errorClass);
      }
      
      // Dispatch error event
      img.dispatchEvent(new CustomEvent('lazyerror', { bubbles: true }));
    }
  }
  
  observe(element: Element): void {
    if (!this.elements.has(element)) {
      this.elements.add(element);
      this.observer.observe(element);
    }
  }
  
  unobserve(element: Element): void {
    this.observer.unobserve(element);
    this.elements.delete(element);
  }
  
  disconnect(): void {
    this.observer.disconnect();
    this.elements = new WeakSet();
  }
}

// === PAYMENT REQUEST API ===

// Modern payment processing
class PaymentProcessor {
  private supportedMethods = [
    {
      supportedMethods: 'basic-card',
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex'],
        supportedTypes: ['credit', 'debit']
      }
    },
    {
      supportedMethods: 'https://google.com/pay',
      data: {
        environment: 'TEST', // or 'PRODUCTION'
        merchantId: 'YOUR_MERCHANT_ID',
        merchantName: 'Your Store',
        allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
        allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS']
      }
    }
  ];
  
  async processPayment(paymentDetails: {
    total: { label: string; amount: { currency: string; value: string } };
    displayItems?: Array<{ label: string; amount: { currency: string; value: string } }>;
    shippingOptions?: Array<{ id: string; label: string; amount: { currency: string; value: string } }>;
  }): Promise<PaymentResponse | null> {
    
    if (!window.PaymentRequest) {
      console.warn('Payment Request API not supported');
      return null;
    }
    
    const options: PaymentOptions = {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: false,
      requestShipping: !!paymentDetails.shippingOptions,
      shippingType: 'shipping'
    };
    
    try {
      const request = new PaymentRequest(
        this.supportedMethods,
        paymentDetails,
        options
      );
      
      // Check if payment can be made
      const canMakePayment = await request.canMakePayment();
      if (!canMakePayment) {
        throw new Error('No supported payment methods available');
      }
      
      // Show payment UI
      const response = await request.show();
      
      // Validate payment response
      await this.validatePayment(response);
      
      // Complete the payment
      await response.complete('success');
      
      return response;
      
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }
  
  private async validatePayment(response: PaymentResponse): Promise<void> {
    // Validate payment details with your backend
    const validationData = {
      methodName: response.methodName,
      details: response.details,
      payerName: response.payerName,
      payerEmail: response.payerEmail,
      shippingAddress: response.shippingAddress
    };
    
    const validation = await fetch('/api/validate-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validationData)
    });
    
    if (!validation.ok) {
      throw new Error('Payment validation failed');
    }
  }
}
```

</div>

*Notice: Modern web standards provide powerful capabilities but require careful consideration of browser support and progressive enhancement strategies.*

</div>

Modern web development encompasses a comprehensive ecosystem of technologies, frameworks, and practices for building sophisticated web applications. This extensive guide covers the complete spectrum from foundational technologies to advanced production deployment strategies.

**Core Web Technologies**: HTML provides semantic structure with modern elements and accessibility features, CSS enables sophisticated layouts with Flexbox, Grid, and advanced selectors, JavaScript offers modern ES6+ features with modules, async/await, and powerful APIs. TypeScript adds compile-time type safety and enhanced developer experience.

**Advanced Framework Mastery**: React's component-based architecture with hooks and advanced patterns, Vue's progressive adoption with Composition API, Angular's comprehensive framework with dependency injection, Svelte's compile-time optimization. Modern meta-frameworks like Next.js and Nuxt provide SSR/SSG capabilities.

**Modern Web APIs**: Service Workers enable offline functionality and background processing, Web Components create reusable custom elements, Progressive Web Apps combine web and native app features, WebAssembly provides near-native performance, Web Workers handle heavy computations efficiently.

**Advanced Development Practices**: Micro-frontends enable scalable team development, design systems ensure consistent UI components, comprehensive accessibility implementation, advanced security practices, sophisticated testing strategies covering unit, integration, and E2E testing.

**Performance and Optimization**: Advanced CSS techniques for optimal rendering, JavaScript optimization patterns, Web Performance APIs for monitoring, Core Web Vitals tracking, progressive enhancement, performance budgets, and data-driven optimization strategies.

**Production-Ready Deployment**: Modern CI/CD pipelines with quality gates, edge computing and CDN optimization, advanced monitoring and observability, real user monitoring, security scanning and compliance, blue-green deployments, canary releases, and feature flag implementations.

The ecosystem encompasses professional-grade practices including comprehensive testing frameworks, performance monitoring tools, security best practices, accessibility compliance, scalable architecture patterns, and modern deployment strategies that enable building and maintaining large-scale web applications with optimal user experience, performance, and reliability.

This foundation prepares developers for building sophisticated, scalable, and maintainable web applications that meet modern standards for performance, accessibility, security, and user experience while supporting complex business requirements and global scale deployment.