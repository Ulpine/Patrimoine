document.addEventListener('DOMContentLoaded', function () {
  // Menu hamburger
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Fermer le menu sur clic d'un lien
  document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

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
