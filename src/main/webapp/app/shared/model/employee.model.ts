import { Moment } from 'moment';
import { IJob } from 'app/shared/model/job.model';
import { IDepartment } from 'app/shared/model/department.model';
import { IManager } from 'app/shared/model/manager.model';

export interface IEmployee {
    id?: number;
    docId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    hireDate?: Moment;
    salary?: number;
    job?: IJob;
    department?: IDepartment;
    managers?: IManager[];
}

export class Employee implements IEmployee {
    constructor(
        public id?: number,
        public docId?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public hireDate?: Moment,
        public salary?: number,
        public job?: IJob,
        public department?: IDepartment,
        public managers?: IManager[]
    ) {}
}
