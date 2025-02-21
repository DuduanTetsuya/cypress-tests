class ProductsPage {
     selectItems(numItems) {
        cy.get('.inventory_item').then(items => {
            const randomItems = Cypress._.sampleSize(items.toArray(), numItems);
            randomItems.forEach(item => {
                // Mengambil tombol add-to-cart yang sesuai
                cy.wrap(item)
                  .find('button')
                  .click();
            });
        });
    }

    goToCart() {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
    }

    checkAboutMenu(){
        cy.get('.bm-burger-button').click();  // Open the menu
        cy.get('[data-test="about-sidebar-link"]')
            .invoke('attr', 'target', '_blank')
            .click();
    }
}
export default new ProductsPage();
