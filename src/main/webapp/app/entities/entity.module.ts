import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ContractsCountryModule } from './country/country.module';
import { ContractsCityModule } from './city/city.module';
import { ContractsLocationModule } from './location/location.module';
import { ContractsDepartmentModule } from './department/department.module';
import { ContractsJobModule } from './job/job.module';
import { ContractsEmployeeModule } from './employee/employee.module';
import { ContractsManagerModule } from './manager/manager.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ContractsCountryModule,
        ContractsCityModule,
        ContractsLocationModule,
        ContractsDepartmentModule,
        ContractsJobModule,
        ContractsEmployeeModule,
        ContractsManagerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsEntityModule {}
