Feature: Retrieve Note API
@positive
  Scenario: Retrieve all notes by their IDs
      Given I have the note data from "cypress/fixtures/API/outputs/notesResponse.json"
      When I send a GET request for each note and assert the response
   
  @negative 
  Scenario Outline: Attempt to retrieve a note with invalid ID
      Given I have a note ID "<noteId>"
      When I send a GET request for note with ID "<noteId>"
      Then the response code of get note should be <statusCode>
      And the response of get note should have a success value of <success>
      And the response of get note should have a message "<message>"

      Examples:
          | noteId          | statusCode | success |message                                                      |
          | 6524f61ed1562c00f727  | 400  | false |Note ID must be a valid ID                                   |
          |  6524f61ed1562c00f727b3b9| 404 |false| No note was found with the provided ID, Maybe it was deleted |
