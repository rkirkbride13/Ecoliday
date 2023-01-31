import TravelForm from './TravelForm'

describe('TravelForm', () => {

  it('has distance and no of people inputs and a submit buttom', () =>{

    cy.mount(<TravelForm/>)

    cy.get('[data-cy="distance"]')
    .invoke('attr', 'placeholder')
    .should('contain', 'Distance in km')

    cy.get('[data-cy="numPeople"]')

    cy.get('[data-cy="travelFormSubmit"')
    .invoke('attr', 'submit')
    .should('eq', 'submit')

  })

})