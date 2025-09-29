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

    if (y < 120) { 
      setCollapsed(false); 
      return; 
    }
    
    // lefelé nagyobbat görget – csuk
    if (dy > 4) setCollapsed(true);
    // felfelé – nyiss
    if (dy < -6) setCollapsed(false);
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

    // Hamburger gomb functionality
    const hamburgerBtn = document.querySelector('#theory-top-toolbar .hamburger-btn');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', () => {
        setCollapsed(false); // Sidebar megnyitása
      });
    }
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
})();
