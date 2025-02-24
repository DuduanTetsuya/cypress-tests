import { PayGrades } from '../pages/AdminJob';
import Utility from '../pages/Utility';

describe('Job - Pay Grades', () => {
    const payGrades = new PayGrades();

    it('Login', () => {
        Utility.login('Admin', 'admin123');
    });   

    it('Access Pay Grades page', () => {
        Utility.goToAdmin();
        payGrades.goToPayGrades();
    });

    it('Add a new Pay Grade', () => {
        payGrades.addPayGrade('Cypress Automation');
    });

    it('Edit Pay Grade', () => {
        payGrades.editPayGrade('Cypress Automation', 'Senior Cypress Automation');
    });

    it('Delete a Pay Grade', () => {
        Utility.deleteItem('Senior Cypress Automation');
    });
});