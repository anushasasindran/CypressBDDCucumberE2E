import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { generateUniqueEmail } from "../../../support/utils";
let userData = {};
let responseBody;
let statusCode;
let email

Given("I have user registration data {string}, {string}, and {string}", (name, userEmail, password) => {
    userData.name = name;
    userData.password = password;
    if(name === 'invalid user'){
        userData.email = userEmail
    }
    if (userEmail === "<uniqueEmail>"){
    email = generateUniqueEmail()
    userData.email = email
    }
    if (userEmail === "<conflictEmail>")
    {
      userData.email = email;
    }

   cy.log(userData.name,userData.email,userData.password)
});

When("I send a POST request to {string}", (endpoint) => {
    cy.apiRequest('POST', endpoint, userData, null).then((response) => {
        responseBody = response.body;
        statusCode = response.status;
    });
});

Then("the response should be:", (dataTable) => {
    const expectedResponse = dataTable.hashes()[0]
        if(statusCode =expectedResponse.status)
        {
            expect(responseBody.success).to.equal(JSON.parse(expectedResponse.success));
            expect(responseBody.message).to.equal(expectedResponse.message);
                if (expectedResponse.hasProperty !== 'none') {
                expect(responseBody.data).to.have.property(expectedResponse.hasProperty);
                }
            if (statusCode === 201) {
            expect(responseBody.data.name).to.equal(userData.name);
            expect(responseBody.data.email).to.equal(userData.email);
            
            cy.writeFile('cypress/fixtures/API/outputs/registerResponse.json', {
                id: responseBody.data.id,
                email: responseBody.data.email,
                name: userData.name,
                password: userData.password
            });
            }
        }
    else {
        cy.log(`Failed with status code - ${statusCode}`);
    }
});


