class ProductsPage {
     selectItems(numItems) {
        cy.get('.inventory_item').then($items => {
            // Ubah ke array biasa
            const itemsArray = [...$items];
        
            // Ambil item secara acak
            const randomItems = Cypress._.sampleSize(itemsArray, numItems);
        
            // Klik tombol "Add to Cart" untuk item yang dipilih
            randomItems.forEach($item => {
                cy.wrap($item).find('button').click();
            });
        });
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

    sortingPriceLowToHigh(){
        // Pilih sorting "Price (low to high)"
        cy.get('[data-test="product-sort-container"]').select('lohi');

        // Ambil semua harga produk setelah disortir
        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            
            // Pastikan array sudah terurut dari kecil ke besar
            const sortedArray = [...priceArray].sort((a, b) => a - b);
            expect(priceArray).to.deep.equal(sortedArray);
        });
    }

    sortingPriceHighToLow(){
        // Pilih sorting "Price (high to low)"
        cy.get('[data-test="product-sort-container"]').select('hilo');

        // Ambil semua harga produk setelah disortir
        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
            
            // Pastikan array sudah terurut dari kecil ke besar
            const sortedArray = [...priceArray].sort((a, b) => b - a);
            expect(priceArray).to.deep.equal(sortedArray);
        });
    }
    sortingNameAtoZ(){
        // Pilih sorting "Name (A to Z)"
        cy.get('[data-test="product-sort-container"]').select('az');

        // Ambil semua nama produk setelah disortir
        cy.get('[data-test="inventory-item-name"]').then(($names) => {
            const nameArray = [...$names].map(el => el.innerText); // Ubah NodeList Cypress menjadi array JavaScript
            const sortedArray = [...nameArray].sort((a, b) => a.localeCompare(b)); //Buat salinan array lalu urutkan dari A ke Z
            expect(nameArray).to.deep.equal(sortedArray); //Bandingkan apakah nama yang tampil di UI sudah benar urutannya
        });
    }
    sortingNameZtoA(){
        // Pilih sorting "Name (Z to A)"
        cy.get('[data-test="product-sort-container"]').select('za');

        // Ambil semua nama produk setelah disortir
        cy.get('[data-test="inventory-item-name"]').then(($names) => {
            const nameArray = [...$names].map(el => el.innerText); // Ubah NodeList Cypress menjadi array JavaScript
            const sortedArray = [...nameArray].sort((a, b) => b.localeCompare(a)); //Buat salinan array lalu urutkan dari A ke Z
            expect(nameArray).to.deep.equal(sortedArray); //Bandingkan apakah nama yang tampil di UI sudah benar urutannya
        });
    }
}
export default new ProductsPage();
