// === Hash-based Router ===
import { QuizEngine } from './quiz.js'
import { MarkdownRenderer } from './render.js'
import { StorageManager } from './storage.js'

export class Router {
  constructor() {
    this.renderer = new MarkdownRenderer()
    this.quizEngine = new QuizEngine()
    this.storage = new StorageManager()
    this.currentRoute = null

    // Define all routes
    this.routes = {
      // Theory routes - new concept-based format
      '#/theory/java': () =>
        this.renderTheoryPage('./theory/java.md', 'Java Alapok'),
      '#/theory/oop': () =>
        this.renderTheoryPage('./theory/oop.md', 'Objektumorientált Programozás'),
      '#/theory/spring': () =>
        this.renderTheoryPage('./theory/spring.md', 'Spring Framework'),
      '#/theory/testing': () =>
        this.renderTheoryPage('./theory/testing.md', 'Tesztelés'),
      '#/theory/sql': () =>
        this.renderTheoryPage('./theory/sql.md', 'SQL & Adatbázis'),
      '#/theory/web': () =>
        this.renderTheoryPage('./theory/web.md', 'Web Development'),
      '#/theory/arch': () =>
        this.renderTheoryPage('./theory/arch.md', 'Architektúra'),
      '#/theory/git': () =>
        this.renderTheoryPage('./theory/git.md', 'Git & Verziókezelés'),
      '#/theory/devops': () =>
        this.renderTheoryPage('./theory/devops.md', 'CI/CD & DevOps'),
      '#/theory/frontend': () =>
        this.renderTheoryPage('./theory/frontend.md', 'Frontend (React, TypeScript)'),
      '#/theory/algorithms': () =>
        this.renderTheoryPage('./theory/algorithms.md', 'Algoritmusok & Adatstruktúrák'),

      // Exercise list routes
      '#/exercises/java': () =>
        this.renderList(
          './data/indexes/exercises-java.json',
          'Java Gyakorlatok'
        ),
      '#/exercises/sql': () =>
        this.renderList('./data/indexes/exercises-sql.json', 'SQL Gyakorlatok'),
      '#/exercises/web': () =>
        this.renderList('./data/indexes/exercises-web.json', 'Web Gyakorlatok'),
      '#/exercises/arch': () =>
        this.renderList(
          './data/indexes/exercises-arch.json',
          'Architektúra Gyakorlatok'
        ),

      // Exercise detail routes
      '#/exercises/java/01-oop-basics': () =>
        this.renderMarkdown('./exercises/java/01-oop-basics.md', 'OOP Alapok'),
      '#/exercises/java/02-spring-rest': () =>
        this.renderMarkdown(
          './exercises/java/02-spring-rest.md',
          'Spring REST API'
        ),
      '#/exercises/java/03-testing': () =>
        this.renderMarkdown('./exercises/java/03-testing.md', 'Unit Testing'),
      '#/exercises/sql/01-joins': () =>
        this.renderMarkdown(
          './exercises/sql/01-joins.md',
          'SQL JOIN Műveletek'
        ),
      '#/exercises/sql/02-index-tuning': () =>
        this.renderMarkdown(
          './exercises/sql/02-index-tuning.md',
          'Index Optimalizálás'
        ),
      '#/exercises/sql/03-transactions': () =>
        this.renderMarkdown(
          './exercises/sql/03-transactions.md',
          'Tranzakció Kezelés'
        ),
      '#/exercises/web/01-es6-basics': () =>
        this.renderMarkdown(
          './exercises/web/01-es6-basics.md',
          'ES6+ JavaScript'
        ),
      '#/exercises/web/02-react-ts': () =>
        this.renderMarkdown(
          './exercises/web/02-react-ts.md',
          'React + TypeScript'
        ),
      '#/exercises/web/03-accessibility': () =>
        this.renderMarkdown(
          './exercises/web/03-accessibility.md',
          'Web Accessibility'
        ),
      '#/exercises/arch/01-rest-vs-grpc': () =>
        this.renderMarkdown(
          './exercises/arch/01-rest-vs-grpc.md',
          'REST vs gRPC'
        ),
      '#/exercises/arch/02-message-queues': () =>
        this.renderMarkdown(
          './exercises/arch/02-message-queues.md',
          'Message Queues'
        ),
      '#/exercises/arch/03-circuit-breaker': () =>
        this.renderMarkdown(
          './exercises/arch/03-circuit-breaker.md',
          'Circuit Breaker'
        ),

      // Quiz routes
      '#/quiz/java': () =>
        this.runQuiz('./data/quizzes/java.json', 'Java Kvíz'),
      '#/quiz/oop': () =>
        this.runQuiz('./data/quizzes/oop.json', 'OOP Kvíz'),
      '#/quiz/spring': () =>
        this.runQuiz('./data/quizzes/spring.json', 'Spring Kvíz'),
      '#/quiz/testing': () =>
        this.runQuiz('./data/quizzes/testing.json', 'Testing Kvíz'),
      '#/quiz/sql': () => this.runQuiz('./data/quizzes/sql.json', 'SQL Kvíz'),
      '#/quiz/web': () => this.runQuiz('./data/quizzes/web.json', 'Web Kvíz'),
      '#/quiz/arch': () =>
        this.runQuiz('./data/quizzes/arch.json', 'Architektúra Kvíz'),
      '#/quiz/git': () => this.runQuiz('./data/quizzes/git.json', 'Git Kvíz'),
      '#/quiz/devops': () => this.runQuiz('./data/quizzes/devops.json', 'DevOps Kvíz'),
      '#/quiz/frontend': () => this.runQuiz('./data/quizzes/frontend.json', 'Frontend Kvíz'),

      // Checklist routes
      '#/checklists/interview': () =>
        this.renderMarkdown('./checklists/interview.md', 'Interjú Kérdések'),
      '#/checklists/project-setup': () =>
        this.renderMarkdown('./checklists/project-setup.md', 'Projekt Setup'),
      '#/checklists/db-cheatsheet': () =>
        this.renderMarkdown('./checklists/db-cheatsheet.md', 'SQL Cheatsheet'),

      // Special routes
      '#/roadmap': () => this.renderRoadmap(),
      '#/search': () => this.renderSearchResults(),
      '#/favorites': () => this.renderFavorites(),
      '#/progress': () => this.renderProgress(),
    }
  }

