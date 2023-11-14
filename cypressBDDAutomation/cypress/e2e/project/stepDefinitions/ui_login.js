import loginPage from '../../POM/loginPage';
const loginPageLocator = new loginPage();
import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";

Given('I visit the URL {string}', (url) => {
    cy.visit(url);
});

When('I click on "Click here to Login"', () => {
    loginPageLocator.clickLogin();
});

Then("I fill the email and password from {string} and click on submit button",(fixturePath)=> {
    cy.intercept('POST', '/notes/api/users/login').as('login')  
    cy.intercept('GET', '/notes/api/notes').as('notes')
   cy.fixture(fixturePath).then((data) => {
    const email = data.email
    const password = data.password
    cy.login(email,password)
   })
   cy.wait('@login').then((interception) => {
    const response = interception.response.body;
    expect(interception.response.statusCode).to.equal(200);
    expect(response.success).to.equal(true)
    expect(response.message).to.equal("Login successful")
    expect(response.status).to.equal(200)
    expect(response.data).to.have.property('token')
    const token = response.data.token
    Cypress.env('TOKEN',token)
})
cy.wait('@notes').then((interception) => {
    if(interception.response.statusCode === 304){
    cy.log("No notes are added yet")
    const response = interception.response.body;
    expect(interception.response.statusCode).to.equal(304);
    expect(response.success).to.equal(true)
    expect(response.message).to.equal("No notes found")
    expect(response.status).to.equal(200)

    }
    if(interception.response.statusCode === 200){
    
        const response = interception.response.body;
        expect(interception.response.statusCode).to.equal(200);
        expect(response.success).to.equal(true)
        expect(response.message).to.equal("No notes found")
        expect(response.status).to.equal(200)
      
    }
})
})

And('I should see the My notes page', () => {
    loginPageLocator.veriyHomePage();
});
