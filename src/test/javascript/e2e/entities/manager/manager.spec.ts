import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ManagerComponentsPage, ManagerUpdatePage } from './manager.page-object';

describe('Manager e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let managerUpdatePage: ManagerUpdatePage;
    let managerComponentsPage: ManagerComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Managers', async () => {
        await navBarPage.goToEntity('manager');
        managerComponentsPage = new ManagerComponentsPage();
        expect(await managerComponentsPage.getTitle()).toMatch(/contractsApp.manager.home.title/);
    });

    it('should load create Manager page', async () => {
        await managerComponentsPage.clickOnCreateButton();
        managerUpdatePage = new ManagerUpdatePage();
        expect(await managerUpdatePage.getPageTitle()).toMatch(/contractsApp.manager.home.createOrEditLabel/);
        await managerUpdatePage.cancel();
    });

    /* it('should create and save Managers', async () => {
        await managerComponentsPage.clickOnCreateButton();
        await managerUpdatePage.departmentSelectLastOption();
        await managerUpdatePage.employeeSelectLastOption();
        await managerUpdatePage.save();
        expect(await managerUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
