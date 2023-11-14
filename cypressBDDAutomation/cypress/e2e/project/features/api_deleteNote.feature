Feature: Delete Note API
@positive
  Scenario: Delete a Note with valid noteID
      Given I have the note ID from "cypress/fixtures/API/outputs/notesResponse.json"
      When I send a DELETE request to edit the note
      Then the response code of delete note should be 200
      And the response of delete note should have a success value of true
      And the response of delete note should have a message "Note successfully deleted"
     
      
  @negative 
  Scenario Outline: Attempt to delete a note with invalid ID
      Given I have note ID "<noteId>"
      When I send a DELETE request to edit the note with "<noteId>"
      Then the response code of delete note should be <statusCode>
      And the response of delete note should have a success value of <success>
      And the response of delete note should have a message "<message>"

      Examples:
          | noteId          | statusCode | success |message |
          | 6524f61ed1562c00f727  | 400  | false |Note ID must be a valid ID |
          |  6524f61ed1562c00f727b3b9| 404 |false| No note was found with the provided ID, Maybe it was deleted |