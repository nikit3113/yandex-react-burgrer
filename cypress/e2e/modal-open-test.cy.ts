describe('main app spec', () => {
  before(function () {
    cy.visit('http://localhost:3113')
  });


  it('should add and subtract products count', function () {
    cy.get('[class*=burger-ingredients_link]').as('ingredients');


    cy.get('@ingredients').contains('Краторная булка N-200i').click()
    cy.get("[class*=ingredient-details_root]").contains("Краторная булка N-200i").should("exist");

    cy.get("[class*=modal_closeButton]").click()

    cy.get('@ingredients').contains('Биокотлета из марсианской Магнолии').click();
    cy.get("[class*=ingredient-details_root]").contains("Биокотлета из марсианской Магнолии").should("exist");

    cy.get("[class*=modal_closeButton]").click()

    cy.get('@ingredients') .contains('Соус фирменный Space Sauce').click()
    cy.get("[class*=ingredient-details_root]").contains("Соус фирменный Space Sauce").should("exist");


  });
})

