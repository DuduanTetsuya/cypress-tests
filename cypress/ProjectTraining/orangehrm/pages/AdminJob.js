class AdminJob {
    //#region ########## Job Titles ##########
    goToJobTitle() {
        cy.get('.oxd-topbar-body-nav-tab-item').contains('Job').click();
        cy.get('.oxd-topbar-body-nav-tab-link').contains('Job Titles').click();
        cy.url().should('include', '/admin/viewJobTitleList');
    }
    addJobTitle(title,description="",note="",file=false) {
        cy.get('.oxd-button--secondary').click();
        cy.get(':nth-child(2) > .oxd-input').type(title);
        if(description){
            cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-textarea').type(description);
        }
        if(note){
            cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-textarea').type(note);
        }
        if(file){
            cy.get('.oxd-file-button').click();
            cy.get('input[type="file"]').selectFile('cypress/fixtures/SKUL band.pdf', { force: true })
                .should('have.value', 'C:\\fakepath\\SKUL band.pdf');
        }
        cy.get('.oxd-button--secondary').click();
        cy.contains('.oxd-table-cell', title, { timeout: 10000 }).should('exist');
    }
    editJobTitle(oldTitle, newTitle) {
        cy.contains('.oxd-table-cell', oldTitle, {timeout:5000})
            .parent()
            .find('.oxd-icon.bi-pencil-fill')
            .click();
        
        cy.get(':nth-child(2) > .oxd-input').clear().type(newTitle);
        cy.get('.oxd-button--secondary').click();
        cy.contains('.oxd-table-cell', newTitle, { timeout: 5000 }).should('exist');
    }
    // #endregion ====================

    //#region ########## Pay Grades ##########
    goToPayGrades() {
        cy.get('.oxd-topbar-body-nav-tab-item').contains('Job').click();
        cy.get('.oxd-topbar-body-nav-tab-link').contains('Pay Grades').click();
        cy.url().should('include', '/admin/viewPayGrades');
    }

    addPayGrade(name) {
        cy.get('.oxd-button').click();
        cy.get(':nth-child(2) > .oxd-input').type(name);
        cy.get('button[data-v-10d463b7][type="submit"]').click(); //Click save

        //Currency
        cy.get('.orangehrm-action-header > .oxd-button').click();
        cy.get('.oxd-select-text-input').click();
        cy.get('.oxd-select-dropdown').scrollIntoView();
        cy.contains('.oxd-select-option', 'KZT - Kazakhstan Tenge').click();
        cy.get(':nth-child(2) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input').type('1000');  // Minimum Salary
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('5000');  // Maximum Salary
        cy.get(':nth-child(2) > .oxd-form > .oxd-form-actions > .oxd-button--secondary').click(); //Click save currency
        cy.contains('.oxd-button--ghost', 'Cancel').click();
        cy.contains('.oxd-table-cell', name, { timeout: 10000 }).should('exist');
    }

    editPayGrade(name,newName) {
        cy.contains('.oxd-table-cell', name)
            .parent()
            .find('.oxd-icon.bi-pencil-fill')
            .click();
        cy.get(':nth-child(2) > .oxd-input') //Clear text and put the new name
            .clear()
            .type(newName);
        cy.contains('.oxd-form-actions > .oxd-button--secondary', 'Save').click(); // Click save
        cy.wait(3000);
        cy.contains('.oxd-button--ghost', 'Cancel', { timeout: 10000 }).click();
        cy.contains('.oxd-table-cell', newName, { timeout: 10000 }).should('exist');
    }
    // #endregion ====================
}

export default new AdminJob();