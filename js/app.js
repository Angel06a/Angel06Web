// app.js

document.addEventListener('DOMContentLoaded', function() {
  // Convertir título del header
  document.getElementById('header-title').innerHTML = convertEmoji("Angel06 Web (emoji.windows) (emoji.android) (emoji.web)");

  // Procesar datos de listData (asumiendo que listData está globalmente disponible desde list.js)
  const categories = parseListData(listData);

  // Elementos del DOM
  const searchInput = document.querySelector('.search-bar input');
  const sidebarUl = document.getElementById('sidebar-categories');
  const busquedaSection = document.getElementById('busqueda');
  const busquedaList = document.getElementById('busqueda-list');
  const primaryDownloadBtn = document.getElementById('primary-download-btn');
  const secondaryDownloadBtn = document.getElementById('secondary-download-btn');
  
  // Configurar la UI inicial
  setupUIStructure(categories); // Esta función ahora está en ui.js y hace más
  setupConfigPanel(); // Configuración del panel y switch

  // Event listener para cambio de pestañas en el sidebar
  sidebarUl.addEventListener('click', function(e) {
    const btn = e.target.closest('.tab-button');
    if (btn && sidebarUl.contains(btn)) {
      searchInput.value = ""; // Limpiar búsqueda al cambiar de pestaña
      showTab(btn.getAttribute('data-tab'), searchInput, primaryDownloadBtn, secondaryDownloadBtn);
    }
  });

  // Event listener para la búsqueda
  searchInput.addEventListener('input', debounce(function() {
    const query = this.value.trim().toLowerCase();
    if (!query) {
      // Si la búsqueda está vacía, mostrar la primera pestaña
      const firstTabButton = sidebarUl.querySelector('.tab-button');
      if (firstTabButton) {
        showTab(firstTabButton.getAttribute('data-tab'), searchInput, primaryDownloadBtn, secondaryDownloadBtn);
        firstTabButton.classList.add('active'); // Asegurar que el botón de la primera pestaña esté activo
      }
      busquedaSection.classList.remove('active');
      return;
    }

    const matchingItems = [];
    categories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.name.toLowerCase().includes(query) || item.displayName.toLowerCase().includes(query)) {
          // Añadimos la categoría original y extra para que displaySearchResults pueda usarla
          matchingItems.push({...item, category: cat.name, categoryExtra: cat.extra });
        }
      });
    });
    
    displaySearchResults(matchingItems, categories, busquedaList);
    showTab('busqueda', searchInput, primaryDownloadBtn, secondaryDownloadBtn); // Mostrar la pestaña de búsqueda

  }, 100));

// Scroll horizontal en nav para móviles
  const navUl = document.querySelector('nav ul');
  if (navUl) {
    navUl.addEventListener('wheel', function(e) {
      if (window.innerWidth <= 768) { // Solo en móviles
        if (navUl.scrollWidth > navUl.clientWidth) {
            e.preventDefault();
            const newLeft = navUl.scrollLeft + e.deltaY * 10; // Multiplicador ajustado al original
            navUl.scrollTo({ left: newLeft, behavior: 'smooth' });
        }
      }
    }, { passive: false });
  }

  // Fade out del overlay de carga
  window.addEventListener('load', function() {
    const bgOverlay = document.getElementById('bg-overlay');
    if (bgOverlay) {
        bgOverlay.style.opacity = '0';
        setTimeout(() => {
        if (bgOverlay.parentNode) {
            bgOverlay.parentNode.removeChild(bgOverlay);
        }
        }, 1000); // Coincide con la transición CSS
    }
  });

});


function parseListData(rawText) {
  const lines = rawText.split('\n');
  let categories = [];
  let currentCategory = null;

  lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    if (line.endsWith(':')) {
      let catName = line.slice(0, -1).trim();
      let categoryExtra = '';
      const extraMatch = catName.match(/=([^=]+)=/);
      if (extraMatch) {
        categoryExtra = extraMatch[1].trim();
        catName = catName.replace(/=([^=]+)=/g, '').trim();
      }
      currentCategory = { name: catName, extra: categoryExtra, items: [] };
      categories.push(currentCategory);
    } else if (line.startsWith('-') && currentCategory) {
      let content = line.substring(1).trim();
      const linkMatches = content.match(/"([^"]*)"/g) || [];
      let link = linkMatches[0] ? linkMatches[0].replace(/"/g, '') : "";
      let link2 = linkMatches[1] ? linkMatches[1].replace(/"/g, '') : "";
      
      let tempContent = content.replace(/"([^"]*)"/g, '').trim();
      const starMatches = tempContent.match(/\*([^*]+)\*/g) || [];
      let buttonText = starMatches[0] ? starMatches[0].replace(/\*/g, '') : "";
      let buttonText2 = starMatches[1] ? starMatches[1].replace(/\*/g, '') : "";
      
      tempContent = tempContent.replace(/\*([^*]+)\*/g, '').trim();
      let name = tempContent;
      const displayName = name.replace(/=[^=]+=/g, '').trim(); // Nombre para mostrar, sin info extra

      currentCategory.items.push({
        name, // Nombre completo con metadatos para búsqueda
        displayName, // Nombre limpio para mostrar y para ruta de imagen
        link,
        link2,
        buttonText,
        buttonText2,
        categoryExtra: currentCategory.extra, // Para búsqueda
        category: currentCategory.name // Para ruta de imagen y referencia
      });
    }
  });
  return categories;
}