// === Main Application Entry Point ===
import { Router } from './router.js'
import { StorageManager } from './storage.js'
import { ThemeManager } from './theme.js'

class App {
  constructor() {
    this.router = new Router()
    this.themeManager = new ThemeManager()
    this.storageManager = new StorageManager()

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

    // Initialize search functionality
    this.initSearch()

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
new App()
