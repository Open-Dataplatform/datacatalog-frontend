import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataFieldComponent } from './data-field.component';
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {InputElementsModule} from "../input-elements/input-elements.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('DataFieldComponent', () => {
  let component: DataFieldComponent;
  let fixture: ComponentFixture<DataFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, CommonModule, InputElementsModule, HttpClientTestingModule, TranslateModule.forRoot() ],
      declarations: [ DataFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
