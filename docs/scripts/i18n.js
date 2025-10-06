// === Internationalization System ===

export class I18nManager {
  constructor() {
    this.currentLanguage = 'en' // Default language
    this.supportedLanguages = ['hu', 'en']
    this.translations = {}
    this.loadTranslations()
    this.init()
  }

  init() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.slice(0, 2)
      if (this.supportedLanguages.includes(browserLang)) {
        this.currentLanguage = browserLang
      }
    }

    // Update document language
    document.documentElement.lang = this.currentLanguage
    
    // Translate UI elements
    this.translateUI()
  }

  loadTranslations() {
    this.translations = {
      hu: {
        // Navigation and UI
        'site.title': 'Software Dev Prep',
        'nav.theory': '📚 Elmélet',
        'nav.exercises': '💻 Gyakorlat',
        'nav.quiz': '🧩 Kvíz',
        'nav.roadmap': '🗺️ Roadmap',
        'search.placeholder': '🔍 Keresés...',
        'theme.toggle': 'Sötét/Világos mód',
        'nav.toggle': 'Navigáció megnyitása',
        'toc.toggle': 'Fogalmak megnyitása',
        
        // Sidebar sections
        'sidebar.navigation': '📖 Navigáció',
        'sidebar.theory': 'Elmélet',
        'sidebar.exercises': 'Gyakorlatok',
        'sidebar.quizzes': 'Kvízek',
        'sidebar.checklists': 'Segédletek',
        'sidebar.favorites': 'Kedvencek',
        
        // Favorites
        'favorites.concepts': '★ Kedvenc Fogalmak',
        
        // Scroll to top
        'scrollTop.label': 'Vissza az oldal tetejére',
        
        // Theory topics
        'theory.java': '☕ Java Alapok',
        'theory.oop': '🧩 Objektumorientált Programozás',
        'theory.spring': '🌱 Spring Framework',
        'theory.testing': '🧪 Tesztelés',
        'theory.sql': '🗄️ SQL & Adatbázis',
        'theory.web': '🌐 Web Development',
        'theory.frontend': '⚛️ Frontend (React, TypeScript)',
        'theory.algorithms': '🧮 Algoritmusok & Adatstruktúrák',
        'theory.devops': '🚀 CI/CD & DevOps',
        'theory.arch': '🏗️ Architektúra',
        'theory.git': '📚 Git & Verziókezelés',
        
        // Exercises
        'exercises.java': '☕ Java Feladatok',
        'exercises.sql': '🗄️ SQL Feladatok',
        'exercises.web': '🌐 Web Feladatok',
        'exercises.arch': '🏗️ Architektúra',
        
        // Quizzes
        'quiz.java': '☕ Java Teszt',
        'quiz.oop': '🧩 OOP Teszt',
        'quiz.sql': '🗄️ SQL Teszt',
        'quiz.web': '🌐 Web Teszt',
        'quiz.frontend': '⚛️ Frontend Teszt',
        'quiz.devops': '🚀 DevOps Teszt',
        'quiz.arch': '🏗️ Architektúra Teszt',
        
        // Checklists
        'checklist.interview': '💼 Interjú Kérdések',
        'checklist.setup': '⚙️ Projekt Setup',
        'checklist.db': '📋 SQL Cheatsheet',
        
        // Welcome screen
        'welcome.title': '🎯 Üdvözöl a Software Developer Prep felkészítő platformon!',
        'welcome.subtitle': 'Válassz a bal oldali menüből, vagy használd a navigációs linkeket.',
        'welcome.roadmap.title': '🗺️ Tanulási Roadmap',
        'welcome.roadmap.desc': 'Tervezd meg a felkészülési útvonalad',
        'welcome.theory.title': '📚 Kezdj az elmélettel',
        'welcome.theory.desc': 'Java alapok és Spring Framework',
        'welcome.quiz.title': '🧩 Teszteld a tudásod',
        'welcome.quiz.desc': 'Interaktív kvízek minden témához',
        
        // Footer
        'footer.text': '© 2025 Software Developer Prep – Személyes tanulási platform |',
        'footer.made': 'Készítve: ❤️ + ☕',
        
        // Error messages
        'error.javascript': 'Kérlek engedélyezd a JavaScriptet a teljes funkcionalitáshoz.',
        'error.notfound': 'A keresett oldal nem található.',
        
        // Meta descriptions
        'meta.description': 'Komplett szoftverfejlesztő állásfelkészítő platform. Java, Spring, SQL, algoritmusok, tesztelés, architektúra, DevOps, Frontend témákban. Ingyenes elméleti anyagok, gyakorlatok és kvízek.',
        'meta.keywords': 'java, spring, sql, algoritmusok, adatstruktúrák, react, typescript, devops, docker, kubernetes, szoftverfejlesztés, álláskereső, felkészülés, programozás, backend, frontend, interjú',
        
        // Quiz system
        'quiz.instructions.title': '📋 Útmutatás',
        'quiz.instructions.step1': 'Válaszd ki a helyes választ minden kérdésre',
        'quiz.instructions.step2': 'A kvíz végén láthatod az eredményed és a magyarázatokat',
        'quiz.instructions.step3': 'Az eredmények automatikusan mentésre kerülnek',
        'quiz.start': '🚀 Kvíz indítása',
        'quiz.question': 'Kérdés',
        'quiz.previous': '← Előző',
        'quiz.next': 'Következő →',
        'quiz.finish': 'Befejezés',
        'quiz.true': 'Igaz',
        'quiz.false': 'Hamis',
        'quiz.noAnswer': 'Nem válaszolt',
        'quiz.unknown': 'Ismeretlen',
        'quiz.results.title': '🎯 Kvíz eredmény',
        'quiz.results.correct': 'Helyes válaszok:',
        'quiz.results.duration': 'Időtartam:',
        'quiz.results.minutes': 'perc',
        'quiz.results.detailed': '📋 Részletes eredmények',
        'quiz.results.yourAnswer': 'Te válaszod:',
        'quiz.results.correctAnswer': 'Helyes válasz:',
        'quiz.results.explanation': 'Magyarázat:',
        'quiz.results.retry': '🔄 Újra próbálkozás',
        'quiz.results.home': '← Főoldal',
        'quiz.difficulty.beginner': 'Kezdő',
        'quiz.difficulty.intermediate': 'Haladó',
        'quiz.difficulty.advanced': 'Profi',
        'quiz.questions': 'kérdés',
        'quiz.estimatedTime': 'perc',
        'quiz.error.title': 'Kvíz hiba',
        'quiz.error.back': '← Vissza',
        'quiz.score.excellent': '🎉 Kiváló! Mester szinten ismered a témát!',
        'quiz.score.great': '👏 Nagyszerű munka! Jól megy neked ez a téma.',
        'quiz.score.good': '👍 Jó eredmény! Még van mit tanulni, de jó úton jársz.',
        'quiz.score.average': '📚 Átlagos eredmény. Érdemes még tanulmányozni a témát.',
        'quiz.score.poor': '💪 Kezdő szint. Ne add fel, a gyakorlás teszi a mestert!',
        'quiz.score.veryPoor': '📖 Sok tanulnivaló van még. Nézd át újra az elméleti anyagot!',
        
        // Content rendering
        'content.learningGoals': '🎯 Tanulási célok',
        'content.quickStart': '🚀 Gyors kezdés:',
        'content.back': '← Vissza',
        'content.save': '🔖 Mentés',
        'content.markComplete': '✅ Késznek jelölöm',
        'content.checklist.title': '✅ Ellenőrző lista',
        'content.checklist.subtitle': 'Készen állsz? Jelöld be, amit elvégeztél:',
        'content.checklist.checkAll': 'Minden kijelölése',
        'content.checklist.save': 'Mentés',
        'content.checklist.item1': 'Elolvastam és megértettem az anyagot',
        'content.checklist.item2': 'Kipróbáltam a példákat saját környezetben',
        'content.checklist.item3': 'Megválaszoltam az ellenőrző kérdéseket',
        'content.checklist.item4': 'Gyakoroltam a javasolt feladatokkal',
        'content.checklist.item5': 'Kapcsolódó dokumentációt is átnéztem',
        'content.checklist.item6': 'Készen állok az interjú kérdésekre',
        'content.difficulty.beginner': 'Kezdő',
        'content.difficulty.intermediate': 'Haladó',
        'content.difficulty.advanced': 'Szakértő',
        'content.estimatedTime': 'perc',
        'content.copyCode': 'Kód másolása',
        'content.error.title': 'Tartalom betöltési hiba',
        'content.error.subtitle': 'A "%s" tartalom jelenleg nem elérhető.',
        'content.error.details': 'Részletek',
        'content.error.back': '← Vissza',
        'content.error.retry': '🔄 Újra',
        'theory.concepts': '📖 Fogalmak',
        'theory.searchConcepts': 'Keresés fogalmak között...',
        'progress.completed': 'befejezve',
        
        // Router messages
        'router.loading': 'Betöltés...',
        'router.error.pageLoad': 'Hiba történt az oldal betöltése során.',
        'router.error.quizLoad': 'Nem sikerült betölteni a kvízt:',
        'router.error.listLoad': 'Nem sikerült betölteni a listát:',
        'router.error.roadmapLoad': 'Nem sikerült betölteni a roadmap-et.',
        'router.error.notFound': 'A keresett oldal nem található.',
        'router.items.available': 'elem elérhető',
        'router.goals': 'Célok:',
        'router.more': 'további...',
        'router.open': 'Megnyitás →',
        'router.back': '← Vissza',
        'router.exportProgress': '💾 Progress Export',
        'router.roadmap.subtitle': 'Tervezd meg a felkészülési útvonalad a következő modulok alapján:',
        'router.roadmap.start': 'Kezdés',
        'router.roadmap.test': 'Teszt',
        'router.roadmap.stats': '📊 Statisztikák',
        'router.roadmap.completedModules': 'Befejezett modul',
        'router.roadmap.studyTime': 'Tanulási idő',
        'router.roadmap.quizAverage': 'Kvíz átlag',
        'router.search.title': '🔍 Keresési eredmények',
        'router.search.query': 'Keresés: "%s"',
        'router.search.searching': 'Keresés...',
        'router.favorites.title': '⭐ Kedvencek',
        'router.favorites.count': 'kedvenc elem',
        'router.favorites.empty.title': 'Még nincsenek kedvenceid',
        'router.favorites.empty.desc': 'Jelölj be érdekes oldalakat a ⭐ gombbal!',
        'router.favorites.empty.start': 'Böngészés kezdése',
        'router.favorites.remove': 'Kedvencekből eltávolítás',
        'router.progress.title': '📊 Tanulási Statisztikák',
        'router.progress.subtitle': 'A teljesítményed áttekintése',
        'router.progress.completedPages': 'Befejezett oldal',
        'router.progress.studyTime': 'Tanulási idő',
        'router.progress.quizAverage': 'Kvíz átlag',
        'router.progress.dailyStreak': 'Napi sorozat',
        'router.progress.theory': '📖 Elmélet',
        'router.progress.exercises': '💻 Gyakorlatok',
        'router.progress.quizzes': '🧠 Kvízek',
        'router.progress.export': '📅 Export Progress',
        'router.progress.import': '📄 Import Progress',
        'router.progress.reset': '🗑️ Reset Progress',
        'router.error.title': '❌ Hiba',
        'router.error.backHome': 'Vissza a főoldalra',
        'router.score.excellent': 'Kiváló',
        'router.score.good': 'Jó',
        'router.score.adequate': 'Megfelelő',
        'router.score.needsWork': 'Fejlesztendő'
      },
      
      en: {
        // Navigation and UI
        'site.title': 'Software Dev Prep',
        'nav.theory': '📚 Theory',
        'nav.exercises': '💻 Practice',
        'nav.quiz': '🧩 Quiz',
        'nav.roadmap': '🗺️ Roadmap',
        'search.placeholder': '🔍 Search...',
        'theme.toggle': 'Dark/Light mode',
        'nav.toggle': 'Open navigation',
        'toc.toggle': 'Open concepts',
        
        // Sidebar sections
        'sidebar.navigation': '📖 Navigation',
        'sidebar.theory': 'Theory',
        'sidebar.exercises': 'Exercises',
        'sidebar.quizzes': 'Quizzes',
        'sidebar.checklists': 'Checklists',
        'sidebar.favorites': 'Favorites',
        
        // Favorites
        'favorites.concepts': '★ Favorite Concepts',
        
        // Scroll to top
        'scrollTop.label': 'Back to top',
        
        // Theory topics
        'theory.java': '☕ Java Fundamentals',
        'theory.oop': '🧩 Object-Oriented Programming',
        'theory.spring': '🌱 Spring Framework',
        'theory.testing': '🧪 Testing',
        'theory.sql': '🗄️ SQL & Database',
        'theory.web': '🌐 Web Development',
        'theory.frontend': '⚛️ Frontend (React, TypeScript)',
        'theory.algorithms': '🧮 Algorithms & Data Structures',
        'theory.devops': '🚀 CI/CD & DevOps',
        'theory.arch': '🏗️ Architecture',
        'theory.git': '📚 Git & Version Control',
        
        // Exercises
        'exercises.java': '☕ Java Exercises',
        'exercises.sql': '🗄️ SQL Exercises',
        'exercises.web': '🌐 Web Exercises',
        'exercises.arch': '🏗️ Architecture',
        
        // Quizzes
        'quiz.java': '☕ Java Quiz',
        'quiz.oop': '🧩 OOP Quiz',
        'quiz.sql': '🗄️ SQL Quiz',
        'quiz.web': '🌐 Web Quiz',
        'quiz.frontend': '⚛️ Frontend Quiz',
        'quiz.devops': '🚀 DevOps Quiz',
        'quiz.arch': '🏗️ Architecture Quiz',
        
        // Checklists
        'checklist.interview': '💼 Interview Questions',
        'checklist.setup': '⚙️ Project Setup',
        'checklist.db': '📋 SQL Cheatsheet',
        
        // Welcome screen
        'welcome.title': '🎯 Welcome to the Software Developer Prep platform!',
        'welcome.subtitle': 'Choose from the left menu, or use the navigation links.',
        'welcome.roadmap.title': '🗺️ Learning Roadmap',
        'welcome.roadmap.desc': 'Plan your preparation path',
        'welcome.theory.title': '📚 Start with theory',
        'welcome.theory.desc': 'Java fundamentals and Spring Framework',
        'welcome.quiz.title': '🧩 Test your knowledge',
        'welcome.quiz.desc': 'Interactive quizzes for every topic',
        
        // Footer
        'footer.text': '© 2025 Software Developer Prep – Personal learning platform |',
        'footer.made': 'Made with: ❤️ + ☕',
        
        // Error messages
        'error.javascript': 'Please enable JavaScript for full functionality.',
        'error.notfound': 'The requested page was not found.',
        
        // Meta descriptions
        'meta.description': 'Complete software developer job preparation platform. Java, Spring, SQL, algorithms, testing, architecture, DevOps, Frontend topics. Free theoretical materials, exercises and quizzes.',
        'meta.keywords': 'java, spring, sql, algorithms, data structures, react, typescript, devops, docker, kubernetes, software development, job search, preparation, programming, backend, frontend, interview',
        
        // Quiz system
        'quiz.instructions.title': '📋 Instructions',
        'quiz.instructions.step1': 'Select the correct answer for each question',
        'quiz.instructions.step2': 'At the end of the quiz you can see your results and explanations',
        'quiz.instructions.step3': 'Results are automatically saved',
        'quiz.start': '🚀 Start Quiz',
        'quiz.question': 'Question',
        'quiz.previous': '← Previous',
        'quiz.next': 'Next →',
        'quiz.finish': 'Finish',
        'quiz.true': 'True',
        'quiz.false': 'False',
        'quiz.noAnswer': 'No answer',
        'quiz.unknown': 'Unknown',
        'quiz.results.title': '🎯 Quiz Results',
        'quiz.results.correct': 'Correct answers:',
        'quiz.results.duration': 'Duration:',
        'quiz.results.minutes': 'minutes',
        'quiz.results.detailed': '📋 Detailed Results',
        'quiz.results.yourAnswer': 'Your answer:',
        'quiz.results.correctAnswer': 'Correct answer:',
        'quiz.results.explanation': 'Explanation:',
        'quiz.results.retry': '🔄 Try Again',
        'quiz.results.home': '← Home',
        'quiz.difficulty.beginner': 'Beginner',
        'quiz.difficulty.intermediate': 'Intermediate',
        'quiz.difficulty.advanced': 'Advanced',
        'quiz.questions': 'questions',
        'quiz.estimatedTime': 'minutes',
        'quiz.error.title': 'Quiz Error',
        'quiz.error.back': '← Back',
        'quiz.score.excellent': '🎉 Excellent! You know this topic at a master level!',
        'quiz.score.great': '👏 Great work! You\'re doing well with this topic.',
        'quiz.score.good': '👍 Good result! There\'s still room to learn, but you\'re on the right track.',
        'quiz.score.average': '📚 Average result. It\'s worth studying the topic more.',
        'quiz.score.poor': '💪 Beginner level. Don\'t give up, practice makes perfect!',
        'quiz.score.veryPoor': '📖 There\'s still a lot to learn. Review the theoretical material again!',
        
        // Content rendering
        'content.learningGoals': '🎯 Learning Goals',
        'content.quickStart': '🚀 Quick Start:',
        'content.back': '← Back',
        'content.save': '🔖 Save',
        'content.markComplete': '✅ Mark as Complete',
        'content.checklist.title': '✅ Checklist',
        'content.checklist.subtitle': 'Ready? Check off what you\'ve completed:',
        'content.checklist.checkAll': 'Check All',
        'content.checklist.save': 'Save',
        'content.checklist.item1': 'I read and understood the material',
        'content.checklist.item2': 'I tried the examples in my own environment',
        'content.checklist.item3': 'I answered the review questions',
        'content.checklist.item4': 'I practiced with the suggested exercises',
        'content.checklist.item5': 'I also reviewed related documentation',
        'content.checklist.item6': 'I\'m ready for interview questions',
        'content.difficulty.beginner': 'Beginner',
        'content.difficulty.intermediate': 'Intermediate',
        'content.difficulty.advanced': 'Advanced',
        'content.estimatedTime': 'minutes',
        'content.copyCode': 'Copy code',
        'content.error.title': 'Content Loading Error',
        'content.error.subtitle': 'The "%s" content is currently unavailable.',
        'content.error.details': 'Details',
        'content.error.back': '← Back',
        'content.error.retry': '🔄 Retry',
        'theory.concepts': '📖 Concepts',
        'theory.searchConcepts': 'Search concepts...',
        'progress.completed': 'completed',
        
        // Router messages
        'router.loading': 'Loading...',
        'router.error.pageLoad': 'An error occurred while loading the page.',
        'router.error.quizLoad': 'Failed to load quiz:',
        'router.error.listLoad': 'Failed to load list:',
        'router.error.roadmapLoad': 'Failed to load roadmap.',
        'router.error.notFound': 'The requested page was not found.',
        'router.items.available': 'items available',
        'router.goals': 'Goals:',
        'router.more': 'more...',
        'router.open': 'Open →',
        'router.back': '← Back',
        'router.exportProgress': '💾 Export Progress',
        'router.roadmap.subtitle': 'Plan your preparation path based on the following modules:',
        'router.roadmap.start': 'Start',
        'router.roadmap.test': 'Test',
        'router.roadmap.stats': '📊 Statistics',
        'router.roadmap.completedModules': 'Completed Modules',
        'router.roadmap.studyTime': 'Study Time',
        'router.roadmap.quizAverage': 'Quiz Average',
        'router.search.title': '🔍 Search Results',
        'router.search.query': 'Search: "%s"',
        'router.search.searching': 'Searching...',
        'router.favorites.title': '⭐ Favorites',
        'router.favorites.count': 'favorite items',
        'router.favorites.empty.title': 'No favorites yet',
        'router.favorites.empty.desc': 'Mark interesting pages with the ⭐ button!',
        'router.favorites.empty.start': 'Start browsing',
        'router.favorites.remove': 'Remove from favorites',
        'router.progress.title': '📊 Learning Statistics',
        'router.progress.subtitle': 'Overview of your performance',
        'router.progress.completedPages': 'Completed Pages',
        'router.progress.studyTime': 'Study Time',
        'router.progress.quizAverage': 'Quiz Average',
        'router.progress.dailyStreak': 'Daily Streak',
        'router.progress.theory': '📖 Theory',
        'router.progress.exercises': '💻 Exercises',
        'router.progress.quizzes': '🧠 Quizzes',
        'router.progress.export': '📅 Export Progress',
        'router.progress.import': '📄 Import Progress',
        'router.progress.reset': '🗑️ Reset Progress',
        'router.error.title': '❌ Error',
        'router.error.backHome': 'Back to home',
        'router.score.excellent': 'Excellent',
        'router.score.good': 'Good',
        'router.score.adequate': 'Adequate',
        'router.score.needsWork': 'Needs Work'
      }
    }
  }

  // Get translation for a key
  t(key, defaultValue = key) {
    const translation = this.translations[this.currentLanguage]?.[key]
    return translation || defaultValue
  }

  // Set current language
  setLanguage(language) {
    if (!this.supportedLanguages.includes(language)) {
      console.warn(`Unsupported language: ${language}`)
      return
    }

    this.currentLanguage = language
    localStorage.setItem('preferred-language', language)
    document.documentElement.lang = language
    
    // Translate UI
    this.translateUI()
    
    // Update meta tags
    this.updateMetaTags()
    
    // Dispatch language change event
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language }
    }))
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage
  }

  // Get path suffix for current language
  getLanguagePath() {
    return this.currentLanguage === 'hu' ? '' : `/${this.currentLanguage}`
  }

  // Get file path with language prefix
  getLocalizedPath(basePath) {
    if (this.currentLanguage === 'hu') {
      return basePath
    }
    
    // For non-Hungarian, modify path structure based on file type
    if (basePath.startsWith('./theory/')) {
      // ./theory/java.md -> ./theory/en/java.md
      return basePath.replace('./theory/', './theory/en/')
    } else if (basePath.startsWith('./data/')) {
      // ./data/roadmap.json -> ./data/en/roadmap.json
      return basePath.replace('./data/', './data/en/')
    } else if (basePath.startsWith('./exercises/')) {
      // ./exercises/java/file.md -> ./exercises/en/java/file.md
      return basePath.replace('./exercises/', './exercises/en/')
    } else if (basePath.startsWith('./checklists/')) {
      // ./checklists/file.md -> ./checklists/en/file.md
      return basePath.replace('./checklists/', './checklists/en/')
    }
    
    // Fallback: insert language before filename
    const pathParts = basePath.split('/')
    pathParts.splice(-1, 0, this.currentLanguage)
    return pathParts.join('/')
  }

  // Translate all UI elements
  translateUI() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n')
      const translation = this.t(key)
      
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translation
      } else {
        element.textContent = translation
      }
    })

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title')
      element.title = this.t(key)
    })

    // Translate aria-label attributes
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria')
      element.setAttribute('aria-label', this.t(key))
    })
  }

  // Update meta tags for SEO
  updateMetaTags() {
    // Update page title
    document.title = this.t('site.title') + ' - ' + (
      this.currentLanguage === 'hu' 
        ? 'Állásfelkészítő Platform' 
        : 'Job Preparation Platform'
    )
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.content = this.t('meta.description')
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.content = this.t('meta.keywords')
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.content = this.t('site.title') + ' - ' + (
        this.currentLanguage === 'hu' 
          ? 'Állásfelkészítő Platform' 
          : 'Job Preparation Platform'
      )
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.content = this.t('meta.description')
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.content = this.t('site.title') + ' - ' + (
        this.currentLanguage === 'hu' 
          ? 'Állásfelkészítő Platform' 
          : 'Job Preparation Platform'
      )
    }
    
    const twitterDesc = document.querySelector('meta[property="twitter:description"]')
    if (twitterDesc) {
      twitterDesc.content = this.t('meta.description')
    }
    
    // Update locale
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      ogLocale.content = this.currentLanguage === 'hu' ? 'hu_HU' : 'en_US'
    }
  }
}

// Create global instance
export const i18n = new I18nManager()