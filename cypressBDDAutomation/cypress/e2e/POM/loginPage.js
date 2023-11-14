class loginPage {
    constructor(){
    this.createAccount = 'a[data-testid = "open-register-view"]' 
    this.emailAddress =  'input[data-testid = "register-email"]'   
    this.password = 'input[data-testid = "register-password"]'
    this.name = 'input[data-testid = "register-name"]'
    this.confirmPassword = 'input[data-testid = "register-confirm-password"]'
    this.registerSubmit = 'button[data-testid = "register-submit"]'
    this.message = 'b'
    this.loginView = 'a[data-testid = "login-view"]'
    this.loginEmail = 'input[data-testid = "login-email"]'
    this.loginPassword = 'input[data-testid = "login-password"]'
    this.loginSubmit = 'button[data-testid = "login-submit"]'
    this.home = '[data-testid="home"]'
    this.login = 'div[data-testid = "open-login-view"]'
    this.breadcrumb = 'li.breadcrumb-item.active'
    }
    clickLogin(){
        cy.get(this.login).find('a').contains('Login').click()
    }
    clickCreateAccountButton() {
        cy.get(this.createAccount).click();
    }
    typeEmail(email){
        cy.get(this.emailAddress).type(email) 
    }
    typePassword(password){
        cy.get(this.password).type(password)
    }
    typeName(name){
        cy.get(this.name).type(name)
    }
    typeConfirmPassword(confirmPassword){
        cy.get(this.confirmPassword).type(confirmPassword)
    }
    submitRegister() {
        cy.get(this.registerSubmit).click();
    }
    checkMessageAndURL(){
        cy.get(this.message).should('contain',"User account created successfully")
        cy.url().should('include', '/register')
    }
    clickToLogin(){
        cy.get(this.loginView).click();
        cy.url().should('include', '/login')
        cy.wait(2000)
    }
    typeEmailToLogin(email){
        cy.get(this.loginEmail).type(email)    
    }
    typePasswordToLogin(password){
        cy.get(this.loginPassword).type(password)
    }
    loginSumbit(){
        cy.get(this.loginSubmit).click()
    }

    veriyHomePage(){
        cy.get(this.breadcrumb).find('a').should('have.text', 'Home - My Notes '  )
    }
}
export default loginPage;