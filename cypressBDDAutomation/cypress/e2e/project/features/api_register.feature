Feature: Register API

@positive @negative
  Scenario Outline: Register a user with various data inputs
    Given I have user registration data "<name>", "<email>", and "<password>"
    When I send a POST request to "notes/api/users/register"
    Then the response should be:
      | status   | success    | message   | hasProperty |
      | <status> | <success>  | <message> | <property>  |
    
    Examples:
      | name          | email          | password | status | success | message                                               |  property |                                            
      | valid user    | <uniqueEmail>  | test123  | 201    | true    | User account created successfully                     | id |
      | conflict user | <conflictEmail> | test123 | 409    |  false   | An account already exists with the same email address | none |
      | invalid user  | test123yopmail | test123  | 400    | false   | A valid email address is required                     | none |

   