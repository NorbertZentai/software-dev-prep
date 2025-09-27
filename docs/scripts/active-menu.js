/**
 * Active Menu Manager - Handles active states for navigation and TOC
 * Provides accessibility support with aria-current attributes
 */

export class ActiveMenuManager {
  constructor() {
    this.init()
  }

  init() {
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    // Set active state on page load
    this.updateActiveStates()

    // Listen for navigation changes
    window.addEventListener('hashchange', () => this.updateActiveStates())
    window.addEventListener('popstate', () => this.updateActiveStates())

    // Listen for clicks on navigation links
    this.attachNavigationListeners()
  }

  attachNavigationListeners() {
    // Sidebar navigation clicks
    document.addEventListener('click', (event) => {
      const link = event.target.closest('.sidebar .nav-group a')
      if (link) {
        // Small delay to allow hash change to process
        setTimeout(() => this.updateActiveStates(), 10)
      }
    })

    // Theory TOC clicks (works for both static and dynamically loaded TOC)
    document.addEventListener('click', (event) => {
      const tocLink = event.target.closest(
        '.theory-toc .toc-link, .theory-sidebar .toc-link'
      )
      if (tocLink) {
        // Small delay to allow hash change to process
        setTimeout(() => this.updateActiveStates(), 10)
      }
    })

    // Watch for DOM changes in theory sidebar area to handle dynamic TOC loading
    const targetNode =
      document.getElementById('theory-sidebar') ||
      document.querySelector('.theory-sidebar')
    if (targetNode) {
      const observer = new MutationObserver((mutations) => {
        let tocChanged = false
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'childList' &&
            mutation.target.closest('.theory-toc, .theory-sidebar')
          ) {
            tocChanged = true
          }
        })
        if (tocChanged) {
          setTimeout(() => this.updateActiveStates(), 50)
        }
      })

      observer.observe(targetNode, {
        childList: true,
        subtree: true,
      })
    }
  }

  updateActiveStates() {
    this.updateSidebarNavigation()
    this.updateTheoryTOC()
  }

  updateSidebarNavigation() {
    const currentURL = this.normalizeURL(window.location.href)
    const currentHash = window.location.hash

    // Remove active states from all sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-group a')
    sidebarLinks.forEach((link) => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    })

    // Find and activate the matching link
    let activeLink = null

    // Try exact hash match first
    if (currentHash) {
      activeLink = document.querySelector(
        `.sidebar .nav-group a[href="${currentHash}"]`
      )
    }

    // If no hash match, try normalizing URLs
    if (!activeLink) {
      sidebarLinks.forEach((link) => {
        const linkURL = this.normalizeURL(link.href)
        if (linkURL === currentURL) {
          activeLink = link
        }
      })
    }

    // Activate the found link
    if (activeLink) {
      activeLink.classList.add('active')
      activeLink.setAttribute('aria-current', 'page')

      // Scroll into view if needed
      this.scrollIntoViewIfNeeded(activeLink)
    }
  }

  updateTheoryTOC() {
    // Check both .theory-toc and .theory-sidebar containers for TOC links
    const tocLinks = document.querySelectorAll(
      '.theory-toc .toc-link, .theory-sidebar .toc-link'
    )
    if (tocLinks.length === 0) return

    // Handle hash anchors (e.g., #/theory/java#concept)
    const fullHash = window.location.hash
    const anchorMatch = fullHash.match(/#([^#]+)$/)

    if (anchorMatch) {
      const anchor = anchorMatch[1]
      
      // Remove active states from all TOC links only if we're changing
      const currentActive = document.querySelector(
        `.theory-toc .toc-link[aria-current="true"], .theory-sidebar .toc-link[aria-current="true"]`
      )
      const targetLink = document.querySelector(
        `.theory-toc .toc-link[data-anchor="${anchor}"], .theory-sidebar .toc-link[data-anchor="${anchor}"]`
      )

      // Only update if the active link is actually changing
      if (currentActive !== targetLink) {
        tocLinks.forEach((link) => {
          link.classList.remove('active')
          link.removeAttribute('aria-current')
        })

        if (targetLink) {
          targetLink.classList.add('active')
          targetLink.setAttribute('aria-current', 'true')
          this.scrollIntoViewIfNeeded(targetLink)
          return
        }
      } else if (targetLink) {
        // Link is already active, just ensure proper state
        return
      }
    }

    // If no hash anchor, activate the first TOC item as fallback
    // But only if no item is currently active
    const hasActiveLink = document.querySelector(
      '.theory-toc .toc-link[aria-current="true"], .theory-sidebar .toc-link[aria-current="true"]'
    )
    
    if (!hasActiveLink) {
      const firstTocLink = tocLinks[0]
      if (firstTocLink) {
        firstTocLink.classList.add('active')
        firstTocLink.setAttribute('aria-current', 'true')
      }
    }
  }

  normalizeURL(url) {
    try {
      const urlObj = new URL(url)
      let pathname = urlObj.pathname
      let hash = urlObj.hash

      // Remove index.html if present
      pathname = pathname.replace(/\/index\.html$/, '/')

      // Remove trailing slash for comparison
      if (pathname.endsWith('/') && pathname !== '/') {
        pathname = pathname.slice(0, -1)
      }

      // Handle hash-based routing - extract the base route
      if (hash.includes('#')) {
        const hashMatch = hash.match(/^#[^#]*/)
        hash = hashMatch ? hashMatch[0] : hash
      }

      return `${urlObj.protocol}//${urlObj.host}${pathname}${hash}`
    } catch (e) {
      // Fallback for malformed URLs
      return url
    }
  }

  scrollIntoViewIfNeeded(element) {
    const container = element.closest(
      '.sidebar-content, .theory-toc, .theory-sidebar'
    )
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()

    // Check if element is outside the visible area
    const isAbove = elementRect.top < containerRect.top
    const isBelow = elementRect.bottom > containerRect.bottom

    if (isAbove || isBelow) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  // Public method to manually trigger active state update
  refresh() {
    this.updateActiveStates()
  }

  // Public method for programmatic navigation with active state update
  navigateTo(hash) {
    window.location.hash = hash
    // Allow hash change to process, then update states
    setTimeout(() => this.updateActiveStates(), 50)
  }

  // Public method specifically for theory pages to update TOC after dynamic loading
  updateTheoryTOCAfterLoad() {
    // Wait a bit for the DOM to be fully updated
    setTimeout(() => {
      this.updateTheoryTOC()
    }, 100)
  }
}

// Auto-initialize when module is loaded
if (typeof window !== 'undefined') {
  window.activeMenuManager = new ActiveMenuManager()
}
