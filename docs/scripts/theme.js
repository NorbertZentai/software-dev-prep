// === Theme Manager ===
export class ThemeManager {
  constructor() {
    this.currentTheme = 'light'
    this.toggleButton = null
  }

  init() {
    // Get saved theme or default to light
    this.currentTheme =
      localStorage.getItem('software_dev_prep_theme') || 'light'

    // Apply theme
    this.applyTheme(this.currentTheme)

    // Setup toggle button
    this.setupToggleButton()

    // Listen for system theme changes
    this.setupSystemThemeListener()
  }

  setupToggleButton() {
    this.toggleButton = document.getElementById('theme-toggle')
    if (!this.toggleButton) return

    // Set initial button text
    this.updateToggleButton()

    // Add click listener
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme()
    })
  }

  setupSystemThemeListener() {
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('software_dev_prep_theme')
        if (!savedTheme) {
          this.setTheme(e.matches ? 'dark' : 'light')
        }
      })
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.setTheme(newTheme)
  }

  setTheme(theme) {
    this.currentTheme = theme
    this.applyTheme(theme)
    this.saveTheme(theme)
    this.updateToggleButton()

    // Dispatch theme change event
    window.dispatchEvent(
      new CustomEvent('themeChanged', {
        detail: { theme: theme },
      })
    )
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme)
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.name = 'theme-color'
      document.head.appendChild(metaThemeColor)
    }

    const colors = {
      light: '#f8f9fa',
      dark: '#2d2d2d',
    }

    metaThemeColor.content = colors[theme] || colors.light
  }

  updateToggleButton() {
    if (!this.toggleButton) return

    const icons = {
      light: '🌙',
      dark: '☀️',
    }

    const titles = {
      light: 'Sötét mód',
      dark: 'Világos mód',
    }

    this.toggleButton.textContent = icons[this.currentTheme]
    this.toggleButton.title = titles[this.currentTheme]
  }

  saveTheme(theme) {
    localStorage.setItem('software_dev_prep_theme', theme)
  }

  getCurrentTheme() {
    return this.currentTheme
  }

  // Detect system preference
  getSystemTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    }
    return 'light'
  }

  // Reset to system theme
  resetToSystemTheme() {
    localStorage.removeItem('software_dev_prep_theme')
    const systemTheme = this.getSystemTheme()
    this.setTheme(systemTheme)
  }
}
