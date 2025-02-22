import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

describe('Select Items', () => {
    it('2 items', () => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
        ProductsPage.selectItems(2);
        ProductsPage.checkCartItemCount(2);
    });

    it('3 items', () => {
        ProductsPage.selectItems(3);
        ProductsPage.checkCartItemCount(3);
    });

    it('4 items', () => {
        ProductsPage.selectItems(4);
        ProductsPage.checkCartItemCount(4);
    });
});