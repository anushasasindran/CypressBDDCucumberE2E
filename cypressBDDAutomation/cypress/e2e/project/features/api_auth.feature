Feature: Authenticate API
 
 @positive
  Scenario: Authenticate registered user
    Given I fetch the registered user email and password from "API/outputs/registerResponse"
    When I send a POST request to authenticate the user "notes/api/users/login"
    Then the response code of auth should be 200
    And the response of auth should have a success value of true
    And the response of auth should have a message "Login successful"
    And the response of auth should contain a token property
    And the id, email, and password should match the registered user details
    And save the token and response to "cypress/fixtures/API/outputs/authResponse.json"

@negative
Scenario Outline: Authenticate non-registered user
    Given I have the email "<email>" and password "<password>"
    When I send a POST request to authenticate the user "notes/api/users/login"
    Then the response code of auth should be 401
    And the response of auth should have a message "Incorrect email address or password"

    Examples:
    | email                | password  |
    | nonregistered@test.com | password |
    | registeredemail@test.com | wrongPass |