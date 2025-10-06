// === Scroll to Top Button ===

class ScrollToTopButton {
  constructor() {
    this.button = null
    this.threshold = 300 // Show button after scrolling 300px
    this.init()
  }

  init() {
    this.createButton()
    this.attachEventListeners()
    this.checkScrollPosition()
  }

  createButton() {
    // Create button element
    this.button = document.createElement('button')
    this.button.className = 'scroll-to-top'
    this.button.setAttribute('aria-label', 'Vissza az oldal tetejére')
    this.button.setAttribute('title', 'Vissza az oldal tetejére')
    this.button.setAttribute('data-i18n-aria', 'scrollTop.label')
    this.button.setAttribute('data-i18n-title', 'scrollTop.label')
    this.button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `
    
    // Add to body
    document.body.appendChild(this.button)
  }

  attachEventListeners() {
    // Handle button click
    this.button.addEventListener('click', () => {
      this.scrollToTop()
    })

    // Handle scroll to show/hide button
    let scrollTimeout
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        this.checkScrollPosition()
      }, 100)
    }, { passive: true })

    // Handle route changes
    window.addEventListener('hashchange', () => {
      setTimeout(() => this.checkScrollPosition(), 100)
    })
  }

  checkScrollPosition() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop
    
    if (scrolled > this.threshold) {
      this.button.classList.add('visible')
    } else {
      this.button.classList.remove('visible')
    }
  }

  scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    // Optional: focus on first heading for accessibility
    setTimeout(() => {
      const firstHeading = document.querySelector('h1')
      if (firstHeading) {
        firstHeading.setAttribute('tabindex', '-1')
        firstHeading.focus()
        firstHeading.removeAttribute('tabindex')
      }
    }, 500)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollToTopButton()
  })
} else {
  new ScrollToTopButton()
}

// Export for potential use in other modules
export default ScrollToTopButton
