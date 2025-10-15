document.addEventListener('DOMContentLoaded', function() {
  // Sélectionne tous les boutons de quiz
  const quizOptions = document.querySelectorAll('.quiz-option');

  // Ajoute un écouteur d'événement à chaque bouton
  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Trouve la question parente
      const questionContainer = this.closest('.quiz-question');

      // Désactive tous les boutons de cette question
      questionContainer.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
      });

      // Vérifie si la réponse est correcte
      const isCorrect = this.getAttribute('data-correct') === 'true';

      // Ajoute la classe active au bouton cliqué
      this.classList.add('active');

      // Ajoute également la classe correcte ou incorrecte selon la réponse
      if (isCorrect) {
        this.classList.add('correct');
        // Affiche le feedback correct
        questionContainer.querySelector('.quiz-feedback-correct').classList.add('show');
        // Ajoute une légère animation au feedback
        questionContainer.querySelector('.quiz-feedback-correct').style.animation = 'fadeIn 0.5s';
      } else {
        this.classList.add('incorrect');
        // Affiche le feedback incorrect
        questionContainer.querySelector('.quiz-feedback-incorrect').classList.add('show');
        // Ajoute une légère animation au feedback
        questionContainer.querySelector('.quiz-feedback-incorrect').style.animation = 'fadeIn 0.5s';

        // Mettre en évidence la bonne réponse
        questionContainer.querySelectorAll('.quiz-option').forEach(btn => {
          if (btn.getAttribute('data-correct') === 'true') {
            btn.classList.add('correct-highlight');
          }
        });
      }
    });
  });
});
