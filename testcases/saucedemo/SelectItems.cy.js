import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';

describe('Select Items = ', () => {
    it('2 items', () => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
        ProductsPage.selectItems(2);
        CartPage.checkCartItemCount(2);
    });

    it('3 items', () => {
        ProductsPage.selectItems(3);
        CartPage.checkCartItemCount(3);
    });

    it('4 items', () => {
        ProductsPage.selectItems(4);
        CartPage.checkCartItemCount(4);
    });
});