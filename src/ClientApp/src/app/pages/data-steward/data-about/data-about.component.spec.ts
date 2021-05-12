import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAboutComponent } from './data-about.component';
import {SharedModule} from "../../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {InputElementsModule} from "../../../components/input-elements/input-elements.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('DataAboutComponent', () => {
  let component: DataAboutComponent;
  let fixture: ComponentFixture<DataAboutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CommonModule,
        InputElementsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot() ],
      declarations: [ DataAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Is data present', () => {
    component.data = {};
    expect(component.isDataExisting()).toBeFalsy();
  });

  it('Format UTC time to a readable string', () => {
    expect(component.formatTime("1337-12-24T13:37:00")).toBe("24/12/1337 - 13:37:00");
  });
});
