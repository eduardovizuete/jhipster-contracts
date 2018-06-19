import { BaseEntity } from './../../shared';

export class Location implements BaseEntity {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public stateProvince?: string,
        public postalCode?: string,
        public city?: BaseEntity,
    ) {
    }
}
