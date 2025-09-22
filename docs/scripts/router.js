// === Hash-based Router ===
import { MarkdownRenderer } from './render.js';
import { QuizEngine } from './quiz.js';
import { StorageManager } from './storage.js';

export class Router {
  constructor() {
    this.renderer = new MarkdownRenderer();
    this.quizEngine = new QuizEngine();
    this.storage = new StorageManager();
    this.currentRoute = null;
    
    // Define all routes
    this.routes = {
      // Theory routes
      '#/theory/java': () => this.renderMarkdown('./theory/java.md', 'Java Alapok'),
      '#/theory/spring': () => this.renderMarkdown('./theory/spring.md', 'Spring Framework'),
      '#/theory/testing': () => this.renderMarkdown('./theory/testing.md', 'Tesztelés'),
      '#/theory/sql': () => this.renderMarkdown('./theory/sql.md', 'SQL & Adatbázis'),
      '#/theory/web': () => this.renderMarkdown('./theory/web.md', 'Web Development'),
      '#/theory/arch': () => this.renderMarkdown('./theory/arch.md', 'Architektúra'),
      '#/theory/git': () => this.renderMarkdown('./theory/git.md', 'Git & Verziókezelés'),
      '#/theory/softskills': () => this.renderMarkdown('./theory/softskills.md', 'Soft Skills'),
      
      // Exercise routes
      '#/exercises/java': () => this.renderMarkdown('./exercises/java/01-oop-basics.md', 'Java Gyakorlatok'),
      '#/exercises/sql': () => this.renderMarkdown('./exercises/sql/01-joins.md', 'SQL Gyakorlatok'),
      '#/exercises/web': () => this.renderMarkdown('./exercises/web/01-es6-basics.md', 'Web Gyakorlatok'),
      '#/exercises/arch': () => this.renderMarkdown('./exercises/arch/01-rest-vs-grpc.md', 'Architektúra Gyakorlatok'),
      
      // Quiz routes
      '#/quiz/java': () => this.runQuiz('./data/quizzes/java.json', 'Java & Spring Teszt'),
      '#/quiz/sql': () => this.runQuiz('./data/quizzes/sql.json', 'SQL Teszt'),
      '#/quiz/web': () => this.runQuiz('./data/quizzes/web.json', 'Web Development Teszt'),
      '#/quiz/arch': () => this.runQuiz('./data/quizzes/arch.json', 'Architektúra Teszt'),
      
      // Checklist routes
      '#/checklists/interview': () => this.renderMarkdown('./checklists/interview.md', 'Interjú Kérdések'),
      '#/checklists/project-setup': () => this.renderMarkdown('./checklists/project-setup.md', 'Projekt Setup'),
      '#/checklists/db-cheatsheet': () => this.renderMarkdown('./checklists/db-cheatsheet.md', 'SQL Cheatsheet'),
      
      // Special routes
      '#/roadmap': () => this.renderRoadmap(),
      '#/search': () => this.renderSearchResults(),
    };
  }
  
  init() {
    // Handle hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
  }
  
