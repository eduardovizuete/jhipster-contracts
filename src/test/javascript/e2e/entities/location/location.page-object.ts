import { element, by, ElementFinder } from 'protractor';

export class LocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-location div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LocationUpdatePage {
    pageTitle = element(by.id('jhi-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    streetAddressInput = element(by.id('field_streetAddress'));
    stateProvinceInput = element(by.id('field_stateProvince'));
    postalCodeInput = element(by.id('field_postalCode'));
    citySelect = element(by.id('field_city'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStreetAddressInput(streetAddress) {
        await this.streetAddressInput.sendKeys(streetAddress);
    }

    async getStreetAddressInput() {
        return this.streetAddressInput.getAttribute('value');
    }

    async setStateProvinceInput(stateProvince) {
        await this.stateProvinceInput.sendKeys(stateProvince);
    }

    async getStateProvinceInput() {
        return this.stateProvinceInput.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async citySelectLastOption() {
        await this.citySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async citySelectOption(option) {
        await this.citySelect.sendKeys(option);
    }

    getCitySelect(): ElementFinder {
        return this.citySelect;
    }

    async getCitySelectedOption() {
        return this.citySelect.element(by.css('option:checked')).getText();
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
