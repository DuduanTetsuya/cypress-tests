class CartPage {
    removeItem() {
        cy.get('[data-test^="remove-"]')  // Memilih tombol Remove berdasarkan data-test yang dimulai dengan "remove-"
            .first().click();
    }

    checkCartItemCount(expectedCount) {
        // Cari semua item dalam keranjang berdasarkan selector .cart_item
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('.cart_item').should('have.length', expectedCount);
        cy.get('[data-test^="remove-"]').each(($button) => {
            // Klik setiap tombol Remove yang ditemukan
            cy.wrap($button).click();
        });
        cy.get('[data-test="continue-shopping"]').click();
    }    

    proceedToCheckout() {
        cy.get('[data-test="checkout"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');
    }
}
export default new CartPage();
