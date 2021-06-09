import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {SharedModule} from "../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {AuthGuard} from "../../../auth/auth.guard";
import {CategoryPageComponent} from "../../../pages/category-page/category-page.component";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'category/:term',
            loadChildren: () => import('../../../pages/category-page/category-page.module').then(m => m.CategoryPageModule),}
        ]),
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [ SearchComponent ],
      providers: [
        { provide: RouterTestingModule, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search and reset term', () => {
    component.term = 'test search';
    component.goSearch();
    expect(component.term).toBe('');
  });
});

class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) { }
}
