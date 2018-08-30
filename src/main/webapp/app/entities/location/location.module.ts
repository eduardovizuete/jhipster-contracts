import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractsSharedModule } from 'app/shared';

import { AutoCompleteModule } from 'primeng/autocomplete';
import {
    LocationComponent,
    LocationDetailComponent,
    LocationUpdateComponent,
    LocationDeletePopupComponent,
    LocationDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [ContractsSharedModule, RouterModule.forChild(ENTITY_STATES), AutoCompleteModule],
    declarations: [
        LocationComponent,
        LocationDetailComponent,
        LocationUpdateComponent,
        LocationDeleteDialogComponent,
        LocationDeletePopupComponent
    ],
    entryComponents: [LocationComponent, LocationUpdateComponent, LocationDeleteDialogComponent, LocationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsLocationModule {}
