export class JobTitle {
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
        cy.wait(5000);
        cy.get('.oxd-table-cell').should('contain', title);
    }

    editJobTitle(oldTitle, newTitle) {
        cy.contains('.oxd-table-cell', oldTitle)
            .parent()
            .find('.oxd-icon.bi-pencil-fill')
            .click();
        
        cy.get(':nth-child(2) > .oxd-input').clear().type(newTitle);
        cy.get('.oxd-button--secondary').click();
        cy.get('.oxd-table-cell').should('contain', newTitle);
    }

    deleteJobTitle(title) {
        cy.contains('.oxd-table-cell', title)
            .parent()
            .find('.oxd-icon.bi-trash')
            .click();
        
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();
        cy.contains('.oxd-table-cell', title).should('not.exist');
    }

    deleteMultipleJobTitles(usernames) {
        usernames.forEach((username) => {
            // Cari baris yang berisi username, lalu centang checkbox-nya
            cy.contains('.oxd-table-cell', username)
                .parent() // Ambil row tempat username berada
                .find('input[type="checkbox"]') // Checkbox di dalam row tersebut
                .check({force:true}); // Centang checkbox
        });
    
        // Klik tombol Delete di atas tabel
        cy.get('.orangehrm-horizontal-padding > div > .oxd-button').click();
    
        // Konfirmasi penghapusan di pop-up modal
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();
        
        // Verifikasi bahwa username sudah tidak ada di tabel
        usernames.forEach((username) => {
            cy.contains('.oxd-table-cell', username).should('not.exist');
        });
    }    
}
