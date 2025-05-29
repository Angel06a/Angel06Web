// utils.js

// Funciones para gestionar cookies
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Debounce
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      requestAnimationFrame(() => func.apply(context, args));
    }, delay);
  };
}

// Conversión de texto a Emojis (imágenes)
function convertEmoji(text) {
  if (!text) return "";
  return text
    .replace(/\(emoji\.windows\)/g, '<img src="./img/emoji.windows.webp" alt="emoji" class="emoji" draggable="false" />')
    .replace(/\(emoji\.android\)/g, '<img src="./img/emoji.android.webp" alt="emoji" class="emoji" draggable="false" />')
    .replace(/\(emoji\.web\)/g, '<img src="./img/emoji.web.webp" alt="emoji" class="emoji" draggable="false" />');
}

// Limpiar nombre de categoría (quitar emojis para rutas)
function cleanCategoryName(name) {
  if (!name) return "";
  return name.replace(/\(emoji\.windows\)|\(emoji\.android\)|\(emoji\.web\)/g, "").trim();
}

// Quitar paréntesis y dos puntos para nombres de archivo de imagen
function stripParentheses(text) {
  if (!text) return "";
  return text.replace(/\s*\(.*?\)\s*/g, '').replace(/:/g, '').trim();
}

// Carga asíncrona de imágenes
let lazyImageObserver;
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    if (!lazyImageObserver) {
      lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const tempImg = new Image();
            tempImg.onload = function() {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            };
            tempImg.onerror = function() {
              img.src = './img/fallback.webp'; // Imagen de fallback
              img.removeAttribute('data-src');
            };
            tempImg.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      });
    }
    lazyImages.forEach(img => {
      lazyImageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores sin IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

function loadImageAsync(src, imgElement) {
  imgElement.src = './img/placeholder.webp'; // Placeholder mientras carga
  imgElement.dataset.src = src;
}