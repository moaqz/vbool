import type { Question } from '../../src/composables/useQuestions';

interface QuizResponse {
  response_code: number;
  results: Question[];
}

it('Should display and allow interaction with quiz questions', () => {
  cy.visit('/play?category=Film');

  cy.intercept('GET', 'https://opentdb.com/api.php?*', {
    fixture: 'questions.json',
  }).as('game');

  cy.fixture<QuizResponse>('questions.json')
    .should('be.an', 'object')
    .then((response) => {
      response.results.forEach((question, index) => {
        cy.get("[data-cy='quiz-question']")
          .should('be.visible')
          .should('contain.text', question.question);

        const answerSelector =
          question.correct_answer === 'True'
            ? "[data-cy='true-button']"
            : "[data-cy='false-button']";

        cy.get(answerSelector).click();

        if (index === response.results.length - 1) {
          cy.get("[data-cy='quiz-result']").should('be.visible');
        }
      });
    });
});

it('Should restart the quiz when the restart button is clicked', () => {
  cy.visit('/play?category=Art');

  cy.intercept('GET', 'https://opentdb.com/api.php?*', {
    fixture: 'questions.json',
  }).as('game');

  cy.fixture<QuizResponse>('questions.json')
    .should('be.an', 'object')
    .then((response) => {
      const firstQuestion = response.results[0];

      cy.get("[data-cy='quiz-question']")
        .should('be.visible')
        .should('contain.text', firstQuestion.question);

      cy.get("[data-cy='true-button']").click();

      cy.get("[data-cy='quiz-question']").should(
        'not.contain.text',
        firstQuestion.question,
      );

      cy.get("[data-cy='restart-button']").click();

      cy.get("[data-cy='quiz-question']")
        .should('be.visible')
        .should('contain.text', firstQuestion.question);
    });
});

it('Should display an error message when API request fails', () => {
  cy.visit('/play?category=History');

  cy.intercept('GET', 'https://opentdb.com/api.php?*', {
    forceNetworkError: true,
  }).as('gameError');

  cy.wait('@gameError');

  cy.get("[data-cy='error-message']")
    .should('be.visible')
    .should(
      'contain.text',
      'Ooops! Something went wrong. Please try again later',
    );

  cy.get("[data-cy='back-to-menu-link']").click();
  cy.url().should('include', '/');
});
