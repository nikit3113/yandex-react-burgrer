import "@4tw/cypress-drag-drop";
import {wait} from "@testing-library/user-event/dist/utils";

describe('main app spec', () => {
  before(function () {
    cy.visit('http://localhost:3113')
  });

  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    // Устанавливаем токены:
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should add and subtract products count', function() {
    cy.get('[class*=constructor_drop_down]').as('constructorDropDown');
    cy.get('[class*=burger-ingredients_link]').as('ingredients');
    cy.contains('Оформить заказ').as('orderButton')

    cy.get('@ingredients')
      .contains('Краторная булка N-200i')
      .trigger('dragstart');
    cy.get('@constructorDropDown').trigger('drop');

    cy.get("@ingredients")
      .contains("Биокотлета из марсианской Магнолии")
      .drag("@constructorDropDown");

    cy.get("@ingredients")
      .contains("Соус фирменный Space Sauce")
      .drag("@constructorDropDown");

    cy.get('@orderButton').click();
    cy.wait(500); // Всё тут правильно!!! см. комментарий на GITHUB
    cy.get('@orderButton').click();

    cy.get("[class*=order-details_root]").contains("123").should("exist");

  });
})

