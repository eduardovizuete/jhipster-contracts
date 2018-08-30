import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DepartmentComponentsPage, DepartmentUpdatePage } from './department.page-object';

describe('Department e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let departmentUpdatePage: DepartmentUpdatePage;
    let departmentComponentsPage: DepartmentComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Departments', async () => {
        await navBarPage.goToEntity('department');
        departmentComponentsPage = new DepartmentComponentsPage();
        expect(await departmentComponentsPage.getTitle()).toMatch(/contractsApp.department.home.title/);
    });

    it('should load create Department page', async () => {
        await departmentComponentsPage.clickOnCreateButton();
        departmentUpdatePage = new DepartmentUpdatePage();
        expect(await departmentUpdatePage.getPageTitle()).toMatch(/contractsApp.department.home.createOrEditLabel/);
        await departmentUpdatePage.cancel();
    });

    /* it('should create and save Departments', async () => {
        await departmentComponentsPage.clickOnCreateButton();
        await departmentUpdatePage.setNameInput('name');
        expect(await departmentUpdatePage.getNameInput()).toMatch('name');
        await departmentUpdatePage.locationSelectLastOption();
        await departmentUpdatePage.save();
        expect(await departmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
