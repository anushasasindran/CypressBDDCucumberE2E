Feature: Add Note in UI
 @positive @write-output-to-JSON
    Scenario Outline: Add a note with different categories
        Given I get the token and userId from "API/outputs/authResponse.json"
        When I add a note with title "<title>",category "<category>" and description "<description>"
        Then the response code should be 200
        And the response should have a success value of true
        And the response should have a message "Note successfully created"
        And the response should contain a note id
        And I save the note response to "cypress/fixtures/API/outputs/notesResponse.json"
        
        Examples:
            | title       | category | description |
            | Home title  | Home     | Home note description |
            | Work title  | Work     | Work note description |
            | Personal title | Personal | Personal note description |
            
    @negative
    Scenario Outline: Attempt to add a note with invalid categories
        Given I get the token and userId from "API/outputs/authResponse.json"
        When I add a note with title "<title>",category "<category>" and description "<description>"
        Then the response code should be 400
        And the response should have a success value of false
        And the response should have a message "Category must be one of the categories: Home, Work, Personal"
        
         Examples:
            | title       | category | description |
            | test title  | Movies     | test description |
            | test title  | Adventures     | test description |
            
