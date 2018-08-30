import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Manager e2e test', () => {

    let navBarPage: NavBarPage;
    let managerDialogPage: ManagerDialogPage;
    let managerComponentsPage: ManagerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Managers', () => {
        navBarPage.goToEntity('manager');
        managerComponentsPage = new ManagerComponentsPage();
        expect(managerComponentsPage.getTitle())
            .toMatch(/contractsApp.manager.home.title/);

    });

    it('should load create Manager dialog', () => {
        managerComponentsPage.clickOnCreateButton();
        managerDialogPage = new ManagerDialogPage();
        expect(managerDialogPage.getModalTitle())
            .toMatch(/contractsApp.manager.home.createOrEditLabel/);
        managerDialogPage.close();
    });

   /* it('should create and save Managers', () => {
        managerComponentsPage.clickOnCreateButton();
        managerDialogPage.departmentSelectLastOption();
        managerDialogPage.employeeSelectLastOption();
        managerDialogPage.save();
        expect(managerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ManagerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-manager div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ManagerDialogPage {
    modalTitle = element(by.css('h4#myManagerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    departmentSelect = element(by.css('select#field_department'));
    employeeSelect = element(by.css('select#field_employee'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    departmentSelectLastOption = function() {
        this.departmentSelect.all(by.tagName('option')).last().click();
    };

    departmentSelectOption = function(option) {
        this.departmentSelect.sendKeys(option);
    };

    getDepartmentSelect = function() {
        return this.departmentSelect;
    };

    getDepartmentSelectedOption = function() {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    };

    employeeSelectLastOption = function() {
        this.employeeSelect.all(by.tagName('option')).last().click();
    };

    employeeSelectOption = function(option) {
        this.employeeSelect.sendKeys(option);
    };

    getEmployeeSelect = function() {
        return this.employeeSelect;
    };

    getEmployeeSelectedOption = function() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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
