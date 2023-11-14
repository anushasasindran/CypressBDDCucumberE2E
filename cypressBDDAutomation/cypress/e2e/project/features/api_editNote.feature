Feature: Edit Note API
@positive
  Scenario: Edit a Note with valid noteID
      Given I have the note ID to edit from "cypress/fixtures/API/outputs/notesResponse.json"
      When I send a PUT request to edit the note
      Then the response code of edit note should be 200
      And the response of edit note should have a success value of true
      And the response of edit note should have a message "Note successfully Updated"
      And the response should have edited note details
      
  @negative 
  Scenario Outline: Attempt to edit a note with invalid ID
      Given I have note ID to edit "<noteId>"
      When I send a PUT request to edit the note with "<noteId>"
      Then the response code of edit note should be <statusCode>
      And the response of edit note should have a success value of <success>
      And the response of edit note should have a message "<message>"

      Examples:
          | noteId          | statusCode | success |message |
          | 6524f61ed1562c00f727  | 400  | false |Note ID must be a valid ID |
          |  6524f61ed1562c00f727b3b9| 404 |false| No note was found with the provided ID, Maybe it was deleted |