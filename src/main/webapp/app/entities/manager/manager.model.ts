import { BaseEntity } from './../../shared';

export class Manager implements BaseEntity {
    constructor(
        public id?: number,
        public department?: BaseEntity,
        public employee?: BaseEntity,
    ) {
    }
}
