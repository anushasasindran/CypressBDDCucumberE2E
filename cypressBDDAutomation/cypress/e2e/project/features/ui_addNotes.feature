Feature: Add Note API
 @positive @write-notes-to-JSON
    Scenario Outline: Add a note with different categories in UI
        Given I have navigated to Notes page
        When I add a note with title "<title>" and description "<description>" in category "<category>"
        Then I should be able to view the note with title "<title>" and description "<description>" in category "<category>"
        
        Examples:
            | title       | category | description |
            | Home title  | Home     | Home note description |
            | Work title  | Work     | Work note description |
            | Personal title | Personal | Personal note description |
            

