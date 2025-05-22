// Menu burger mobile (pour toutes les pages)
document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burger-btn');
  const mainNav = document.getElementById('main-nav');
  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      mainNav.classList.toggle('hidden');
      mainNav.classList.toggle('flex');
    });
    // Fermer le menu quand on clique sur un lien
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mainNav.classList.add('hidden');
          mainNav.classList.remove('flex');
        }
      });
    });
  }
});

// Gestion de la classe active sur la nav
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#main-nav a');
  const current = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    // On retire la classe 'font-bold' de tous
    link.classList.remove('font-bold');
    // On ajoute 'font-bold' si le href correspond à la page courante
    if (link.getAttribute('href') === current) {
      link.classList.add('font-bold');
    }
  });
});

// Hébergement
if (document.getElementById('hebergements-list')) {
  fetch('hebergements.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('hebergements-list');
      container.innerHTML = data.map(item => `
        <div class="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center">
          <img src="${item.image || ''}" alt="${item.type}" class="w-32 h-32 object-cover rounded-xl shadow-md bg-gray-200" />
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-2 text-blue-900">${item.type}</h3>
            <p class="mb-2 text-gray-700">${item.description}</p>
            <div class="text-lg font-semibold text-indigo-700">${item.prix} € / nuit</div>
          </div>
        </div>
      `).join('');
    });
}

// Restauration
if (document.getElementById('restauration-container')) {
  fetch('restauration.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('restauration-container');
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          ${data.map(item => `
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-stretch w-full">
              <div class="relative w-full aspect-square overflow-hidden">
                <img src="${item.image || ''}" alt="${item.nom}" class="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
              </div>
              <div class="flex-1 flex flex-col justify-end p-4 bg-gradient-to-t from-white/90 to-white/60">
                <h2 class="text-xl font-bold mb-1 text-blue-900">${item.nom}</h2>
                <p class="text-gray-700 text-sm mb-2">${item.description}</p>
                <div class="text-lg font-semibold text-indigo-700">${item.prix ? item.prix + ' €' : ''}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    });
}

// Services
if (document.getElementById('services-container')) {
  fetch('services.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('services-container');
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          ${data.map(item => `
            <div class="bg-white rounded-2xl shadow-xl flex flex-col items-stretch w-full p-6 mb-2">
              <h2 class="text-xl font-bold mb-2 text-blue-900">${item.nom}</h2>
              <p class="text-gray-700 text-base mb-2">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;
    });
}

// API Célébrités
if (document.getElementById('celebrites-container')) {
  fetch('celebrites.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('celebrites-container');
      container.innerHTML = data.map(item => `
        <div class="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 items-center mb-6">
          <img src="${item.image || 'https://source.unsplash.com/128x128/?portrait,person'}" alt="${item.nom}" class="w-32 h-32 object-cover rounded-xl shadow-md bg-gray-200" />
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-2 text-blue-900">${item.nom}</h3>
            <p class="mb-2 text-gray-700">${item.specialite ? item.specialite + ' — ' : ''}${item.nationalite || ''}</p>
            <div class="text-lg font-semibold text-indigo-700">${item.description || ''}</div>
            <div class="italic text-sm text-gray-500 mt-2">Anecdote : ${item.anecdote || ''}</div>
          </div>
        </div>
      `).join('');
    });
}

// FAQ interactive
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.parentElement.querySelector('.faq-content');
      if (content) {
        content.classList.toggle('hidden');
        this.querySelector('span').textContent = content.classList.contains('hidden') ? '⏷' : '⏶';
      }
    });
  });
});

// Carrousel avis clients
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel-avis');
  if (!carousel) return;
  const inner = document.getElementById('carousel-inner');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');
  const slides = inner.children;
  let index = 0;
  function update() {
    inner.style.transform = `translateX(-${index * 100}%)`;
  }
  prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
  // Swipe support mobile
  let startX = null;
  inner.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  inner.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) prev.click();
    if (dx < -40) next.click();
    startX = null;
  });
});

// Feedback succès réservation
document.addEventListener('DOMContentLoaded', () => {
  const resaForm = document.getElementById('resa-form');
  const resaSuccess = document.getElementById('resa-success');
  if (resaForm && resaSuccess) {
    resaForm.addEventListener('submit', e => {
      e.preventDefault();
      resaForm.reset();
      resaSuccess.classList.remove('hidden');
      setTimeout(() => resaSuccess.classList.add('hidden'), 5000);
    });
  }
});

// Feedback succès contact
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('form-contact');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactForm.reset();
      contactSuccess.classList.remove('hidden');
      setTimeout(() => contactSuccess.classList.add('hidden'), 5000);
    });
  }
});
