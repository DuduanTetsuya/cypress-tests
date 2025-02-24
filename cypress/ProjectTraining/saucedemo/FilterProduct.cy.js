import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

describe('Sorting Items', () => {
    it('Login', () => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });
    it('Price (Low to High)', () => {
        ProductsPage.sortingPriceLowToHigh();
    })
    it('Price (High to Low)', () => {
        ProductsPage.sortingPriceHighToLow();
    })
    it('Name (A to Z))', () => {
        ProductsPage.sortingNameAtoZ();
    })
    it('Price (Low to High)', () => {
        ProductsPage.sortingNameZtoA();
    })
});
