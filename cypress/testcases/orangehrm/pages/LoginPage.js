class LoginPage {
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    }

    login(username, password) {
        // Gunakan selector yang lebih spesifik dan stabil
        cy.get('[name="username"]').type(username);
        cy.get('[name="password"]').type(password);
        cy.get('[type="submit"]').click();

        // Verifikasi URL setelah login berhasil
        cy.url().should('include', '/dashboard/index');
    }
}

export default new LoginPage();
