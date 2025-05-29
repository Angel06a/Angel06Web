// ui.js

let selectedDownloadLink1 = "";
let selectedDownloadLink2 = "";

function setupUIStructure(categoriesData) {
  const sidebarUl = document.getElementById('sidebar-categories');
  const mainContent = document.getElementById('main-content');
  const busquedaList = document.getElementById('busqueda-list');
  const primaryDownloadBtn = document.getElementById('primary-download-btn');
  const secondaryDownloadBtn = document.getElementById('secondary-download-btn');

  // Event listeners para botones de descarga
  primaryDownloadBtn.addEventListener('click', function() {
    if (selectedDownloadLink1) {
      window.open(selectedDownloadLink1, '_blank');
    } else {
      alert('No se ha asignado ningún enlace. Por favor, selecciona un elemento.');
    }
  });

  secondaryDownloadBtn.addEventListener('click', function() {
    if (selectedDownloadLink2) {
      window.open(selectedDownloadLink2, '_blank');
    } else {
      alert('No se ha asignado ningún enlace. Por favor, selecciona un elemento.');
    }
  });

  // Crear pestañas y contenido de categorías
  categoriesData.forEach((cat, index) => {
    createCategoryTabAndContent(cat, index, sidebarUl, mainContent);
  });

  // Delegación de eventos para items de proyecto en búsqueda
  attachProjectItemDelegation(busquedaList, primaryDownloadBtn, secondaryDownloadBtn);

  // Aplicar modo grid si está guardado en cookie
  const gridCookie = getCookie("grid_view");
  if (gridCookie === "true") {
    document.getElementById('toggle-grid').checked = true;
    document.querySelectorAll('.list-container ul').forEach(ul => {
      ul.classList.add('grid');
    });
  }

  initLazyLoading(); // Inicializar lazy loading después de crear elementos
}

function processItemClick(button, primaryBtn, secondaryBtn) {
  document.querySelectorAll('.project-item').forEach(b => b.classList.remove('selected'));
  button.classList.add('selected');
  selectedDownloadLink1 = button.getAttribute('data-link1');
  selectedDownloadLink2 = button.getAttribute('data-link2');

  const customText1 = button.getAttribute('data-button-text1');
  primaryBtn.textContent = customText1 ? customText1 : "Descargar";

  if (selectedDownloadLink2) {
    secondaryBtn.style.display = "inline-flex";
    const customText2 = button.getAttribute('data-button-text2');
    secondaryBtn.textContent = customText2 ? customText2 : "Descargar";
  } else {
    secondaryBtn.style.display = "none";
    secondaryBtn.textContent = "Descargar";
  }
}

function attachProjectItemDelegation(ulElement, primaryBtn, secondaryBtn) {
  ulElement.addEventListener('click', function(e) {
    const btn = e.target.closest('.project-item');
    if (btn && ulElement.contains(btn)) {
      processItemClick(btn, primaryBtn, secondaryBtn);
    }
  });
}

function createCategoryTabAndContent(cat, index, sidebarUl, mainContent) {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.classList.add('tab-button');
  btn.innerHTML = convertEmoji(cat.name);
  const categoryId = cleanCategoryName(cat.name).toLowerCase().replace(/\s+/g, '-'); // Usar nombre limpio para ID
  btn.setAttribute('data-tab', categoryId);
  if (index === 0) btn.classList.add('active');
  li.appendChild(btn);
  sidebarUl.appendChild(li);

  const section = document.createElement('section');
  section.id = categoryId;
  section.classList.add('tab-content');
  if (index === 0) section.classList.add('active');

  const h2 = document.createElement('h2');
  h2.innerHTML = convertEmoji(cat.name);
  section.appendChild(h2);

  const projectListDiv = document.createElement('div');
  projectListDiv.classList.add('project-list');

  const listContainer = document.createElement('div');
  listContainer.classList.add('list-container');

  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  cat.items.forEach(item => {
    const liItem = document.createElement('li');
    const button = document.createElement('button');
    button.classList.add('project-item');

    const iconImg = document.createElement('img');
    iconImg.classList.add('item-icon');
    iconImg.setAttribute('draggable', 'false');
    button.appendChild(iconImg);
    // Usar cleanCategoryName para la ruta de la imagen
    loadImageAsync(`./img/Elementos/${cleanCategoryName(cat.name)}/${stripParentheses(item.displayName)}.webp`, iconImg);


    const textSpan = document.createElement('span');
    textSpan.classList.add('item-text');
    // Para las categorías, muestra el displayName. item.itemExtra no se usa aquí.
    textSpan.innerHTML = convertEmoji(item.displayName);
    button.appendChild(textSpan);

    button.setAttribute('data-link1', item.link || "");
    button.setAttribute('data-link2', item.link2 || "");
    if (item.buttonText) {
      button.setAttribute('data-button-text1', item.buttonText);
    }
    if (item.buttonText2) {
      button.setAttribute('data-button-text2', item.buttonText2);
    }
    liItem.appendChild(button);
    fragment.appendChild(liItem);
  });
  ul.appendChild(fragment);

  // Aplicar modo grid si está activo al crear la lista
  if (document.getElementById('toggle-grid') && document.getElementById('toggle-grid').checked) {
      ul.classList.add('grid');
  }

  listContainer.appendChild(ul);
  projectListDiv.appendChild(listContainer);
  section.appendChild(projectListDiv);
  mainContent.insertBefore(section, mainContent.querySelector('.download-section'));

  const primaryDownloadBtn = document.getElementById('primary-download-btn');
  const secondaryDownloadBtn = document.getElementById('secondary-download-btn');
  attachProjectItemDelegation(ul, primaryDownloadBtn, secondaryDownloadBtn);
}

