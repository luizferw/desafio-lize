describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should render App properly', () => {
    cy.get('[data-test="addPostButton"]').should('be.visible')
    cy.get('#input-1').should('have.value', '')
    cy.get('[data-test="post"]').should('have.length', 1)
  })

  it('should be able to find a post by title', () => {
    cy.get('#input-1').type('search')
    cy.get('[data-test="post"]').should('have.length', 0)
    cy.get('#input-1').clear().type('title')
    cy.get('[data-test="post"]').should('have.length', 1)
  })

  it('should be able to delete a post', () => {
    cy.get('[data-test="deletePostButton"]').click()
    cy.get('[data-test="post"]').should('have.length', 0)
  })

  it('should be able to add a new post', () => {
    cy.get('[data-test="addPostButton"]').click()
    cy.get('.text-h5').should('contain', 'Add Post')
    cy.get('#input-5').type('New Post')
    cy.get('#input-10').type('Description')
    cy.get('#input-7').invoke('val', 'https://media-cloud-ohp.s3-accelerate.amazonaws.com/2020/03/Placeholder-Image-250x250.jpg').trigger('input')
    cy.contains('Save').click()
    cy.get('[data-test="post"]').should('have.length', 2)
  })

  it('should be able to edit a post', () => {
    cy.get('[data-test="editPostButton"]').click()
    cy.get('.text-h5').should('contain', 'Edit Post')
    cy.get('#input-5').type(' edit')
    cy.get('#input-10').type(' edit')
    cy.get('#input-7').clear().invoke('val', 'https://media-cloud-ohp.s3-accelerate.amazonaws.com/2020/03/Placeholder-Image-250x250.jpg').trigger('input')
    cy.contains('Save').click()
    cy.get('[data-test="post"]').should('have.length', 1)
  })
})
