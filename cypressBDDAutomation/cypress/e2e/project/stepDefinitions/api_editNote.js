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


Given('I have the note ID to edit from {string}', (fixturePath) => {
    cy.readFile(fixturePath).then((data) => {
        notesID = data[0].noteId;
        title = data[0].title;
        description = data[0].description
        notesData = data
    });
});

When('I send a PUT request to edit the note', () => {
    const headers = Cypress.env('headers');
     modifiedData ={
        title : title + 'Edited',
        description : description + 'Edited',
        category : 'Work',
        completed : true
    }

        cy.apiRequest('PUT', `notes/api/notes/${notesID}`, modifiedData, headers).as('editResponse');
    });


Then('the response code of edit note should be {int}', (statusCode) => {
    cy.get('@editResponse').its('status').should('eq', statusCode);
    });


And('the response of edit note should have a success value of {word}', (successValue) => {
    cy.get('@editResponse').its('body.success').should('eq', successValue === 'true');
});

And('the response of edit note should have a message {string}', (message) => {
    cy.get('@editResponse').its('body.message').should('eq', message);
    });

And("the response should have edited note details",() => {
    cy.get('@editResponse').should((response) => {
        expect(modifiedData.title).to.equal(response.body.data.title);
        expect(modifiedData.category).to.equal(response.body.data.category);
        expect(modifiedData.description).to.equal(response.body.data.description);
        
    });
    })
Given('I have note ID to edit {string}', (noteId) => {
    invalidNoteId = noteId
});

When('I send a PUT request to edit the note with {string}', (noteId) => {
    const headers = Cypress.env('headers');
    cy.apiRequest('GET', `notes/api/notes/${invalidNoteId}`, {}, headers).as('editResponse');
});

