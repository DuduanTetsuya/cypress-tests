class CheckoutPage {
    fillCheckoutForm(firstName, lastName, postalCode) {
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="postalCode"]').type(postalCode);

        // Tombol lanjut
        cy.get('[data-test="continue"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');
    }

    completeCheckout() {
        // Tombol menyelesaikan checkout
        cy.get('[data-test="finish"]').click();
    }
}

export default new CheckoutPage();