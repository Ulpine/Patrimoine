/**
 * Script pour la page "À propos" - Léo TREMOUREUX
 *
 * Ce script gère :
 * - Les animations d'apparition au défilement
 * - La validation du formulaire de contact
 * - Les interactions utilisateur
 */

document.addEventListener('DOMContentLoaded', () => {
  // ====== ANIMATIONS AU DÉFILEMENT ======

  // Configuration de l'observateur d'intersection
  const observerOptions = {
    root: null,       // Utilise la fenêtre comme conteneur
    rootMargin: '0px', // Pas de marge autour de la zone d'observation
    threshold: 0.15    // Déclenche quand 15% de l'élément est visible
  };

  // Créer un observateur pour les animations générales
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ajouter la classe pour déclencher l'animation
        entry.target.classList.add('in-view');
        // Arrêter d'observer une fois l'animation déclenchée
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer tous les éléments à animer
  document.querySelectorAll('.about-content, .expertise-card, .certifications-content').forEach(element => {
    animationObserver.observe(element);
  });

  // Animation séquentielle pour la section méthode
  const methodSteps = document.querySelectorAll('.method-step');
  const methodObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      methodSteps.forEach((step, index) => {
        // Ajouter un délai progressif pour chaque étape
        setTimeout(() => {
          step.classList.add('show');
        }, 200 * index);
      });
      methodObserver.unobserve(entries[0].target);
    }
  }, observerOptions);

  // Observer la section méthode
  const methodSection = document.querySelector('.method');
  if (methodSection) {
    methodObserver.observe(methodSection);
  }

  // Animation séquentielle pour les engagements
  const commitmentItems = document.querySelectorAll('.commitment-item');
  const commitmentsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      commitmentItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, 200 * index);
      });
      commitmentsObserver.unobserve(entries[0].target);
    }
  }, observerOptions);

  // Observer la section engagements
  const commitmentsSection = document.querySelector('.commitments');
  if (commitmentsSection) {
    commitmentsObserver.observe(commitmentsSection);
  }

  // ====== VALIDATION DU FORMULAIRE ======

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Récupération des valeurs
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;

      // Vérification des champs obligatoires
      let isValid = true;

      // Validations individuelles
      isValid = validateField('name', name, 'Veuillez entrer votre nom') && isValid;
      isValid = validateEmail('email', email) && isValid;

      // Le téléphone est optionnel, donc on le valide seulement s'il est rempli
      if (phone.trim() !== '') {
        isValid = validatePhone('phone', phone) && isValid;
      }

      isValid = validateField('message', message, 'Veuillez entrer votre message') && isValid;

      // Si tout est valide, on traite le formulaire
      if (isValid) {
        submitForm(contactForm);
      }
    });
  }

  /**
   * Valide un champ générique
   * @param {string} fieldId - ID du champ
   * @param {string} value - Valeur à valider
   * @param {string} errorMessage - Message d'erreur à afficher
   * @returns {boolean} - Validité du champ
   */
  function validateField(fieldId, value, errorMessage) {
    if (!value || value.trim() === '') {
      showError(fieldId, errorMessage);
      return false;
    }
    clearError(fieldId);
    return true;
  }

  /**
   * Valide un email
   * @param {string} fieldId - ID du champ email
   * @param {string} email - Email à valider
   * @returns {boolean} - Validité de l'email
   */
  function validateEmail(fieldId, email) {
    if (!email || email.trim() === '') {
      showError(fieldId, 'Veuillez entrer votre email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError(fieldId, 'Veuillez entrer un email valide');
      return false;
    }

    clearError(fieldId);
    return true;
  }

  /**
   * Valide un numéro de téléphone
   * @param {string} fieldId - ID du champ téléphone
   * @param {string} phone - Numéro à valider
   * @returns {boolean} - Validité du numéro
   */
  function validatePhone(fieldId, phone) {
    // Accepte les formats: +33612345678, 0612345678, 06 12 34 56 78, etc.
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

    if (!phoneRegex.test(phone)) {
      showError(fieldId, 'Veuillez entrer un numéro de téléphone valide');
      return false;
    }

    clearError(fieldId);
    return true;
  }

  /**
   * Affiche un message d'erreur pour un champ
   * @param {string} fieldId - ID du champ
   * @param {string} message - Message d'erreur
   */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    let errorElement = field.nextElementSibling;

    // Créer le message d'erreur s'il n'existe pas déjà
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = '#e74c3c';
      errorElement.style.fontSize = '0.85rem';
      errorElement.style.marginTop = '5px';
      errorElement.style.transition = 'opacity 0.3s ease';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    // Ajouter le message et mettre en évidence le champ
    errorElement.textContent = message;
    errorElement.style.opacity = '1';
    field.style.borderColor = '#e74c3c';

    // Ajouter un léger effet de secousse
    field.classList.add('shake');
    setTimeout(() => {
      field.classList.remove('shake');
    }, 500);
  }

  /**
   * Efface un message d'erreur
   * @param {string} fieldId - ID du champ
   */
  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorElement = field.nextElementSibling;

    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        errorElement.remove();
      }, 300);
    }

    field.style.borderColor = '';
  }

  /**
   * Simule l'envoi du formulaire
   * @param {HTMLFormElement} form - Le formulaire à soumettre
   */
  function submitForm(form) {
    // Récupérer le bouton de soumission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Désactiver le bouton et afficher l'état d'envoi
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.classList.add('sending');

    // Simuler l'envoi avec un délai (remplacer par l'appel API réel)
    setTimeout(() => {
      // Afficher le message de succès
      submitBtn.textContent = 'Envoyé !';
      submitBtn.classList.remove('sending');
      submitBtn.classList.add('sent');
      form.reset();

      // Créer et afficher le message de confirmation
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Votre message a bien été envoyé. Je vous recontacterai dans les plus brefs délais.';
      successMessage.style.color = '#27ae60';
      successMessage.style.padding = '15px';
      successMessage.style.marginTop = '20px';
      successMessage.style.backgroundColor = '#e7f9ed';
      successMessage.style.borderRadius = '5px';
      successMessage.style.textAlign = 'center';
      successMessage.style.opacity = '0';
      successMessage.style.transition = 'opacity 0.4s ease';

      form.appendChild(successMessage);

      // Animer l'apparition du message
      setTimeout(() => {
        successMessage.style.opacity = '1';
      }, 10);

      // Restaurer le bouton après un délai
      setTimeout(() => {
        successMessage.style.opacity = '0';

        setTimeout(() => {
          successMessage.remove();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('sent');
        }, 400);
      }, 3000);
    }, 1500);
  }

  // ====== INTERACTION AVEC LES IMAGES ======

  // Ajouter un effet de zoom subtil sur la photo de profil
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    profileImage.addEventListener('mouseover', () => {
      profileImage.style.transition = 'transform 0.5s ease';
      profileImage.style.transform = 'scale(1.03)';
    });

    profileImage.addEventListener('mouseout', () => {
      profileImage.style.transform = 'scale(1)';
    });
  }

  // ====== AMÉLIORATION DE L'ACCESSIBILITÉ ======

  // Ajouter des attributs ARIA pour améliorer l'accessibilité
  document.querySelectorAll('.values-card, .expertise-card, .commitment-item').forEach(card => {
    card.setAttribute('tabindex', '0');
  });

  // Ajouter la classe 'shake' pour l'animation de secousse
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .shake {
      animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }
    .sending {
      position: relative;
    }
    .sending:after {
      content: "";
      position: absolute;
      right: 10px;
      top: 50%;
      width: 15px;
      height: 15px;
      margin-top: -7px;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
