describe('Модалка ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
  });
  it('тест открытия модалки ингредиента и закрытия на кнопку', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-1"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('тест открытия модалки ингредиента и закрытия на оверлей', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-2"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('body').click(20, 150);

    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
describe('добавление игредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('http://localhost:4000');
  });
  it('добавление одного ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="constructor"]')
      .children()
      .first()
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Выберите начинку');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(2)
      .should('contain', 'Краторная булка N-200i');
  });
  it('добавление двух ингредиентов', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="ingredient-2"]').find('button').click();
    cy.get('[data-cy="constructor"]')
      .children()
      .first()
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(2)
      .should('contain', 'Краторная булка N-200i');
  });
  it('добавление трех ингредиентов', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="ingredient-2"]').find('button').click();
    cy.get('[data-cy="ingredient-5"]').find('button').click();
    cy.get('[data-cy="constructor"]')
      .children()
      .first()
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Соус фирменный Space Sauce');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(2)
      .should('contain', 'Краторная булка N-200i');
  });
});
describe('создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.setCookie('accessToken', 'testAccessToken');
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.visit('http://localhost:4000');
  });
  afterEach(() => {
    cy.clearCookie('accessToken');

    cy.clearAllLocalStorage();
  });
  it('модалка заказа', () => {
    cy.wait('@getIngredients');
    cy.wait('@getUser');
    cy.get('[data-cy="ingredient-1"]').find('button').click();
    cy.get('[data-cy="ingredient-2"]').find('button').click();
    cy.get('[data-cy="constructor"]')
      .children()
      .first()
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(2)
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor"]').children().last().find('button').click();
    cy.wait('@postOrder');
    cy.get('[data-cy="modal"]').should('contain', '12345');
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor"]')
      .children()
      .first()
      .should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(1)
      .should('contain', 'Выберите начинку');
    cy.get('[data-cy="constructor"]')
      .children()
      .eq(2)
      .should('contain', 'Выберите булки');
  });
});
