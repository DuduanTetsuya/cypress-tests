class Utility {
    login(username, password) {
        cy.log('Status Login = ', Cypress.env('isLoggedIn'));

        if (!Cypress.env('isLoggedIn')) {
            cy.visit('https://opensource-demo.orangehrmlive.com/');
            cy.log('Melakukan login karena isLoggedIn = false atau tidak ada');
            cy.get('[name="username"]').type(username);
            cy.get('[name="password"]').type(password);
            cy.get('[type="submit"]').click();
            Cypress.env('isLoggedIn', true);
            cy.log('isLoggedIn setelah login =', Cypress.env('isLoggedIn'));
        } else {
            cy.log('Sudah login sebelumnya, skip login');
        }

        // Verifikasi URL setelah login berhasil
        cy.url().should('not.include', '/login');
    }

    logout() {
        cy.get('.oxd-userdropdown-tab').click();  // Klik user dropdown
        cy.wait(2000);
        cy.contains('.oxd-userdropdown-link', 'Logout', { timeout: 10000 }).click();
        cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');
    }
    
    goToAdmin() {
        cy.contains('.oxd-main-menu-item--name', 'Admin', { timeout: 10000 }).click();
        cy.url().should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-topbar-header-breadcrumb-module').should('contain', 'Admin');
    }
    
    deleteItem(name) {
        cy.contains('.oxd-table-cell', name)
            .parent()
            .find('.oxd-icon.bi-trash')
            .click();

        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();

        cy.contains('.oxd-table-cell', name).should('not.exist');
    }

    deleteMultipleItems(names) {
        names.forEach((name) => {
            cy.contains('.oxd-table-cell', name)
                .parent()
                .find('input[type="checkbox"]')
                .check({ force: true });
        });

        cy.get('.orangehrm-horizontal-padding > div > .oxd-button').click();
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click();

        names.forEach((name) => {
            cy.contains('.oxd-table-cell', name).should('not.exist');
        });
    }
}

export default new Utility();
