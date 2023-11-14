// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import loginPage from '../e2e/POM/loginPage';

Cypress.Commands.add('apiRequest',(method, url, body ={}, headers ={}) =>{
    return cy.request({
    method : method,
    url : url,
    body: body,
    headers : headers,
    failOnStatusCode:false
    })
    })

Cypress.Commands.add('appendToJSONFile', (filePath, newObj) => {
    cy.readFile(filePath).then((jsonArray) => {
          jsonArray = jsonArray || [];
          if(!Array.isArray(jsonArray)){
            jsonArray=[jsonArray];
          }
        jsonArray.push(newObj);
          cy.writeFile(filePath, jsonArray);
        });
      });

    Cypress.Commands.add('register',(email,password,name,confirmPassword) => {
      const loginPageLocator = new loginPage();
      //loginPageLocator.clickCreateAccountButton();
      //cy.wait(2000);
      loginPageLocator.typeEmail(email);
      loginPageLocator.typePassword(password)
      loginPageLocator.typeName(name)
      loginPageLocator.typeConfirmPassword(confirmPassword)
      loginPageLocator.submitRegister();
      cy.wait(2000);
      })
        
    Cypress.Commands.add('login',(email,password) => {
        const loginPageLocator = new loginPage();
        loginPageLocator.typeEmailToLogin(email);
        loginPageLocator.typePasswordToLogin(password);
        loginPageLocator.loginSumbit();
        cy.wait(2000);
        })