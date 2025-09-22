// === Main Application Entry Point ===
import { Router } from './router.js';
import { ThemeManager } from './theme.js';
import { SidebarManager } from './sidebar.js';
import { SearchManager } from './search.js';

class App {
  constructor() {
    this.router = new Router();
    this.themeManager = new ThemeManager();
    this.sidebarManager = new SidebarManager();
    this.searchManager = new SearchManager();
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupApp());
    } else {
      this.setupApp();
    }
  }
  
  setupApp() {
    // Initialize theme first
    this.themeManager.init();
    
    // Initialize sidebar
    this.sidebarManager.init();
    
    // Initialize search
    this.searchManager.init();
    
    // Initialize router last
    this.router.init();
    
    // Set up active navigation highlighting
    this.setupActiveNav();
    
    console.log('🚀 Software Developer Prep App initialized');
  }
  
  setupActiveNav() {
    // Update active navigation links
    const updateActiveNav = () => {
      const currentHash = window.location.hash || '#/theory/java';
      
      // Remove active class from all nav links
      document.querySelectorAll('.nav-link, .nav-group a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current link
      document.querySelectorAll(`a[href="${currentHash}"]`).forEach(link => {
        link.classList.add('active');
      });
    };
    
    // Update on hash change
    window.addEventListener('hashchange', updateActiveNav);
    
    // Initial update
    updateActiveNav();
  }
}

// Initialize app
new App();
