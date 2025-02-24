import Utility from './pages/Utility';

describe('OrangeHRM Full Test', () => {
    before(() => {
        Utility.login('Admin', 'admin123');
    });
    
    require('./admin/UserManagement.cy.js');
    require('./admin/JobJobTitles.cy.js');
    require('./admin/JobPayGrades.cy.js');

    it('Logout', () => {
        Utility.logout();
        Cypress.env('isLoggedIn', false); // Reset state login
    });
});
