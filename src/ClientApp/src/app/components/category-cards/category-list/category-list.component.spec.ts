import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {CategoryCardComponent} from "../category-card/category-card.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, HttpClientTestingModule, TranslateModule.forRoot(), BrowserAnimationsModule ],
      declarations: [ CategoryListComponent, CategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
