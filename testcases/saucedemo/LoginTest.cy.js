import LoginPage from './pages/LoginPage';

it('Login Test', () => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
});