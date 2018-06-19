import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ContractsCountryModule } from './country/country.module';
import { ContractsCityModule } from './city/city.module';
import { ContractsLocationModule } from './location/location.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ContractsCountryModule,
        ContractsCityModule,
        ContractsLocationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractsEntityModule {}
