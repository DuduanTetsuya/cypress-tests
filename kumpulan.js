//Memisah string jadi array dengan spasi dan whitespace berlebih = split(/\s+/)
//Menghapus semua karakter, angka, spasi, selain huruf = replace(/[^a-zA-Z0-9 ]/g, '');
//Merubah kumpulan selector jadi array biasa = [...$items]
//Mengambil acak item dari array = Cypress._.sampleSize(itemsArray, numItems);
//Memanggil pertama kali = before(() => {
//Memanggil terakhir = after(() => {
//Mengurutkan test file =  require('./admin/UserManagement.cy.js');
//Menggunakan parent untuk scope = .parent().find('.oxd-icon.bi-trash').click();
//Memaksa klik pada elemen = .check({ force: true });
//Mengubah text jadi angka dan hapus $ = array.map(el => parseFloat(el.innerText.replace('$', '')));
//Klik tombol masing-masing = array.forEach($item => { cy.wrap($item).find('button').click()});
//Set envi = Cypress.env('isLoggedIn', true);