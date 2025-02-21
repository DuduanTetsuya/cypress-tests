import LoginPage from './pages/LoginPage';

describe('Sorting Items = ', () => {
    it('Login', () => {
        LoginPage.visit();
        LoginPage.login('standard_user', 'secret_sauce');
    });
    it('Price (low to high)', () => {
        // Pilih sorting "Price (low to high)"
        cy.get('[data-test="product-sort-container"]').select('lohi');

        // Ambil semua harga produk setelah disortir
        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            
            // Pastikan array sudah terurut dari kecil ke besar
            const sortedArray = [...priceArray].sort((a, b) => a - b);
            expect(priceArray).to.deep.equal(sortedArray);
        });
    });
    it('Price (high to low)', () => {
        // Pilih sorting "Price (high to low)"
        cy.get('[data-test="product-sort-container"]').select('hilo');

        // Ambil semua harga produk setelah disortir
        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            
            // Pastikan array sudah terurut dari kecil ke besar
            const sortedArray = [...priceArray].sort((a, b) => b - a);
            expect(priceArray).to.deep.equal(sortedArray);
        });
    });
    it('Name (A to Z)', () => {
        // Pilih sorting "Name (A to Z)"
        cy.get('[data-test="product-sort-container"]').select('az');

        // Ambil semua nama produk setelah disortir
        cy.get('[data-test="inventory-item-name"]').then(($names) => {
            const nameArray = [...$names].map(el => el.innerText); // Ubah NodeList Cypress menjadi array JavaScript
            const sortedArray = [...nameArray].sort((a, b) => a.localeCompare(b)); //Buat salinan array lalu urutkan dari A ke Z
            expect(nameArray).to.deep.equal(sortedArray); //Bandingkan apakah nama yang tampil di UI sudah benar urutannya
        });
    });
    it('Name (Z to A)', () => {
        // Pilih sorting "Name (Z to A)"
        cy.get('[data-test="product-sort-container"]').select('za');

        // Ambil semua nama produk setelah disortir
        cy.get('[data-test="inventory-item-name"]').then(($names) => {
            const nameArray = [...$names].map(el => el.innerText); // Ubah NodeList Cypress menjadi array JavaScript
            const sortedArray = [...nameArray].sort((a, b) => b.localeCompare(a)); //Buat salinan array lalu urutkan dari A ke Z
            expect(nameArray).to.deep.equal(sortedArray); //Bandingkan apakah nama yang tampil di UI sudah benar urutannya
        });
    });
});
