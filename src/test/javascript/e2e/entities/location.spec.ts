import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Location e2e test', () => {

    let navBarPage: NavBarPage;
    let locationDialogPage: LocationDialogPage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle())
            .toMatch(/contractsApp.location.home.title/);

    });

    it('should load create Location dialog', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage = new LocationDialogPage();
        expect(locationDialogPage.getModalTitle())
            .toMatch(/contractsApp.location.home.createOrEditLabel/);
        locationDialogPage.close();
    });

   /* it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationDialogPage.setStreetAddressInput('streetAddress');
        expect(locationDialogPage.getStreetAddressInput()).toMatch('streetAddress');
        locationDialogPage.setStateProvinceInput('stateProvince');
        expect(locationDialogPage.getStateProvinceInput()).toMatch('stateProvince');
        locationDialogPage.setPostalCodeInput('postalCode');
        expect(locationDialogPage.getPostalCodeInput()).toMatch('postalCode');
        locationDialogPage.citySelectLastOption();
        locationDialogPage.save();
        expect(locationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LocationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-location div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LocationDialogPage {
    modalTitle = element(by.css('h4#myLocationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    streetAddressInput = element(by.css('input#field_streetAddress'));
    stateProvinceInput = element(by.css('input#field_stateProvince'));
    postalCodeInput = element(by.css('input#field_postalCode'));
    citySelect = element(by.css('select#field_city'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStreetAddressInput = function(streetAddress) {
        this.streetAddressInput.sendKeys(streetAddress);
    };

    getStreetAddressInput = function() {
        return this.streetAddressInput.getAttribute('value');
    };

    setStateProvinceInput = function(stateProvince) {
        this.stateProvinceInput.sendKeys(stateProvince);
    };

    getStateProvinceInput = function() {
        return this.stateProvinceInput.getAttribute('value');
    };

    setPostalCodeInput = function(postalCode) {
        this.postalCodeInput.sendKeys(postalCode);
    };

    getPostalCodeInput = function() {
        return this.postalCodeInput.getAttribute('value');
    };

    citySelectLastOption = function() {
        this.citySelect.all(by.tagName('option')).last().click();
    };

    citySelectOption = function(option) {
        this.citySelect.sendKeys(option);
    };

    getCitySelect = function() {
        return this.citySelect;
    };

    getCitySelectedOption = function() {
        return this.citySelect.element(by.css('option:checked')).getText();
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
