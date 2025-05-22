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
