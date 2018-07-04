import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Manager } from './manager.model';
import { ManagerPopupService } from './manager-popup.service';
import { ManagerService } from './manager.service';
import { Department, DepartmentService } from '../department';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-manager-dialog',
    templateUrl: './manager-dialog.component.html'
})
export class ManagerDialogComponent implements OnInit {

    manager: Manager;
    isSaving: boolean;

    departments: Department[];

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private managerService: ManagerService,
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        // this.departmentService.query()
        //     .subscribe((res: HttpResponse<Department[]>) => { this.departments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        // this.employeeService.query()
        //     .subscribe((res: HttpResponse<Employee[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.manager.id !== undefined) {
            this.subscribeToSaveResponse(
                this.managerService.update(this.manager));
        } else {
            this.subscribeToSaveResponse(
                this.managerService.create(this.manager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Manager>>) {
        result.subscribe((res: HttpResponse<Manager>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Manager) {
        this.eventManager.broadcast({ name: 'managerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    searchEmployeeByDocId(event) {
        this.employeeService.queryByDocId(event.query.toLowerCase())
            .subscribe(
                (res: HttpResponse<Employee[]>) => {
                    this.employees = res.body; },
                (res: HttpErrorResponse) =>
                    this.onError(res.message));
    }

    searchEmployeeByName(event) {
        this.employeeService.queryByName(event.query.toLowerCase())
            .subscribe(
                (res: HttpResponse<Employee[]>) => {
                    this.employees = res.body; },
                (res: HttpErrorResponse) =>
                    this.onError(res.message));
    }

    searchDepartmentByName(event) {
        this.departmentService.queryByName(event.query.toLowerCase())
            .subscribe(
                (res: HttpResponse<Employee[]>) => {
                    this.departments = res.body; },
                (res: HttpErrorResponse) =>
                    this.onError(res.message));
    }
}

@Component({
    selector: 'jhi-manager-popup',
    template: ''
})
export class ManagerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private managerPopupService: ManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.managerPopupService
                    .open(ManagerDialogComponent as Component, params['id']);
            } else {
                this.managerPopupService
                    .open(ManagerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
