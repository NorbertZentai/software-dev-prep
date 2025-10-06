// === Quiz Engine ===
import { i18n } from './i18n.js'

export class QuizEngine {
  constructor() {
    this.currentQuiz = null
    this.currentQuestion = 0
    this.answers = []
    this.startTime = null
    this.storage = null
    this.initStorage()
  }

  async initStorage() {
    const { StorageManager } = await import('./storage.js')
    this.storage = new StorageManager()
  }

  async loadQuiz(quizPath) {
    try {
      const response = await fetch(quizPath)
      if (!response.ok) throw new Error('Quiz not found')

      this.currentQuiz = await response.json()
      this.currentQuestion = 0
      this.answers = []
      this.startTime = Date.now()

      return this.currentQuiz
    } catch (error) {
      console.error('Quiz loading error:', error)
      throw error
    }
  }

  // Start quiz method expected by router
  async start(quizPath, title) {
    try {
      const quiz = await this.loadQuiz(quizPath)
      this.renderFullQuiz(quiz)
      this.setupQuizHandlers()
    } catch (error) {
      console.error('Quiz start error:', error)
      throw error
    }
  }

  renderQuizStart(quiz) {
    return `
      <div class="quiz-container">
        <header class="quiz-header">
          <h1>${quiz.title}</h1>
          <p class="quiz-description">${quiz.description}</p>
          <div class="quiz-meta">
            <span class="difficulty-badge ${quiz.difficulty}">
              ${this.getDifficultyLabel(quiz.difficulty)}
            </span>
            <span class="question-count">${quiz.questions.length} ${i18n.t('quiz.questions')}</span>
            <span class="estimated-time">~${Math.ceil(
              quiz.questions.length * 1.5
            )} ${i18n.t('quiz.estimatedTime')}</span>
          </div>
        </header>

        <div class="quiz-intro">
          <div class="quiz-instructions">
            <h3>${i18n.t('quiz.instructions.title')}</h3>
            <ul>
              <li>${i18n.t('quiz.instructions.step1')}</li>
              <li>${i18n.t('quiz.instructions.step2')}</li>
              <li>${i18n.t('quiz.instructions.step3')}</li>
            </ul>
          </div>

          <div class="quiz-actions">
            <button id="start-quiz-btn" class="btn-primary large">
              ${i18n.t('quiz.start')}
            </button>
          </div>
        </div>
      </div>
    `
  }

  renderQuestion(questionIndex) {
    if (
      !this.currentQuiz ||
      questionIndex >= this.currentQuiz.questions.length
    ) {
      return this.renderError('Invalid question index')
    }

    const question = this.currentQuiz.questions[questionIndex]
    const progress =
      ((questionIndex + 1) / this.currentQuiz.questions.length) * 100

    let optionsHtml = ''

    if (question.type === 'multiple') {
      optionsHtml = question.options
        .map(
          (option, index) => `
        <label class="quiz-option">
          <input type="radio" name="answer" value="${index}" />
          <span class="option-text">${option}</span>
        </label>
      `
        )
        .join('')
    } else if (question.type === 'true-false') {
      optionsHtml = `
        <label class="quiz-option">
          <input type="radio" name="answer" value="true" />
          <span class="option-text">${i18n.t('quiz.true')}</span>
        </label>
        <label class="quiz-option">
          <input type="radio" name="answer" value="false" />
          <span class="option-text">${i18n.t('quiz.false')}</span>
        </label>
      `
    }

    return `
      <div class="quiz-question-container">
        <div class="quiz-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <span class="progress-text">${questionIndex + 1} / ${
      this.currentQuiz.questions.length
    }</span>
        </div>

        <div class="question-card">
          <div class="question-header">
            <h2>${i18n.t('quiz.question')} ${questionIndex + 1}</h2>
          </div>

          <div class="question-text">
            ${question.question}
          </div>

          <div class="question-options">
            ${optionsHtml}
          </div>

          <div class="question-actions">
            ${
              questionIndex > 0
                ? `<button id="prev-question" class="btn-secondary">${i18n.t('quiz.previous')}</button>`
                : ''
            }
            <button id="next-question" class="btn-primary" disabled>
              ${
                questionIndex === this.currentQuiz.questions.length - 1
                  ? i18n.t('quiz.finish')
                  : i18n.t('quiz.next')
              }
            </button>
          </div>
        </div>
      </div>
    `
  }

