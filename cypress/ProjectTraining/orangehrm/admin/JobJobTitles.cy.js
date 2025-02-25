import AdminJob from '../pages/AdminJob';
import Utility from '../pages/Utility';

describe('Job - Job Titles', () => {
    it('Login', () => {
        Utility.login('Admin', 'admin123');
    });   

    it('Access Job Titles page', () => {
        Utility.goToAdmin();
        AdminJob.goToJobTitle();
    });

    it('Add a new Job Title', () => {
        AdminJob.addJobTitle('Cypress Automation','Automate all test','Love Automation',true);
        AdminJob.addJobTitle('Cypress Automation 1',false);
        AdminJob.addJobTitle('Cypress Automation 2',false);
    });

    it('Edit an existing Job Title', () => {
        AdminJob.editJobTitle('Cypress Automation', 'Senior Cypress Automation');
    });

    it('Delete a Job Title', () => {
        Utility.deleteItem('Senior Cypress Automation');
    });

    it('Delete Multiple Usernames', () => {
        Utility.deleteMultipleItems(['Cypress Automation 1', 'Cypress Automation 2']);
    });
});
