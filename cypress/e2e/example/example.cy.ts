describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:5173', function () {
    cy.visit('http://localhost:4000');
  });
});
