import { ILocation } from 'app/shared/model/location.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { IManager } from 'app/shared/model/manager.model';

export interface IDepartment {
    id?: number;
    name?: string;
    location?: ILocation;
    employees?: IEmployee[];
    managers?: IManager[];
}

export class Department implements IDepartment {
    constructor(
        public id?: number,
        public name?: string,
        public location?: ILocation,
        public employees?: IEmployee[],
        public managers?: IManager[]
    ) {}
}
