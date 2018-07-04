/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ContractsTestModule } from '../../../test.module';
import { ManagerComponent } from '../../../../../../main/webapp/app/entities/manager/manager.component';
import { ManagerService } from '../../../../../../main/webapp/app/entities/manager/manager.service';
import { Manager } from '../../../../../../main/webapp/app/entities/manager/manager.model';

describe('Component Tests', () => {

    describe('Manager Management Component', () => {
        let comp: ManagerComponent;
        let fixture: ComponentFixture<ManagerComponent>;
        let service: ManagerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ContractsTestModule],
                declarations: [ManagerComponent],
                providers: [
                    ManagerService
                ]
            })
            .overrideTemplate(ManagerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ManagerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ManagerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Manager(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.managers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
