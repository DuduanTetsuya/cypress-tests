import { JobTitles } from '../pages/AdminJob';
import Utility from '../pages/Utility';

describe('Job - Job Titles', () => {
    const jobTitle = new JobTitles();

    it('Login', () => {
        Utility.login('Admin', 'admin123');
    });   

    it('Access Job Titles page', () => {
        Utility.goToAdmin();
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
        Utility.deleteItem('Senior Cypress Automation');
    });

    it('Delete Multiple Usernames', () => {
        Utility.deleteMultipleItems(['Cypress Automation 1', 'Cypress Automation 2']);
    });
});
