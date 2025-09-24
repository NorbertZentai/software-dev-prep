// === Local Storage Manager ===
export class StorageManager {
  constructor() {
    this.keys = {
      PROGRESS: 'software_dev_prep_progress',
      QUIZ_RESULTS: 'software_dev_prep_quiz_results',
      BOOKMARKS: 'software_dev_prep_bookmarks',
      SETTINGS: 'software_dev_prep_settings',
      STUDY_SESSIONS: 'software_dev_prep_study_sessions',
    }
  }

  // Initialize storage manager
  init() {
    console.log('📦 StorageManager initialized')
    // Initialize default settings if they don't exist
    if (!localStorage.getItem(this.keys.SETTINGS)) {
      this.saveSettings({
        theme: 'auto',
        language: 'hu',
        notifications: true,
      })
    }
  }

  // === Progress Tracking ===
  saveProgress(route, completionPercentage = 100) {
    const progress = this.getProgress() || {}
    progress[route] = {
      route: route,
      completionPercentage: completionPercentage,
      lastVisited: new Date().toISOString(),
      visits: (progress[route]?.visits || 0) + 1,
    }

    localStorage.setItem(this.keys.PROGRESS, JSON.stringify(progress))
  }

  markAsRead(route) {
    this.saveProgress(route, 100)
    this.logStudySession(route, 'read')
  }

  markAsCompleted(route) {
    this.saveProgress(route, 100)
    this.logStudySession(route, 'completed')
  }

  getProgress(route = null) {
    const progress = JSON.parse(
      localStorage.getItem(this.keys.PROGRESS) || '{}'
    )

    if (route) {
      return progress[route]?.completionPercentage || 0
    }

    return progress
  }

  getAllProgress() {
    const progress = this.getProgress()
    const quizResults = this.getQuizResults()

    const theoryProgress = {}
    const exerciseProgress = {}
    const quizScores = {}

    Object.entries(progress).forEach(([route, data]) => {
      if (route.includes('/theory/')) {
        theoryProgress[route] = data.completionPercentage
      } else if (route.includes('/exercises/')) {
        exerciseProgress[route] = data.completionPercentage
      }
    })

    Object.entries(quizResults).forEach(([route, results]) => {
      if (results.length > 0) {
        quizScores[route] = Math.max(...results.map((r) => r.score))
      }
    })

    return {
      completedPages: this.getCompletedCount(),
      totalStudyTime: Math.round(this.getTotalStudyTime() / 60), // convert to hours
      quizAverage: this.getQuizAverage(),
      streak: this.getCurrentStreak(),
      theoryProgress,
      exerciseProgress,
      quizScores,
    }
  }

  isCompleted(route) {
    const progress = this.getProgress(route)
    return progress >= 100
  }

  getCompletedCount() {
    const progress = this.getProgress()
    return Object.values(progress).filter((p) => p.completionPercentage >= 100)
      .length
  }

  getTotalStudyTime() {
    const sessions = this.getStudySessions()
    return sessions.reduce(
      (total, session) => total + (session.duration || 30),
      0
    ) // default 30 min
  }

