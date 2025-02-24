class AdminUserManagement {
    verifyTopbarMenu() {
        // Verifikasi bahwa menu utama tersedia
        cy.get('body').then(($body) => {
            // Cek apakah tombol "More" ada
            if ($body.find('.oxd-topbar-body-nav-tab-item').text().includes('More')) {
                cy.contains('More').click();
            }
            
            cy.get('.oxd-topbar-body-nav').contains('User Management').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Job').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Organization').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Qualifications').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Nationalities').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Corporate Branding').should('exist');
            cy.get('.oxd-topbar-body-nav').contains('Configuration').should('exist');
        });
    }

    goToUserManagement() {
        // Pastikan menu "User Management" muncul, klik jika ada
        cy.get('.oxd-topbar-body-nav-tab-item').contains('User Management').click();

        // Verifikasi URL berubah ke halaman User Management
        cy.url().should('include', '/admin/viewSystemUsers');
    }

    searchUser(username) {
        cy.get('.oxd-input').eq(1).type(username);
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-table-cell').should('contain', username);
    }
    
    resetSearch() {
        cy.get('.oxd-button--ghost').contains('Reset').click();
        cy.get('.oxd-input').eq(1).should('have.value', '');
    }

    addUser(username, password, role, status,) {
        cy.get('.orangehrm-header-container > .oxd-button').click(); // Klik tombol Add

        // Klik dropdown User Role
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
            .parent()
            .within(() => {
                cy.contains(role).click();
        });

        // **Pilih Status**
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
            .parent()
            .within(() => {
                cy.contains(status).click();
        });
    
        cy.get('.oxd-autocomplete-text-input').first().type('Peter Mac Anderson')
            .parent()
            .within(() => {
                cy.contains('Peter Mac Anderson').click();
        });

        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(username); // Input username
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(password); // Input password
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(password); // Konfirmasi password
    
        cy.get('.oxd-button--secondary').click(); // Klik Save
        cy.get('.oxd-table-cell', { timeout: 10000 }).should('exist');
        this.searchUser(username);
        this.resetSearch();
    }

    editUsername(oldUsername, newUsername) {
        // Cari user berdasarkan username lama
        cy.contains('.oxd-table-cell', oldUsername)
            .parent()
            .find('.oxd-icon.bi-pencil-fill')
            .click();
    
        // Pastikan URL sudah berubah ke halaman Edit
        cy.url().should('include', '/admin/saveSystemUser');
    
        // Edit username dengan username baru
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input')
            .clear()
            .type(newUsername);
    
        // Klik Save
        cy.get('.oxd-button--secondary').click();
    
        // Verifikasi bahwa username berhasil diubah
        cy.wait(5000);
        this.searchUser(newUsername);
        this.resetSearch();
    }
}

export default new AdminUserManagement();
