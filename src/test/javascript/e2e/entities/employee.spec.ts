import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Employee e2e test', () => {

    let navBarPage: NavBarPage;
    let employeeDialogPage: EmployeeDialogPage;
    let employeeComponentsPage: EmployeeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Employees', () => {
        navBarPage.goToEntity('employee');
        employeeComponentsPage = new EmployeeComponentsPage();
        expect(employeeComponentsPage.getTitle())
            .toMatch(/contractsApp.employee.home.title/);

    });

    it('should load create Employee dialog', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage = new EmployeeDialogPage();
        expect(employeeDialogPage.getModalTitle())
            .toMatch(/contractsApp.employee.home.createOrEditLabel/);
        employeeDialogPage.close();
    });

    it('should create and save Employees', () => {
        employeeComponentsPage.clickOnCreateButton();
        employeeDialogPage.setDocIdInput('docId');
        expect(employeeDialogPage.getDocIdInput()).toMatch('docId');
        employeeDialogPage.setFirstNameInput('firstName');
        expect(employeeDialogPage.getFirstNameInput()).toMatch('firstName');
        employeeDialogPage.setLastNameInput('lastName');
        expect(employeeDialogPage.getLastNameInput()).toMatch('lastName');
        employeeDialogPage.setEmailInput('email');
        expect(employeeDialogPage.getEmailInput()).toMatch('email');
        employeeDialogPage.setPhoneNumberInput('phoneNumber');
        expect(employeeDialogPage.getPhoneNumberInput()).toMatch('phoneNumber');
        employeeDialogPage.setHireDateInput('2000-12-31');
        expect(employeeDialogPage.getHireDateInput()).toMatch('2000-12-31');
        employeeDialogPage.setSalaryInput('5');
        expect(employeeDialogPage.getSalaryInput()).toMatch('5');
        employeeDialogPage.save();
        expect(employeeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EmployeeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-employee div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmployeeDialogPage {
    modalTitle = element(by.css('h4#myEmployeeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    docIdInput = element(by.css('input#field_docId'));
    firstNameInput = element(by.css('input#field_firstName'));
    lastNameInput = element(by.css('input#field_lastName'));
    emailInput = element(by.css('input#field_email'));
    phoneNumberInput = element(by.css('input#field_phoneNumber'));
    hireDateInput = element(by.css('input#field_hireDate'));
    salaryInput = element(by.css('input#field_salary'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDocIdInput = function(docId) {
        this.docIdInput.sendKeys(docId);
    };

    getDocIdInput = function() {
        return this.docIdInput.getAttribute('value');
    };

    setFirstNameInput = function(firstName) {
        this.firstNameInput.sendKeys(firstName);
    };

    getFirstNameInput = function() {
        return this.firstNameInput.getAttribute('value');
    };

    setLastNameInput = function(lastName) {
        this.lastNameInput.sendKeys(lastName);
    };

    getLastNameInput = function() {
        return this.lastNameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setPhoneNumberInput = function(phoneNumber) {
        this.phoneNumberInput.sendKeys(phoneNumber);
    };

    getPhoneNumberInput = function() {
        return this.phoneNumberInput.getAttribute('value');
    };

    setHireDateInput = function(hireDate) {
        this.hireDateInput.sendKeys(hireDate);
    };

    getHireDateInput = function() {
        return this.hireDateInput.getAttribute('value');
    };

    setSalaryInput = function(salary) {
        this.salaryInput.sendKeys(salary);
    };

    getSalaryInput = function() {
        return this.salaryInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
