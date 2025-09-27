// === Markdown Renderer ===
export class MarkdownRenderer {
  constructor() {
    this.marked = window.marked
    this.scrollSpyObserver = null
    this.scrollSpyScrollHandler = null
    this.scrollSpyScrollTargets = []
    this.currentActiveConcept = null
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
    const tocToggle = document.getElementById('toc-toggle')
    const welcomeScreen = document.querySelector('.welcome-screen')

    // Remove theory layout
    appEl?.classList.remove('theory-active')
    sidebar?.classList.add('hidden')

    // Hide mobile TOC toggle
    if (tocToggle) {
      tocToggle.style.display = 'none'
    }

    // Show welcome screen again
    if (welcomeScreen) {
      welcomeScreen.style.display = 'block'
    }

    // Clear content
    if (sidebar) sidebar.innerHTML = ''
    const contentEl = document.getElementById('theory-content')
    if (contentEl) contentEl.innerHTML = ''

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

  // Theory page rendering with concept-based structure
  async renderTheoryPage(markdown, title, filePath) {
    try {
      this.cleanupTheoryPage()
      const { frontmatter, content } = this.parseFrontmatter(markdown)
      const { mainTitle, concepts } = this.extractConceptsFromMd(content)

      const appEl = document.getElementById('app')
      const sidebar = document.getElementById('theory-sidebar')
      const contentEl = document.getElementById('theory-content')
      const welcomeScreen = document.querySelector('.welcome-screen')

      // Hide welcome screen and activate theory layout
      if (welcomeScreen) {
        welcomeScreen.style.display = 'none'
      }
      appEl.classList.add('theory-active')
      sidebar.classList.remove('hidden')

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

      // Show mobile TOC toggle
      const tocToggle = document.getElementById('toc-toggle')
      if (tocToggle) {
        tocToggle.style.display = 'block'
      }

      // Update active menu states after theory page is fully loaded
      if (window.activeMenuManager) {
        window.activeMenuManager.updateTheoryTOCAfterLoad()
      }

      // Handle initial scroll position
      this.handleInitialScroll(concepts)
    } catch (error) {
      console.error('Theory page rendering error:', error)
      this.renderError(title, error)
    }
  }

  extractConceptsFromMd(markdown) {
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

      // Check if we're entering the Fogalmak section
      if (line.startsWith('## Fogalmak')) {
        insideFogalmakSection = true
        continue
      }

      // Check if we're leaving the Fogalmak section (next ## heading)
      if (insideFogalmakSection && line.startsWith('## ') && !line.startsWith('## Fogalmak')) {
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

        // Start new concept
        const title = line.replace(/^###\s+/, '').trim()
        let anchor = title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/^-+|-+$/g, '')

        // Ensure unique anchors
        let uniqueAnchor = anchor
        let counter = 2
        while (usedAnchors.has(uniqueAnchor)) {
          uniqueAnchor = `${anchor}-${counter}`
          counter++
        }
        usedAnchors.add(uniqueAnchor)

        current = {
          title,
          anchor: uniqueAnchor,
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
        <h3>📖 Fogalmak</h3>
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

    // Generate articles from concepts
    const conceptArticles = concepts
      .map((concept) => {
        const processedContent = this.marked
          ? this.marked.parse(concept.content.trim())
          : concept.content.trim()

        return `
          <article id="${concept.anchor}" class="concept-article">
            <h3 id="${concept.anchor}" class="concept-title">${concept.title}</h3>
            <div class="concept-body">
              ${processedContent}
            </div>
          </article>
        `
      })
      .join('')

    return `
      ${titleSection}
      <div class="concepts-container">
        ${conceptArticles}
      </div>
    `
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
    const processedContent = this.marked
      ? this.marked.parse(concept.content)
      : concept.content

    return `
      <article id="${concept.anchor}" class="concept-article" data-concept="${concept.anchor}">
        <h3 class="concept-title">
          ${concept.title}
          <button class="concept-read-toggle" title="Olvasottnak jelölés">
            <span class="read-icon">✓</span>
          </button>
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
  }

  setupDeepLinkHandling() {
    // Listen for hash changes (back/forward navigation)
    const handleHashChange = () => {
      const hashParts = window.location.hash.split('#')
      const targetId = hashParts.length > 2 ? hashParts[2] : null
      
      if (targetId) {
        const target = document.getElementById(targetId)
        const scrollContainer = document.querySelector('#theory-content')
        
        if (target && scrollContainer) {
          const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
          scrollContainer.scrollTo({
            top: target.offsetTop - headerHeight - 8,
            behavior: 'smooth'
          })
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
        
        if (target && scrollContainer) {
          const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
          scrollContainer.scrollTo({
            top: target.offsetTop - headerHeight - 8,
            behavior: 'auto'
          })
          this.setActiveNavigationItem(deepAnchor)
        }
      } else if (concepts.length > 0) {
        // No hash: set first concept active
        this.setActiveNavigationItem(concepts[0].anchor)
        const scrollContainer = document.querySelector('#theory-content')
        if (scrollContainer) {
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

      // Check if concept is read from localStorage directly for now
      const conceptKey = `concept_${filePath}_${concept.anchor}`
      const progress = JSON.parse(
        localStorage.getItem('software_dev_prep_progress') || '{}'
      )
      const isRead =
        progress[conceptKey] && progress[conceptKey].completionPercentage >= 100

      if (isRead) {
        button.classList.add('read')
      }

      button.addEventListener('click', () => {
        const wasRead = button.classList.toggle('read')

        // Save to localStorage directly for now
        const progress = JSON.parse(
          localStorage.getItem('software_dev_prep_progress') || '{}'
        )
        if (wasRead) {
          progress[conceptKey] = {
            route: conceptKey,
            completionPercentage: 100,
            lastVisited: new Date().toISOString(),
            visits: 1,
          }
        } else {
          delete progress[conceptKey]
        }
        localStorage.setItem(
          'software_dev_prep_progress',
          JSON.stringify(progress)
        )
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
    const headings = Array.from(document.querySelectorAll('#theory-content h3[id]'))

    if (!scrollContainer || !headings.length) {
      console.warn('ScrollSpy: No scroll container or headings found')
      return
    }

    // Get sticky header height for proper offset calculation
    const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
    const rootMargin = `-${headerHeight}px 0px -60% 0px`

    // Create IntersectionObserver with proper root
    this.scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible heading
        let activeHeading = null
        let maxVisibility = 0

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio
            activeHeading = entry.target
          }
        })

        // If we have an active heading, update the navigation
        if (activeHeading?.id && this.currentActiveConcept !== activeHeading.id) {
          this.setActiveNavigationItem(activeHeading.id)
          this.updateTheoryHash(activeHeading.id)
        }
      },
      {
        root: scrollContainer,
        rootMargin: rootMargin,
        threshold: [0, 0.1, 0.5, 1]
      }
    )

    // Observe all headings
    headings.forEach(heading => {
      this.scrollSpyObserver.observe(heading)
    })

    // Set initial active state
    this.setInitialActiveState(headings, scrollContainer, headerHeight)
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
    const activeLink = document.querySelector(
      `.theory-toc .toc-link[data-anchor="${headingId}"], .theory-sidebar .toc-link[data-anchor="${headingId}"]`
    )

    if (activeLink) {
      activeLink.classList.add('active')
      activeLink.setAttribute('aria-current', 'true')
      this.currentActiveConcept = headingId

      // Scroll the sidebar link into view if needed
      this.scrollSidebarLinkIntoView(headingId)
    }
  }

  setInitialActiveState(headings, scrollContainer, headerHeight) {
    // Check URL hash for deep linking
    const hashParts = window.location.hash.split('#')
    const targetId = hashParts.length > 2 ? hashParts[2] : null

    if (targetId && headings.find(h => h.id === targetId)) {
      // Deep link: scroll to target and set active
      const target = document.getElementById(targetId)
      if (target) {
        scrollContainer.scrollTo({
          top: target.offsetTop - headerHeight - 8,
          behavior: 'auto' // No animation on initial load
        })
        this.setActiveNavigationItem(targetId)
      }
    } else {
      // No deep link: find the first visible heading
      const firstVisibleHeading = headings.find(heading => {
        const rect = heading.getBoundingClientRect()
        const containerRect = scrollContainer.getBoundingClientRect()
        return rect.top >= containerRect.top + headerHeight
      })

      if (firstVisibleHeading) {
        this.setActiveNavigationItem(firstVisibleHeading.id)
      } else if (headings.length > 0) {
        // Fallback to first heading
        this.setActiveNavigationItem(headings[0].id)
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



  wireTocLinks() {
    document.querySelectorAll('#theory-sidebar .toc-link, .theory-sidebar .toc-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Get anchor from href or data-anchor
        const href = link.getAttribute('href')
        const anchor = href ? href.slice(1) : link.getAttribute('data-anchor')
        const target = document.getElementById(anchor)
        const scrollContainer = document.querySelector('#theory-content')

        if (!target || !scrollContainer) return

        // Get sticky header height for offset calculation
        const headerHeight = document.querySelector('.topbar')?.offsetHeight || 0
        const offset = 8 // Additional padding

        // Scroll to target with proper offset
        scrollContainer.scrollTo({
          top: target.offsetTop - headerHeight - offset,
          behavior: 'smooth'
        })

        // Update active state immediately
        this.setActiveNavigationItem(anchor)
        this.updateTheoryHash(anchor)

        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector('.theory-sidebar')
          sidebar?.classList.remove('open')

          const toggleBtn = document.getElementById('toc-toggle')
          toggleBtn?.setAttribute('aria-expanded', 'false')
        }
      })
    })
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
    const toggleBtn = document.getElementById('toc-toggle')
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
