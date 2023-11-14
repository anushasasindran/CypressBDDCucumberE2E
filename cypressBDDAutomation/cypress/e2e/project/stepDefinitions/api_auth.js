import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let id, email, password, responseData, userName, isRegisteredUser=false, invalidEmail, invalidPass

    Given("I fetch the registered user email and password from {string}",(fixturePath) => {   
     cy.fixture(fixturePath).then((data) => {
        id = data.id;
        userName = data.name;
        email = data.email;
        password = data.password;
        isRegisteredUser = true;
        cy.log(id,email,password)
      });
    })
    
    Given("I have the email {string} and password {string}", (email, password) => {
        invalidEmail = email;
        invalidPass = password;
        isRegisteredUser = false;
        cy.log("Negative test data:", email, password)
    });
  
    When("I send a POST request to authenticate the user {string}", (endpoint) => {
        let requestData
        if (isRegisteredUser){
            requestData = {
            email: email,
            password: password
            };
        }
        else {
            requestData = {
                email: invalidEmail,
                password: invalidPass
            };
        }

        cy.log("Test data:",requestData.email, requestData.password)
    
        cy.apiRequest('POST', endpoint, requestData, null).then((response) => {
            responseData = response.body;
        });
    });

    Then('the response code of auth should be {int}', (statusCode) => {
        expect(responseData.status).to.equal(statusCode);
    });

    Then('the response of auth should have a success value of {word}', (expectedValue) => {
        expect(responseData.success).to.equal(JSON.parse(expectedValue));
    });

    Then('the response of auth should have a message {string}', (message) => {
        expect(responseData.message).to.equal(message);
    });

    Then('the response of auth should contain a token property', () => {
        expect(responseData.data).to.have.property('token');
    });

    Then('the id, email, and password should match the registered user details', () => {
        const expectedData = {
            'data.id': id,
            'data.email': email,
            'data.name': userName
        };
    
        Object.entries(expectedData).forEach(([key, value]) => {
            expect(responseData).to.have.nested.property(key, value);
        });
    });

    Then('save the token and response to {string}', (filePath) => {
        const outputData = {
            id: responseData.data.id,
            email: responseData.data.email,
            name: responseData.data.name,
            token: responseData.data.token
        };
        cy.log(outputData)
    
        cy.writeFile(filePath, outputData);
    });