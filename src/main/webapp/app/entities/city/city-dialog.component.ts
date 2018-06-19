import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { City } from './city.model';
import { CityPopupService } from './city-popup.service';
import { CityService } from './city.service';
import { Country, CountryService } from '../country';
import { FormControl } from '@angular/forms';
import { tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'jhi-city-dialog',
    templateUrl: './city-dialog.component.html'
})
export class CityDialogComponent implements OnInit {

    city: City;
    isSaving: boolean;

    countries: Country[];
    // countryOptions: any[];
    countryOptions: Country[];

    countriesOb: Observable<Country[]>;
    countryName = new FormControl();
    countriesLoading = false;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cityService: CityService,
        private countryService: CountryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        // this.countryService.query()
        //    .subscribe((res: HttpResponse<Country[]>) => { this.countries = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.countriesOb = this.countryName.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap(() => this.countriesLoading = true),
            switchMap((name) => this.countryService.findCountryByName(name)),
            tap(() => this.countriesLoading = false));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<City>>) {
        result.subscribe((res: HttpResponse<City>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: City) {
        this.eventManager.broadcast({ name: 'cityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
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

        this.countryService.queryCountryByName(event.query.toLowerCase())
            .subscribe((res: HttpResponse<Country[]>) => { this.countryOptions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    select(item: Country) {
        this.city.country = item;
        this.countryName.setValue('');
    }
}

@Component({
    selector: 'jhi-city-popup',
    template: ''
})
export class CityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cityPopupService
                    .open(CityDialogComponent as Component, params['id']);
            } else {
                this.cityPopupService
                    .open(CityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
