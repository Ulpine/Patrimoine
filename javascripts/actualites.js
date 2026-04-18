document.addEventListener('DOMContentLoaded', function() {
  // Filtrage des articles
  const searchInput = document.getElementById('search-news');
  const searchBtn = document.querySelector('.search-btn');
  const newsCards = document.querySelectorAll('.news-article');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Filtrer par catégorie (boutons)
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Retirer .active des autres
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.category;
      filterByCategory(category);
      resetSearchInput();
    });
  });

  function filterByCategory(category) {
    newsCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Filtrer par recherche
  function filterBySearch(term) {
    const searchTerm = term.toLowerCase();

    newsCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const content = card.querySelector('p').textContent.toLowerCase();
      const category = card.dataset.category.toLowerCase();

      if (
        title.includes(searchTerm) ||
        content.includes(searchTerm) ||
        category.includes(searchTerm)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        clearCategoryActive();
        filterBySearch(searchTerm);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          clearCategoryActive();
          filterBySearch(searchTerm);
        }
      }
    });
  }

  function resetSearchInput() {
    if (searchInput) searchInput.value = '';
  }

  function clearCategoryActive() {
    filterButtons.forEach(btn => btn.classList.remove('active'));
  }

  // Apparition des articles au scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  newsCards.forEach(card => observer.observe(card));

  // Formulaire newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput.value.trim();

      if (email && isValidEmail(email)) {
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Inscription en cours...';

        setTimeout(() => {
          submitBtn.textContent = 'Inscrit !';
          emailInput.value = '';
          showSuccessMessage(newsletterForm, 'Merci pour votre inscription ! Vous recevrez bientôt nos actualités financières.');

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 3000);
        }, 1000);
      } else {
        showError(emailInput, 'Veuillez entrer une adresse email valide');
      }
    });
  }

  // Formulaire de contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let isValid = true;

      if (name.value.trim() === '') {
        isValid = false;
        showError(name, 'Veuillez entrer votre nom');
      } else {
        clearError(name);
      }

      if (email.value.trim() === '') {
        isValid = false;
        showError(email, 'Veuillez entrer votre email');
      } else if (!isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Veuillez entrer un email valide');
      } else {
        clearError(email);
      }

      if (message.value.trim() === '') {
        isValid = false;
        showError(message, 'Veuillez entrer votre message');
      } else {
        clearError(message);
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        setTimeout(() => {
          submitBtn.textContent = 'Envoyé !';
          contactForm.reset();
          showSuccessMessage(contactForm, 'Votre message a bien été envoyé. Je vous recontacterai dans les plus brefs délais.');

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 3000);
        }, 1500);
      }
    });
  }
});

// Fonctions utilitaires
function showError(field, message) {
  let errorElement = field.nextElementSibling;

  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }

  errorElement.textContent = message;
  field.style.borderColor = '#e74c3c';
}

function clearError(field) {
  const errorElement = field.nextElementSibling;

  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.remove();
  }

  field.style.borderColor = '';
}

function showSuccessMessage(form, message) {
  let successMessage = form.querySelector('.success-message');

  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.color = '#27ae60';
    successMessage.style.padding = '15px';
    successMessage.style.marginTop = '15px';
    successMessage.style.backgroundColor = '#e7f9ed';
    successMessage.style.borderRadius = '5px';
    successMessage.style.textAlign = 'center';
    form.appendChild(successMessage);
  }

  successMessage.textContent = message;

  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

document.addEventListener('DOMContentLoaded', function() {
  // Animation des cartes de taux
  animateTauxCards();

  // Animation des barres du graphique d'inflation (version corrigée)
  animateInflationBarsFixed();

  // Hover effects pour les cartes et barres
  setupHoverEffects();

  // Animation au défilement
  setupScrollAnimations();
});

/**
 * Anime les cartes de taux avec un effet d'apparition décalé
 */
function animateTauxCards() {
  const cards = document.querySelectorAll('.taux-card');

  cards.forEach((card, index) => {
    // Masquer initialement
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';

    // Animer après un délai basé sur l'index
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
}

/**
 * Anime les barres du graphique d'inflation
 */
function animateInflationBarsFixed() {
  const maxValue = 10000; // référence max pour hauteur
  const containerHeight = 400;
  const maxBarHeight = containerHeight * 0.7; // 70% max hauteur

  document.querySelectorAll('.bar-element').forEach(bar => {
    const value = parseFloat(bar.getAttribute('data-value')) || 0;
    const heightPx = (value / maxValue) * maxBarHeight;

    bar.style.height = '0px';
    bar.style.transition = 'height 0.8s ease';

    setTimeout(() => {
      bar.style.height = `${heightPx}px`;
    }, 100);
  });
}

/**
 * Configure les effets au survol pour les cartes et les barres
 */
function setupHoverEffects() {
  // Pour les cartes de taux
  const tauxCards = document.querySelectorAll('.taux-card');

  tauxCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      this.style.transform = 'translateY(-8px)';

      const tauxValue = this.querySelector('.taux-value');
      if (tauxValue) {
        tauxValue.style.transform = 'scale(1.1)';
        tauxValue.style.transition = 'transform 0.3s ease';
      }
    });

    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
      this.style.transform = '';

      const tauxValue = this.querySelector('.taux-value');
      if (tauxValue) {
        tauxValue.style.transform = '';
      }
    });
  });

  // Pour les barres du graphique (on suppose que .bar-wrapper est un parent de .bar-element)
  const barWrappers = document.querySelectorAll('.bar-wrapper');

  barWrappers.forEach(wrapper => {
    wrapper.addEventListener('mouseenter', function() {
      const value = wrapper.querySelector('.bar-value');
      if (value) {
        value.style.transform = 'translateX(-50%) translateY(-5px) scale(1.1)';
        value.style.transition = 'transform 0.3s ease';
      }
    });

    wrapper.addEventListener('mouseleave', function() {
      const value = wrapper.querySelector('.bar-value');
      if (value) {
        value.style.transform = 'translateX(-50%) translateY(0) scale(1)';
      }
    });
  });
}

/**
 * Configure les animations au défilement (scroll)
 */
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  const sections = document.querySelectorAll('.taux-remuneration, .inflation-intro');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    observer.observe(section);
  });

  // Ajout des styles CSS nécessaires
  const style = document.createElement('style');
  style.innerHTML = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .taux-value.highlight {
      animation: pulse 1s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // Animation pour mettre en évidence les valeurs importantes
  setTimeout(() => {
    const lepValue = document.querySelector('.lep .taux-value');
    if (lepValue) {
      lepValue.classList.add('highlight');
    }
  }, 2000);
}
