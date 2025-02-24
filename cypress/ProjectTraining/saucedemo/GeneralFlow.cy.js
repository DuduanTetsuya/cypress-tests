import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

describe('General Flow', () => {
    it('Login', () => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    })

    it('Select Random Items', () => {
        const numItems = Cypress._.random(2, 4);
        cy.log(`Randomly selected ${numItems} items`);
        ProductsPage.selectItems(numItems);
    })

    it('Remove an item', () => {
        ProductsPage.goToCart();
        CartPage.removeItem();
    })

    it('Checkout and fill the form', () => {
        CartPage.proceedToCheckout();
        CheckoutPage.fillCheckoutForm('John', 'Doe', '12345');
    })

    it('Complete the checkout', () => {
        CheckoutPage.completeCheckout();
        cy.url().should('include', 'checkout-complete');
    });

});
