import AdminJob from '../pages/AdminJob';
import Utility from '../pages/Utility';

describe('Job - Pay Grades', () => {
    it('Login', () => {
        Utility.login('Admin', 'admin123');
    });   

    it('Access Pay Grades page', () => {
        Utility.goToAdmin();
        AdminJob.goToPayGrades();
    });

    it('Add a new Pay Grade', () => {
        AdminJob.addPayGrade('Cypress Automation');
    });

    it('Edit Pay Grade', () => {
        AdminJob.editPayGrade('Cypress Automation', 'Senior Cypress Automation');
    });

    it('Delete a Pay Grade', () => {
        Utility.deleteItem('Senior Cypress Automation');
    });
});