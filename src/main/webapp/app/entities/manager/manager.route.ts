import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Manager } from 'app/shared/model/manager.model';
import { ManagerService } from './manager.service';
import { ManagerComponent } from './manager.component';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerUpdateComponent } from './manager-update.component';
import { ManagerDeletePopupComponent } from './manager-delete-dialog.component';
import { IManager } from 'app/shared/model/manager.model';

@Injectable({ providedIn: 'root' })
export class ManagerResolve implements Resolve<IManager> {
    constructor(private service: ManagerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((manager: HttpResponse<Manager>) => manager.body));
        }
        return of(new Manager());
    }
}

export const managerRoute: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/:id/view',
        component: ManagerDetailComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/new',
        component: ManagerUpdateComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'manager/:id/edit',
        component: ManagerUpdateComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const managerPopupRoute: Routes = [
    {
        path: 'manager/:id/delete',
        component: ManagerDeletePopupComponent,
        resolve: {
            manager: ManagerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