  getCurrentStreak() {
    const sessions = this.getStudySessions()
    if (sessions.length === 0) return 0

    // Group sessions by date
    const sessionsByDate = {}
    sessions.forEach((session) => {
      const date = new Date(session.timestamp).toDateString()
      sessionsByDate[date] = true
    })

    const dates = Object.keys(sessionsByDate).sort(
      (a, b) => new Date(b) - new Date(a)
    )

    let streak = 0
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    // Start from today or yesterday
    let currentDate =
      dates[0] === today ? today : dates[0] === yesterday ? yesterday : null
    if (!currentDate) return 0

    // Count consecutive days
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(Date.now() - i * 86400000).toDateString()
      if (dates.includes(expectedDate)) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  // === Quiz Results ===
  saveQuizResult(result) {
    const results = this.getQuizResults()
    results.push({
      ...result,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    })

    // Keep only last 50 results
    if (results.length > 50) {
      results.splice(0, results.length - 50)
    }

    localStorage.setItem(this.keys.QUIZ_RESULTS, JSON.stringify(results))
  }

  getQuizResults(quizTitle = null) {
    const results = JSON.parse(
      localStorage.getItem(this.keys.QUIZ_RESULTS) || '[]'
    )

    if (quizTitle) {
      return results.filter((r) => r.quizTitle === quizTitle)
    }

    return results
  }

  getQuizAverage() {
    const results = this.getQuizResults()
    if (results.length === 0) return 0

    const totalPercentage = results.reduce(
      (sum, result) => sum + result.percentage,
      0
    )
    return Math.round(totalPercentage / results.length)
  }

  getBestQuizScore(quizTitle) {
    const results = this.getQuizResults(quizTitle)
    if (results.length === 0) return 0

    return Math.max(...results.map((r) => r.percentage))
  }

  // === Bookmarks ===
  addBookmark(route, title, description = '') {
    const bookmarks = this.getBookmarks()
    const bookmark = {
      id: Date.now().toString(),
      route: route,
      title: title,
      description: description,
      addedAt: new Date().toISOString(),
    }

    // Check if already bookmarked
    if (!bookmarks.find((b) => b.route === route)) {
      bookmarks.push(bookmark)
      localStorage.setItem(this.keys.BOOKMARKS, JSON.stringify(bookmarks))
    }
  }

  removeBookmark(route) {
    const bookmarks = this.getBookmarks()
    const filtered = bookmarks.filter((b) => b.route !== route)
    localStorage.setItem(this.keys.BOOKMARKS, JSON.stringify(filtered))
  }

  getBookmarks() {
    return JSON.parse(localStorage.getItem(this.keys.BOOKMARKS) || '[]')
  }

  isBookmarked(route) {
    const bookmarks = this.getBookmarks()
    return bookmarks.some((b) => b.route === route)
  }

  // === Favorites (alias for bookmarks) ===
  addFavorite(route, title, description = '') {
    return this.addBookmark(route, title, description)
  }

  removeFavorite(route) {
    return this.removeBookmark(route)
  }

  getFavorites() {
    return this.getBookmarks()
  }

  isFavorite(route) {
    return this.isBookmarked(route)
  }

  toggleFavorite(route, title = '', description = '') {
    if (this.isFavorite(route)) {
      this.removeFavorite(route)
      return false
    } else {
      this.addFavorite(route, title, description)
      return true
    }
  }

  // === Study Sessions ===
  startStudySession(route, title) {
    const session = {
      id: Date.now().toString(),
      route: route,
      title: title,
      startTime: Date.now(),
      endTime: null,
      duration: 0,
    }

    localStorage.setItem('current_study_session', JSON.stringify(session))
    return session
  }

  endStudySession() {
    const currentSession = localStorage.getItem('current_study_session')
    if (!currentSession) return null

    const session = JSON.parse(currentSession)
    session.endTime = Date.now()
    session.duration = Math.round(
      (session.endTime - session.startTime) / 1000 / 60
    ) // minutes

    // Save to sessions history
    const sessions = this.getStudySessions()
    sessions.push(session)

    // Keep only last 100 sessions
    if (sessions.length > 100) {
      sessions.splice(0, sessions.length - 100)
    }

    localStorage.setItem(this.keys.STUDY_SESSIONS, JSON.stringify(sessions))
    localStorage.removeItem('current_study_session')

    return session
  }

  getStudySessions() {
    return JSON.parse(localStorage.getItem(this.keys.STUDY_SESSIONS) || '[]')
  }

  getCurrentStudySession() {
    const current = localStorage.getItem('current_study_session')
    return current ? JSON.parse(current) : null
  }

  // === Settings ===
  saveSetting(key, value) {
    const settings = this.getSettings()
    settings[key] = value
    localStorage.setItem(this.keys.SETTINGS, JSON.stringify(settings))
  }

  getSetting(key, defaultValue = null) {
    const settings = this.getSettings()
    return settings[key] !== undefined ? settings[key] : defaultValue
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(this.keys.SETTINGS) || '{}')
  }

  // === Notes ===
  saveNote(route, content) {
    const notes = this.getNotes()
    notes[route] = {
      content: content,
      lastModified: new Date().toISOString(),
    }
    localStorage.setItem('software_dev_prep_notes', JSON.stringify(notes))
  }

  getNote(route) {
    const notes = this.getNotes()
    return notes[route]?.content || ''
  }

  getNotes() {
    return JSON.parse(localStorage.getItem('software_dev_prep_notes') || '{}')
  }

