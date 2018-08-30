import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContractsSharedModule } from '../../shared';
import {
    ManagerService,
    ManagerPopupService,
    ManagerComponent,
    ManagerDetailComponent,
    ManagerDialogComponent,
    ManagerPopupComponent,
    ManagerDeletePopupComponent,
    ManagerDeleteDialogComponent,
    managerRoute,
    managerPopupRoute,
    ManagerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...managerRoute,
    ...managerPopupRoute,
];

@NgModule({
    imports: [
        ContractsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManagerComponent,
        ManagerDetailComponent,
        ManagerDialogComponent,
        ManagerDeleteDialogComponent,
        ManagerPopupComponent,
        ManagerDeletePopupComponent,
    ],
    entryComponents: [
        ManagerComponent,
        ManagerDialogComponent,
        ManagerPopupComponent,
        ManagerDeleteDialogComponent,
        ManagerDeletePopupComponent,
    ],
    providers: [
        ManagerService,
        ManagerPopupService,
        ManagerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsManagerModule {}
