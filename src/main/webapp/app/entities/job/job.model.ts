import { BaseEntity } from './../../shared';

export class Job implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public minSalary?: number,
        public maxSalary?: number,
    ) {
    }
}
