// === Markdown Renderer ===
import { StorageManager } from './storage.js'

export class MarkdownRenderer {
  constructor() {
    this.marked = window.marked
    this.storage = new StorageManager()
    this.scrollSpyObserver = null
    this.scrollSpyScrollHandler = null
    this.scrollSpyScrollTargets = []
    this.currentActiveConcept = null
    
    // Configure marked renderer for {#slug} syntax
    this.setupMarkedRenderer()
  }

  setupMarkedRenderer() {
    if (!this.marked) return
    
    // Configure marked with custom renderer for headings
    const renderer = new this.marked.Renderer()
    
    // Override heading renderer to handle {#anchor} syntax
    renderer.heading = (text, level) => {
      // Ensure text is a string
      const textStr = typeof text === 'string' ? text : String(text)
      const { title, anchor } = this.parseHeadingWithAnchor(textStr)
      return `<h${level} id="${anchor}">${title}</h${level}>\n`
    }
    
    this.marked.setOptions({
      renderer: renderer,
      breaks: true,
      gfm: true
    })
  }

  async render(filePath, title = '') {
    try {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Failed to load ${filePath}`)

      const markdown = await response.text()
      const { frontmatter, content } = this.parseFrontmatter(markdown)

      const appEl = document.getElementById('app')
      this.cleanupTheoryPage()
      this.setAppLayout('default', appEl)
      appEl.innerHTML = this.renderContent(content, title, frontmatter)

      // Setup interactive features
      this.setupCodeHighlighting()
      this.setupProgressTracking(filePath)
    } catch (error) {
      console.error('Markdown rendering error:', error)
      this.renderError(title, error)
    }
  }

  setAppLayout(mode = 'default', appEl = document.getElementById('app')) {
    if (!appEl) return

    appEl.classList.remove('theory-layout')

    if (mode === 'theory') {
      appEl.classList.add('theory-layout')
    }
  }

  cleanupTheoryPage() {
    const appEl = document.getElementById('app')
    const sidebar = document.getElementById('theory-sidebar')
    const contentEl = document.getElementById('theory-content')
    const welcomeScreen = document.querySelector('.welcome-screen')

    // Remove theory layout classes
    document.body.classList.remove('theory-active', 'is-theory')
    
    // Reset sidebar and content
    if (sidebar) {
      sidebar.className = 'theory-drawer hidden'
      sidebar.innerHTML = ''
    }
    if (contentEl) {
      contentEl.className = 'theory-content'
      contentEl.innerHTML = ''
    }

    // Clear any existing theory layout
    const existingTheoryLayout = appEl?.querySelector('.theory-layout')
    if (existingTheoryLayout) {
      existingTheoryLayout.remove()
    }

    // Show welcome screen
    if (welcomeScreen) {
      welcomeScreen.style.display = 'block'
    }

    // Update drawer visibility
    if (window.theoryMobileDrawer) {
      window.theoryMobileDrawer.updateDrawerVisibility()
    }

    // Cleanup scroll spy properly
    this.cleanupScrollSpy()
    this.currentActiveConcept = null
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
    let html = this.marked
      ? this.marked.parse(markdown)
      : this.escapeHtml(markdown)
      
    // Wrap tables in scroll containers
    html = this.wrapTablesForScroll(html)

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
    // Run Prism.js syntax highlighting
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll()
    }

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

  // Theory page rendering with concept-based structure
  async renderTheoryPage(markdown, title, filePath) {
    try {
      this.cleanupTheoryPage()
      const { frontmatter, content } = this.parseFrontmatter(markdown)
      
      // Extract topic from filePath (e.g., "theory/java.md" -> "java")
      const topic = filePath ? filePath.split('/').pop().replace('.md', '') : 'unknown'
      
      const { mainTitle, concepts } = this.extractConceptsFromMd(content, topic)

      const appEl = document.getElementById('app')
      const sidebar = document.getElementById('theory-sidebar')
      const contentEl = document.getElementById('theory-content')
      const welcomeScreen = document.querySelector('.welcome-screen')

      // Hide welcome screen and activate theory layout
      if (welcomeScreen) {
        welcomeScreen.style.display = 'none'
      }
      
      // Activate theory layout
      appEl.classList.add('theory-layout')
      
      // On mobile, keep the theory sidebar hidden until the header toggle opens it.
      // On desktop, show it as part of the layout.
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      if (isMobile) {
        sidebar.classList.add('theory-drawer', 'drawer', 'right')
        // Ensure it stays hidden initially; theory-mobile.js will open it via toggle
        sidebar.classList.add('hidden')
      } else {
        // Desktop: visible, non-drawer
        sidebar.classList.remove('hidden')
        sidebar.classList.remove('drawer', 'right')
        sidebar.classList.remove('theory-drawer')
      }
      
      // Mark body as theory active for responsive CSS
      document.body.classList.add('theory-active', 'is-theory')

      // Build and populate sidebar TOC
      sidebar.innerHTML = this.buildTheorySidebar(concepts)

      // Build and populate content with main title + articles
      contentEl.innerHTML = this.buildTheoryContent(
        concepts,
        mainTitle || title,
        frontmatter
      )

      // Setup interactive features
      this.setupTheoryPageFeatures(concepts, filePath)
      this.setupProgressTracking(filePath)

      // Update drawer visibility for mobile
      if (window.theoryMobileDrawer) {
        window.theoryMobileDrawer.updateDrawerVisibility()
        window.theoryMobileDrawer.setupAnchorNavigation()
        window.theoryMobileDrawer.handleHashNavigation()
      }

      // Update active menu states after theory page is fully loaded
      if (window.activeMenuManager) {
        window.activeMenuManager.updateTheoryTOCAfterLoad()
      }

      // Handle initial scroll position
      this.handleInitialScroll(concepts)
      
  // Notify listeners that theory content is ready (for mobile TOC binding)
  window.dispatchEvent(new CustomEvent('theory:content:ready'))
  
  // Initialize scrollspy for active TOC tracking
  setTimeout(() => {
    this.initScrollspy();
  }, 100);
      
    } catch (error) {
      console.error('Theory page rendering error:', error)
      this.renderError(title, error)
    }
  }

  extractConceptsFromMd(markdown, topic = 'unknown') {
    const lines = markdown.split('\n')
    const concepts = []
    let current = null
    let mainTitle = ''
    let insideFogalmakSection = false
    let usedAnchors = new Set()

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Extract main title (first # heading)
      if (!mainTitle && line.startsWith('# ')) {
        mainTitle = line.replace(/^#\s+/, '').trim()
        continue
      }

      // Check if we're entering the Fogalmak/Concepts section
      if (line.startsWith('## Fogalmak') || line.startsWith('## Concepts')) {
        insideFogalmakSection = true
        continue
      }

      // Check if we're leaving the Fogalmak/Concepts section (next ## heading)
      if (insideFogalmakSection && line.startsWith('## ') && 
          !line.startsWith('## Fogalmak') && !line.startsWith('## Concepts')) {
        insideFogalmakSection = false
        // Save the last concept if exists before leaving section
        if (current) {
          concepts.push(current)
          current = null
        }
        continue
      }

      // Process ### headings as concepts ONLY if inside Fogalmak section
      if (insideFogalmakSection && line.startsWith('### ')) {
        // Save previous concept if exists
        if (current) {
          concepts.push(current)
        }

        // Start new concept - parse {#slug} syntax
        const fullTitle = line.replace(/^###\s+/, '').trim()
        const { title, anchor } = this.parseHeadingWithAnchor(fullTitle)
        
        // Ensure unique anchors
        let uniqueAnchor = anchor
        let counter = 2
        while (usedAnchors.has(uniqueAnchor)) {
          uniqueAnchor = `${anchor}-${counter}`
          counter++
        }
        usedAnchors.add(uniqueAnchor)

        // Generate unique concept ID: topic__anchor
        const conceptId = `${topic}__${uniqueAnchor}`

        current = {
          id: conceptId,
          title,
          anchor: uniqueAnchor,
          topic,
          content: '',
        }
      } else if (insideFogalmakSection && current) {
        current.content += line + '\n'
      }
    }

    // Add the last concept if we ended inside Fogalmak section
    if (current) {
      concepts.push(current)
    }

    return { mainTitle, concepts }
  }

  parseHeadingWithAnchor(headingText) {
    // Ensure input is a string
    const textStr = typeof headingText === 'string' ? headingText : String(headingText)
    
    // Check if heading has explicit {#anchor} syntax
    const anchorMatch = textStr.match(/^(.+?)\s*\{#([^}]+)\}\s*$/)
    
    if (anchorMatch) {
      // Extract clean title and explicit anchor
      const title = anchorMatch[1].trim()
      const anchor = anchorMatch[2].trim()
      return { title, anchor }
    } else {
      // No explicit anchor, generate one from title
      const title = textStr.trim()
      const anchor = title
        .toLowerCase()
        .replace(/[^a-z0-9áéíóöőúüű\s-]/g, '')
        .replace(/\s+/g, '-')
      return { title, anchor }
    }
  }

  buildTheoryPageLayout(concepts, title, frontmatter) {
    const sidebar = this.buildTheorySidebar(concepts)
    const mainContent = this.buildTheoryContent(concepts, title, frontmatter)

    return `
      <div class="theory-page-container">
        <aside class="theory-sidebar">
          ${sidebar}
        </aside>
        <main class="theory-content">
          ${mainContent}
        </main>
      </div>
    `
  }

  buildTheorySidebar(concepts) {
    return `
      <div class="theory-toc">
        <div class="toc-header-wrapper">
          <h3>📖 Fogalmak</h3>
          <button class="toc-close-btn" aria-label="Menü bezárása" style="display: none;">✕</button>
        </div>
        <input id="toc-search" placeholder="Keresés fogalmak között..." type="text" />
        <ul class="toc-list">
          ${concepts
            .map(
              (concept) => `
            <li class="toc-item">
              <a class="toc-link" href="#${concept.anchor}" data-anchor="${concept.anchor}">
                ${concept.title}
              </a>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `
  }

  buildTheoryContent(concepts, title, frontmatter) {
    // Main title section
    const titleSection = `
      <header class="theory-header">
        <h1>${title}</h1>
        ${
          frontmatter?.summary
            ? `<p class="theory-summary">${frontmatter.summary}</p>`
            : ''
        }
      </header>
    `

    // Generate articles from concepts using buildConceptArticle
    const conceptArticles = concepts
      .map((concept) => this.buildConceptArticle(concept))
      .join('')

    return `
      ${titleSection}
      <div class="concepts-container">
        ${conceptArticles}
      </div>
    `
  }

  // Wrap tables in scroll containers for responsive design
  wrapTablesForScroll(htmlContent) {
    return htmlContent.replace(/<table/g, '<div class="table-scroll"><table')
                     .replace(/<\/table>/g, '</table></div>')
  }

  buildIntroSection(title, frontmatter) {
    return `
      <header class="theory-header">
        <h1>${title}</h1>
        ${
          frontmatter.summary
            ? `<p class="theory-summary">${frontmatter.summary}</p>`
            : ''
        }
      </header>
    `
  }

  buildConceptArticle(concept) {
    let processedContent = this.marked
      ? this.marked.parse(concept.content.trim())
      : concept.content.trim()

    // Wrap tables in scroll containers for responsive design
    processedContent = this.wrapTablesForScroll(processedContent)

    return `
      <article id="${concept.anchor}" class="concept-article" data-concept="${concept.anchor}" data-concept-id="${concept.id}" data-topic="${concept.topic}">
        <h3 class="concept-title">
          <span class="concept-title-text">${concept.title}</span>
          <div class="concept-actions">
            <button class="concept-favorite-toggle" title="Kedvencekhez adás/eltávolítás" data-concept-id="${concept.id}">
              <span class="favorite-icon">☆</span>
            </button>
            <button class="concept-read-toggle" title="Olvasottnak jelölés">
              <span class="read-icon">✓</span>
            </button>
          </div>
        </h3>
        <div class="concept-body">
          ${processedContent}
        </div>
      </article>
    `
  }

  setupTheoryPageFeatures(concepts, filePath) {
    this.setupTocSearch(concepts)
    this.setupReadingProgress(concepts, filePath)

    // Setup interactive features
    this.wireTocLinks()
    this.attachScrollSpy()
    this.enableTocKeyboardNav()
    this.setupMobileTocToggle()

    // Setup deep link handling
    this.setupDeepLinkHandling()
    
    // Setup favorite star icons
    this.setupFavoriteStars()
    
    // Setup favorite toggle handlers
    this.setupFavoriteHandlers()
  }

  setupDeepLinkHandling() {
    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const hashParts = window.location.hash.split('#')
      const targetId = hashParts.length > 2 ? hashParts[2] : null
      
      if (targetId) {
        const target = document.getElementById(targetId)
        const scrollContainer = document.querySelector('#theory-content')
        const isWindowScroll = !scrollContainer || getComputedStyle(scrollContainer).overflowY === 'visible' || (scrollContainer.scrollHeight <= scrollContainer.clientHeight)
        
        if (target) {
          const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
          const top = Math.max(0, target.offsetTop - headerHeight - 8)
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
          if (isWindowScroll) {
            window.scrollTo({ top, behavior })
          } else if (scrollContainer) {
            scrollContainer.scrollTo({ top, behavior })
          }
          this.setActiveNavigationItem(targetId)
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('popstate', handleHashChange)

    // Store cleanup function
    this.deepLinkCleanup = () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('popstate', handleHashChange)
    }
  }

  handleInitialScroll(concepts) {
    // Handle URL hash for deep linking
    const hashParts = window.location.hash.split('#')
    const deepAnchor =
      hashParts.length > 2 ? hashParts[hashParts.length - 1] : ''

    setTimeout(() => {
      if (deepAnchor && concepts.find(c => c.anchor === deepAnchor)) {
        // Scroll to specific concept with proper offset
        const target = document.getElementById(deepAnchor)
        const scrollContainer = document.querySelector('#theory-content')
        const isWindowScroll = !scrollContainer || getComputedStyle(scrollContainer).overflowY === 'visible' || (scrollContainer.scrollHeight <= scrollContainer.clientHeight)
        
        if (target) {
          const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
          const top = Math.max(0, target.offsetTop - headerHeight - 8)
          if (isWindowScroll) {
            window.scrollTo({ top, behavior: 'auto' })
          } else if (scrollContainer) {
            scrollContainer.scrollTo({ top, behavior: 'auto' })
          }
          this.setActiveNavigationItem(deepAnchor)
        }
      } else if (concepts.length > 0) {
        // No hash: set first concept active
        this.setActiveNavigationItem(concepts[0].anchor)
        const scrollContainer = document.querySelector('#theory-content')
        const isWindowScroll = !scrollContainer || getComputedStyle(scrollContainer).overflowY === 'visible' || (scrollContainer.scrollHeight <= scrollContainer.clientHeight)
        if (isWindowScroll) {
          window.scrollTo({ top: 0, behavior: 'auto' })
        } else if (scrollContainer) {
          scrollContainer.scrollTop = 0
        }
      }
    }, 100)
  }

  setupTocSearch(concepts) {
    const searchInput = document.getElementById('toc-search')
    const tocLinks = document.querySelectorAll('.toc-link')

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase()

        tocLinks.forEach((link) => {
          const title = link.textContent.toLowerCase()
          const listItem = link.closest('li')

          if (title.includes(query)) {
            listItem.style.display = 'block'
          } else {
            listItem.style.display = 'none'
          }
        })
      })
    }
  }

  setupConceptNavigation(concepts) {
    const prevBtn = document.getElementById('prev-concept')
    const nextBtn = document.getElementById('next-concept')
    let currentIndex = 0

    const updateNavigation = () => {
      if (prevBtn) prevBtn.disabled = currentIndex === 0
      if (nextBtn) nextBtn.disabled = currentIndex === concepts.length - 1
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--
          this.scrollToConcept(concepts[currentIndex].anchor)
          updateNavigation()
        }
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < concepts.length - 1) {
          currentIndex++
          this.scrollToConcept(concepts[currentIndex].anchor)
          updateNavigation()
        }
      })
    }

    updateNavigation()
  }

  setupReadingProgress(concepts, filePath) {
    const readButtons = document.querySelectorAll('.concept-read-toggle')

    readButtons.forEach((button, index) => {
      const concept = concepts[index]
      if (!concept) return

      // Check if concept is marked as read
      const isRead = this.storage.isConceptRead(filePath, concept.anchor)
      if (isRead) {
        button.classList.add('read')
      }

      // Handle click event
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const wasRead = button.classList.toggle('read')

        // Save to storage
        this.storage.markConceptRead(filePath, concept.anchor, wasRead)

        // Show notification
        this.showReadNotification(wasRead, concept.title)

        // Update progress indicators if they exist
        this.updateProgressIndicators(concepts, filePath)
      })
    })
  }

  setupScrollSpy(concepts) {
    const tocLinks = document.querySelectorAll('.toc-link')
    const articles = document.querySelectorAll('.concept-article')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anchor = entry.target.getAttribute('data-concept')

            // Update active TOC link
            tocLinks.forEach((link) => link.classList.remove('active'))
            const activeLink = document.querySelector(
              `[data-anchor="${anchor}"]`
            )
            if (activeLink) {
              activeLink.classList.add('active')
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px',
      }
    )

    articles.forEach((article) => observer.observe(article))
  }

  scrollToConcept(anchor) {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  updateProgressIndicators(concepts, filePath) {
    const readCount = document.querySelectorAll(
      '.concept-read-toggle.read'
    ).length
    const total = concepts.length
    const percentage = Math.round((readCount / total) * 100)

    // Update progress text
    const progressText = document.getElementById('progress-text')
    if (progressText) {
      progressText.textContent = `${readCount} / ${total} fogalom`
    }

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill')
    if (progressFill) {
      progressFill.style.width = `${percentage}%`
    }

    // Update TOC indicators
    document.querySelectorAll('.concept-status').forEach((status, index) => {
      const isRead = document
        .querySelectorAll('.concept-read-toggle')
        [index]?.classList.contains('read')
      status.textContent = isRead ? '●' : '○'
      status.style.color = isRead
        ? 'var(--success-color)'
        : 'var(--muted-color)'
    })
  }

  // === THEORY PAGE SCROLLSPY AND NAVIGATION HELPERS === //

  scrollSidebarLinkIntoView(anchor) {
    const sidebar = document.querySelector('.theory-sidebar')
    const link = sidebar?.querySelector(`.toc-link[data-anchor="${anchor}"]`)
    if (!sidebar || !link) return

    const linkRect = link.getBoundingClientRect()
    const sidebarRect = sidebar.getBoundingClientRect()

    const outOfView =
      linkRect.top < sidebarRect.top + 40 ||
      linkRect.bottom > sidebarRect.bottom - 40

    if (outOfView) {
      link.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'smooth',
      })
    }
  }

  setActiveToc(anchor) {
    // Use the new unified method
    this.setActiveNavigationItem(anchor)
  }

  updateTheoryHash(anchor) {
    const baseRouteMatch = window.location.hash.match(/^#[^#]*/)
    const baseRoute = baseRouteMatch ? baseRouteMatch[0] : window.location.hash
    const nextHash = anchor ? `${baseRoute}#${anchor}` : baseRoute

    if (window.location.hash !== nextHash) {
      history.replaceState(null, '', nextHash)
    }
  }

  attachScrollSpy() {
    // Clean up existing observers
    this.cleanupScrollSpy()

    // Find the actual scroll container and headings
    const scrollContainer = document.querySelector('#theory-content')
    // Observe concept articles which carry the anchor IDs
    const articles = Array.from(document.querySelectorAll('#theory-content article[id]'))

    if (!articles.length) {
      console.warn('ScrollSpy: No scroll headings found')
      return
    }

    // Determine whether window handles scrolling (mobile) or the container (desktop)
    const isWindowScroll =
      !scrollContainer ||
      getComputedStyle(scrollContainer).overflowY === 'visible' ||
      scrollContainer.scrollHeight <= scrollContainer.clientHeight

    // Get sticky header height for proper offset calculation
    const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
    const rootMargin = `-${headerHeight}px 0px -60% 0px`

    // Helper: compute active article based on geometry relative to header offset
    const pickActiveByGeometry = () => {
      const headerH = document.querySelector('.topbar')?.offsetHeight || 0
      const threshold = headerH + 1
      let candidate = null
      let minPositiveTop = Infinity
      let bestAbove = null
      let maxNegativeTop = -Infinity

      const containerTop = isWindowScroll ? 0 : (scrollContainer?.getBoundingClientRect().top || 0)
      articles.forEach((art) => {
        const top = art.getBoundingClientRect().top - containerTop
        const relTop = top // relative to container/window top
        const delta = relTop - threshold
        if (delta >= 0) {
          // below or at threshold: prefer closest below threshold
          if (delta < minPositiveTop) {
            minPositiveTop = delta
            candidate = art
          }
        } else {
          // above threshold: keep the one closest above
          if (delta > maxNegativeTop) {
            maxNegativeTop = delta
            bestAbove = art
          }
        }
      })

      const best = candidate || bestAbove || null
      return best?.id || null
    }

    // Create IntersectionObserver with proper root; on any entry, recompute globally
    this.scrollSpyObserver = new IntersectionObserver(
      () => {
        const bestId = pickActiveByGeometry()
        if (bestId && this.currentActiveConcept !== bestId) {
          this.setActiveNavigationItem(bestId)
          this.updateTheoryHash(bestId)
        }
      },
      {
        root: isWindowScroll ? null : scrollContainer,
        rootMargin: rootMargin,
        threshold: [0, 0.01, 0.1, 0.3, 0.5, 1]
      }
    )

    // Observe all concept articles
    articles.forEach(article => {
      this.scrollSpyObserver.observe(article)
    })

    // Set initial active state
    this.setInitialActiveState(articles, scrollContainer, headerHeight, isWindowScroll)
  }

  cleanupScrollSpy() {
    if (this.scrollSpyObserver) {
      this.scrollSpyObserver.disconnect()
      this.scrollSpyObserver = null
    }

    // Remove old scroll listeners
    if (this.scrollSpyScrollHandler && this.scrollSpyScrollTargets?.length) {
      this.scrollSpyScrollTargets.forEach((target) =>
        target.removeEventListener('scroll', this.scrollSpyScrollHandler)
      )
    }
    this.scrollSpyScrollTargets = []
    this.scrollSpyScrollHandler = null

    // Remove deep link handlers
    if (this.deepLinkCleanup) {
      this.deepLinkCleanup()
      this.deepLinkCleanup = null
    }
  }

  setActiveNavigationItem(headingId) {
    // Remove active state from all TOC links
    const allTocLinks = document.querySelectorAll('.theory-toc .toc-link, .theory-sidebar .toc-link')
    allTocLinks.forEach(link => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    })

    // Set active state on the matching link
    const activeLink = document.querySelector(`.theory-toc .toc-link[data-anchor="${headingId}"], .theory-sidebar .toc-link[data-anchor="${headingId}"]`)

    if (activeLink) {
      activeLink.classList.add('active')
      activeLink.setAttribute('aria-current', 'true')
      this.currentActiveConcept = headingId

      // Scroll the sidebar link into view if needed
      this.scrollSidebarLinkIntoView(headingId)
    }
  }

  setInitialActiveState(articles, scrollContainer, headerHeight, isWindowScroll = false) {
    // Check URL hash for deep linking
    const hashParts = window.location.hash.split('#')
    const targetId = hashParts.length > 2 ? hashParts[2] : null

    if (targetId && articles.find(a => a.id === targetId)) {
      // Deep link: scroll to target and set active
      const target = document.getElementById(targetId)
      if (target) {
        const top = Math.max(0, target.offsetTop - headerHeight - 8)
        if (isWindowScroll) {
          window.scrollTo({ top, behavior: 'auto' })
        } else if (scrollContainer) {
          scrollContainer.scrollTo({ top, behavior: 'auto' })
        }
        this.setActiveNavigationItem(targetId)
      }
    } else {
      // No deep link: find the first visible article
      let firstVisible = null
      if (isWindowScroll) {
        firstVisible = articles.find(article => article.getBoundingClientRect().top >= headerHeight + 1)
      } else if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect()
        firstVisible = articles.find(article => article.getBoundingClientRect().top >= containerRect.top + headerHeight + 1)
      }

      if (firstVisible) {
        this.setActiveNavigationItem(firstVisible.id)
      } else if (articles.length > 0) {
        // Fallback to first heading
        this.setActiveNavigationItem(articles[0].id)
      }
    }
  }

  getStickyOffset() {
    const root = document.documentElement
    if (!root) return 0

    const styles = getComputedStyle(root)
    const headerHeight =
      parseFloat(styles.getPropertyValue('--header-height')) || 0
    const gap = parseFloat(styles.getPropertyValue('--space-md')) || 0
    const buffer = 12

    return headerHeight + gap + buffer
  }



  // Compute header offset for anchor scrolling
  computeHeaderOffset() {
    const topbar = document.querySelector('.topbar');
    return (topbar?.offsetHeight || 64) + 16; // Header + padding
  }

  // Initialize scrollspy with IntersectionObserver
  initScrollspy() {
    if (this.scrollspyObserver) {
      this.scrollspyObserver.disconnect();
    }

    const headings = document.querySelectorAll('#theory-content h3[id]');
    if (headings.length === 0) return;

    const headerOffset = this.computeHeaderOffset();
    
    this.scrollspyObserver = new IntersectionObserver((entries) => {
      let activeId = null;
      let highestRatio = 0;
      
      // Find the heading with highest intersection ratio
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });
      
      // Update active states
      if (activeId) {
        this.setActiveNavigationItem(activeId);
      }
    }, {
      root: null, // Use viewport
      rootMargin: `-${headerOffset}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.5, 1.0]
    });

    headings.forEach(heading => {
      this.scrollspyObserver.observe(heading);
    });
  }

  wireTocLinks() {
    // Remove old event listeners
    document.querySelectorAll('.toc-link').forEach(link => {
      link.replaceWith(link.cloneNode(true));
    });

    // Add new event listeners with proper anchor scrolling
    document.querySelectorAll('#theory-sidebar .toc-link, .theory-sidebar .toc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const href = link.getAttribute('href');
        const anchor = href ? href.slice(1) : link.getAttribute('data-anchor');
        const target = document.getElementById(anchor);
        
        if (!target) return;

        // Calculate scroll position with header offset
        const headerOffset = this.computeHeaderOffset();
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        
        // Smooth scroll to target
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ 
          top: Math.max(0, targetTop), 
          behavior 
        });

        // Update hash without page jump
        const baseUrl = location.href.split('#')[0];
        history.replaceState(null, '', `${baseUrl}#${anchor}`);
        
        // Update active state immediately
        this.setActiveNavigationItem(anchor);

        // Close mobile drawers if open
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.theory-sidebar');
          if (sidebar) {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
          }
          
          const toggleBtn = document.getElementById('mobile-toc-toggle');
          if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // TOC link active state management cleanup when needed
  cleanupTocStates() {
    // Placeholder for future cleanup logic
  }

  enableTocKeyboardNav() {
    const sidebar = document.querySelector('.theory-sidebar')
    if (!sidebar) return

    const links = Array.from(sidebar.querySelectorAll('.toc-link'))
    let currentFocusIndex = 0

    const focusLink = (index) => {
      if (links[index]) {
        links[index].focus()
        const anchor = links[index].getAttribute('data-anchor')
        this.scrollSidebarLinkIntoView(anchor)
      }
    }

    sidebar.addEventListener('keydown', (e) => {
      if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return

      e.preventDefault()

      if (e.key === 'ArrowDown') {
        currentFocusIndex = Math.min(currentFocusIndex + 1, links.length - 1)
      } else if (e.key === 'ArrowUp') {
        currentFocusIndex = Math.max(currentFocusIndex - 1, 0)
      } else if (e.key === 'Enter') {
        links[currentFocusIndex]?.click()
        return
      }

      focusLink(currentFocusIndex)
    })

    // Set initial focus index based on active link
    const activeLink = sidebar.querySelector('.toc-link.active')
    if (activeLink) {
      currentFocusIndex = links.indexOf(activeLink)
    }
  }

  setupMobileTocToggle() {
    const toggleBtn = document.getElementById('mobile-toc-toggle')
    const sidebar = document.querySelector('.theory-sidebar')

    if (!toggleBtn || !sidebar) return

    toggleBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.contains('open')
      sidebar.classList.toggle('open')
      toggleBtn.setAttribute('aria-expanded', (!isOpen).toString())
    })

    // Close TOC when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (
        window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        sidebar.classList.remove('open')
        toggleBtn.setAttribute('aria-expanded', 'false')
      }
    })

    // Show/hide toggle button based on current page
    const isTheoryPage = window.location.hash.startsWith('#/theory')
    toggleBtn.style.display = isTheoryPage ? 'block' : 'none'
  }

  setupFavoriteStars() {
    // Update star icons based on favorite status
    const favoriteButtons = document.querySelectorAll('.concept-favorite-toggle')
    
    favoriteButtons.forEach(button => {
      const conceptId = button.dataset.conceptId
      if (this.storage.isConceptFavorite(conceptId)) {
        const icon = button.querySelector('.favorite-icon')
        if (icon) {
          icon.textContent = '★' // Filled star
          button.classList.add('is-favorite')
        }
      }
    })
  }

  setupFavoriteHandlers() {
    // Event delegation for favorite toggle buttons
    const contentEl = document.getElementById('theory-content')
    if (!contentEl) return

    contentEl.addEventListener('click', (e) => {
      const button = e.target.closest('.concept-favorite-toggle')
      if (!button) return

      const conceptId = button.dataset.conceptId
      const article = button.closest('.concept-article')
      if (!article) return

      const conceptTitle = article.querySelector('.concept-title-text')?.textContent?.trim() || 'Untitled'
      const topic = article.dataset.topic || 'unknown'
      const anchor = article.dataset.concept || ''

      // Toggle favorite status
      const isFavorite = this.storage.toggleConceptFavorite(conceptId, conceptTitle, topic, anchor)
      
      // Update icon appearance
      const icon = button.querySelector('.favorite-icon')
      if (icon) {
        icon.textContent = isFavorite ? '★' : '☆'
        button.classList.toggle('is-favorite', isFavorite)
      }

      // Optional: Show a brief notification
      this.showFavoriteNotification(isFavorite)
    })
  }

  showFavoriteNotification(isFavorite) {
    // Create a simple toast notification
    const toast = document.createElement('div')
    toast.className = 'favorite-toast'
    toast.textContent = isFavorite ? '★ Kedvencekhez adva' : '☆ Kedvencekből eltávolítva'
    document.body.appendChild(toast)

    // Auto-remove after 2 seconds
    setTimeout(() => {
      toast.classList.add('fade-out')
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  showReadNotification(isRead, conceptTitle = 'Fogalom') {
    // Create a simple toast notification
    const toast = document.createElement('div')
    toast.className = 'read-toast'
    const truncatedTitle = conceptTitle.length > 30 ? conceptTitle.substring(0, 30) + '...' : conceptTitle
    toast.textContent = isRead ? `✓ Olvasottnak jelölve: ${truncatedTitle}` : `✗ Eltávolítva: ${truncatedTitle}`
    document.body.appendChild(toast)

    // Auto-remove after 2 seconds
    setTimeout(() => {
      toast.classList.add('fade-out')
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  async renderFavoriteConcepts() {
    const favorites = this.storage.getConceptFavorites()
    const appEl = document.getElementById('app')
    const sidebar = document.getElementById('theory-sidebar')
    const welcomeScreen = document.querySelector('.welcome-screen')

    // Hide welcome screen
    if (welcomeScreen) {
      welcomeScreen.style.display = 'none'
    }

    // Activate theory-like layout for favorites
    appEl.classList.add('theory-layout')
    document.body.classList.add('theory-active', 'is-theory')

    // Load content for each favorite
    const favoritesWithContent = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const response = await fetch(`./theory/${fav.topic}.md`)
          if (!response.ok) return { ...fav, content: '' }
          const markdown = await response.text()
          
          // Extract the specific concept content
          const conceptContent = this.extractConceptContent(markdown, fav.anchor)
          return { ...fav, content: conceptContent }
        } catch (error) {
          console.error(`Failed to load content for ${fav.topic}:`, error)
          return { ...fav, content: '' }
        }
      })
    )

    // Build sidebar navigation
    if (sidebar && favorites.length > 0) {
      sidebar.classList.remove('hidden')
      sidebar.style.display = 'block'
      sidebar.innerHTML = this.buildFavoritesSidebar(favoritesWithContent)
    } else if (sidebar) {
      sidebar.classList.add('hidden')
      sidebar.style.display = 'none'
      sidebar.innerHTML = ''
    }

    // Build favorites page content
    const favoritesHTML = `
      <div class="favorites-page">
        <header class="theory-header">
          <h1>★ Kedvenc Fogalmak</h1>
          <p class="theory-summary">${favorites.length} fogalom a kedvencek között</p>
        </header>

        ${favorites.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">☆</div>
            <h3>Még nincsenek kedvenc fogalmak</h3>
            <p>A theory oldalakon a fogalmak mellett található csillag ikonra kattintva hozzáadhatod őket a kedvenceidhez.</p>
            <a href="#/theory/java" class="btn btn-primary">Theory oldalak böngészése</a>
          </div>
        ` : `
          <div class="favorites-controls">
            <input 
              type="text" 
              id="favorites-search" 
              placeholder="Keresés a kedvencek között..." 
              class="toc-search-input"
            />
            <select id="favorites-filter" class="favorites-filter-select">
              <option value="all">Összes téma</option>
              ${this.getUniqueTopics(favorites).map(topic => 
                `<option value="${topic}">${this.formatTopicName(topic)}</option>`
              ).join('')}
            </select>
          </div>

          <div class="concepts-container">
            ${favoritesWithContent.map(fav => this.buildFavoriteConceptCard(fav)).join('')}
          </div>
        `}
      </div>
    `

    // Render to theory-content or app element
    const contentEl = document.getElementById('theory-content')
    if (contentEl) {
      contentEl.innerHTML = favoritesHTML
    } else {
      appEl.innerHTML = favoritesHTML
    }

    // Setup search and filter functionality
    if (favorites.length > 0) {
      this.setupFavoritesSearch()
      this.setupFavoritesFilter()
      this.setupFavoriteRemoveHandlers()
      this.setupFavoritesSidebarNavigation()
    }
  }

  buildFavoritesSidebar(favorites) {
    if (favorites.length === 0) return ''

    // Group favorites by topic
    const groupedByTopic = favorites.reduce((acc, fav) => {
      if (!acc[fav.topic]) {
        acc[fav.topic] = []
      }
      acc[fav.topic].push(fav)
      return acc
    }, {})

    const topicGroups = Object.entries(groupedByTopic)
      .map(([topic, concepts]) => {
        const conceptLinks = concepts
          .map(concept => `
            <li>
              <a href="javascript:void(0)" class="toc-link" data-anchor="favorite-${concept.id}">
                ${concept.title}
              </a>
            </li>
          `)
          .join('')

        return `
          <div class="toc-group">
            <h4 class="toc-group-title">${this.formatTopicName(topic)}</h4>
            <ul class="toc-list">
              ${conceptLinks}
            </ul>
          </div>
        `
      })
      .join('')

    return `
      <div class="theory-toc">
        <div class="toc-header-wrapper">
          <h3>📑 Tartalom</h3>
          <button class="toc-close-btn" aria-label="Menü bezárása" style="display: none;">✕</button>
        </div>
        ${topicGroups}
      </div>
    `
  }

  setupFavoritesSidebarNavigation() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const tocLinks = document.querySelectorAll('#theory-sidebar .toc-link')
      
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
          
          const anchor = link.dataset.anchor
          const targetElement = document.getElementById(anchor)
          
          if (!targetElement) {
            console.warn('Target element not found:', anchor)
            return
          }
          
          console.log('Scrolling to:', anchor, targetElement)
          
          // Close sticky TOC if open
          const sidebar = document.getElementById('theory-sidebar')
          if (sidebar && sidebar.classList.contains('sticky-toc-visible')) {
            sidebar.classList.remove('sticky-toc-visible')
            const hamburger = document.querySelector('.theory-hamburger')
            if (hamburger) {
              hamburger.textContent = '☰'
              hamburger.setAttribute('aria-label', 'Fogalmak menü megnyitása')
            }
            const closeBtn = sidebar.querySelector('.toc-close-btn')
            if (closeBtn) closeBtn.style.display = 'none'
            const overlay = document.querySelector('.sticky-toc-overlay')
            if (overlay) {
              overlay.classList.remove('visible')
              setTimeout(() => overlay.remove(), 300)
            }
          }
          
          // Scroll to element
          const headerHeight = document.querySelector('.topbar')?.offsetHeight || 64
          const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20
          
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          })
          
          // Update active link
          tocLinks.forEach(l => l.classList.remove('active'))
          link.classList.add('active')
        })
      })
    }, 100)
  }

  extractConceptContent(markdown, anchor) {
    // Split markdown into lines
    const lines = markdown.split('\n')
    let content = []
    let capturing = false
    let headerLevel = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // Check if this is the start of our concept
      if (line.startsWith('### ')) {
        const { title: lineTitle, anchor: lineAnchor } = this.parseHeadingWithAnchor(line.replace(/^###\s+/, ''))
        
        if (lineAnchor === anchor) {
          capturing = true
          headerLevel = 3
          continue // Skip the heading itself
        } else if (capturing) {
          // We've hit another ### heading, stop capturing
          break
        }
      }
      
      // Stop if we hit another heading of same or higher level
      if (capturing && line.startsWith('###')) {
        break
      }
      
      if (capturing) {
        content.push(line)
      }
    }

    return content.join('\n').trim()
  }

  buildFavoriteConceptCard(favorite) {
    const formattedDate = new Date(favorite.addedAt).toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    // Check if concept is marked as read
    const filePath = `theory/${favorite.topic}.md`
    const isRead = this.storage.isConceptRead(filePath, favorite.anchor)

    // Process markdown content to HTML
    let processedContent = ''
    if (favorite.content) {
      processedContent = this.marked 
        ? this.marked.parse(favorite.content)
        : favorite.content
      
      // Wrap tables in scroll containers
      processedContent = this.wrapTablesForScroll(processedContent)
    }

    return `
      <article id="favorite-${favorite.id}" class="concept-article favorite-concept-card" data-concept-id="${favorite.id}" data-topic="${favorite.topic}" data-anchor="${favorite.anchor}">
        <h3 class="concept-title">
          <span class="concept-title-text">${favorite.title}</span>
          <div class="concept-actions">
            <button class="concept-favorite-toggle is-favorite" title="Eltávolítás a kedvencekből" data-concept-id="${favorite.id}">
              <span class="favorite-icon">★</span>
            </button>
            <button class="concept-read-toggle ${isRead ? 'read' : ''}" title="Olvasottnak jelölés" data-file-path="${filePath}" data-anchor="${favorite.anchor}">
              <span class="read-icon">✓</span>
            </button>
          </div>
        </h3>
        <div class="concept-body">
          <div class="favorite-meta">
            <span class="favorite-topic-badge">${this.formatTopicName(favorite.topic)}</span>
            <span class="favorite-date">Hozzáadva: ${formattedDate}</span>
          </div>
          ${processedContent ? `
            <div class="favorite-content">
              ${processedContent}
            </div>
          ` : `
            <p class="favorite-no-content">A tartalom nem érhető el.</p>
          `}
          <div class="favorite-actions">
            <a href="#/theory/${favorite.topic}#${favorite.anchor}" class="view-original-link">
              → Megtekintés az eredeti oldalon
            </a>
          </div>
        </div>
      </article>
    `
  }

  getUniqueTopics(favorites) {
    const topics = favorites.map(fav => fav.topic)
    return [...new Set(topics)].sort()
  }

  formatTopicName(topic) {
    const topicNames = {
      'java': 'Java',
      'oop': 'OOP',
      'spring': 'Spring',
      'testing': 'Tesztelés',
      'sql': 'SQL',
      'web': 'Web',
      'arch': 'Architektúra',
      'git': 'Git',
      'devops': 'DevOps',
      'frontend': 'Frontend',
      'algorithms': 'Algoritmusok'
    }
    return topicNames[topic] || topic.charAt(0).toUpperCase() + topic.slice(1)
  }

  setupFavoritesSearch() {
    const searchInput = document.getElementById('favorites-search')
    if (!searchInput) return

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase()
      const cards = document.querySelectorAll('.favorite-concept-card')

      cards.forEach(card => {
        const title = card.querySelector('.concept-title-text')?.textContent.toLowerCase() || ''
        const matches = title.includes(query)
        card.style.display = matches ? '' : 'none'
      })
    })
  }

  setupFavoritesFilter() {
    const filterSelect = document.getElementById('favorites-filter')
    if (!filterSelect) return

    filterSelect.addEventListener('change', (e) => {
      const selectedTopic = e.target.value
      const cards = document.querySelectorAll('.favorite-concept-card')

      cards.forEach(card => {
        const topic = card.dataset.topic
        const matches = selectedTopic === 'all' || topic === selectedTopic
        card.style.display = matches ? '' : 'none'
      })
    })
  }

  setupFavoriteRemoveHandlers() {
    const contentEl = document.getElementById('app')
    if (!contentEl) return

    contentEl.addEventListener('click', (e) => {
      const button = e.target.closest('.concept-favorite-toggle')
      if (!button || !button.classList.contains('is-favorite')) return

      e.preventDefault()
      e.stopPropagation()
      
      const conceptId = button.dataset.conceptId
      
      // Remove from storage
      this.storage.removeConceptFavorite(conceptId)
      
      // Remove card from DOM with animation
      const card = button.closest('.concept-article')
      if (card) {
        card.style.animation = 'fadeOut 0.3s ease-out'
        setTimeout(() => {
          card.remove()
          
          // Update count
          const countEl = document.querySelector('.theory-summary')
          const remainingCards = document.querySelectorAll('.favorite-concept-card').length
          if (countEl) {
            countEl.textContent = `${remainingCards} fogalom a kedvencek között`
          }
          
          // Show empty state if no favorites left
          if (remainingCards === 0) {
            this.renderFavoriteConcepts()
          }
        }, 300)
      }
      
      // Show notification
      this.showFavoriteNotification(false)
    })

    // Setup read toggle handlers for favorites page
    contentEl.addEventListener('click', (e) => {
      const button = e.target.closest('.concept-read-toggle')
      if (!button) return

      e.preventDefault()
      e.stopPropagation()

      const filePath = button.dataset.filePath
      const anchor = button.dataset.anchor
      const card = button.closest('.concept-article')
      const conceptTitle = card?.querySelector('.concept-title-text')?.textContent || 'Fogalom'

      // Toggle read status
      const wasRead = button.classList.toggle('read')
      this.storage.markConceptRead(filePath, anchor, wasRead)

      // Show notification
      this.showReadNotification(wasRead, conceptTitle)
    })
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
