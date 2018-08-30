import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    docIdInput = element(by.id('field_docId'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    hireDateInput = element(by.id('field_hireDate'));
    salaryInput = element(by.id('field_salary'));
    jobSelect = element(by.id('field_job'));
    departmentSelect = element(by.id('field_department'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDocIdInput(docId) {
        await this.docIdInput.sendKeys(docId);
    }

    async getDocIdInput() {
        return this.docIdInput.getAttribute('value');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setHireDateInput(hireDate) {
        await this.hireDateInput.sendKeys(hireDate);
    }

    async getHireDateInput() {
        return this.hireDateInput.getAttribute('value');
    }

    async setSalaryInput(salary) {
        await this.salaryInput.sendKeys(salary);
    }

    async getSalaryInput() {
        return this.salaryInput.getAttribute('value');
    }

    async jobSelectLastOption() {
        await this.jobSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async jobSelectOption(option) {
        await this.jobSelect.sendKeys(option);
    }

    getJobSelect(): ElementFinder {
        return this.jobSelect;
    }

    async getJobSelectedOption() {
        return this.jobSelect.element(by.css('option:checked')).getText();
    }

    async departmentSelectLastOption() {
        await this.departmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async departmentSelectOption(option) {
        await this.departmentSelect.sendKeys(option);
    }

    getDepartmentSelect(): ElementFinder {
        return this.departmentSelect;
    }

    async getDepartmentSelectedOption() {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
