import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocationComponentsPage, LocationUpdatePage } from './location.page-object';

describe('Location e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let locationUpdatePage: LocationUpdatePage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Locations', async () => {
        await navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(await locationComponentsPage.getTitle()).toMatch(/contractsApp.location.home.title/);
    });

    it('should load create Location page', async () => {
        await locationComponentsPage.clickOnCreateButton();
        locationUpdatePage = new LocationUpdatePage();
        expect(await locationUpdatePage.getPageTitle()).toMatch(/contractsApp.location.home.createOrEditLabel/);
        await locationUpdatePage.cancel();
    });

    /* it('should create and save Locations', async () => {
        await locationComponentsPage.clickOnCreateButton();
        await locationUpdatePage.setStreetAddressInput('streetAddress');
        expect(await locationUpdatePage.getStreetAddressInput()).toMatch('streetAddress');
        await locationUpdatePage.setStateProvinceInput('stateProvince');
        expect(await locationUpdatePage.getStateProvinceInput()).toMatch('stateProvince');
        await locationUpdatePage.setPostalCodeInput('postalCode');
        expect(await locationUpdatePage.getPostalCodeInput()).toMatch('postalCode');
        await locationUpdatePage.citySelectLastOption();
        await locationUpdatePage.save();
        expect(await locationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