  renderResults() {
    const correctAnswers = this.calculateResults()
    const percentage = Math.round(
      (correctAnswers / this.currentQuiz.questions.length) * 100
    )
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000 / 60)

    // Save results
    if (this.storage) {
      this.storage.saveQuizResult({
        quiz: this.currentQuiz.title,
        score: percentage,
        correctAnswers,
        totalQuestions: this.currentQuiz.questions.length,
        timeSpent,
        date: new Date().toISOString(),
      })
    }

    const resultsHtml = this.currentQuiz.questions
      .map((question, index) => {
        const userAnswer = this.answers[index]
        const isCorrect = this.isAnswerCorrect(question, userAnswer)

        return `
        <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
          <div class="result-header">
            <span class="result-icon">${isCorrect ? '✅' : '❌'}</span>
            <span class="result-title">${i18n.t('quiz.question')} ${index + 1}</span>
          </div>

          <div class="result-question">${question.question}</div>

          <div class="result-answers">
            <div class="user-answer">
              <strong>${i18n.t('quiz.results.yourAnswer')}</strong> ${this.formatAnswer(
                question,
                userAnswer
              )}
            </div>
            ${
              !isCorrect
                ? `
              <div class="correct-answer">
                <strong>${i18n.t('quiz.results.correctAnswer')}</strong> ${this.formatCorrectAnswer(
                  question
                )}
              </div>
            `
                : ''
            }
          </div>

          ${
            question.explanation
              ? `
            <div class="result-explanation">
              <strong>${i18n.t('quiz.results.explanation')}</strong> ${question.explanation}
            </div>
          `
              : ''
          }
        </div>
      `
      })
      .join('')

