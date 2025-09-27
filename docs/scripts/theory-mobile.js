// === Theory Mobile Drawer Management ===
export class TheoryMobileDrawer {
  constructor() {
    this.isDrawerOpen = false
    this.focusableElements = []
    this.lastFocusedElement = null
    this.resizeTimeout = null // For throttling resize events
    this.headerOffset = null // Cached header offset
    
    // Media query for mobile detection
    this.mobileMediaQuery = window.matchMedia('(max-width: 768px)')
    
    this.init()
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDrawer())
    } else {
      this.setupDrawer()
    }
  }

  setupDrawer() {
    this.bindEvents()
    this.updateDrawerVisibility()
    this.computeHeaderOffset()
    
    // Handle resize and orientation changes
    window.addEventListener('resize', () => this.handleResize())
    window.addEventListener('orientationchange', () => {
      // Delay to account for orientation change completion
      setTimeout(() => {
        this.handleResize()
        this.computeHeaderOffset()
      }, 200)
    })

    // Listen for media query changes
    this.mobileMediaQuery.addEventListener('change', (mql) => {
      this.handleMediaQueryChange(mql)
    })

    // Ensure right-side drawer class on mobile
    const setupDrawerEl = document.getElementById('theory-sidebar')
    if (this.mobileMediaQuery.matches && setupDrawerEl) {
      setupDrawerEl.classList.add('theory-drawer', 'drawer', 'right')
    }

    // Re-bind anchors and deep-link handling when theory content is (re)rendered
    window.addEventListener('theory:content:ready', () => {
      this.updateDrawerVisibility()
      this.setupAnchorNavigation()
      this.handleHashNavigation()
    })
  }

  bindEvents() {
  const drawerToggle = document.getElementById('toc-toggle')
  const drawerOverlay = document.getElementById('drawer-overlay')
  const drawer = document.getElementById('theory-sidebar')

    if (drawerToggle) {
        drawerToggle.addEventListener('click', (e) => {
        e.preventDefault()
        // Only allow drawer toggle on mobile
        if (this.mobileMediaQuery.matches) {
          this.toggleDrawer()
        }
      })
    }
    // (right-side class is handled in setupDrawer and on media change)

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => {
        // Only handle overlay clicks on mobile
        if (this.mobileMediaQuery.matches && this.isDrawerOpen) {
          this.closeDrawer()
        }
      })
    }

    // Close drawer on escape key - only on mobile
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMediaQuery.matches && this.isDrawerOpen) {
        this.closeDrawer()
      }
    })

    // Also close drawer on hash change (back/forward navigation)
    window.addEventListener('hashchange', () => {
      if (this.mobileMediaQuery.matches && this.isDrawerOpen) {
        this.closeDrawer()
      }
      // Also handle route changes
      this.handleRouteChange()
    })
  }

  // Handle media query changes - force close drawer when crossing to desktop
  handleMediaQueryChange(mql) {
    if (!mql.matches && this.isDrawerOpen) {
      // Switched to desktop - force close drawer
      this.forceCloseDrawer()
    }
    // Toggle right-side class based on current viewport
  const el = document.getElementById('theory-sidebar')
    if (el) {
      if (mql.matches) {
          el.classList.add('theory-drawer', 'drawer', 'right')
      } else {
        el.classList.remove('right')
      }
    }
    this.updateDrawerVisibility()
  }

  // Force close drawer when switching to desktop
  forceCloseDrawer() {
  const drawer = document.getElementById('theory-sidebar')
  const drawerOverlay = document.getElementById('drawer-overlay')
  const drawerToggle = document.getElementById('toc-toggle')
    
    if (drawer && drawerOverlay && drawerToggle) {
      this.isDrawerOpen = false
      
      // Remove all mobile classes
      drawer.classList.remove('open')
      drawer.classList.add('hidden')
      drawerOverlay.classList.remove('active')
      
      // Reset ARIA attributes
      drawer.setAttribute('aria-modal', 'false')
      drawerOverlay.setAttribute('aria-hidden', 'true')
      drawerToggle.setAttribute('aria-expanded', 'false')
      drawerToggle.setAttribute('aria-label', 'Fogalmak menü megnyitása')
      drawerToggle.textContent = '☰'
      
      // Ensure body scroll is unlocked
      this.ensureBodyScrollUnlocked()
      
      // Remove focus trap
      this.removeFocusTrap()
    }
  }

  handleRouteChange() {
    // Always close drawer on route change and release body scroll lock
    if (this.isDrawerOpen) {
      this.closeDrawer()
    }
    
    // Ensure body scroll is never stuck locked
    this.ensureBodyScrollUnlocked()
    
    // Update theory route detection and drawer visibility
    const isTheory = window.location.hash.startsWith('#/theory/')
    document.body.classList.toggle('is-theory', isTheory)
    const drawer = document.getElementById('theory-sidebar')
    const overlay = document.getElementById('drawer-overlay')
    const isMobile = this.mobileMediaQuery.matches
    if (drawer) {
      // On mobile: keep it hidden by default after route changes
      if (isMobile) {
        drawer.classList.remove('open')
        drawer.classList.add('hidden')
      } else {
        // On desktop: ensure it is visible and not treated as an off-canvas drawer
        drawer.classList.remove('hidden', 'open')
        drawer.classList.remove('drawer', 'right')
        drawer.setAttribute('aria-modal', 'false')
      }
    }
    if (overlay) overlay.classList.remove('active')
    this.updateDrawerVisibility()
  }
  
  ensureBodyScrollUnlocked() {
    // Safety net to always release body scroll lock
    document.body.classList.remove('drawer-open')
    const saved = parseInt(document.body.dataset.scrollY || '0', 10)
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    delete document.body.dataset.scrollY
    if (!Number.isNaN(saved)) {
      const html = document.documentElement
      const prevBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo({ top: saved, left: 0, behavior: 'auto' })
      setTimeout(() => { html.style.scrollBehavior = prevBehavior || '' }, 0)
    }
  }

  // Single source of truth for header offset calculation
  computeHeaderOffset() {
    const header = document.querySelector('.topbar')
    if (header) {
      const headerHeight = header.offsetHeight
      const safeAreaTop = parseInt(getComputedStyle(header).paddingTop, 10) || 0
      this.headerOffset = headerHeight + safeAreaTop + 20 // Extra padding
    } else {
      this.headerOffset = 84 // Fallback: 64px header + 20px padding
    }
    return this.headerOffset
  }
  
  getHeaderOffset() {
    return this.headerOffset || this.computeHeaderOffset()
  }

  updateDrawerVisibility() {
  const drawerToggle = document.getElementById('toc-toggle')
    const isTheoryPage = window.location.hash.startsWith('#/theory/')
    
    if (drawerToggle) {
      // Only show toggle on theory pages AND mobile
      if (isTheoryPage && this.mobileMediaQuery.matches) {
        drawerToggle.style.display = 'flex'
      } else {
        drawerToggle.style.display = 'none'
        // Ensure drawer is closed when not on mobile
        if (this.isDrawerOpen) {
          this.forceCloseDrawer()
        }
      }
    }
  }

  

  toggleDrawer() {
    // Guard: only allow toggle on mobile
    if (!this.mobileMediaQuery.matches) {
      return
    }
    
    if (this.isDrawerOpen) {
      this.closeDrawer()
    } else {
      this.openDrawer()
    }
  }

  // Optional submenu toggles for nested lists in TOC (mobile only)
  setupSubmenuToggles() {
    if (!this.mobileMediaQuery.matches) return
    const sidebar = document.getElementById('theory-sidebar')
    if (!sidebar) return

    // Example structure: .toc-group > button.toc-group-toggle + ul
    sidebar.querySelectorAll('.toc-group').forEach(group => {
      const header = group.querySelector('.toc-group-toggle') || group.querySelector('h4, h5')
      const list = group.querySelector('ul')
      if (!header || !list) return

      // Transform header into a toggle button if needed
      let toggleBtn = header
      if (!header.classList.contains('toc-group-toggle')) {
        toggleBtn = document.createElement('button')
        toggleBtn.className = 'toc-group-toggle'
        toggleBtn.type = 'button'
        toggleBtn.textContent = header.textContent.trim()
        header.replaceWith(toggleBtn)
      }

      group.setAttribute('aria-expanded', 'false')
      toggleBtn.setAttribute('aria-expanded', 'false')
      toggleBtn.addEventListener('click', () => {
        const expanded = group.getAttribute('aria-expanded') === 'true'
        group.setAttribute('aria-expanded', (!expanded).toString())
        toggleBtn.setAttribute('aria-expanded', (!expanded).toString())
      })
    })
  }
  openDrawer() {
    // Guard: only allow opening on mobile
    if (!this.mobileMediaQuery.matches) {
      return
    }
    
  const drawer = document.getElementById('theory-sidebar')
  const drawerOverlay = document.getElementById('drawer-overlay')
  const drawerToggle = document.getElementById('toc-toggle')
    
    if (!drawer || !drawerOverlay || !drawerToggle) return

    // Close global nav if open (mutual exclusion)
    const globalDrawer = document.getElementById('global-nav')
    if (globalDrawer && globalDrawer.classList.contains('open')) {
      globalDrawer.classList.remove('open')
      globalDrawer.classList.add('hidden')
    }

    this.isDrawerOpen = true
    this.lastFocusedElement = document.activeElement

    // Add classes and remove hidden class
    drawer.classList.add('open')
    drawer.classList.remove('hidden')
    drawerOverlay.classList.add('active')
    // Lock body without losing scroll position
    if (!document.body.classList.contains('drawer-open')) {
      const scrollY = window.scrollY || window.pageYOffset || 0
      document.body.dataset.scrollY = String(scrollY)
      document.body.style.top = `-${scrollY}px`
      document.body.classList.add('drawer-open')
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    }
    
    // Update ARIA attributes for modal behavior
    drawer.setAttribute('aria-modal', 'true')
    drawerOverlay.setAttribute('aria-hidden', 'false')
  drawerToggle.setAttribute('aria-expanded', 'true')
  drawerToggle.setAttribute('aria-label', 'Fogalmak menü bezárása')
  drawerToggle.textContent = '✕'

    // Set up focus trap
    this.setupFocusTrap()
    
    // Focus first focusable element in drawer
    const firstFocusable = drawer.querySelector('input, a, button, [tabindex]:not([tabindex="-1"])')
    if (firstFocusable) {
      // Small delay to ensure drawer is visible before focusing
      setTimeout(() => firstFocusable.focus(), 100)
    }

    // Sync active TOC item with current visible article after open
    setTimeout(() => {
      try {
        const scrollContainer = document.querySelector('#theory-content')
        const isWindowScroll = !scrollContainer || getComputedStyle(scrollContainer).overflowY === 'visible' || (scrollContainer.scrollHeight <= scrollContainer.clientHeight)
        const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
        const threshold = headerHeight + 1
        const containerTop = isWindowScroll ? 0 : (scrollContainer?.getBoundingClientRect().top || 0)
        const articles = Array.from(document.querySelectorAll('#theory-content article[id]'))
        let candidate = null, minPositiveTop = Infinity
        let bestAbove = null, maxNegativeTop = -Infinity
        for (const art of articles) {
          const relTop = art.getBoundingClientRect().top - containerTop
          const delta = relTop - threshold
          if (delta >= 0) {
            if (delta < minPositiveTop) { minPositiveTop = delta; candidate = art }
          } else {
            if (delta > maxNegativeTop) { maxNegativeTop = delta; bestAbove = art }
          }
        }
        const best = candidate || bestAbove
        if (best?.id) {
          document.querySelectorAll('.theory-toc .toc-link, .theory-sidebar .toc-link').forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current') })
          const activeLink = document.querySelector(`.theory-toc .toc-link[data-anchor="${best.id}"], .theory-sidebar .toc-link[data-anchor="${best.id}"]`)
          if (activeLink) { activeLink.classList.add('active'); activeLink.setAttribute('aria-current','true') }
        }
      } catch {}
    }, 120)
  }

  closeDrawer() {
    // Allow closing on any screen size to ensure cleanup
    const drawer = document.getElementById('theory-sidebar')
    const drawerOverlay = document.getElementById('drawer-overlay')
    const drawerToggle = document.getElementById('toc-toggle')
    if (!drawer || !drawerOverlay || !drawerToggle) return

    this.isDrawerOpen = false

  // Remove classes and unlock body scroll
    drawer.classList.remove('open')
    drawer.classList.add('hidden')
    drawerOverlay.classList.remove('active')
  this.ensureBodyScrollUnlocked()
    
    // Reset ARIA attributes
    drawer.setAttribute('aria-modal', 'false')
    drawerOverlay.setAttribute('aria-hidden', 'true')
  drawerToggle.setAttribute('aria-expanded', 'false')
  drawerToggle.setAttribute('aria-label', 'Fogalmak menü megnyitása')
  drawerToggle.textContent = '☰'

    // Remove focus trap
    this.removeFocusTrap()

    // Emit drawer closed event after transition or immediately
    this.emitDrawerClosedEvent(drawer)

    // Return focus to toggle button or last focused element (only on mobile)
    if (this.mobileMediaQuery.matches) {
      if (this.lastFocusedElement && this.lastFocusedElement !== drawerToggle) {
        // Small delay to allow drawer to close
        setTimeout(() => {
          if (this.lastFocusedElement) {
            try { this.lastFocusedElement.focus({ preventScroll: true }) } catch { this.lastFocusedElement.focus() }
          }
        }, 50)
      } else {
        try { drawerToggle.focus({ preventScroll: true }) } catch { drawerToggle.focus() }
      }
    }
  }

  emitDrawerClosedEvent(drawer) {
    // Check if drawer has CSS transitions
    const drawerStyles = window.getComputedStyle(drawer)
    const transitionDuration = drawerStyles.transitionDuration || '0s'
    const hasTransition = transitionDuration !== '0s' && transitionDuration !== 'none'
    
    if (hasTransition) {
      // Wait for transition to complete
      const handleTransitionEnd = (e) => {
        if (e.target === drawer && (e.propertyName === 'transform' || e.propertyName === 'opacity')) {
          drawer.removeEventListener('transitionend', handleTransitionEnd)
          window.dispatchEvent(new CustomEvent('theory:drawer:closed'))
        }
      }
      drawer.addEventListener('transitionend', handleTransitionEnd, { once: true })
      
      // Fallback in case transitionend doesn't fire
      setTimeout(() => {
        drawer.removeEventListener('transitionend', handleTransitionEnd)
        window.dispatchEvent(new CustomEvent('theory:drawer:closed'))
      }, 500)
    } else {
      // No transition, emit event immediately via microtask
      Promise.resolve().then(() => {
        window.dispatchEvent(new CustomEvent('theory:drawer:closed'))
      })
    }
  }

  setupFocusTrap() {
    const drawer = document.getElementById('theory-sidebar')
    if (!drawer) return

    // Get all focusable elements
    this.focusableElements = drawer.querySelectorAll(
      'input, a, button, [tabindex]:not([tabindex="-1"])'
    )

    // Add keydown listener for tab trapping with stable reference
    this.trapFocusBound = this.trapFocusBound || this.trapFocus.bind(this)
    document.addEventListener('keydown', this.trapFocusBound)
  }

  removeFocusTrap() {
    if (this.trapFocusBound) {
      document.removeEventListener('keydown', this.trapFocusBound)
    }
    this.focusableElements = []
  }

  trapFocus(e) {
    if (!this.isDrawerOpen || e.key !== 'Tab' || this.focusableElements.length === 0) {
      return
    }

    const firstFocusable = this.focusableElements[0]
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1]
    const activeElement = document.activeElement

    if (e.shiftKey) {
      // Shift + Tab: going backwards
      if (activeElement === firstFocusable || !this.isElementInDrawer(activeElement)) {
        e.preventDefault()
        lastFocusable.focus()
      }
    } else {
      // Tab: going forwards
      if (activeElement === lastFocusable || !this.isElementInDrawer(activeElement)) {
        e.preventDefault()
        firstFocusable.focus()
      }
    }
  }
  
  isElementInDrawer(element) {
    const drawer = document.getElementById('theory-sidebar')
    return drawer && drawer.contains(element)
  }

  // Enhanced anchor navigation with sticky header offset
  setupAnchorNavigation() {
    // Use passive event listeners for better performance
    const anchorLinks = document.querySelectorAll('.theory-drawer a[href*="#"], .theory-sidebar a[href*="#"]')
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href')
        const anchorMatch = href.match(/#(.+)$/)
        
        if (anchorMatch) {
          const targetId = anchorMatch[1]
          const targetElement = document.getElementById(targetId)
          
          if (targetElement) {
            e.preventDefault()
            e.stopPropagation()
            
            // Close drawer on mobile first with small delay for better UX
            if (window.innerWidth <= 768 && this.isDrawerOpen) {
              this.closeDrawer()
              // Wait for drawer to close before scrolling
              setTimeout(() => this.scrollToElement(targetElement, href), 300)
            } else {
              this.scrollToElement(targetElement, href)
            }
          }
        }
      }, { passive: false, capture: true })
    })
  }
  
  scrollToElement(element, href) {
    // Calculate offset with sticky header + safe-area + extra padding
    const offset = this.getHeaderOffset()
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = Math.max(0, elementPosition - offset)
    
    // Smooth scroll to position (respecting motion preferences)
    window.scrollTo({
      top: offsetPosition,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    })
    
    // Update URL hash
    if (history.pushState) {
      history.pushState(null, null, href)
    }
  }

  // Apply offset on direct hash navigation (e.g., deep links)
  handleHashNavigation() {
    if (window.location.hash && window.location.hash.includes('#')) {
      const parts = window.location.hash.split('#')
      if (parts.length > 2) {
        const targetId = parts[2]
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          // Wait for fonts to load to ensure accurate positioning
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              this.scrollToElementWithDelay(targetElement)
            })
          } else {
            // Fallback for browsers without font loading API
            setTimeout(() => {
              this.scrollToElementWithDelay(targetElement)
            }, 100)
          }
        }
      }
    }
  }
  
  scrollToElementWithDelay(element) {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const offset = this.getHeaderOffset()
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = Math.max(0, elementPosition - offset)
      
      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      })
    })
  }

  // Throttled resize handler for better performance
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.computeHeaderOffset() // Recompute header offset on resize
      this.updateDrawerVisibility()
      
      // Close drawer if no longer on mobile
      if (!this.mobileMediaQuery.matches && this.isDrawerOpen) {
        this.forceCloseDrawer()
      }
    }, 150) // Throttle to 150ms
  }
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  window.theoryMobileDrawer = new TheoryMobileDrawer()
}