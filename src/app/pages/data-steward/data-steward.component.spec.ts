import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataStewardComponent } from './data-steward.component';
import {SharedModule} from "../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {InputElementsModule} from "../../components/input-elements/input-elements.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('DataStewardComponent', () => {
  let component: DataStewardComponent;
  let fixture: ComponentFixture<DataStewardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        InputElementsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      declarations: [ DataStewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
