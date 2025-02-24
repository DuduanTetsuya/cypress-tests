import Utility from '../pages/Utility';
import AdminUserManagement from '../pages/AdminUserManagement';

describe('Admin - User Management', () => {
    const username = 'DudTetsuya';
    const password = 'Password123';
    const role = 'Admin';
    const status = 'Enabled';

    it('Login', () => {
        Utility.login('Admin', 'admin123');
    }); 

    it('Verify Top Bar Menu', () => {
        Utility.goToAdmin();
        AdminUserManagement.verifyTopbarMenu();
    });

    it('Add New Username', () => {
        AdminUserManagement.addUser(username, password, role, status);
        AdminUserManagement.addUser('Pekok123', password, role, status);
        AdminUserManagement.addUser('Pekok12345', password, role, status);
    });

    it('Edit Username', () => {
        AdminUserManagement.editUsername(username, 'DudTetsuyaBaru');
    });

    it('Delete Username', () => {
        Utility.deleteItem('DudTetsuyaBaru');
    });

    it('Delete Multiple Usernames', () => {
        Utility.deleteMultipleItems(['Pekok123', 'Pekok12345']);
    });
});