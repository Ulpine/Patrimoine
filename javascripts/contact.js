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

  // Fonction pour ouvrir aléatoirement une question au chargement (optionnel)
  function openRandomQuestion() {
      // Décider si on ouvre une question (50% de chance)
      if (Math.random() > 0.5) {
          // Choisir une question aléatoire
          const randomIndex = Math.floor(Math.random() * faqItems.length);
          faqItems[randomIndex].classList.add('active');
      }
  }

  // Appliquer l'effet d'ouverture aléatoire après un court délai
  setTimeout(openRandomQuestion, 1000);

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
