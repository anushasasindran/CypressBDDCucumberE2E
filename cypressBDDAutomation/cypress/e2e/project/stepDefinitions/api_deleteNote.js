import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
let notesID,invalidNoteId, headers,title,description,hasRunBefore=false,token,notesData,modifiedData

/*Before(() => {
    if(!hasRunBefore){
        cy.fixture('API/outputs/authResponse').then((authData) => {
            token = authData.token;
            headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token
            };
        cy.log(token)
    })
    hasRunBefore = true
    }
});*/


Given('I have the note ID from {string}', (fixturePath) => {
    cy.readFile(fixturePath).then((data) => {
        notesID = data[0].noteId;
    });
});

When('I send a DELETE request to edit the note', () => {
    const headers = Cypress.env('headers');

        cy.apiRequest('DELETE', `notes/api/notes/${notesID}`, {}, headers).as('deleteResponse');
    });


Then('the response code of delete note should be {int}', (statusCode) => {
    cy.get('@deleteResponse').its('status').should('eq', statusCode);
    });


And('the response of delete note should have a success value of {word}', (successValue) => {
    cy.get('@deleteResponse').its('body.success').should('eq', successValue === 'true');
});

And('the response of delete note should have a message {string}', (message) => {
    cy.get('@deleteResponse').its('body.message').should('eq', message);
    });


Given('I have note ID {string}', (noteId) => {
    invalidNoteId = noteId
});

When('I send a DELETE request to edit the note with {string}', (noteId) => {
    const headers = Cypress.env('headers');
    cy.apiRequest('GET', `notes/api/notes/${invalidNoteId}`, {}, headers).as('deleteResponse');
});

