import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataFieldDisplayComponent } from './data-field-display.component';
import {SharedModule} from "../../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('DataFieldDisplayComponent', () => {
  let component: DataFieldDisplayComponent;
  let fixture: ComponentFixture<DataFieldDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, HttpClientTestingModule, TranslateModule.forRoot() ],
      declarations: [ DataFieldDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
