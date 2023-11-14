Feature: Login with the registered user in UI
Background: Prerequisites
  Given I visit the URL 'https://practice.expandtesting.com/notes/app'

@positive
Scenario: Login in UI
 When I click on "Click here to Login"
 Then I fill the email and password from "UI/outputs/registerDetails.json" and click on submit button
 And I should see the My notes page
