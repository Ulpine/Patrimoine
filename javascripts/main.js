document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM entièrement chargé et analysé');

  // Initialisation AOS (Animation On Scroll) si AOS est disponible
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100
    });
  }

  // Gestion du menu hamburger
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Log pour déboguer
  console.log('Hamburger:', hamburger);
  console.log('Nav Menu:', navMenu);

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      console.log('Hamburger cliqué');
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Pour fermer le menu quand on clique sur un lien
    document.querySelectorAll('.nav-item a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  } else {
    console.error("Impossible de trouver le menu hamburger ou la navigation");
  }

// Gestion du header au scroll - VERSION AMÉLIORÉE
const header = document.querySelector('.header');
let lastScrollTop = 0;
let ticking = false;

if (header) {
  // Classe default au chargement
  header.classList.add('default');

  window.addEventListener('scroll', function() {
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function updateHeader() {
  // Transition fluide à partir de 50px de scroll
  if (lastScrollTop > 50) {
    header.classList.remove('default');
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    header.classList.add('default');
  }
}

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
        // Simulation d'envoi
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

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

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
    if (!field) return;

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

  // Défilement fluide pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Utiliser la hauteur actuelle du header pour calculer le décalage
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Animation subtile d'apparition
    const ctaContent = document.querySelector('.cta-content');

    if (ctaContent) {
      // Définition de l'observateur d'intersection
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cta-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      // Ajout des styles pour l'animation
      ctaContent.style.opacity = '0';
      ctaContent.style.transform = 'translateY(30px)';
      ctaContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      // Ajout de la classe pour l'animation
      document.head.insertAdjacentHTML('beforeend', `
        <style>
          .cta-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        </style>
      `);

      // Observer la section
      observer.observe(ctaContent);
    }

    // Scroll doux vers le formulaire de contact
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const contactForm = document.querySelector(this.getAttribute('href'));
        if (contactForm) {
          contactForm.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});

// Gestion du bouton retour avec scroll fluide
document.addEventListener('DOMContentLoaded', function() {
  const backButton = document.querySelector('.back-button');

  if (backButton) {
    backButton.addEventListener('click', function(e) {
      // Si le lien pointe vers une ancre de la même page
      const href = this.getAttribute('href');

      // Vérifier si c'est un lien externe (vers une autre page avec ancre)
      if (href.includes('#')) {
        const [page, anchor] = href.split('#');

        // Si on est déjà sur la bonne page, faire un scroll fluide
        if (window.location.pathname.includes(page.replace('.html', '')) || page === '') {
          e.preventDefault();

          // Stocker l'ancre dans sessionStorage pour la page de destination
          if (page && page !== '') {
            sessionStorage.setItem('scrollToAnchor', anchor);
            window.location.href = href;
          } else {
            // Scroll sur la même page
            const targetElement = document.getElementById(anchor);
            if (targetElement) {
              const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        }
      }
    });
  }

  // Au chargement de la page, vérifier s'il faut scroller vers une ancre
  const scrollToAnchor = sessionStorage.getItem('scrollToAnchor');
  if (scrollToAnchor) {
    sessionStorage.removeItem('scrollToAnchor');

    // Attendre que la page soit complètement chargée
    setTimeout(() => {
      const targetElement = document.getElementById(scrollToAnchor);
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});
