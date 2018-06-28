import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ManagerComponent } from './manager.component';
import { ManagerDetailComponent } from './manager-detail.component';
import { ManagerPopupComponent } from './manager-dialog.component';
import { ManagerDeletePopupComponent } from './manager-delete-dialog.component';

@Injectable()
export class ManagerResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const managerRoute: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        resolve: {
            'pagingParams': ManagerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'manager/:id',
        component: ManagerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const managerPopupRoute: Routes = [
    {
        path: 'manager-new',
        component: ManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager/:id/edit',
        component: ManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager/:id/delete',
        component: ManagerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'contractsApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
