document.addEventListener('DOMContentLoaded', function() {
  // Initialisation AOS (Animation On Scroll)
  AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
      offset: 100
  });

  // Menu hamburger pour responsive
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

  // Défilement fluide pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('.header').offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const questionMessage = document.getElementById('question-message');
  const responseMessage = document.getElementById('response-message');

  // Subtle hover effect for messages
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => {
    message.addEventListener('mouseenter', () => {
      message.style.transform = 'translateY(-5px)';
      message.style.boxShadow = message.classList.contains('message-question')
        ? '0 15px 35px rgba(0, 0, 0, 0.1)'
        : '0 15px 35px rgba(52, 152, 219, 0.3)';
    });

    message.addEventListener('mouseleave', () => {
      message.style.transform = 'translateY(0)';
      message.style.boxShadow = message.classList.contains('message-question')
        ? '0 10px 30px rgba(0, 0, 0, 0.05)'
        : '0 10px 30px rgba(52, 152, 219, 0.2)';
    });
  });

  // Show messages with staggered timing
  setTimeout(() => {
    questionMessage.classList.add('message-visible');

    setTimeout(() => {
      responseMessage.classList.add('message-visible');
    }, 700);
  }, 300);

  // Optional: Parallax effect on mouse move
  document.addEventListener('mousemove', e => {
    const container = document.querySelector('.consultation-container');
    const avatar = document.querySelector('.avatar-wrapper');

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const moveX = (mouseX - centerX) / 30;
    const moveY = (mouseY - centerY) / 30;

    avatar.style.transform = `translate(${moveX}px, ${moveY}px)`;

    messages.forEach((message, index) => {
      const factor = index === 0 ? -0.5 : -0.3;
      message.style.transform = `translateY(0) translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });

  // Reset transforms when mouse leaves
  document.querySelector('.consultation-container').addEventListener('mouseleave', () => {
    document.querySelector('.avatar-wrapper').style.transform = 'translate(0, 0)';
    messages.forEach(message => {
      message.style.transform = 'translateY(0)';
    });
  });
});
