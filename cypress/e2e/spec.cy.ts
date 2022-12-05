describe('test spec', () => {
  it('Visit the Stellar Burger', () => {
    cy.visit('http://localhost:3113')
    cy.get('.text_type_main-large')
    cy.contains('Собери бургер')
    cy.contains('Соусы')
    cy.contains('Лента заказов').click()
    cy.contains('Конструктор')
  })
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
