import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';

describe('Admin Page Full Test', () => {
const username = 'DudTetsuya';
const password = 'Password123';
const role = 'Admin';
const status = 'Enabled';

    it('Login', () => {
        LoginPage.visit();
        LoginPage.login('Admin', 'admin123');
    });

    it('Verify Top Bar Menu', () => {
        AdminPage.goToAdmin();
        AdminPage.verifyTopbarMenu();
    });

    it('User Management - Add New Username', () => {
        AdminPage.addUser(username, password, role, status);
        // AdminPage.addUser('Pekok123', password, role, status);
        // AdminPage.addUser('Pekok12345', password, role, status);
        AdminPage.searchUser(username);
    });

    it('User Management - Edit Username', () => {
        AdminPage.editUsername(username, 'DudTetsuyaBaru');
        AdminPage.searchUser('DudTetsuyaBaru');
    });

    it('User Management - Delete Username', () => {
        AdminPage.deleteUsername('DudTetsuyaBaru');
    });

    it('User Management - Delete Multiple Usernames', () => {
        AdminPage.deleteMultipleUsers(['Pekok123', 'Pekok12345']);
    });
});