  init() {
    // Handle hash changes
    window.addEventListener('hashchange', () => {
      this.handleRoute()
    })

    // Handle initial route
    this.handleRoute()
  }

  handleRoute() {
    const fullHash = window.location.hash || '#/theory/java'
    const route = this.normalizeRoute(fullHash)

    this.currentRoute = route

    const handler = this.routes[route]

    if (handler) {
      try {
        handler()
      } catch (error) {
        console.error('❌ Route handler error:', error)
        this.renderError('Hiba történt az oldal betöltése során.')
      }
    } else {
      console.warn('⚠️ No handler found for route:', fullHash)
      this.renderNotFound()
    }

    // Update page title
    this.updatePageTitle(route)

    // Update active navigation link
  this.updateActiveNavigation(route)

    // Manage TOC toggle button visibility
    this.manageTocToggle(route)

    // Ensure theory sidebar is hidden by default on mobile to avoid flash on refresh
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const theorySidebar = document.getElementById('theory-sidebar')
    if (theorySidebar) {
      if (isMobile) {
        theorySidebar.classList.add('hidden')
        theorySidebar.classList.remove('open')
      } else {
        // Desktop: make sure it's visible and not treated as a drawer
        theorySidebar.classList.remove('hidden', 'open', 'drawer', 'right')
      }
    }

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024) {
      document.getElementById('sidebar')?.classList.remove('open')
    }
  }

  normalizeRoute(hash) {
    if (!hash) return hash

    // Keep only the base route (before any deep anchor)
    const secondHashIndex = hash.indexOf('#', 1)
    if (secondHashIndex !== -1) {
      return hash.substring(0, secondHashIndex)
    }
    // Strip any trailing slash differences for robustness
    return hash.replace(/\/$/, '')
  }

  manageTocToggle(hash) {
    const tocToggle = document.getElementById('toc-toggle')
    if (tocToggle) {
      const isTheoryPage = hash.startsWith('#/theory')
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      tocToggle.style.display = isTheoryPage && isMobile ? 'block' : 'none'

      // Reset TOC state when leaving theory pages
      if (!isTheoryPage) {
        const sidebar = document.querySelector('.theory-sidebar')
        sidebar?.classList.remove('open')
        tocToggle.setAttribute('aria-expanded', 'false')
      }
    }
  }

  async renderMarkdown(path, title) {
    try {
      await this.renderer.render(path, title)
      this.storage.saveProgress(this.currentRoute)
    } catch (error) {
      console.error('Markdown render error:', error)
      this.renderError(`Nem sikerült betölteni: ${path}`)
    }
  }

  async runQuiz(jsonPath, title) {
    try {
      await this.quizEngine.start(jsonPath, title)
    } catch (error) {
      console.error('Quiz error:', error)
      this.renderError(`Nem sikerült betölteni a kvízt: ${jsonPath}`)
    }
  }

  async renderList(indexPath, title) {
    try {
      const response = await fetch(indexPath)
      if (!response.ok) throw new Error(`List index not found: ${indexPath}`)

      const items = await response.json()
      const appEl = document.getElementById('app')

      appEl.innerHTML = `
        <div class="content">
          <header class="page-header">
            <h1>${title}</h1>
            <p class="page-subtitle">${items.length} elem elérhető</p>
          </header>

          <div class="card-grid">
            ${items
              .map(
                (item) => `
              <div class="card" data-route="${item.route}">
                <div class="card-header">
                  <h3 class="card-title">${item.title}</h3>
                  <div class="card-badges">
                    <span class="badge badge-${
                      item.difficulty
                    }">${this.translateDifficulty(item.difficulty)}</span>
                    <span class="badge badge-time">⏱️ ${
                      item.estimatedMinutes
                    }p</span>
                  </div>
                </div>

                <div class="card-body">
                  <div class="card-goals">
                    <strong>Célok:</strong>
                    <ul>
                      ${item.goals
                        .slice(0, 3)
                        .map((goal) => `<li>${goal}</li>`)
                        .join('')}
                      ${
                        item.goals.length > 3
                          ? `<li class="more">+${
                              item.goals.length - 3
                            } további...</li>`
                          : ''
                      }
                    </ul>
                  </div>
                </div>

                <div class="card-footer">
                  <button class="btn-favorite" onclick="this.toggleFavorite('${
                    item.route
                  }')" title="Kedvencekhez">
                    ☆
                  </button>
                  <a href="${
                    item.route
                  }" class="btn btn-primary">Megnyitás →</a>
                </div>

                <div class="card-progress" style="display: none;">
                  <div class="progress-bar" style="width: 0%"></div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="list-actions">
            <button onclick="window.history.back()" class="btn btn-secondary">← Vissza</button>
            <button onclick="this.exportProgress()" class="btn btn-outline">💾 Progress Export</button>
          </div>
        </div>
      `

      // Update progress indicators
      this.updateProgressIndicators()
    } catch (error) {
      console.error('List render error:', error)
      this.renderError(`Nem sikerült betölteni a listát: ${indexPath}`)
    }
  }

  translateDifficulty(difficulty) {
    const translations = {
      beginner: 'Kezdő',
      intermediate: 'Haladó',
      advanced: 'Szakértő',
    }
    return translations[difficulty] || difficulty
  }

  updateProgressIndicators() {
    // Update progress bars based on stored progress
    document.querySelectorAll('.card[data-route]').forEach((card) => {
      const route = card.getAttribute('data-route')
      const progress = this.storage.getProgress(route)
      const progressBar = card.querySelector('.progress-bar')
      const progressContainer = card.querySelector('.card-progress')

      if (progress > 0) {
        progressContainer.style.display = 'block'
        progressBar.style.width = `${progress}%`
      }

      // Update favorite status
      const favoriteBtn = card.querySelector('.btn-favorite')
      if (this.storage.isFavorite(route)) {
        favoriteBtn.textContent = '★'
        favoriteBtn.classList.add('active')
      }
    })
  }

  async renderRoadmap() {
    try {
      const response = await fetch('./data/roadmap.json')
      if (!response.ok) throw new Error('Roadmap not found')

      const roadmap = await response.json()
      const appEl = document.getElementById('app')

      appEl.innerHTML = `
        <div class="content">
          <h1>🗺️ Tanulási Roadmap</h1>
          <p>Tervezd meg a felkészülési útvonalad a következő modulok alapján:</p>

          <div class="roadmap-container">
            ${roadmap.modules
              .map(
                (module) => `
              <div class="roadmap-module ${
                this.storage.isCompleted(module.route) ? 'completed' : ''
              }">
                <div class="module-header">
                  <h3>${module.title}</h3>
                  <span class="module-time">⏱️ ${module.estimatedHours}h</span>
                </div>
                <p class="module-description">${module.description}</p>
                <div class="module-actions">
                  <a href="${
                    module.route
                  }" class="action-btn primary">Kezdés</a>
                  ${
                    module.quizRoute
                      ? `<a href="${module.quizRoute}" class="action-btn secondary">Teszt</a>`
                      : ''
                  }
                </div>
                <div class="module-progress">
                  <div class="progress-bar" style="width: ${this.storage.getProgress(
                    module.route
                  )}%"></div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="roadmap-stats">
            <h3>📊 Statisztikák</h3>
            <div class="stats-grid">
              <div class="stat-card">
                <span class="stat-number">${this.storage.getCompletedCount()}</span>
                <span class="stat-label">Befejezett modul</span>
              </div>
              <div class="stat-card">
                <span class="stat-number">${this.storage.getTotalStudyTime()}h</span>
                <span class="stat-label">Tanulási idő</span>
              </div>
              <div class="stat-card">
                <span class="stat-number">${this.storage.getQuizAverage()}%</span>
                <span class="stat-label">Kvíz átlag</span>
              </div>
            </div>
          </div>
        </div>
      `
    } catch (error) {
      console.error('Roadmap error:', error)
      this.renderError('Nem sikerült betölteni a roadmap-et.')
    }
  }

  renderSearchResults() {
    const appEl = document.getElementById('app')
    const urlParams = new URLSearchParams(
      window.location.hash.split('?')[1] || ''
    )
    const query = urlParams.get('q') || ''

    appEl.innerHTML = `
      <div class="content">
        <h1>🔍 Keresési eredmények</h1>
        <p>Keresés: "<strong>${query}</strong>"</p>
        <div id="search-results" class="search-results">
          <div class="loading">Keresés...</div>
        </div>
      </div>
    `

    // Trigger search
    if (query) {
      setTimeout(() => {
        window.searchManager?.performSearch(query)
      }, 100)
    }
  }

  renderFavorites() {
    const favorites = this.storage.getFavorites()
    const appEl = document.getElementById('app')

    appEl.innerHTML = `
      <div class="content">
        <header class="page-header">
          <h1>⭐ Kedvencek</h1>
          <p class="page-subtitle">${favorites.length} kedvenc elem</p>
        </header>

        ${
          favorites.length === 0
            ? `
          <div class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>Még nincsenek kedvenceid</h3>
            <p>Jelölj be érdekes oldalakat a ⭐ gombbal!</p>
            <a href="#/theory/java" class="btn btn-primary">Böngészés kezdése</a>
          </div>
        `
            : `
          <div class="card-grid">
            ${favorites
              .map(
                (item) => `
              <div class="card" data-route="${item.route}">
                <div class="card-header">
                  <h3 class="card-title">${item.title}</h3>
                  <div class="card-badges">
                    <span class="badge badge-${
                      item.difficulty || 'intermediate'
                    }">${this.translateDifficulty(
                  item.difficulty || 'intermediate'
                )}</span>
                  </div>
                </div>

                <div class="card-footer">
                  <button class="btn-favorite active" onclick="this.toggleFavorite('${
                    item.route
                  }')" title="Kedvencekből eltávolítás">
                    ★
                  </button>
                  <a href="${
                    item.route
                  }" class="btn btn-primary">Megnyitás →</a>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
        }
      </div>
    `
  }

  renderProgress() {
    const progressData = this.storage.getAllProgress()
    const appEl = document.getElementById('app')

    appEl.innerHTML = `
      <div class="content">
        <header class="page-header">
          <h1>📊 Tanulási Statisztikák</h1>
          <p class="page-subtitle">A teljesítményed áttekintése</p>
        </header>

        <div class="stats-overview">
          <div class="stat-card">
            <div class="stat-number">${progressData.completedPages}</div>
            <div class="stat-label">Befejezett oldal</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${progressData.totalStudyTime}h</div>
            <div class="stat-label">Tanulási idő</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${progressData.quizAverage}%</div>
            <div class="stat-label">Kvíz átlag</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${progressData.streak}</div>
            <div class="stat-label">Napi sorozat</div>
          </div>
        </div>

        <div class="progress-sections">
          <section class="progress-section">
            <h3>📖 Elmélet</h3>
            <div class="progress-items">
              ${Object.entries(progressData.theoryProgress)
                .map(
                  ([route, progress]) => `
                <div class="progress-item">
                  <span class="item-title">${this.getPageTitle(route)}</span>
                  <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                    <span class="progress-text">${progress}%</span>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </section>

          <section class="progress-section">
            <h3>💻 Gyakorlatok</h3>
            <div class="progress-items">
              ${Object.entries(progressData.exerciseProgress)
                .map(
                  ([route, progress]) => `
                <div class="progress-item">
                  <span class="item-title">${this.getPageTitle(route)}</span>
                  <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                    <span class="progress-text">${progress}%</span>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </section>

          <section class="progress-section">
            <h3>🧠 Kvízek</h3>
            <div class="progress-items">
              ${Object.entries(progressData.quizScores)
                .map(
                  ([route, score]) => `
                <div class="progress-item">
                  <span class="item-title">${this.getPageTitle(route)}</span>
                  <div class="quiz-score ${
                    score >= 80
                      ? 'excellent'
                      : score >= 60
                      ? 'good'
                      : 'needs-work'
                  }">
                    ${score}% (${this.getScoreLabel(score)})
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          </section>
        </div>

        <div class="progress-actions">
          <button onclick="this.exportProgress()" class="btn btn-primary">📥 Export Progress</button>
          <button onclick="this.importProgress()" class="btn btn-secondary">📤 Import Progress</button>
          <button onclick="this.resetProgress()" class="btn btn-danger">🗑️ Reset Progress</button>
        </div>
      </div>
    `
  }

  getPageTitle(route) {
    const routeTitles = {
      '#/theory/java': 'Java Alapok',
      '#/theory/oop': 'Objektumorientált Programozás',
      '#/theory/spring': 'Spring Framework',
      '#/theory/testing': 'Tesztelés',
      '#/theory/sql': 'SQL & Adatbázis',
      '#/theory/web': 'Web Development',
      '#/theory/arch': 'Architektúra',
      '#/theory/git': 'Git & Verziókezelés',
      '#/theory/devops': 'CI/CD & DevOps',
      '#/theory/frontend': 'Frontend (React, TypeScript)',
      '#/theory/algorithms': 'Algoritmusok & Adatstruktúrák',
      '#/quiz/java': 'Java Kvíz',
      '#/quiz/oop': 'OOP Kvíz',
      '#/quiz/spring': 'Spring Kvíz',
      '#/quiz/testing': 'Testing Kvíz',
      '#/quiz/sql': 'SQL Kvíz',
      '#/quiz/web': 'Web Kvíz',
      '#/quiz/arch': 'Architektúra Kvíz',
      '#/quiz/git': 'Git Kvíz',
      '#/quiz/devops': 'DevOps Kvíz',
      '#/quiz/frontend': 'Frontend Kvíz',
    }
    return routeTitles[route] || route.split('/').pop()
  }

  getScoreLabel(score) {
    if (score >= 90) return 'Kiváló'
    if (score >= 80) return 'Jó'
    if (score >= 60) return 'Megfelelő'
    return 'Fejlesztendő'
  }

  renderError(message) {
    const appEl = document.getElementById('app')
    appEl.innerHTML = `
      <div class="content">
        <div class="error-message">
          <h2>❌ Hiba</h2>
          <p>${message}</p>
          <a href="#/theory/java" class="action-btn primary">Vissza a főoldalra</a>
        </div>
      </div>
    `
  }

  renderNotFound() {
    const appEl = document.getElementById('app')
    appEl.innerHTML = `
      <div class="content">
        <div class="error-message">
          <h2>🔍 Oldal nem található</h2>
          <p>A keresett oldal nem létezik.</p>
          <a href="#/theory/java" class="action-btn primary">Vissza a főoldalra</a>
        </div>
      </div>
    `
  }

  async renderTheoryPage(filePath, title) {
    try {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error(`Failed to load ${filePath}`)

      const markdown = await response.text()
      this.renderer.renderTheoryPage(markdown, title, filePath)
    } catch (error) {
      console.error('Theory page rendering error:', error)
      this.renderNotFound()
    }
  }

  updatePageTitle(hash) {
    const routeTitles = {
      '#/theory/java': 'Java Alapok',
      '#/theory/oop': 'Objektumorientált Programozás',
      '#/theory/spring': 'Spring Framework',
      '#/theory/testing': 'Tesztelés',
      '#/theory/sql': 'SQL & Adatbázis',
      '#/theory/web': 'Web Development',
      '#/theory/arch': 'Architektúra',
      '#/theory/git': 'Git & Verziókezelés',
      '#/theory/devops': 'CI/CD & DevOps',
      '#/theory/frontend': 'Frontend (React, TypeScript)',
      '#/theory/algorithms': 'Algoritmusok & Adatstruktúrák',
      '#/exercises/java': 'Java Gyakorlatok',
      '#/exercises/sql': 'SQL Gyakorlatok',
      '#/exercises/web': 'Web Gyakorlatok',
      '#/exercises/arch': 'Architektúra Gyakorlatok',
      '#/quiz/java': 'Java Teszt',
      '#/quiz/oop': 'OOP Teszt',
      '#/quiz/sql': 'SQL Teszt',
      '#/quiz/web': 'Web Teszt',
      '#/quiz/arch': 'Architektúra Teszt',
      '#/quiz/devops': 'DevOps Teszt',
      '#/quiz/frontend': 'Frontend Teszt',
      '#/roadmap': 'Tanulási Roadmap',
      '#/checklists/interview': 'Interjú Kérdések',
      '#/checklists/project-setup': 'Projekt Setup',
      '#/checklists/db-cheatsheet': 'SQL Cheatsheet',
    }

    const title = routeTitles[hash] || 'Software Developer Prep'
    document.title = `${title} - Software Developer Prep`
  }

  updateActiveNavigation(route) {
    // Remove active class from all navigation links
    const allNavLinks = document.querySelectorAll('.nav-group a')
    allNavLinks.forEach((link) => {
      link.classList.remove('active')
      link.removeAttribute('aria-current')
    })

    // Normalize route and find ALL links that match (both original sidebar and cloned drawer)
    const base = route ? route.replace(/\/$/, '') : ''
    const currentLinks = Array.from(document.querySelectorAll('.nav-group a')).filter(a => {
      const href = a.getAttribute('href') || ''
      return href.replace(/\/$/, '') === base
    })
    currentLinks.forEach((link) => {
      link.classList.add('active')
      link.setAttribute('aria-current', 'page')
    })

    // Trigger active menu manager update if available
    if (window.activeMenuManager) {
      window.activeMenuManager.refresh()
    }
  }

  // Public method for programmatic navigation
  navigate(hash) {
    window.location.hash = hash
  }
}
