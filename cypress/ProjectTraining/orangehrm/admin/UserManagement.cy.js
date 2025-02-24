import LoginPage from '../pages/LoginPage';
import AdminUserManagement from '../pages/AdminUserManagement';

describe('Admin - User Management', () => {
const username = 'DudTetsuya';
const password = 'Password123';
const role = 'Admin';
const status = 'Enabled';

    it('Login', () => {
        LoginPage.visit();
        LoginPage.login('Admin', 'admin123');
    });

    it('Verify Top Bar Menu', () => {
        AdminUserManagement.goToAdmin();
        AdminUserManagement.verifyTopbarMenu();
    });

    it('Add New Username', () => {
        AdminUserManagement.addUser(username, password, role, status);
        AdminUserManagement.addUser('Pekok123', password, role, status);
        AdminUserManagement.addUser('Pekok12345', password, role, status);
        AdminUserManagement.searchUser(username);
    });

    it('Edit Username', () => {
        AdminUserManagement.editUsername(username, 'DudTetsuyaBaru');
        AdminUserManagement.searchUser('DudTetsuyaBaru');
    });

    it('Delete Username', () => {
        AdminUserManagement.deleteUsername('DudTetsuyaBaru');
    });

    it('Delete Multiple Usernames', () => {
        AdminUserManagement.deleteMultipleUsers(['Pekok123', 'Pekok12345']);
    });
});