import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JobComponentsPage, JobUpdatePage } from './job.page-object';

describe('Job e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let jobUpdatePage: JobUpdatePage;
    let jobComponentsPage: JobComponentsPage;

    beforeAll(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Jobs', async () => {
        await navBarPage.goToEntity('job');
        jobComponentsPage = new JobComponentsPage();
        expect(await jobComponentsPage.getTitle()).toMatch(/contractsApp.job.home.title/);
    });

    it('should load create Job page', async () => {
        await jobComponentsPage.clickOnCreateButton();
        jobUpdatePage = new JobUpdatePage();
        expect(await jobUpdatePage.getPageTitle()).toMatch(/contractsApp.job.home.createOrEditLabel/);
        await jobUpdatePage.cancel();
    });

    it('should create and save Jobs', async () => {
        await jobComponentsPage.clickOnCreateButton();
        await jobUpdatePage.setTitleInput('title');
        expect(await jobUpdatePage.getTitleInput()).toMatch('title');
        await jobUpdatePage.setMinSalaryInput('5');
        expect(await jobUpdatePage.getMinSalaryInput()).toMatch('5');
        await jobUpdatePage.setMaxSalaryInput('5');
        expect(await jobUpdatePage.getMaxSalaryInput()).toMatch('5');
        await jobUpdatePage.save();
        expect(await jobUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(async () => {
        await navBarPage.autoSignOut();
    });
});
