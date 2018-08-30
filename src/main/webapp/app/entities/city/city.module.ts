import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractsSharedModule } from 'app/shared';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

import {
    CityComponent,
    CityDetailComponent,
    CityUpdateComponent,
    CityDeletePopupComponent,
    CityDeleteDialogComponent,
    cityRoute,
    cityPopupRoute
} from './';

const ENTITY_STATES = [...cityRoute, ...cityPopupRoute];

@NgModule({
    imports: [ContractsSharedModule, RouterModule.forChild(ENTITY_STATES), AutoCompleteModule, ReactiveFormsModule],
    declarations: [CityComponent, CityDetailComponent, CityUpdateComponent, CityDeleteDialogComponent, CityDeletePopupComponent],
    entryComponents: [CityComponent, CityUpdateComponent, CityDeleteDialogComponent, CityDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsCityModule {} 
