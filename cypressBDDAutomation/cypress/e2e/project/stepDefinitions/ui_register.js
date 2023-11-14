import loginPage from '../../POM/loginPage';
const loginPageLocator = new loginPage();
let userId;
import { Given, When, Then, Before } from "cypress-cucumber-preprocessor/steps";
import { generateUniqueEmail } from "../../../support/utils";


Given('I visit the URL {string}', (url) => {
    cy.visit(url);
});

When('I generate a unique email to register', () => {
    const uniqueEmail = generateUniqueEmail();
    cy.wrap(uniqueEmail).as('uniqueEmail');
});

When('I click on "Create an account"', () => {
    loginPageLocator.clickCreateAccountButton();
});

When('I fill the registration form with:', (dataTable) => {
    cy.intercept('POST', '/notes/api/users/register').as('register')
    const data = dataTable.hashes()[0];

    // Use the unique email from the previous step
    cy.get('@uniqueEmail').then(uniqueEmail => {
        data.email = uniqueEmail;
        cy.log(data.email, data.password, data.name, data.confirmPassword)
        cy.register(data.email, data.password, data.name, data.confirmPassword);
        cy.wait('@register').then((interception) => {
            const response = interception.response.body;
            expect(interception.response.statusCode).to.equal(201);
            expect(response.success).to.equal(true)
            expect(response.message).to.equal("User account created successfully")
            expect(response.status).to.equal(201)
            expect(response.data).to.have.property("id")
             userId = response.data.id
             cy.log(userId);
            Cypress.env('USERID',userId)
       
        cy.writeFile('cypress/fixtures/UI/outputs/registerDetails.json', {
            email : uniqueEmail,
            password : data.password,
            name : data.name,
            userID : userId
        })
    })
    });
});

Then('I should see the registration success message and correct URL', () => {
    loginPageLocator.checkMessageAndURL();
});
