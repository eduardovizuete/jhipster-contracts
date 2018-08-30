import { IEmployee } from 'app/shared/model/employee.model';

export interface IJob {
    id?: number;
    title?: string;
    minSalary?: number;
    maxSalary?: number;
    employees?: IEmployee[];
}

export class Job implements IJob {
    constructor(
        public id?: number,
        public title?: string,
        public minSalary?: number,
        public maxSalary?: number,
        public employees?: IEmployee[]
    ) {}
}
