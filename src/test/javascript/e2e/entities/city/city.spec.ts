import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CityComponentsPage, CityUpdatePage } from './city.page-object';

describe('City e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cityUpdatePage: CityUpdatePage;
    let cityComponentsPage: CityComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Cities', async () => {
        await navBarPage.goToEntity('city');
        cityComponentsPage = new CityComponentsPage();
        expect(await cityComponentsPage.getTitle()).toMatch(/contractsApp.city.home.title/);
    });

    it('should load create City page', async () => {
        await cityComponentsPage.clickOnCreateButton();
        cityUpdatePage = new CityUpdatePage();
        expect(await cityUpdatePage.getPageTitle()).toMatch(/contractsApp.city.home.createOrEditLabel/);
        await cityUpdatePage.cancel();
    });

    /* it('should create and save Cities', async () => {
        await cityComponentsPage.clickOnCreateButton();
        await cityUpdatePage.setNameInput('name');
        expect(await cityUpdatePage.getNameInput()).toMatch('name');
        await cityUpdatePage.countrySelectLastOption();
        await cityUpdatePage.save();
        expect(await cityUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
