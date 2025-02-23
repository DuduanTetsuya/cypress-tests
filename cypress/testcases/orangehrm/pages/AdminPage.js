class AdminPage {
    goToAdmin() {
        cy.get('.oxd-main-menu-item--name').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-topbar-header-breadcrumb-module').should('contain', 'Admin');
    }

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
        cy.get('.oxd-input').first().type(username); // Input username
        cy.get('.oxd-button').contains('Search').click(); // Klik tombol Search
    
        // Pastikan hasil pencarian menampilkan user yang dicari
        cy.get('.oxd-table-cell').should('contain', username);
    }
    
    addUser(username, password, role, status,) {
        cy.get('.orangehrm-header-container > .oxd-button').click(); // Klik tombol Add

        // Klik dropdown User Role
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
            .parent() // Naik ke parent agar scope lebih sempit
            .within(() => {
                cy.contains(role).click(); // Pilih Admin dalam dropdown saja
        });

        // **Pilih Status**
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
            .parent() // Naik ke parent agar scope lebih sempit
            .within(() => {
                cy.contains(status).click(); // Pilih Admin dalam dropdown saja
        });
    
        cy.get('.oxd-autocomplete-text-input').first().type('Peter Mac Anderson')
            .parent() // Naik ke parent agar scope lebih sempit
            .within(() => {
                cy.contains('Peter Mac Anderson').click(); // Pilih Admin dalam dropdown saja
        });

        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type(username); // Input username
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type(password); // Input password
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(password); // Konfirmasi password
    
        cy.get('.oxd-button--secondary').click(); // Klik Save
    
        // Verifikasi user baru berhasil ditambahkan
        cy.wait(5000);
        cy.get('.oxd-table-cell').should('contain', username);
    }

    deleteUsername(username){
        // Cari username di tabel
        cy.contains('.oxd-table-cell', username)
            .parent() // Ambil row tempat username berada
            .find('.oxd-icon.bi-trash') // Cari ikon delete dalam row itu
            .click();

        // Konfirmasi penghapusan di pop-up modal
        cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click(); 

        // Pastikan username sudah terhapus
        cy.contains('.oxd-table-cell', username).should('not.exist');
    }

    editUsername(oldUsername, newUsername) {
        // Cari user berdasarkan username lama
        cy.contains('.oxd-table-cell', oldUsername)
            .parent() // Ambil row tempat username berada
            .find('.oxd-icon.bi-pencil-fill') // Cari ikon Edit
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
        cy.get('.oxd-table-cell').should('contain', newUsername);
    }

    deleteMultipleUsers(usernames) {
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

export default new AdminPage();
