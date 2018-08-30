import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CountryComponentsPage, CountryUpdatePage } from './country.page-object';

describe('Country e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let countryUpdatePage: CountryUpdatePage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Countries', async () => {
        await navBarPage.goToEntity('country');
        countryComponentsPage = new CountryComponentsPage();
        expect(await countryComponentsPage.getTitle()).toMatch(/contractsApp.country.home.title/);
    });

    it('should load create Country page', async () => {
        await countryComponentsPage.clickOnCreateButton();
        countryUpdatePage = new CountryUpdatePage();
        expect(await countryUpdatePage.getPageTitle()).toMatch(/contractsApp.country.home.createOrEditLabel/);
        await countryUpdatePage.cancel();
    });

    it('should create and save Countries', async () => {
        await countryComponentsPage.clickOnCreateButton();
        await countryUpdatePage.setNameInput('name');
        expect(await countryUpdatePage.getNameInput()).toMatch('name');
        await countryUpdatePage.save();
        expect(await countryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
