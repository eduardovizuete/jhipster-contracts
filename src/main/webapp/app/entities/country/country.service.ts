import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICountry } from 'app/shared/model/country.model';
import { createRequestOption } from '../../shared';
import { MAX_PAGE_SIZE } from '../../shared';

type EntityResponseType = HttpResponse<ICountry>;
type EntityArrayResponseType = HttpResponse<ICountry[]>;

@Injectable({ providedIn: 'root' })
export class CountryService {
    private resourceUrl = SERVER_API_URL + 'api/countries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/countries';

    private resourceSearchByNameUrl =  this.resourceUrl + '/searchByName';

    constructor(private http: HttpClient) {}

    create(country: ICountry): Observable<EntityResponseType> {
        return this.http.post<ICountry>(this.resourceUrl, country, { observe: 'response' });
    }

    update(country: ICountry): Observable<EntityResponseType> {
        return this.http.put<ICountry>(this.resourceUrl, country, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICountry>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        if (!req) {
            req = {
                page: 0,
                size: MAX_PAGE_SIZE,
                sort: ['name,asc', 'id']
            };
        }
        const options = createRequestOption(req);
        return this.http.get<ICountry[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountry[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    public findCountryByName(name: string): Observable<ICountry[]> {
        if (!name) {
            return Observable.of([]);
        }

        return this.http.get<ICountry[]>(`${this.resourceSearchByNameUrl}/${name}`).catch(error => {
            console.error(JSON.stringify(error));
            return Observable.throw(error);
        });
    }

    queryCountryByName(name: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICountry[]>(`${this.resourceSearchByNameUrl}/${name}`, { params: options, observe: 'response' });
    }
}
