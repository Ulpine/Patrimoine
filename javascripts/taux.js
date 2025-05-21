document.addEventListener('DOMContentLoaded', function() {
  // Animation des cartes de taux
  animateTauxCards();

  // Animation des barres du graphique d'inflation
  animateInflationBars();

  // Hover effects pour les cartes
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
* Anime les barres du graphique d'inflation avec un effet de croissance
*/
function animateInflationBars() {
  const bars = document.querySelectorAll('.bar');
  const barWrappers = document.querySelectorAll('.bar-wrapper');

  // S'assurer que les barres ont une hauteur réelle
  bars.forEach(bar => {
      // Stocker la hauteur cible
      const targetHeight = bar.style.height;
      // Commencer à zéro
      bar.style.height = '0%';

      // Animation après un court délai
      setTimeout(() => {
          bar.style.height = targetHeight;
      }, 300);
  });

  // Ajouter l'effet d'animation au survol
  barWrappers.forEach(wrapper => {
      wrapper.addEventListener('mouseenter', function() {
          const value = wrapper.querySelector('.bar-value');
          if (value) {
              value.style.transform = 'translateY(-5px) scale(1.1)';
              value.style.transition = 'transform 0.3s ease';
          }
      });

      wrapper.addEventListener('mouseleave', function() {
          const value = wrapper.querySelector('.bar-value');
          if (value) {
              value.style.transform = 'translateY(0) scale(1)';
          }
      });
  });
}

/**
* Configure les effets au survol pour les cartes
*/
function setupHoverEffects() {
  // Pour les cartes de taux
  const tauxCards = document.querySelectorAll('.taux-card');

  tauxCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          // Mettre en évidence la carte survolée
          this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
          this.style.transform = 'translateY(-8px)';

          // Effet sur la valeur du taux
          const tauxValue = this.querySelector('.taux-value');
          if (tauxValue) {
              tauxValue.style.transform = 'scale(1.1)';
              tauxValue.style.transition = 'transform 0.3s ease';
          }
      });

      card.addEventListener('mouseleave', function() {
          // Restaurer l'état normal
          this.style.boxShadow = '';
          this.style.transform = '';

          const tauxValue = this.querySelector('.taux-value');
          if (tauxValue) {
              tauxValue.style.transform = '';
          }
      });
  });

  // Pour les cartes de comparaison
  const comparisonItems = document.querySelectorAll('.comparison-item');

  comparisonItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px) scale(1.03)';
          this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';

          const value = this.querySelector('.comparison-value');
          if (value) {
              value.style.transform = 'scale(1.1)';
              value.style.transition = 'transform 0.3s ease';
          }
      });

      item.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.style.boxShadow = '';

          const value = this.querySelector('.comparison-value');
          if (value) {
              value.style.transform = '';
          }
      });
  });
}

/**
* Configure les animations au défilement
*/
function setupScrollAnimations() {
  // Observer pour les animations au scroll
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.2
  });

  // Observer les sections
  const sections = document.querySelectorAll('.taux-remuneration, .inflation-intro');
  sections.forEach(section => {
      // Préparer les sections pour l'animation
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      observer.observe(section);
  });

  // Ajouter une classe au CSS pour compléter l'animation
  document.head.insertAdjacentHTML('beforeend', `
      <style>
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
      </style>
  `);

  // Animation pour mettre en évidence les valeurs importantes
  setTimeout(() => {
      const lepValue = document.querySelector('.lep .taux-value');
      if (lepValue) {
          lepValue.classList.add('highlight');
      }
  }, 2000);
}

/**
* Fonction pour afficher les tooltips sur les barres du graphique
*/
function setupBarTooltips() {
  const bars = document.querySelectorAll('.bar');

  bars.forEach(bar => {
      const tooltip = document.createElement('div');
      tooltip.className = 'bar-tooltip';
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px 10px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '0.8rem';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';

      if (bar.classList.contains('initial')) {
          tooltip.textContent = 'Pouvoir d\'achat initial';
      } else if (bar.classList.contains('account')) {
          tooltip.textContent = 'Perte due à l\'inflation non compensée';
      } else if (bar.classList.contains('livret')) {
          tooltip.textContent = 'Protection partielle grâce aux intérêts';
      }

      bar.parentNode.appendChild(tooltip);

      bar.addEventListener('mouseenter', function() {
          tooltip.style.opacity = '1';
          tooltip.style.top = '-30px';
          tooltip.style.left = '50%';
          tooltip.style.transform = 'translateX(-50%)';
      });

      bar.addEventListener('mouseleave', function() {
          tooltip.style.opacity = '0';
      });
  });
}

// Exécuter les tooltips après le chargement
window.addEventListener('load', setupBarTooltips);

/**
* Change les couleurs du thème selon les préférences système
*/
function setupDarkModeDetection() {
  // Vérifier les préférences de l'utilisateur
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function updateTheme(darkMode) {
      // Variables CSS à ajuster si nécessaire pour le mode sombre
      if (darkMode) {
          document.documentElement.style.setProperty('--light-bg', '#1a1a1a');
          document.documentElement.style.setProperty('--white', '#2d2d2d');
          document.documentElement.style.setProperty('--body-text', '#e0e0e0');
          document.documentElement.style.setProperty('--light-text', '#b0b0b0');
          document.documentElement.style.setProperty('--border-color', '#444');
      } else {
          // Réinitialiser aux valeurs par défaut
          document.documentElement.style.setProperty('--light-bg', '');
          document.documentElement.style.setProperty('--white', '');
          document.documentElement.style.setProperty('--body-text', '');
          document.documentElement.style.setProperty('--light-text', '');
          document.documentElement.style.setProperty('--border-color', '');
      }
  }

  // Appliquer le thème initial
  updateTheme(prefersDarkScheme.matches);

  // Écouter les changements de préférence
  prefersDarkScheme.addEventListener('change', (e) => {
      updateTheme(e.matches);
  });
}
