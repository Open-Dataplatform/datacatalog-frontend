import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelationMapperComponent } from './relation-mapper.component';
import {SharedModule} from "../../shared/shared.module";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";

describe('RelationMapperComponent', () => {
  let component: RelationMapperComponent;
  let fixture: ComponentFixture<RelationMapperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot() ],
      declarations: [ RelationMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
