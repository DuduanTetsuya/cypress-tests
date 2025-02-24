import LoginPage from '../pages/LoginPage';
import { JobTitle } from '../pages/AdminJob';
import AdminUserManagement from '../pages/AdminUserManagement';

describe('Admin - Job - Job Titles', () => {
    const jobTitle = new JobTitle();

    it('Login', () => {
            LoginPage.visit();
            LoginPage.login('Admin', 'admin123');
        });

    it('Access Job Titles page', () => {
        AdminUserManagement.goToAdmin();
        jobTitle.goToJobTitle();
    });

    it('Add a new Job Title', () => {
        jobTitle.addJobTitle('Cypress Automation','Automate all test','Love Automation',true);
        jobTitle.addJobTitle('Cypress Automation 1',false);
        jobTitle.addJobTitle('Cypress Automation 2',false);
    });

    it('Edit an existing Job Title', () => {
        jobTitle.editJobTitle('Cypress Automation', 'Senior Cypress Automation');
    });

    it('Delete a Job Title', () => {
        jobTitle.deleteJobTitle('Senior Cypress Automation');
    });

    it('Delete Multiple Usernames', () => {
        jobTitle.deleteMultipleJobTitles(['Cypress Automation 1', 'Cypress Automation 2']);
    });
});
