// === Mobile TOC right drawer control (≤768px) ===
(() => {
  const mq = window.matchMedia('(max-width: 768px)');
  let wired = false;

  const els = {
    body: document.body,
    drawer: null,
    overlay: null,
    toggle: null,
  };

  const q = () => {
    els.drawer = document.getElementById('theory-sidebar');
    els.overlay = document.getElementById('drawer-overlay');
    els.toggle = document.getElementById('mobile-toc-toggle');
    console.log('🔍 Query elements:', {
      drawer: !!els.drawer,
      overlay: !!els.overlay,
      toggle: !!els.toggle
    });
  };

  const open = () => {
    console.log('🚀 Opening TOC drawer...');
    if (!els.drawer || !els.overlay) {
      console.warn('❌ Cannot open: missing elements', { drawer: !!els.drawer, overlay: !!els.overlay });
      return;
    }
    
    // Bal oldali drawer bezárása ha nyitva van
    const leftDrawer = document.getElementById('sidebar');
    if (leftDrawer && leftDrawer.classList.contains('open')) {
      leftDrawer.classList.remove('open');
      els.body.classList.remove('drawer-open-left');
    }
    
    els.drawer.classList.add('open');
    els.overlay.classList.add('visible');
    els.body.classList.add('drawer-open-right');
    els.toggle?.setAttribute('aria-expanded', 'true');
    if (els.toggle) els.toggle.textContent = '✕';
    
    console.log('✅ TOC drawer opened');
  };

  const close = () => {
    console.log('🔒 Closing TOC drawer...');
    if (!els.drawer || !els.overlay) return;
    
    els.drawer.classList.remove('open');
    els.overlay.classList.remove('visible');
    els.body.classList.remove('drawer-open-right');
    els.toggle?.setAttribute('aria-expanded', 'false');
    if (els.toggle) els.toggle.textContent = '☰';
  };

  const toggle = () => {
    console.log('🔄 Toggle clicked, drawer open?', els.drawer?.classList.contains('open'));
    if (!els.drawer) {
      console.warn('❌ No drawer element found');
      return;
    }
    els.drawer.classList.contains('open') ? close() : open();
  };

  const onKey = (e) => { 
    if (e.key === 'Escape') close(); 
  };

  const wire = () => {
    if (wired) return;
    q(); // Query elements
    
    if (!els.toggle) {
      console.warn('❌ Cannot wire: toggle button not found');
      return;
    }
    
    els.toggle.addEventListener('click', toggle);
    els.overlay?.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    
    if (els.toggle) {
      els.toggle.textContent = '☰';
      els.toggle.setAttribute('aria-expanded', 'false');
    }
    
    wired = true;
    console.log('✅ Mobile TOC wired successfully');
  };

  const unwire = () => {
    if (!wired) return;
    els.toggle?.removeEventListener('click', toggle);
    els.overlay?.removeEventListener('click', close);
    window.removeEventListener('keydown', onKey);
    close();
    wired = false;
    console.log('🔌 Mobile TOC unwired');
  };

  const onMQ = () => {
    console.log('📱 Media query change, mobile?', mq.matches);
    mq.matches ? wire() : unwire();
  };
  
  mq.addEventListener?.('change', onMQ);
  
  // Initial wire
  onMQ();

  // Re-query elements when theory content loads
  window.addEventListener('theory:content:ready', () => {
    console.log('📚 Theory content ready, re-querying elements...');
    if (mq.matches) {
      q(); // Refresh element references
    }
  });

  // Close drawer on route change
  window.addEventListener('hashchange', () => {
    console.log('🔄 Hash changed, closing drawer');
    close();
  });
  
  console.log('🎯 Mobile TOC drawer system initialized');
})();

// === Mobile NAV left drawer control (≤768px) ===
(() => {
  const mq = window.matchMedia('(max-width: 768px)');
  let wired = false;

  const els = {
    body: document.body,
    drawer: null,
    overlay: null,
    toggle: null,
  };

  const q = () => {
    els.drawer = document.getElementById('sidebar');
    els.overlay = document.getElementById('drawer-overlay');
    els.toggle = document.getElementById('nav-toggle');
  };

  const open = () => {
    if (!els.drawer || !els.overlay) return;
    
    // Jobb oldali drawer bezárása ha nyitva van
    const rightDrawer = document.getElementById('theory-sidebar');
    if (rightDrawer && rightDrawer.classList.contains('open')) {
      rightDrawer.classList.remove('open');
      els.body.classList.remove('drawer-open-right');
      document.getElementById('drawer-overlay')?.classList.remove('visible');
    }
    
    els.drawer.classList.add('open');
    els.overlay.classList.add('visible');
    els.body.classList.add('drawer-open-left');
    els.toggle?.setAttribute('aria-expanded', 'true');
    if (els.toggle) els.toggle.textContent = '✕';
  };

  const close = () => {
    if (!els.drawer || !els.overlay) return;
    els.drawer.classList.remove('open');
    els.overlay.classList.remove('visible');
    els.body.classList.remove('drawer-open-left');
    els.toggle?.setAttribute('aria-expanded', 'false');
    if (els.toggle) els.toggle.textContent = '☰';
  };

  const toggle = () => {
    if (!els.drawer) return;
    els.drawer.classList.contains('open') ? close() : open();
  };

  const onKey = (e) => { if (e.key === 'Escape') close(); };

  const wire = () => {
    if (wired) return; 
    q();
    els.toggle?.addEventListener('click', toggle);
    els.overlay?.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    if (els.toggle) {
      els.toggle.textContent = '☰';
      els.toggle.setAttribute('aria-expanded', 'false');
    }
    wired = true;
  };

  const unwire = () => {
    if (!wired) return;
    els.toggle?.removeEventListener('click', toggle);
    els.overlay?.removeEventListener('click', close);
    window.removeEventListener('keydown', onKey);
    close();
    wired = false;
  };

  const onMQ = () => (mq.matches ? wire() : unwire());
  mq.addEventListener?.('change', onMQ);
  onMQ();

  window.addEventListener('hashchange', close);
})();
