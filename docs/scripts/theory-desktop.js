// theory-desktop.js
(() => {
  const mqDesktop = window.matchMedia('(min-width: 1024px)');
  let lastY = 0;
  let ticking = false;

  function isTheory() {
    return location.hash.startsWith('#/theory/');
  }
  
  function setCollapsed(on) {
    document.body.classList.toggle('theory-collapsed', !!on);
  }

  function onScroll() {
    if (!mqDesktop.matches || !isTheory()) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    const dy = y - lastY;
    lastY = y;

    // Csak a valódi tetején (0-5px) nyitunk ki
    if (y <= 5) { 
      setCollapsed(false); 
      return; 
    }
    
    // Lefelé görgetéskor összecsukás (ha már túl vagyunk a küszöbön)
    if (dy > 4 && y > 120) {
      setCollapsed(true);
    }
    
    // Felfelé görgetéskor NEM nyitunk ki automatikusan!
    // Csak hamburger gombbal vagy a tetejére görgetéssel
  }

  function onTOCClick(e) {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    if (!mqDesktop.matches || !isTheory()) return;
    
    // kattintáskor széles tartalomra váltunk, hogy jól látszódjon a szakasz
    setCollapsed(true);
    // NINCS inline scroll – a render.js saját smooth-scrollja + scroll-margin-top intézi
  }

  function bind() {
    if (!mqDesktop.matches) return;
    if (!isTheory()) return;

    lastY = window.scrollY || 0;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => { 
          onScroll(); 
          ticking = false; 
        });
        ticking = true;
      }
    }, { passive: true });

    const toc = document.getElementById('theory-sidebar');
    if (toc) toc.addEventListener('click', onTOCClick, true);

    // Sticky TOC megjelenítés hamburger gombbal - X funkcióval
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('theory-hamburger')) {
        e.preventDefault();
        console.log('Hamburger clicked!'); // DEBUG
        const sidebar = document.getElementById('theory-sidebar');
        const hamburger = e.target;
        
        if (sidebar) {
          console.log('Sidebar found:', sidebar); // DEBUG
          // Toggle sticky TOC visibility
          if (sidebar.classList.contains('sticky-toc-visible')) {
            // Bezárás
            sidebar.classList.remove('sticky-toc-visible');
            hamburger.textContent = '☰';
            hamburger.setAttribute('aria-label', 'Fogalmak menü megnyitása');
            console.log('TOC hidden'); // DEBUG
          } else {
            // Megnyitás
            sidebar.classList.add('sticky-toc-visible');
            hamburger.textContent = '✕';
            hamburger.setAttribute('aria-label', 'Fogalmak menü bezárása');
            console.log('TOC shown, sidebar classes:', sidebar.className); // DEBUG
          }
        } else {
          console.log('Sidebar NOT found!'); // DEBUG
        }
      }
    });
  }

  function unbind() {
    // egyszerű verzió: oldal újrarajzolásánál újrakötjük; itt nem távolítunk el mindent globálból
  }

  window.addEventListener('hashchange', () => {
    if (isTheory() && mqDesktop.matches) {
      document.body.classList.add('is-theory');
      setCollapsed(false); // tetején kezdünk
      bind();
    } else {
      document.body.classList.remove('is-theory', 'theory-collapsed');
      unbind();
    }
  });

  mqDesktop.addEventListener?.('change', () => {
    // viewport váltáskor reset
    if (!mqDesktop.matches) {
      document.body.classList.remove('theory-collapsed');
    } else if (isTheory()) {
      bind();
    }
  });

  // első betöltés
  if (isTheory() && mqDesktop.matches) {
    document.body.classList.add('is-theory');
    bind();
  }

  // === TOOLBAR ELTÁVOLÍTVA - event listener-ek és clipping funkciók eltávolítva ===
})();
