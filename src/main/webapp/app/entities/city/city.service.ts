import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICity } from 'app/shared/model/city.model';

type EntityResponseType = HttpResponse<ICity>;
type EntityArrayResponseType = HttpResponse<ICity[]>;

@Injectable({ providedIn: 'root' })
export class CityService {
    private resourceUrl = SERVER_API_URL + 'api/cities';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cities';
    private resourceSearchByNameUrl = SERVER_API_URL + this.resourceUrl + '/searchByName';

    constructor(private http: HttpClient) {}

    create(city: ICity): Observable<EntityResponseType> {
        return this.http.post<ICity>(this.resourceUrl, city, { observe: 'response' });
    }

    update(city: ICity): Observable<EntityResponseType> {
        return this.http.put<ICity>(this.resourceUrl, city, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICity[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICity[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
    }

    queryCityByName(name: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICity[]>(`${this.resourceSearchByNameUrl}/${name}`, { params: options, observe: 'response' });
    }
}
