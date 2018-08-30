import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICity } from 'app/shared/model/city.model';
import { CityService } from './city.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'jhi-city-update',
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent implements OnInit {
    private _city: ICity;
    isSaving: boolean;

    countries: ICountry[];
    // countryOptions: any[];
    countryOptions: ICountry[];

    countriesOb: Observable<ICountry[]>;
    countryName = new FormControl();
    countriesLoading = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private cityService: CityService,
        private countryService: CountryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ city }) => {
            this.city = city;
        });
        // this.countryService.query().subscribe(
        //     (res: HttpResponse<ICountry[]>) => {
        //         this.countries = res.body;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        this.countriesOb = this.countryName.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap(() => (this.countriesLoading = true)),
            switchMap(name => this.countryService.findCountryByName(name)),
            tap(() => (this.countriesLoading = false))
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICity>>) {
        result.subscribe((res: HttpResponse<ICity>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }
    get city() {
        return this._city;
    }

    set city(city: ICity) {
        this._city = city;
    }

    search(event) {
        // this.countryOptions = this.countries.filter((beer) =>
        //     beer.name.toLowerCase().startsWith(event.query.toLowerCase()));
        //
        // this.mylookupservice.getResults(event.query).then(data => {
        //     this.results = data;
        // });
        // this.countryService.query()
        //    .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        // this.countryService.findCountryByName(event.query.toLowerCase())
        //     .subscribe((res) => { this.countryOptions = res; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.countryService.queryCountryByName(event.query.toLowerCase()).subscribe(
            (res: HttpResponse<ICountry[]>) => {
                this.countryOptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    select(item: ICountry) {
        this.city.country = item;
        this.countryName.setValue('');
    }
}