  // === Data Export/Import ===
  exportData() {
    const data = {
      progress: this.getProgress(),
      quizResults: this.getQuizResults(),
      bookmarks: this.getBookmarks(),
      studySessions: this.getStudySessions(),
      settings: this.getSettings(),
      notes: this.getNotes(),
      exportDate: new Date().toISOString(),
      version: '1.0',
    }

    return JSON.stringify(data, null, 2)
  }

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData)

      if (data.progress) {
        localStorage.setItem(this.keys.PROGRESS, JSON.stringify(data.progress))
      }

      if (data.quizResults) {
        localStorage.setItem(
          this.keys.QUIZ_RESULTS,
          JSON.stringify(data.quizResults)
        )
      }

      if (data.bookmarks) {
        localStorage.setItem(
          this.keys.BOOKMARKS,
          JSON.stringify(data.bookmarks)
        )
      }

      if (data.studySessions) {
        localStorage.setItem(
          this.keys.STUDY_SESSIONS,
          JSON.stringify(data.studySessions)
        )
      }

      if (data.settings) {
        localStorage.setItem(this.keys.SETTINGS, JSON.stringify(data.settings))
      }

      if (data.notes) {
        localStorage.setItem(
          'software_dev_prep_notes',
          JSON.stringify(data.notes)
        )
      }

      return true
    } catch (error) {
      console.error('Import failed:', error)
      return false
    }
  }

  // === Statistics ===
  getStatistics() {
    const progress = this.getProgress()
    const quizResults = this.getQuizResults()
    const studySessions = this.getStudySessions()

    const totalRoutes = Object.keys(progress).length
    const completedRoutes = Object.values(progress).filter(
      (p) => p.completionPercentage >= 100
    ).length
    const totalStudyTime = studySessions.reduce(
      (sum, session) => sum + (session.duration || 0),
      0
    )
    const totalQuizzes = quizResults.length
    const averageQuizScore =
      totalQuizzes > 0
        ? Math.round(
            quizResults.reduce((sum, result) => sum + result.percentage, 0) /
              totalQuizzes
          )
        : 0

    return {
      totalRoutes,
      completedRoutes,
      completionPercentage:
        totalRoutes > 0 ? Math.round((completedRoutes / totalRoutes) * 100) : 0,
      totalStudyTime,
      totalQuizzes,
      averageQuizScore,
      studyStreak: this.calculateStudyStreak(),
      lastActivity: this.getLastActivity(),
    }
  }

  calculateStudyStreak() {
    const sessions = this.getStudySessions()
    if (sessions.length === 0) return 0

    // Sort by date
    const sortedSessions = sessions.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    )

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    // Count consecutive days with study sessions
    for (let i = sortedSessions.length - 1; i >= 0; i--) {
      const sessionDate = new Date(sortedSessions[i].startTime)
      sessionDate.setHours(0, 0, 0, 0)

      const daysDiff = Math.floor(
        (currentDate - sessionDate) / (1000 * 60 * 60 * 24)
      )

      if (daysDiff === streak) {
        streak++
      } else if (daysDiff > streak) {
        break
      }
    }

    return streak
  }

  getLastActivity() {
    const progress = this.getProgress()
    const quizResults = this.getQuizResults()

    const progressDates = Object.values(progress).map(
      (p) => new Date(p.lastVisited)
    )
    const quizDates = quizResults.map((r) => new Date(r.timestamp))

    const allDates = [...progressDates, ...quizDates]

    if (allDates.length === 0) return null

    return new Date(Math.max(...allDates))
  }

  // === Settings Management ===
  saveSettings(settings) {
    localStorage.setItem(this.keys.SETTINGS, JSON.stringify(settings))
  }

  getSettings() {
    const defaultSettings = {
      theme: 'auto',
      language: 'hu',
      notifications: true,
    }

    const saved = localStorage.getItem(this.keys.SETTINGS)
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings
  }

  // === Clear Data ===
  clearAllData() {
    Object.values(this.keys).forEach((key) => {
      localStorage.removeItem(key)
    })
    localStorage.removeItem('software_dev_prep_notes')
    localStorage.removeItem('current_study_session')
  }

  clearProgress() {
    localStorage.removeItem(this.keys.PROGRESS)
  }

  clearQuizResults() {
    localStorage.removeItem(this.keys.QUIZ_RESULTS)
  }
}
