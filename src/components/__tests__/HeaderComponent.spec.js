import { mount } from '@cypress/vue'
import HeaderComponent from '../HeaderComponent.vue'

describe('Header Component', () => {
    it('renders properly', () => {
        mount(HeaderComponent, { props: { title: 'Weather App' } })
        cy.get('h1').should('contain', 'Weather App')
    })
})
