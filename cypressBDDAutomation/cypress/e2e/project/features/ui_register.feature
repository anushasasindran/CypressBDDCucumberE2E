Feature: Register a new user in UI

Background: Prerequisites
  Given I visit the URL 'https://practice.expandtesting.com/notes/app'
  
@positive
Scenario: Register a new user in UI
 When I generate a unique email to register
 And I click on "Create an account"
 And I fill the registration form with:
   | email         | password   | name | confirmPassword |
   | unique email  | test123   | test | test123        |
 Then I should see the registration success message and correct URL
