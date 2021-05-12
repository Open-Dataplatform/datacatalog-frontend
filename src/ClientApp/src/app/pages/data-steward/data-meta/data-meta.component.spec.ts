import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataMetaComponent } from './data-meta.component';
import {SharedModule} from "../../../shared/shared.module";
import {InputElementsModule} from "../../../components/input-elements/input-elements.module";
import {CommonModule} from "@angular/common";
import {TransformationSelectorComponent} from "../../../components/transformation-selector/transformation-selector.component";
import {DataFieldComponent} from "../../../components/data-field/data-field.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";

describe('DataMetaComponent', () => {
  let component: DataMetaComponent;
  let fixture: ComponentFixture<DataMetaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        InputElementsModule,
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot() ],
      declarations: [ DataMetaComponent, TransformationSelectorComponent, DataFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
