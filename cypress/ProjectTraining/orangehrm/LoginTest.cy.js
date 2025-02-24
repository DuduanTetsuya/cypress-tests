import LoginPage from './pages/LoginPage';

it('Login Test', () => {
    LoginPage.visit();
    LoginPage.login('Admin', 'admin123');
});