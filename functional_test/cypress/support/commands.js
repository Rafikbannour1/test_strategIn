
import 'cypress-iframe';

    Cypress.Commands.add('getIframeBody', (object) => { 
    
    return cy.get(object).its('0.contentDocument').its('body').then(cy.wrap);
    
    });

    Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
        return new Cypress.Promise(resolve => {
            $iframe.on('load', () => {
                resolve($iframe.contents().find('body'));
            });
        });
    });

