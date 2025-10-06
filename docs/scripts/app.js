// === Main Application Entry Point ===
import { Router } from './router.js'
import { StorageManager } from './storage.js'
import { ThemeManager } from './theme.js'
import { i18n } from './i18n.js'
// theory-mobile.js is loaded separately in index.html with cache-bust version

class App {
  constructor() {
    this.router = new Router()
    this.themeManager = new ThemeManager()
    this.storageManager = new StorageManager()
    this.i18n = i18n

    this.init()
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApp())
    } else {
      this.setupApp()
    }
  }

  setupApp() {
    // Initialize theme first (for UI consistency)
    this.themeManager.init()

    // Initialize storage
    this.storageManager.init()

    // Initialize sidebar functionality
    this.initSidebar()

  // Initialize mobile global drawer (left)
  this.initGlobalMobileDrawer()

  // Safety: ensure theory right drawer is hidden on mobile at startup
  try {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const theorySidebar = document.getElementById('theory-sidebar')
    const overlay = document.getElementById('drawer-overlay')
    if (isMobile && theorySidebar) {
      theorySidebar.classList.add('hidden')
      theorySidebar.classList.remove('open')
      overlay?.classList.remove('active')
    }
  } catch {}

    // Initialize search functionality
    this.initSearch()

    // Initialize language selector
    this.initLanguageSelector()

    // Initialize router (should be last)
    this.router.init()

    // Setup PWA update notifications
    this.setupPWAUpdates()

    // Track page views for analytics
    this.trackPageView()
  }

  initSidebar() {
    const sidebarToggle = document.getElementById('sidebar-toggle')
    const sidebar = document.getElementById('sidebar')

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open')
        sidebarToggle.setAttribute(
          'aria-expanded',
          sidebar.classList.contains('open').toString()
        )
      })

      // Close sidebar on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open')
          sidebarToggle.setAttribute('aria-expanded', 'false')
          sidebarToggle.focus()
        }
      })

      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (
          window.innerWidth <= 768 &&
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !sidebarToggle.contains(e.target)
        ) {
          sidebar.classList.remove('open')
          sidebarToggle.setAttribute('aria-expanded', 'false')
        }
      })
    }
  }

  initGlobalMobileDrawer() {
    const mql = window.matchMedia('(max-width: 768px)')
    const toggle = document.getElementById('global-nav-toggle')
    const drawer = document.getElementById('global-nav')
    const overlay = document.getElementById('drawer-overlay')
    if (!toggle || !drawer || !overlay) return

    let isOpen = false
    let trapBound = null

    // Clone sidebar content into the mobile drawer once
    const ensureDrawerContent = () => {
      if (drawer.getAttribute('data-populated') === 'true') return
      const source = document.querySelector('#sidebar .sidebar-content') || document.getElementById('sidebar')
      if (source) {
        const wrapper = document.createElement('div')
        wrapper.className = 'sidebar-content'
        wrapper.innerHTML = source.innerHTML
        drawer.innerHTML = ''
        drawer.appendChild(wrapper)
        drawer.setAttribute('data-populated', 'true')

        // Delegate: close drawer after navigation link click on mobile
        drawer.addEventListener('click', (e) => {
          const link = e.target.closest('a[href]')
          if (!link) return
          // Set active state immediately for visual feedback
          try {
            const href = link.getAttribute('href') || ''
            if (window.router) window.router.updateActiveNavigation(window.router.normalizeRoute ? window.router.normalizeRoute(href) : href)
          } catch {}
          setTimeout(() => {
            if (mql.matches && isOpen) close()
            // After navigation, force a refresh of active states
            if (window.router && typeof window.router.updateActiveNavigation === 'function') {
              const base = (window.location.hash || '').replace(/(#.*)$/,'')
              window.router.updateActiveNavigation(base)
            } else {
              // Fallback: dispatch hashchange to trigger router
              window.dispatchEvent(new HashChangeEvent('hashchange'))
            }
          }, 50)
        })
      }
    }

    const ensureRightVisibility = () => {
      // Show header toggles on mobile only
      const isTheory = window.location.hash.startsWith('#/theory/')
      const tocToggle = document.getElementById('mobile-toc-toggle')
      if (mql.matches) {
        toggle.style.display = 'inline-flex'
        if (tocToggle) tocToggle.style.display = isTheory ? 'inline-flex' : 'none'
      } else {
        toggle.style.display = 'none'
        if (tocToggle) tocToggle.style.display = 'none'
      }
    }

    const lockBody = () => {
      // Avoid double-locking
      if (!document.body.classList.contains('drawer-open')) {
        const scrollY = window.scrollY || window.pageYOffset || 0
        document.body.dataset.scrollY = String(scrollY)
        document.body.style.top = `-${scrollY}px`
        document.body.classList.add('drawer-open')
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
      }
    }
    const unlockBody = () => {
      const saved = parseInt(document.body.dataset.scrollY || '0', 10)
      document.body.classList.remove('drawer-open')
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      delete document.body.dataset.scrollY
      // Restore scroll position instantly (override global smooth)
      const html = document.documentElement
      const prevBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      if (!Number.isNaN(saved)) {
        window.scrollTo({ top: saved, left: 0, behavior: 'auto' })
      }
      // Restore previous behavior in next tick
      setTimeout(() => { html.style.scrollBehavior = prevBehavior || '' }, 0)
    }

    const trapFocus = (e) => {
      if (!isOpen || e.key !== 'Tab') return
      const focusables = drawer.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey) {
        if (active === first || !drawer.contains(active)) { e.preventDefault(); last.focus() }
      } else {
        if (active === last || !drawer.contains(active)) { e.preventDefault(); first.focus() }
      }
    }

    const open = () => {
      if (!mql.matches) return
      // Close theory drawer if open (mutual exclusion)
      const theoryDrawer = document.getElementById('theory-sidebar')
      if (theoryDrawer && theoryDrawer.classList.contains('open')) {
        theoryDrawer.classList.remove('open')
        theoryDrawer.classList.add('hidden')
      }
      // Ensure the drawer has content before opening
      ensureDrawerContent()
      isOpen = true
      drawer.classList.add('open'); drawer.classList.remove('hidden')
      overlay.classList.add('active'); toggle.setAttribute('aria-expanded', 'true')
      lockBody()
      trapBound = trapBound || trapFocus
      document.addEventListener('keydown', trapBound)
      // Update active highlighting to current route when opening
      try {
        const getBaseRoute = () => {
          const h = window.location.hash || ''
          const i = h.indexOf('#', 1)
          return i !== -1 ? h.substring(0, i) : h.replace(/\/$/, '')
        }
        if (window.router && typeof window.router.updateActiveNavigation === 'function') {
          window.router.updateActiveNavigation(window.router.currentRoute || getBaseRoute())
        }
      } catch {}
      // For accessibility, focus the drawer container (not the first link) to avoid misleading focus highlight
      setTimeout(() => {
        drawer.setAttribute('tabindex', '-1')
        try { drawer.focus({ preventScroll: true }) } catch { drawer.focus() }
      }, 80)
    }

    const close = () => {
      isOpen = false
      drawer.classList.remove('open'); drawer.classList.add('hidden')
      overlay.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false')
      unlockBody()
      if (trapBound) document.removeEventListener('keydown', trapBound)
      try { toggle.focus({ preventScroll: true }) } catch { toggle.focus() }
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault()
      if (!mql.matches) return
      isOpen ? close() : open()
    })

    overlay.addEventListener('click', () => { if (mql.matches && isOpen) close() })
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mql.matches && isOpen) close() })
    mql.addEventListener('change', () => { if (!mql.matches && isOpen) close(); ensureRightVisibility() })
    window.addEventListener('hashchange', ensureRightVisibility)
    document.addEventListener('theory:drawer:closed', ensureRightVisibility)
    ensureRightVisibility()
  }

  initSearch() {
    const searchBtn = document.getElementById('globalSearchBtn')
    const searchModal = document.getElementById('globalSearchModal')
    const searchInput = document.getElementById('globalSearchInput')
    const searchResults = document.getElementById('globalSearchResults')
    const searchClose = document.getElementById('globalSearchClose')

    if (!searchBtn || !searchModal || !searchInput || !searchResults)
      return

    // Open search modal
    searchBtn.addEventListener('click', () => {
      searchModal.style.display = 'flex'
      searchInput.focus()
    })

    // Close search modal
    searchClose.addEventListener('click', () => {
      searchModal.style.display = 'none'
      searchInput.value = ''
      searchResults.innerHTML = ''
    })

    // Search on input
    let searchTimeout
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout)
      const query = e.target.value.trim()

      if (query.length < 2) {
        searchResults.innerHTML = ''
        return
      }

      searchTimeout = setTimeout(async () => {
        await this.performSearch(query, searchResults)
      }, 300)
    })
  }

  performSearch(query) {
    // Placeholder for search functionality
    // Future implementation with Lunr.js or similar
  }

  initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector')
    if (!languageSelector) return

    // Set initial value
    languageSelector.value = this.i18n.getCurrentLanguage()

    // Handle language changes
    languageSelector.addEventListener('change', (e) => {
      const newLanguage = e.target.value
      this.i18n.setLanguage(newLanguage)
      
      // Refresh current route to load content in new language
      if (this.router) {
        this.router.handleRoute()
      }
    })

    // Listen for language changes from other sources
    window.addEventListener('languageChanged', (e) => {
      languageSelector.value = e.detail.language
    })
  }

  setupPWAUpdates() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Show update notification
        this.showUpdateNotification()
      })
    }
  }

  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div')
    notification.className = 'update-notification'
    notification.innerHTML =
      '<div class="update-content">' +
      '<span>🔄 Új verzió elérhető!</span>' +
      '<button onclick="window.location.reload()" class="update-btn">Frissítés</button>' +
      '<button onclick="this.parentElement.parentElement.remove()" class="dismiss-btn">×</button>' +
      '</div>'

    // Add styles
    const styles =
      'position: fixed; top: 20px; right: 20px; background: var(--accent-primary); ' +
      'color: white; padding: 1rem; border-radius: 0.5rem; ' +
      'box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000;'

    notification.style.cssText = styles
    document.body.appendChild(notification)

    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 10000)
  }

  trackPageView() {
    // Send page view to Plausible analytics
    if (window.plausible) {
      window.plausible('pageview')
    }
  }
}

// Initialize app when script loads
const appInstance = new App()
// Expose router for cross-module refresh needs (limited scope)
if (appInstance && appInstance.router) {
  window.router = appInstance.router
}