    return `
      <div class="quiz-results-container">
        <header class="results-header">
          <h1>${i18n.t('quiz.results.title')}</h1>
          <div class="score-display">
            <div class="score-circle ${this.getScoreClass(percentage)}">
              <span class="score-percentage">${percentage}%</span>
            </div>
            <div class="score-details">
              <div class="score-item">
                <span class="score-label">${i18n.t('quiz.results.correct')}</span>
                <span class="score-value">${correctAnswers} / ${
      this.currentQuiz.questions.length
    }</span>
              </div>
              <div class="score-item">
                <span class="score-label">${i18n.t('quiz.results.duration')}</span>
                <span class="score-value">${timeSpent} ${i18n.t('quiz.results.minutes')}</span>
              </div>
            </div>
          </div>

          <div class="score-message">
            ${this.getScoreMessage(percentage)}
          </div>
        </header>

        <div class="results-details">
          <h2>${i18n.t('quiz.results.detailed')}</h2>
          ${resultsHtml}
        </div>

        <div class="results-actions">
          <button onclick="location.hash='#/'" class="btn-secondary">${i18n.t('quiz.results.home')}</button>
          <button onclick="location.reload()" class="btn-primary">${i18n.t('quiz.results.retry')}</button>
        </div>
      </div>
    `
  }

  calculateResults() {
    let correct = 0
    this.currentQuiz.questions.forEach((question, index) => {
      if (this.isAnswerCorrect(question, this.answers[index])) {
        correct++
      }
    })
    return correct
  }

  isAnswerCorrect(question, userAnswer) {
    if (question.type === 'multiple') {
      return parseInt(userAnswer) === question.correct
    } else if (question.type === 'true-false') {
      return (userAnswer === 'true') === question.correct
    }
    return false
  }

  formatAnswer(question, userAnswer) {
    if (question.type === 'multiple') {
      return question.options[parseInt(userAnswer)] || i18n.t('quiz.noAnswer')
    } else if (question.type === 'true-false') {
      return userAnswer === 'true'
        ? i18n.t('quiz.true')
        : userAnswer === 'false'
        ? i18n.t('quiz.false')
        : i18n.t('quiz.noAnswer')
    }
    return i18n.t('quiz.unknown')
  }

  formatCorrectAnswer(question) {
    if (question.type === 'multiple') {
      return question.options[question.correct]
    } else if (question.type === 'true-false') {
      return question.correct ? i18n.t('quiz.true') : i18n.t('quiz.false')
    }
    return i18n.t('quiz.unknown')
  }

  getDifficultyLabel(difficulty) {
    const key = `quiz.difficulty.${difficulty}`
    return i18n.t(key, difficulty)
  }

  getScoreClass(percentage) {
    if (percentage >= 80) return 'excellent'
    if (percentage >= 60) return 'good'
    if (percentage >= 40) return 'average'
    return 'poor'
  }

  getScoreMessage(percentage) {
    if (percentage >= 90) return i18n.t('quiz.score.excellent')
    if (percentage >= 80) return i18n.t('quiz.score.great')
    if (percentage >= 70) return i18n.t('quiz.score.good')
    if (percentage >= 60) return i18n.t('quiz.score.average')
    if (percentage >= 40) return i18n.t('quiz.score.poor')
    return i18n.t('quiz.score.veryPoor')
  }

  renderError(message) {
    return `
      <div class="quiz-error">
        <div class="error-icon">⚠️</div>
        <h2>${i18n.t('quiz.error.title')}</h2>
        <p>${message}</p>
        <button onclick="history.back()" class="btn-secondary">${i18n.t('quiz.error.back')}</button>
      </div>
    `
  }

  // Event handlers
  setupQuizEvents() {
    // Start quiz button
    document.addEventListener('click', (e) => {
      if (e.target.id === 'start-quiz-btn') {
        this.startQuiz()
      } else if (e.target.id === 'next-question') {
        this.nextQuestion()
      } else if (e.target.id === 'prev-question') {
        this.prevQuestion()
      }
    })

    // Answer selection
    document.addEventListener('change', (e) => {
      if (e.target.name === 'answer') {
        document.getElementById('next-question').disabled = false
        this.answers[this.currentQuestion] = e.target.value
      }
    })
  }

  startQuiz() {
    this.currentQuestion = 0
    this.showQuestion()
  }

  showQuestion() {
    const app = document.getElementById('app')
    app.innerHTML = this.renderQuestion(this.currentQuestion)
  }

  nextQuestion() {
    if (this.currentQuestion < this.currentQuiz.questions.length - 1) {
      this.currentQuestion++
      this.showQuestion()
    } else {
      this.showResults()
    }
  }

  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--
      this.showQuestion()
    }
  }

  showResults() {
    const app = document.getElementById('app')
    app.innerHTML = this.renderResults()
  }

  // Full quiz rendering and setup
  renderFullQuiz(quiz) {
    const app = document.getElementById('app')
    app.innerHTML = this.renderQuizStart(quiz)
  }

  setupQuizHandlers() {
    // Setup start quiz button
    const startBtn = document.getElementById('start-quiz-btn')
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.startQuiz()
      })
    }
  }

  startQuiz() {
    if (!this.currentQuiz) return

    this.currentQuestion = 0
    this.answers = []
    this.startTime = Date.now()
    this.showQuestion()
  }

  showQuestion() {
    const app = document.getElementById('app')
    app.innerHTML = this.renderQuestion(this.currentQuestion)

    // Setup answer handlers
    this.setupAnswerHandlers()
  }

  setupAnswerHandlers() {
    // Setup multiple choice handlers
    const options = document.querySelectorAll('.quiz-option')
    options.forEach((option) => {
      option.addEventListener('click', () => {
        // Remove previous selections
        options.forEach((opt) => opt.classList.remove('selected'))
        option.classList.add('selected')

        // Store answer
        const answer = option.dataset.value
        this.answers[this.currentQuestion] = answer

        // Enable next button
        const nextBtn = document.getElementById('next-question')
        if (nextBtn) nextBtn.disabled = false
      })
    })

    // Setup true/false handlers
    const trueBtn = document.getElementById('answer-true')
    const falseBtn = document.getElementById('answer-false')

    if (trueBtn && falseBtn) {
      ;[trueBtn, falseBtn].forEach((btn) => {
        btn.addEventListener('click', () => {
          ;[trueBtn, falseBtn].forEach((b) => b.classList.remove('selected'))
          btn.classList.add('selected')

          this.answers[this.currentQuestion] =
            btn.id === 'answer-true' ? 'true' : 'false'

          const nextBtn = document.getElementById('next-question')
          if (nextBtn) nextBtn.disabled = false
        })
      })
    }

    // Setup navigation
    const nextBtn = document.getElementById('next-question')
    const prevBtn = document.getElementById('prev-question')

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion())
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevQuestion())
    }
  }
}

// Global quiz functions (for backwards compatibility)
window.startQuiz = function () {
  if (window.quizEngine && window.quizEngine.currentQuiz) {
    window.quizEngine.startQuiz()
  }
}
