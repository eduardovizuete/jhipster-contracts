import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IManager } from 'app/shared/model/manager.model';
import { ManagerService } from './manager.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
    selector: 'jhi-manager-update',
    templateUrl: './manager-update.component.html'
})
export class ManagerUpdateComponent implements OnInit {
    private _manager: IManager;
    isSaving: boolean;

    departments: IDepartment[];

    employees: IEmployee[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private managerService: ManagerService,
        private departmentService: DepartmentService,
        private employeeService: EmployeeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ manager }) => {
            this.manager = manager;
        });
        // this.departmentService.query().subscribe(
        //     (res: HttpResponse<IDepartment[]>) => {
        //         this.departments = res.body;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
        // this.employeeService.query().subscribe(
        //     (res: HttpResponse<IEmployee[]>) => {
        //         this.employees = res.body;
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.manager.id !== undefined) {
            this.subscribeToSaveResponse(this.managerService.update(this.manager));
        } else {
            this.subscribeToSaveResponse(this.managerService.create(this.manager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IManager>>) {
        result.subscribe((res: HttpResponse<IManager>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartment) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
    get manager() {
        return this._manager;
    }

    set manager(manager: IManager) {
        this._manager = manager;
    }

    searchEmployeeByName(event) {
        this.employeeService.queryByName(event.query.toLowerCase()).subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    searchDepartmentByName(event) {
        this.departmentService.queryByName(event.query.toLowerCase()).subscribe(
            (res: HttpResponse<IDepartment[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
}
