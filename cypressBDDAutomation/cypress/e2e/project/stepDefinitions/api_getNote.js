import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
let notesData, responseData,invalidNoteId, headers, token,hasRunBefore = false;

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

Given('I have the note data from {string}', (fixturePath) => {
    cy.readFile(fixturePath).then((data) => {
        notesData = data;
    });
});

When('I send a GET request for each note and assert the response', () => {
    const headers = Cypress.env('headers');
    cy.log(headers)
    notesData.forEach(note => {
        cy.apiRequest('GET', `notes/api/notes/${note.noteId}`, {}, headers).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true);
            expect(response.body.message).to.eq("Note successfully retrieved");
            const retrievedNote = notesData.find(n => n.noteId === response.body.data.id);
            expect(retrievedNote.title).to.eq(response.body.data.title);
            expect(retrievedNote.category).to.eq(response.body.data.category);
            expect(retrievedNote.description).to.eq(response.body.data.description);
    });
})
});

Then('the response code of get note should be {int}', (statusCode) => {
    cy.get('@getResponse').its('status').should('eq', statusCode);
    });


And('the response of get note should have a success value of {word}', (successValue) => {
    cy.get('@getResponse').its('body.success').should('eq', successValue === 'true');
});

And('the response of get note should have a message {string}', (message) => {
    cy.get('@getResponse').its('body.message').should('eq', message);
    });

And("the response should match the data in note response json",() => {
    cy.get('@getResponse').should((response) => {
        const retrievedNote = notesData.find(note => note.noteId === response.body.data.id);
    
        expect(retrievedNote.title).to.equal(response.body.data.title);
        expect(retrievedNote.category).to.equal(response.body.data.category);
        expect(retrievedNote.description).to.equal(response.body.data.description);
        
    });
    })
Given('I have a note ID {string}', (noteId) => {
    invalidNoteId = noteId
});

When('I send a GET request for note with ID {string}', (noteId) => {
    const headers = Cypress.env('headers');
    cy.apiRequest('GET', `notes/api/notes/${invalidNoteId}`, {}, headers).as('getResponse');
});

