import { ICity } from 'app/shared/model/city.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface ILocation {
    id?: number;
    streetAddress?: string;
    stateProvince?: string;
    postalCode?: string;
    city?: ICity;
    departments?: IDepartment[];
}

export class Location implements ILocation {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public stateProvince?: string,
        public postalCode?: string,
        public city?: ICity,
        public departments?: IDepartment[]
    ) {}
}