function showTab(tabId, searchInput, primaryBtn, secondaryBtn) {
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.project-item').forEach(item => item.classList.remove('selected'));

  selectedDownloadLink1 = "";
  selectedDownloadLink2 = "";
  primaryBtn.textContent = "Descargar";
  secondaryBtn.style.display = "none";
  secondaryBtn.textContent = "Descargar";

  const section = document.getElementById(tabId);
  if (section) section.classList.add('active');

  // Activar el botón de tab correspondiente
  const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
  if (tabButton) tabButton.classList.add('active');

  // Si no es la pestaña de búsqueda, limpiar el input de búsqueda
  if (tabId !== 'busqueda') {
    searchInput.value = "";
  }
}

function displaySearchResults(items, categoriesData, busquedaListElement) {
    const fragment = document.createDocumentFragment();
    busquedaListElement.innerHTML = ''; // Limpiar resultados anteriores

    if (items.length === 0) {
        const noResultsLi = document.createElement('li');
        noResultsLi.classList.add('no-results');
        noResultsLi.textContent = 'No se encontraron resultados.';
        fragment.appendChild(noResultsLi);
    } else {
        items.forEach(item => {
            const liItem = document.createElement('li');
            const button = document.createElement('button');
            button.classList.add('project-item');

            const iconImg = document.createElement('img');
            iconImg.classList.add('item-icon');
            iconImg.setAttribute('draggable', 'false');
            button.appendChild(iconImg);
            // Usar cleanCategoryName para la ruta de la imagen
            loadImageAsync(`./img/Elementos/${cleanCategoryName(item.category)}/${stripParentheses(item.displayName)}.webp`, iconImg);

            const textSpan = document.createElement('span');
            textSpan.classList.add('item-text');

            let displayContent = item.displayName; // Start with the clean name

            // Add itemExtra if it exists, without parentheses
            if (item.itemExtra) {
                displayContent += ` ${item.itemExtra}`; // Just add a space and the extra info
            }

            // Add categoryExtra if it exists and is not already part of the displayContent
            if (item.categoryExtra && !displayContent.toLowerCase().includes(item.categoryExtra.toLowerCase())) {
                displayContent += ` ${item.categoryExtra}`;
            }

            textSpan.innerHTML = convertEmoji(displayContent);
            button.appendChild(textSpan);

            button.setAttribute('data-link1', item.link || "");
            button.setAttribute('data-link2', item.link2 || "");
            if (item.buttonText) {
                button.setAttribute('data-button-text1', item.buttonText);
            }
            if (item.buttonText2) {
                button.setAttribute('data-button-text2', item.buttonText2);
            }

            liItem.appendChild(button);
            fragment.appendChild(liItem);
        });
    }
    busquedaListElement.appendChild(fragment);
    // Aplicar modo grid si está activo
    if (document.getElementById('toggle-grid') && document.getElementById('toggle-grid').checked) {
        busquedaListElement.classList.add('grid');
    } else {
        busquedaListElement.classList.remove('grid');
    }
    initLazyLoading(); // Re-inicializar lazy loading para los nuevos elementos
}

function setupConfigPanel() {
    const configBtn = document.getElementById('config-btn');
    const configPanel = document.getElementById('config-panel');
    const configCloseBtn = document.getElementById('config-close-btn');
    const toggleGrid = document.getElementById('toggle-grid');

    configBtn.addEventListener('click', () => {
        configPanel.style.display = 'block';
        setTimeout(() => {
            configPanel.classList.add('visible');
        }, 10);
    });

    const closePanel = () => {
        configPanel.classList.remove('visible');
        setTimeout(() => {
            configPanel.style.display = 'none';
        }, 300); // Coincide con la duración de la transición CSS
    };

    configCloseBtn.addEventListener('click', closePanel);

    document.addEventListener('click', (e) => {
        if (configPanel.classList.contains('visible') && !configPanel.contains(e.target) && e.target !== configBtn && !configBtn.contains(e.target)) {
           closePanel();
        }
    });

    toggleGrid.addEventListener('change', function() {
        document.querySelectorAll('.list-container ul').forEach(ul => {
            if (this.checked) {
                ul.classList.add('grid');
                setCookie("grid_view", "true", 36500);
            } else {
                ul.classList.remove('grid');
                setCookie("grid_view", "false", 36500);
            }
        });
    });
}
