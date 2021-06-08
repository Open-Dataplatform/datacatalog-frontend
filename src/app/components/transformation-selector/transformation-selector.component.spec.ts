import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransformationSelectorComponent } from './transformation-selector.component';
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {InputElementsModule} from "../input-elements/input-elements.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('TransformationSelectorComponent', () => {
  let component: TransformationSelectorComponent;
  let fixture: ComponentFixture<TransformationSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, CommonModule, InputElementsModule, HttpClientTestingModule, TranslateModule.forRoot() ],
      declarations: [ TransformationSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Clear transformations', () => {
    component.activeTransformation = {id: "0"};
    component.dataSetTransformation = {id: "0"};
    component.clearTransformation();

    // no dataSetTransformations has been set so the temp  transformation will not be set.
    expect(component.activeTransformation).toBeTruthy(Object.keys(component.activeTransformation).length === 0);
    expect(component.dataSetTransformation).toBeTruthy(Object.keys(component.dataSetTransformation).length === 0);

    component.dataSetTransformation = {id: "0"};
    component.clearTransformation();

    // dataSetTransformations will still have the transoformations so the length will still be 1, active will be cleared tho.
    expect(Object.keys(component.activeTransformation).length === 0).toBeTruthy();
    expect(Object.keys(component.dataSetTransformation).length === 1).toBeTruthy();
  });

  it('showTransformationSelector', () => {
    component.transformations = [{id: "0"}];
    component.dataSetTransformation = {id: "0", sourceDatasets: [{id: "0"}, {id: "1"}]};
    expect(component.showTransformationSelector()).toBeTruthy();

    component.transformations = [];
    expect(component.showTransformationSelector()).toBeFalsy();
  });

  it('showTransformationSelector', () => {
    component.activeTransformation = {id: "10", sourceDatasets: [{id: "0"},]};
    component.changeTransformations();
    expect(component.dataSetTransformation).toEqual({id: "10"});
  });

});
