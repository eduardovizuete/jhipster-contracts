import { element, by, ElementFinder } from 'protractor';

export class JobComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-job div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JobUpdatePage {
    pageTitle = element(by.id('jhi-job-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    minSalaryInput = element(by.id('field_minSalary'));
    maxSalaryInput = element(by.id('field_maxSalary'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setMinSalaryInput(minSalary) {
        await this.minSalaryInput.sendKeys(minSalary);
    }

    async getMinSalaryInput() {
        return this.minSalaryInput.getAttribute('value');
    }

    async setMaxSalaryInput(maxSalary) {
        await this.maxSalaryInput.sendKeys(maxSalary);
    }

    async getMaxSalaryInput() {
        return this.maxSalaryInput.getAttribute('value');
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
