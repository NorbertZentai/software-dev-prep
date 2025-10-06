// Debug script for favorites functionality
console.log('🔍 === FAVORITES DEBUG SCRIPT ===');

// Wait for page to load
setTimeout(() => {
  console.log('\n📊 Checking components...\n');

  // 1. Check if concepts exist
  const concepts = document.querySelectorAll('.concept-article');
  console.log(`✓ Concepts found: ${concepts.length}`);

  if (concepts.length > 0) {
    const firstConcept = concepts[0];
    console.log('\n📝 First concept details:');
    console.log('  - ID:', firstConcept.id);
    console.log('  - data-concept-id:', firstConcept.dataset.conceptId);
    console.log('  - data-topic:', firstConcept.dataset.topic);

    // Check title structure
    const title = firstConcept.querySelector('.concept-title');
    console.log('\n📌 Title element:');
    console.log('  - Found:', !!title);
    if (title) {
      console.log('  - HTML:', title.innerHTML.substring(0, 200));
    }

    // Check title text
    const titleText = firstConcept.querySelector('.concept-title-text');
    console.log('\n📄 Title text element:');
    console.log('  - Found:', !!titleText);
    if (titleText) {
      console.log('  - Content:', titleText.textContent.trim());
    }

    // Check actions container
    const actions = firstConcept.querySelector('.concept-actions');
    console.log('\n⚙️  Actions container:');
    console.log('  - Found:', !!actions);
    if (actions) {
      console.log('  - HTML:', actions.innerHTML);
    }

    // Check favorite button
    const favBtn = firstConcept.querySelector('.concept-favorite-toggle');
    console.log('\n⭐ Favorite button:');
    console.log('  - Found:', !!favBtn);
    if (favBtn) {
      console.log('  - data-concept-id:', favBtn.dataset.conceptId);
      console.log('  - Title:', favBtn.title);
      console.log('  - Visible:', window.getComputedStyle(favBtn).display !== 'none');
      console.log('  - Opacity:', window.getComputedStyle(favBtn).opacity);
      console.log('  - Position:', favBtn.getBoundingClientRect());
    }

    // Check favorite icon
    const favIcon = firstConcept.querySelector('.favorite-icon');
    console.log('\n⭐ Favorite icon:');
    console.log('  - Found:', !!favIcon);
    if (favIcon) {
      console.log('  - Content:', favIcon.textContent);
      console.log('  - Visible:', window.getComputedStyle(favIcon).display !== 'none');
    }

    // Check read button (for comparison)
    const readBtn = firstConcept.querySelector('.concept-read-toggle');
    console.log('\n✓ Read button (comparison):');
    console.log('  - Found:', !!readBtn);
    if (readBtn) {
      console.log('  - Visible:', window.getComputedStyle(readBtn).display !== 'none');
    }
  }

  // 2. Check CSS file loaded
  console.log('\n🎨 CSS Check:');
  const stylesheets = Array.from(document.styleSheets);
  const favoritesCSS = stylesheets.find(sheet => {
    try {
      return sheet.href && sheet.href.includes('favorites.css');
    } catch (e) {
      return false;
    }
  });
  console.log('  - favorites.css loaded:', !!favoritesCSS);

  // 3. Check storage
  console.log('\n💾 Storage Check:');
  const favoritesData = localStorage.getItem('software_dev_prep_concept_favorites');
  console.log('  - localStorage key exists:', !!favoritesData);
  if (favoritesData) {
    const parsed = JSON.parse(favoritesData);
    console.log('  - Favorites count:', parsed.length);
    console.log('  - Favorites:', parsed);
  }

  // 4. Check if renderer has storage
  console.log('\n🔧 Renderer Check:');
  if (window.renderer) {
    console.log('  - Renderer exists:', true);
    console.log('  - Renderer has storage:', !!window.renderer.storage);
    if (window.renderer.storage) {
      console.log('  - getConceptFavorites method:', typeof window.renderer.storage.getConceptFavorites);
      console.log('  - isConceptFavorite method:', typeof window.renderer.storage.isConceptFavorite);
    }
  } else {
    console.log('  - Renderer exists:', false);
  }

  // 5. Check event listeners
  console.log('\n👂 Event Listeners Check:');
  const theoryContent = document.getElementById('theory-content');
  console.log('  - theory-content exists:', !!theoryContent);

  // Try to manually check computed styles
  if (concepts.length > 0) {
    const firstFavBtn = concepts[0].querySelector('.concept-favorite-toggle');
    if (firstFavBtn) {
      console.log('\n🎯 Detailed button styles:');
      const styles = window.getComputedStyle(firstFavBtn);
      console.log('  - display:', styles.display);
      console.log('  - visibility:', styles.visibility);
      console.log('  - opacity:', styles.opacity);
      console.log('  - width:', styles.width);
      console.log('  - height:', styles.height);
      console.log('  - position:', styles.position);
      console.log('  - z-index:', styles.zIndex);
    }
  }

  console.log('\n✅ Debug check complete!\n');

}, 2000);

// Add a test button to manually trigger favorites
window.testFavorites = () => {
  console.log('🧪 Testing favorites functionality...');
  const firstBtn = document.querySelector('.concept-favorite-toggle');
  if (firstBtn) {
    console.log('Clicking first favorite button...');
    firstBtn.click();
  } else {
    console.log('❌ No favorite button found!');
  }
};

console.log('💡 Tip: Wait 2 seconds for checks to complete');
console.log('💡 Tip: Run window.testFavorites() to test clicking');
