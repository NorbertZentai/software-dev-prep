// === Markdown Renderer ===
export class MarkdownRenderer {
  constructor() {
    this.marked = window.marked;
  }
  
  async renderFile(filePath, title = '') {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Failed to load ${filePath}`);
      
      const markdown = await response.text();
      return this.renderContent(markdown, title);
    } catch (error) {
      console.error('Markdown rendering error:', error);
      return this.renderError(title, error);
    }
  }
  
  renderContent(markdown, title = '') {
    const html = this.marked ? this.marked.parse(markdown) : this.escapeHtml(markdown);
    
    return `
      <div class="content-container">
        ${title ? `<header class="page-header"><h1>${title}</h1></header>` : ''}
        <div class="markdown-content">
          ${html}
        </div>
        <div class="content-actions">
          <button onclick="window.history.back()" class="btn-secondary">← Vissza</button>
          <button onclick="this.toggleBookmark('${title}')" class="btn-outline">🔖 Mentés</button>
        </div>
      </div>
    `;
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
    `;
  }
  
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Enhanced features for code highlighting
  setupCodeHighlighting() {
    document.querySelectorAll('pre code').forEach((block) => {
      // Add copy button to code blocks
      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy-code-btn';
      copyBtn.innerHTML = '📋';
      copyBtn.title = 'Kód másolása';
      
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          copyBtn.innerHTML = '✅';
          setTimeout(() => copyBtn.innerHTML = '📋', 2000);
        });
      };
      
      block.parentNode.style.position = 'relative';
      block.parentNode.appendChild(copyBtn);
    });
  }
}

// === Progress Tracking ===
export class ProgressTracker {
  constructor() {
    this.storage = null;
    this.initStorage();
  }
  
  async initStorage() {
    const { StorageManager } = await import('./storage.js');
    this.storage = new StorageManager();
  }
  
  trackPageView(route) {
    this.storage.saveProgress(route, this.calculateProgress(route));
    this.updateProgressIndicators();
  }
  
  calculateProgress(route) {
    // Simple time-based progress calculation
    const startTime = Date.now();
    const minReadTime = 2 * 60 * 1000; // 2 minutes minimum
    
    return new Promise((resolve) => {
      const checkProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / minReadTime) * 100);
        
        if (progress >= 100) {
          resolve(100);
        } else {
          setTimeout(checkProgress, 10000); // Check every 10 seconds
        }
      };
      
      checkProgress();
    });
  }
  
  updateProgressIndicators() {
    const progress = this.storage.getProgress();
    const completed = Object.values(progress).filter(p => p.completionPercentage >= 100).length;
    const total = Object.keys(progress).length;
    
    // Update progress indicators in UI
    document.querySelectorAll('.progress-indicator').forEach(indicator => {
      indicator.textContent = `${completed}/${total} befejezve`;
    });
  }
}