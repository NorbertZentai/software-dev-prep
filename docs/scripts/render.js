// === Markdown Renderer ===
export class MarkdownRenderer {
  constructor() {
    this.marked = window.marked
  }

  async render(filePath, title = '') {
    try {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Failed to load ${filePath}`)

      const markdown = await response.text()
      const { frontmatter, content } = this.parseFrontmatter(markdown)

      const appEl = document.getElementById('app')
      appEl.innerHTML = this.renderContent(content, title, frontmatter)

      // Setup interactive features
      this.setupCodeHighlighting()
      this.setupProgressTracking(filePath)
    } catch (error) {
      console.error('Markdown rendering error:', error)
      this.renderError(title, error)
    }
  }

  async renderFile(filePath, title = '') {
    return this.render(filePath, title)
  }

  parseFrontmatter(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    const match = markdown.match(frontmatterRegex)

    if (match) {
      const frontmatterText = match[1]
      const content = match[2]

      try {
        const frontmatter = this.parseFrontmatterYAML(frontmatterText)
        return { frontmatter, content }
      } catch (e) {
        console.warn('Failed to parse frontmatter:', e)
        return { frontmatter: {}, content: markdown }
      }
    }

    return { frontmatter: {}, content: markdown }
  }

  parseFrontmatterYAML(yamlText) {
    const result = {}
    const lines = yamlText.split('\n')

    for (let line of lines) {
      line = line.trim()
      if (!line || line.startsWith('#')) continue

      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) continue

      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      // Remove quotes
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      // Handle arrays - simplified parsing for goals, etc.
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/"/g, ''))
      }

      // Handle numbers
      if (!isNaN(value) && value !== '') {
        value = Number(value)
      }

      result[key] = value
    }

    return result
  }

  renderContent(markdown, title = '', frontmatter = {}) {
    const html = this.marked
      ? this.marked.parse(markdown)
      : this.escapeHtml(markdown)

    return `
      <div class="content-container">
        ${this.renderMetaHeader(title, frontmatter)}
        <div class="markdown-content">
          ${html}
        </div>
        ${this.renderFooter(frontmatter)}
        ${this.renderRelatedTopics(frontmatter)}
        ${this.renderChecklist(frontmatter)}
      </div>
    `
  }

  renderMetaHeader(title, frontmatter) {
    if (!frontmatter.title && !title) return ''

    const displayTitle = frontmatter.title || title

    return `
      <header class="page-meta-header">
        <h1 class="page-title">${displayTitle}</h1>

        ${
          frontmatter.difficulty ||
          frontmatter.estimatedMinutes ||
          frontmatter.goals
            ? `
          <div class="meta-badges">
            ${
              frontmatter.difficulty
                ? `
              <span class="badge badge-${frontmatter.difficulty}">
                ${this.translateDifficulty(frontmatter.difficulty)}
              </span>
            `
                : ''
            }

            ${
              frontmatter.estimatedMinutes
                ? `
              <span class="badge badge-time">
                ⏱️ ${frontmatter.estimatedMinutes} perc
              </span>
            `
                : ''
            }
          </div>
        `
            : ''
        }

        ${
          frontmatter.goals && frontmatter.goals.length
            ? `
          <div class="learning-goals">
            <h3>🎯 Tanulási célok</h3>
            <ul class="goals-list">
              ${frontmatter.goals.map((goal) => `<li>${goal}</li>`).join('')}
            </ul>
          </div>
        `
            : ''
        }

        ${
          frontmatter.starter
            ? this.renderStarterLinks(frontmatter.starter)
            : ''
        }
      </header>
    `
  }

  renderStarterLinks(starter) {
    const links = []

    if (starter.stackblitz) {
      links.push(`<a href="${starter.stackblitz}" target="_blank" class="starter-link stackblitz">
        <span class="link-icon">⚡</span> StackBlitz
      </a>`)
    }

    if (starter.codesandbox) {
      links.push(`<a href="${starter.codesandbox}" target="_blank" class="starter-link codesandbox">
        <span class="link-icon">📦</span> CodeSandbox
      </a>`)
    }

    if (starter.dbfiddle) {
      links.push(`<a href="${starter.dbfiddle}" target="_blank" class="starter-link dbfiddle">
        <span class="link-icon">🗄️</span> DB Fiddle
      </a>`)
    }

    if (links.length === 0) return ''

    return `
      <div class="starter-links">
        <h4>🚀 Gyors kezdés:</h4>
        <div class="starter-buttons">
          ${links.join('')}
        </div>
      </div>
    `
  }

  renderFooter(frontmatter) {
    return `
      <div class="content-actions">
        <button onclick="window.history.back()" class="btn btn-secondary">← Vissza</button>
        <button onclick="this.toggleBookmark('${
          frontmatter.title || 'page'
        }')" class="btn btn-outline">🔖 Mentés</button>
        <button onclick="this.markAsCompleted()" class="btn btn-primary">✅ Késznek jelölöm</button>
      </div>
    `
  }

  renderRelatedTopics(frontmatter) {
    // TODO: Implement related topics based on tags or content analysis
    return ''
  }

  renderChecklist(frontmatter) {
    const checklistItems = [
      'Elolvastam és megértettem az anyagot',
      'Kipróbáltam a példákat saját környezetben',
      'Megválaszoltam az ellenőrző kérdéseket',
      'Gyakoroltam a javasolt feladatokkal',
      'Kapcsolódó dokumentációt is átnéztem',
      'Készen állok az interjú kérdésekre',
    ]

    return `
      <div class="completion-checklist">
        <h3>✅ Ellenőrző lista</h3>
        <p>Készen állsz? Jelöld be, amit elvégeztél:</p>

        <div class="checklist">
          ${checklistItems
            .map(
              (item, index) => `
            <label class="checklist-item">
              <input type="checkbox" data-checklist="${index}">
              <span class="checkmark"></span>
              <span class="item-text">${item}</span>
            </label>
          `
            )
            .join('')}
        </div>

        <div class="checklist-actions">
          <button onclick="this.checkAllItems()" class="btn btn-outline">Minden kijelölése</button>
          <button onclick="this.saveChecklistProgress()" class="btn btn-primary">Mentés</button>
        </div>
      </div>
    `
  }

  translateDifficulty(difficulty) {
    const translations = {
      beginner: 'Kezdő',
      intermediate: 'Haladó',
      advanced: 'Szakértő',
    }
    return translations[difficulty] || difficulty
  }

  renderError(title, error) {
    return `
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h1>Tartalom betöltési hiba</h1>
        <p>A "${title}" tartalom jelenleg nem elérhető.</p>
        <details class="error-details">
          <summary>Részletek</summary>
          <pre>${error.message}</pre>
        </details>
        <div class="error-actions">
          <button onclick="window.history.back()" class="btn-secondary">← Vissza</button>
          <button onclick="window.location.reload()" class="btn-primary">🔄 Újra</button>
        </div>
      </div>
    `
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  setupCodeHighlighting() {
    document.querySelectorAll('pre code').forEach((block) => {
      // Add copy button to code blocks
      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-code-btn'
      copyBtn.innerHTML = '📋'
      copyBtn.title = 'Kód másolása'

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          copyBtn.innerHTML = '✅'
          setTimeout(() => (copyBtn.innerHTML = '📋'), 2000)
        })
      }

      if (
        block.parentNode &&
        !block.parentNode.querySelector('.copy-code-btn')
      ) {
        block.parentNode.style.position = 'relative'
        block.parentNode.appendChild(copyBtn)
      }
    })
  }

  setupProgressTracking(filePath) {
    // Track scroll progress
    let scrollTimeout
    const trackScrollProgress = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100
        )

        if (scrollPercent >= 80) {
          // Mark as read when 80% scrolled
          const route = window.location.hash
          if (window.storageManager) {
            window.storageManager.markAsRead(route)
          }
        }

        // Update progress indicator
        const progressBar = document.querySelector('.reading-progress')
        if (progressBar) {
          progressBar.style.width = `${Math.min(scrollPercent, 100)}%`
        }
      }, 100)
    }

    window.addEventListener('scroll', trackScrollProgress)

    // Add reading progress bar
    if (!document.querySelector('.reading-progress-container')) {
      const progressContainer = document.createElement('div')
      progressContainer.className = 'reading-progress-container'
      progressContainer.innerHTML = '<div class="reading-progress"></div>'
      document.body.appendChild(progressContainer)
    }
  }
}

// === Progress Tracking ===
export class ProgressTracker {
  constructor() {
    this.storage = null
    this.initStorage()
  }

  async initStorage() {
    const { StorageManager } = await import('./storage.js')
    this.storage = new StorageManager()
  }

  trackPageView(route) {
    this.storage.saveProgress(route, this.calculateProgress(route))
    this.updateProgressIndicators()
  }

  calculateProgress(route) {
    // Simple time-based progress calculation
    const startTime = Date.now()
    const minReadTime = 2 * 60 * 1000 // 2 minutes minimum

    return new Promise((resolve) => {
      const checkProgress = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(100, (elapsed / minReadTime) * 100)

        if (progress >= 100) {
          resolve(100)
        } else {
          setTimeout(checkProgress, 10000) // Check every 10 seconds
        }
      }

      checkProgress()
    })
  }

  updateProgressIndicators() {
    const progress = this.storage.getProgress()
    const completed = Object.values(progress).filter(
      (p) => p.completionPercentage >= 100
    ).length
    const total = Object.keys(progress).length

    // Update progress indicators in UI
    document.querySelectorAll('.progress-indicator').forEach((indicator) => {
      indicator.textContent = `${completed}/${total} befejezve`
    })
  }
}
