import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
import notesPage from '../../POM/notesPage';
import loginPage from '../../POM/loginPage';

let notesPageLocator = new notesPage();
let loginPageLocator = new loginPage();
let noteId

Before({tags:"@write-notes-to-JSON"},() => {
    cy.writeFile('cypress/fixtures/UI/outputs/noteDetails.json','[]')
})

Given('I have navigated to Notes page',() => {
    loginPageLocator.veriyHomePage();
})

When('I add a note with title {string} and description {string} in category {string}', (title, description, category) => {
cy.intercept('POST', '/notes/api/notes/').as('addNote') 
  cy.log(title,description,category);
  notesPageLocator.clickAddNote();
  notesPageLocator.addNoteWithDetails(category, title, description);
  cy.wait('@addNote').then((interception) => {
    const response = interception.response.body;
    expect(interception.response.statusCode).to.equal(200);
    expect(response.success).to.equal(true)
    expect(response.message).to.equal("Note successfully created")
    expect(response.status).to.equal(200)
    expect(response.data).to.have.property('id')
     noteId = response.data.id
    expect(response.data.title).to.equal(title);
    expect(response.data.category).to.equal(category);
    expect(response.data.description).to.equal(description);
  })
    cy.appendToJSONFile('cypress/fixtures/UI/outputs/noteDetails.json',{
        category:category,
        title : title,
        description:description,
        noteId:noteId
     
  });
});

Then('I should be able to view the note with title {string} and description {string} in category {string}', (title, description, category) => {
 
});
