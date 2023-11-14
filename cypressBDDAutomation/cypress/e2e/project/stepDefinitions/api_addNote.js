import { Given, When, Then,Before, BeforeAll} from "cypress-cucumber-preprocessor/steps";
let headers, token, userId, responseData, hasRunBefore = false

Before({tags:"@write-output-to-JSON"},() => {
    cy.writeFile('cypress/fixtures/API/outputs/notesResponse.json','[]')
})

Before(() => {
    if (!Cypress.env('token')) {
        cy.fixture('API/outputs/authResponse').then((authData) => {
            const token = authData.token;
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token
            };
            Cypress.env('headers', headers);
        });
    }
});

Given('I get the token and userId from {string}', (fixturePath) => {
    cy.fixture(fixturePath).then((authData) => {
        token = authData.token;
        userId = authData.id;
        headers = {
            'Content-Type': 'application/json',
            'x-auth-token': token
        };
        cy.log(token, userId)
    });
});

When('I add a note with title {string},category {string} and description {string}', (title, category, description) => {
    const noteData = {
        id : userId,
        title : title,
        category : category,
        description : description
    }
    cy.log(noteData)
    const headers = Cypress.env('headers');
    cy.log(headers)
   
    cy.apiRequest('POST', 'notes/api/notes', noteData, headers).as('noteResponse');
});

Then('the response code should be {int}', (statusCode) => {
    cy.get('@noteResponse').should((response) => {
        responseData = response.body;
        expect(response.status).to.equal(statusCode);
    });
});

Then('the response should have a success value of {word}', (success) => {
    cy.get('@noteResponse').its('body.success').should('eq', success === 'true');
});

Then('the response should have a message {string}', (message) => {
    cy.get('@noteResponse').its('body.message').should('eq', message);
});

Then('the response should contain a note id', () => {
    cy.get('@noteResponse').its('body.data').should('have.property', 'id');
    
});

Then('I save the note response to {string}', (filePath) => {
    const outputData = {
        noteId: responseData.data.id,
        title: responseData.data.title,
        category: responseData.data.category,
        description: responseData.data.description,
        userId: responseData.data.user_id
    };
    cy.log(outputData)

    cy.appendToJSONFile(filePath, outputData);
});
