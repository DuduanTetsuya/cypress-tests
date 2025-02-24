import Utility from './pages/Utility';

it('Login', () => {
    Utility.login('Admin', 'admin123');
});

it('Logout', () => {
    Utility.logout();
});