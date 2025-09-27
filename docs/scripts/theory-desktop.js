// === Theory Desktop Auto-Collapse (≥1024px) ===
// Behavior: On desktop theory pages, show the Fogalmak (TOC) when at the top or within the first concept.
// Collapse (hide) the TOC and widen content once the second concept is reached. Animate transitions.

(function () {
  const mql = window.matchMedia('(min-width: 1024px)')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const isTheoryRoute = () => window.location.hash.startsWith('#/theory/')

  let rafId = null
  let scrollEl = null
  let concepts = []

  const collapse = () => {
    if (!mql.matches || !isTheoryRoute()) return
    document.body.classList.add('theory-collapsed')
  }
  const expand = () => {
    document.body.classList.remove('theory-collapsed')
  }

  const computeConcepts = () => {
    concepts = Array.from(document.querySelectorAll('#theory-content article[id]'))
  }

  const evaluate = () => {
    if (!mql.matches || !isTheoryRoute() || !scrollEl) return
    if (concepts.length < 2) { expand(); return }

    const secondTop = concepts[1].offsetTop
    const y = scrollEl.scrollTop

    // Collapse when the scroll position reaches the second concept
    if (y + 1 >= secondTop) {
      collapse()
    } else {
      // Otherwise (top or first concept), expand
      expand()
    }
  }

  const onScroll = () => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      evaluate()
    })
  }

  const onRouteOrResize = () => {
    if (!isTheoryRoute() || !mql.matches) {
      expand()
      return
    }
    scrollEl = document.getElementById('theory-content')
    computeConcepts()
    evaluate()
  }

  const setup = () => {
    // Desktop only
    if (!mql.matches) return

    scrollEl = document.getElementById('theory-content')
    if (!scrollEl) return

    // Enable transitions unless reduced motion
    if (prefersReducedMotion.matches) {
      document.body.classList.add('motion-reduce')
    }

    computeConcepts()
    evaluate()

    // Scroll within theory content container controls state
    scrollEl.addEventListener('scroll', onScroll, { passive: true })

    // Re-evaluate on route/resize/content-ready
    window.addEventListener('hashchange', onRouteOrResize)
    window.addEventListener('resize', onRouteOrResize)
    window.addEventListener('theory:content:ready', onRouteOrResize)
    window.addEventListener('theory:navigation:complete', () => {
      // Re-evaluate after navigation using the standard method
      evaluate()
    })
  }

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup)
    } else {
      setup()
    }
  }

  mql.addEventListener('change', () => {
    if (!mql.matches) {
      // Leaving desktop: clean up state
      expand()
    } else {
      onRouteOrResize()
    }
  })

  init()
})()
