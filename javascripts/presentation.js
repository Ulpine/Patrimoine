document.addEventListener('DOMContentLoaded', function() {
  // Menu hamburger pour responsive (repris du JS principal)
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
  }

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-item a').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });

  // Gestion du header au scroll
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
          header.style.background = '#ffffff';
      } else {
          header.style.boxShadow = 'none';
          header.style.background = '#ffffff';
      }

      lastScrollTop = scrollTop;
  });

  // Animation pour la timeline - apparition progressive des éléments
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('in-view');
    }, 300 * (index + 1));
  });

  // Animation pour les cartes d'expertise - apparition progressive
  const expertiseCards = document.querySelectorAll('.expertise-card');
  expertiseCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('in-view');
    }, 200 * (index + 1));
  });

  // Animation pour la section à propos et certifications
  setTimeout(() => {
    document.querySelector('.about-content')?.classList.add('in-view');
    document.querySelector('.certifications-content')?.classList.add('in-view');
  }, 300);

  // Formulaire de contact avec validation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // Validation simple
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          let isValid = true;

          if (name.trim() === '') {
              isValid = false;
              showError('name', 'Veuillez entrer votre nom');
          } else {
              clearError('name');
          }

          if (email.trim() === '') {
              isValid = false;
              showError('email', 'Veuillez entrer votre email');
          } else if (!isValidEmail(email)) {
              isValid = false;
              showError('email', 'Veuillez entrer un email valide');
          } else {
              clearError('email');
          }

          if (message.trim() === '') {
              isValid = false;
              showError('message', 'Veuillez entrer votre message');
          } else {
              clearError('message');
          }

          if (isValid) {
              // Simulation d'envoi de formulaire
              const submitBtn = contactForm.querySelector('button[type="submit"]');
              const originalText = submitBtn.textContent;

              submitBtn.disabled = true;
              submitBtn.textContent = 'Envoi en cours...';

              setTimeout(() => {
                  submitBtn.textContent = 'Envoyé !';
                  contactForm.reset();

                  // Message de succès
                  const successMessage = document.createElement('div');
                  successMessage.className = 'success-message';
                  successMessage.textContent = 'Votre message a bien été envoyé. Je vous recontacterai dans les plus brefs délais.';
                  successMessage.style.color = '#27ae60';
                  successMessage.style.padding = '15px';
                  successMessage.style.marginTop = '15px';
                  successMessage.style.backgroundColor = '#e7f9ed';
                  successMessage.style.borderRadius = '5px';
                  successMessage.style.textAlign = 'center';
                  contactForm.appendChild(successMessage);

                  setTimeout(() => {
                      successMessage.remove();
                      submitBtn.disabled = false;
                      submitBtn.textContent = originalText;
                  }, 3000);
              }, 1500);
          }
      });
  }

  // Observer pour l'animation au scroll
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  // Observer les sections
  document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
  });
});

// Fonctions utilitaires
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
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

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = field.nextElementSibling;

  if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
  }

  field.style.borderColor = '';
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
