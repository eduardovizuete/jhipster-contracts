import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Department e2e test', () => {

    let navBarPage: NavBarPage;
    let departmentDialogPage: DepartmentDialogPage;
    let departmentComponentsPage: DepartmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Departments', () => {
        navBarPage.goToEntity('department');
        departmentComponentsPage = new DepartmentComponentsPage();
        expect(departmentComponentsPage.getTitle())
            .toMatch(/contractsApp.department.home.title/);

    });

    it('should load create Department dialog', () => {
        departmentComponentsPage.clickOnCreateButton();
        departmentDialogPage = new DepartmentDialogPage();
        expect(departmentDialogPage.getModalTitle())
            .toMatch(/contractsApp.department.home.createOrEditLabel/);
        departmentDialogPage.close();
    });

   /* it('should create and save Departments', () => {
        departmentComponentsPage.clickOnCreateButton();
        departmentDialogPage.setNameInput('name');
        expect(departmentDialogPage.getNameInput()).toMatch('name');
        departmentDialogPage.locationSelectLastOption();
        departmentDialogPage.save();
        expect(departmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DepartmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-department div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DepartmentDialogPage {
    modalTitle = element(by.css('h4#myDepartmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    locationSelect = element(by.css('select#field_location'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    locationSelectLastOption = function() {
        this.locationSelect.all(by.tagName('option')).last().click();
    };

    locationSelectOption = function(option) {
        this.locationSelect.sendKeys(option);
    };

    getLocationSelect = function() {
        return this.locationSelect;
    };

    getLocationSelectedOption = function() {
        return this.locationSelect.element(by.css('option:checked')).getText();
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
