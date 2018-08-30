import { ICountry } from 'app/shared/model/country.model';
import { ILocation } from 'app/shared/model/location.model';

export interface ICity {
    id?: number;
    name?: string;
    country?: ICountry;
    locations?: ILocation[];
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public country?: ICountry, public locations?: ILocation[]) {}
}
