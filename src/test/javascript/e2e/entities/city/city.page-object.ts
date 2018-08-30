import { element, by, ElementFinder } from 'protractor';

export class CityComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-city div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CityUpdatePage {
    pageTitle = element(by.id('jhi-city-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    countrySelect = element(by.id('field_country'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async countrySelectLastOption() {
        await this.countrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async countrySelectOption(option) {
        await this.countrySelect.sendKeys(option);
    }

    getCountrySelect(): ElementFinder {
        return this.countrySelect;
    }

    async getCountrySelectedOption() {
        return this.countrySelect.element(by.css('option:checked')).getText();
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
