import { IDepartment } from 'app/shared/model/department.model';
import { IEmployee } from 'app/shared/model/employee.model';

export interface IManager {
    id?: number;
    department?: IDepartment;
    employee?: IEmployee;
}

export class Manager implements IManager {
    constructor(public id?: number, public department?: IDepartment, public employee?: IEmployee) {}
}
