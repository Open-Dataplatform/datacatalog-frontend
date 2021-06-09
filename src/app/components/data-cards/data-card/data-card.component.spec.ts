import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataCardComponent } from './data-card.component';
import {SharedModule} from "../../../shared/shared.module";
import {TagsListComponent} from "../../tags-list/tags-list.component";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DataCardComponent', () => {
  let component: DataCardComponent;
  let fixture: ComponentFixture<DataCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule ],
      declarations: [ DataCardComponent, TagsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
