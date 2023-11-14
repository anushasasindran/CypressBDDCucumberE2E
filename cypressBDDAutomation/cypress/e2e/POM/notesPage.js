class notesPage {
    constructor(){
    this.addNote = 'button[data-testid = "add-new-note"]' 
    this.category =  '[data-testid="note-category"]'
    this.title = 'input[data-testid = "note-title"]' 
    this.description ='[data-testid = "note-description"]'
    this.checkBox = '[data-testid = "note-completed"]'
    this.addNoteButton ='[data-testid = "note-submit"]'
    this.notesCard = '[data-testid="note-card"]'
    this.toggleSwitch = '[data-testid= "toggle-note-switch"]'
    this.statusInfo = '[data-testid="progress-info"]'
    this.viewNotes = '[data-testid="note-view"]'
    this.cardTitle = '[data-testid="note-card-title"]'
    this.noteView = '[data-testid="note-view"]'
    this.cardDescription = '[data-testid="note-card-description"]'
    this.home = '[data-testid="home"]'
    this.editNote = '[data-testid="note-edit"]'
    this.noteDelete = '[data-testid="note-delete"]'
    this.noteDeleteConfirm = '[data-testid="note-delete-confirm"]'
    }
    
clickAddNote(){
    cy.get(this.addNote).click( {force: true});
}

selectCategory(category){
cy.log("Printing from selectCategory",category)
cy.get(this.category).select(category)
}
enterTitle(title){
cy.get(this.title).clear().type(title)
}
enterDescription(description){
    cy.get(this.description).clear().type(description)
}
clickAddNoteButton(){
cy.get(this.addNoteButton).click()
}
toggleCompletedCheckbox(){
cy.get(this.checkBox).check();
}

addNoteWithDetails(category,title,description){
this.selectCategory(category)
this.toggleCompletedCheckbox();
this.enterTitle(title)
this.enterDescription(description)
this.clickAddNoteButton();
cy.wait(3000)
}

verifyNotesCompleteStatus(){
    let completedNotes =0, UnCompletedNotes =0, totalNotes;
    cy.get(this.notesCard).its('length').then((noteCount) => {
    totalNotes = noteCount;
cy.get(this.notesCard).each(($el) => {
    if($el.find(this.toggleSwitch).is(':checked')){
        completedNotes++;
    }else
    {
        UnCompletedNotes++;
    }
}).then(() => {
    cy.log(`total Notes : ${totalNotes}`)
    cy.log(`completed notes : ${completedNotes}`)
    cy.log(`Not completed notes : ${UnCompletedNotes}`)

if(totalNotes === completedNotes){
    cy.get(this.statusInfo).should('have.text','You have completed all notes')
}
else{
    const expectedMessage = `You have ${completedNotes}/${totalNotes} notes completed in the all categories`
   cy.get(this.statusInfo).should('have.text',expectedMessage)
}
})
})
}
uncheckAllNotes(){
    cy.get(this.toggleSwitch).each(($checkbox) =>
    {
    cy.wrap($checkbox).uncheck();
    cy.wait(2000)
    })
}
checkAllNotes(){
    cy.get(this.toggleSwitch).each(($checkbox) =>
    {
    cy.wrap($checkbox).check();
    cy.wait(2000)
    })
}
checkfewNotes(){
    cy.get(this.toggleSwitch).check({force: true});
    cy.wait(3000)   
}
getNoteCard(index) {
    return cy.get(this.notesCard ).eq(index);
}

findNoteByTitle(title) {
    return cy.get(this.cardTitle).contains(title).parent();
}

clickNoteView(noteElement) {
    return noteElement.find(this.noteView).click();
}

checkURLForNoteId(noteId) {
    cy.url().should('include', `notes/${noteId}`);
}

verifyNoteTitle(title) {
    cy.get(this.cardTitle).should('have.text', title);
}
verifyNoteDescription(description) {
    cy.get(this.cardDescription).should('have.text', description);
}
clickHome(){
cy.get(this.home).click();
}
getCardTitleByIndex(index) {
    return cy.get(this.notesCard).eq(index).find(this.cardTitle).invoke('text');
}
getCardDescriptionByIndex(index) {
    return cy.get(this.notesCard).eq(index).find(this.cardDescription).invoke('text');
}
clickEditOnNoteByIndex(index) {
    cy.get(this.notesCard).eq(index).find(this.editNote).click();
    return this;
}
setNoteTitle(title) {
    cy.get(this.title).clear().type(title);
    return this;
}

setNoteDescription(description) {
    cy.get(this.description).clear().type(description);
    return this;
}

submitNote() {
    cy.get(this.addNoteButton).click();
    return this;
}
getNoteCount() {
    return cy.get(this.notesCard).its('length');
}

findNoteCardByTitle(title) {
    return cy.contains(this.cardTitle, title).closest(this.notesCard);
}

clickDeleteOnNoteCard($note) {
    cy.wrap($note).find(this.noteDelete).click();
    return this;
}



confirmDelete() {
    cy.get(this.noteDeleteConfirm).click();
    return this;
}

verifyRemainingNoteCount(expectedCount) {
    if(expectedCount > 0) {
        cy.get(this.notesCard).should('have.length', expectedCount);
    } else {
        cy.get(this.notesCard).should('not.exist');
    }
    return this;
}
}
export default notesPage;
