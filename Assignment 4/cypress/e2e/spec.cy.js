describe('check if the protected route works (projects)', () => {
  it('redirects the user to login when no authenticated', () => {
    cy.visit('/projects');
    cy.url().should('include', '/login');
  })
});

describe('login works', () => {
  it('logs the user in', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('pmoreau@gmail.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
  })
});

describe('logout works', () => {
  it('logs the user out', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('pmoreau@gmail.com');
    cy.get('[name="password"]').type('Password123{enter}');
    cy.get('#root button').click();
    cy.get('#root div.login a').click();

    cy.window().then((win) => {
      expect(win.localStorage.getItem('email')).to.be.null;
      expect(win.localStorage.getItem('username')).to.be.null;
    })
  })
});