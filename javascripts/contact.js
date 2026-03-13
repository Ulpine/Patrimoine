// Script pour rendre la FAQ dynamique
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les éléments FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  // Ajouter les écouteurs d'événements
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      // Événement au clic sur une question
      question.addEventListener('click', function() {
          // Vérifier si l'élément est déjà actif
          const isActive = item.classList.contains('active');

          // Fermer tous les autres éléments actifs
          faqItems.forEach(otherItem => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                  otherItem.classList.remove('active');
              }
          });

          // Basculer l'état de l'élément cliqué
          if (isActive) {
              item.classList.remove('active');
          } else {
              item.classList.add('active');
          }
      });
  });

  // Gestion des touches de clavier (accessibilité)
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');

      question.setAttribute('tabindex', '0'); // Rendre focusable

      question.addEventListener('keydown', function(e) {
          // Activer au clic de la touche Entrée ou Espace
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              question.click();
          }
      });
  });
});

    // Gestion du formulaire
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert('Merci pour votre message ! Nous vous recontacterons rapidement.');
      form.reset();
    } else {
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  } catch (error) {
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
});

    // Animation sur focus des inputs
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.style.borderColor = '#c0a080';
      });

      input.addEventListener('blur', function() {
        if (!this.value) {
          this.style.borderColor = '#d1d8e0';
        }
      });
    });