  handleRoute() {
    const hash = window.location.hash || '#/theory/java';
    this.currentRoute = hash;
    
    const handler = this.routes[hash];
    if (handler) {
      try {
        handler();
      } catch (error) {
        console.error('Route handler error:', error);
        this.renderError('Hiba történt az oldal betöltése során.');
      }
    } else {
      this.renderNotFound();
    }
    
    // Update page title
    this.updatePageTitle(hash);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024) {
      document.getElementById('sidebar')?.classList.remove('open');
    }
  }
  
  async renderMarkdown(path, title) {
    try {
      await this.renderer.render(path, title);
      this.storage.saveProgress(this.currentRoute);
    } catch (error) {
      console.error('Markdown render error:', error);
      this.renderError(`Nem sikerült betölteni: ${path}`);
    }
  }
  
  async runQuiz(jsonPath, title) {
    try {
      await this.quizEngine.start(jsonPath, title);
    } catch (error) {
      console.error('Quiz error:', error);
      this.renderError(`Nem sikerült betölteni a kvízt: ${jsonPath}`);
    }
  }
  
  async renderRoadmap() {
    try {
      const response = await fetch('./data/roadmap.json');
      if (!response.ok) throw new Error('Roadmap not found');
      
      const roadmap = await response.json();
      const appEl = document.getElementById('app');
      
      appEl.innerHTML = `
        <div class="content">
          <h1>🗺️ Tanulási Roadmap</h1>
          <p>Tervezd meg a felkészülési útvonalad a következő modulok alapján:</p>
          
          <div class="roadmap-container">
            ${roadmap.modules.map(module => `
              <div class="roadmap-module ${this.storage.isCompleted(module.route) ? 'completed' : ''}">
                <div class="module-header">
                  <h3>${module.title}</h3>
                  <span class="module-time">⏱️ ${module.estimatedHours}h</span>
                </div>
                <p class="module-description">${module.description}</p>
                <div class="module-actions">
                  <a href="${module.route}" class="action-btn primary">Kezdés</a>
                  ${module.quizRoute ? `<a href="${module.quizRoute}" class="action-btn secondary">Teszt</a>` : ''}
                </div>
                <div class="module-progress">
                  <div class="progress-bar" style="width: ${this.storage.getProgress(module.route)}%"></div>
                </div>
              </div>
            `).join('')}
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
      `;
      
    } catch (error) {
      console.error('Roadmap error:', error);
      this.renderError('Nem sikerült betölteni a roadmap-et.');
    }
  }
  
  renderSearchResults() {
    const appEl = document.getElementById('app');
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const query = urlParams.get('q') || '';
    
    appEl.innerHTML = `
      <div class="content">
        <h1>🔍 Keresési eredmények</h1>
        <p>Keresés: "<strong>${query}</strong>"</p>
        <div id="search-results" class="search-results">
          <div class="loading">Keresés...</div>
        </div>
      </div>
    `;
    
    // Trigger search
    if (query) {
      setTimeout(() => {
        window.searchManager?.performSearch(query);
      }, 100);
    }
  }
  
  renderError(message) {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      <div class="content">
        <div class="error-message">
          <h2>❌ Hiba</h2>
          <p>${message}</p>
          <a href="#/theory/java" class="action-btn primary">Vissza a főoldalra</a>
        </div>
      </div>
    `;
  }
  
  renderNotFound() {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      <div class="content">
        <div class="error-message">
          <h2>🔍 Oldal nem található</h2>
          <p>A keresett oldal nem létezik.</p>
          <a href="#/theory/java" class="action-btn primary">Vissza a főoldalra</a>
        </div>
      </div>
    `;
  }
  
  updatePageTitle(hash) {
    const routeTitles = {
      '#/theory/java': 'Java Alapok',
      '#/theory/spring': 'Spring Framework',
      '#/theory/testing': 'Tesztelés',
      '#/theory/sql': 'SQL & Adatbázis',
      '#/theory/web': 'Web Development',
      '#/theory/arch': 'Architektúra',
      '#/theory/git': 'Git & Verziókezelés',
      '#/theory/softskills': 'Soft Skills',
      '#/exercises/java': 'Java Gyakorlatok',
      '#/exercises/sql': 'SQL Gyakorlatok',
      '#/exercises/web': 'Web Gyakorlatok',
      '#/exercises/arch': 'Architektúra Gyakorlatok',
      '#/quiz/java': 'Java Teszt',
      '#/quiz/sql': 'SQL Teszt',
      '#/quiz/web': 'Web Teszt',
      '#/quiz/arch': 'Architektúra Teszt',
      '#/roadmap': 'Tanulási Roadmap',
      '#/checklists/interview': 'Interjú Kérdések',
      '#/checklists/project-setup': 'Projekt Setup',
      '#/checklists/db-cheatsheet': 'SQL Cheatsheet',
    };
    
    const title = routeTitles[hash] || 'Software Developer Prep';
    document.title = `${title} - Software Developer Prep`;
  }
  
  // Public method for programmatic navigation
  navigate(hash) {
    window.location.hash = hash;
  }
}
