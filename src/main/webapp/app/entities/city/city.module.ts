import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractsSharedModule } from '../../shared';

import { AutoCompleteModule } from 'primeng/autocomplete';
import {
    CityService,
    CityPopupService,
    CityComponent,
    CityDetailComponent,
    CityDialogComponent,
    CityPopupComponent,
    CityDeletePopupComponent,
    CityDeleteDialogComponent,
    cityRoute,
    cityPopupRoute,
    CityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cityRoute,
    ...cityPopupRoute,
];

@NgModule({
    imports: [
        ContractsSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AutoCompleteModule
    ],
    declarations: [
        CityComponent,
        CityDetailComponent,
        CityDialogComponent,
        CityDeleteDialogComponent,
        CityPopupComponent,
        CityDeletePopupComponent,
    ],
    entryComponents: [
        CityComponent,
        CityDialogComponent,
        CityPopupComponent,
        CityDeleteDialogComponent,
        CityDeletePopupComponent,
    ],
    providers: [
        CityService,
        CityPopupService,
        CityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsCityModule {}
