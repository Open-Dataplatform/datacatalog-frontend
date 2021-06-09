import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AccessListComponent } from './access-list.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {TranslateModule} from "@ngx-translate/core";
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

describe('AccessListComponent', () => {
  let component: AccessListComponent;
  let fixture: ComponentFixture<AccessListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
          SharedModule,
          RouterTestingModule, 
          HttpClientTestingModule, 
          MatListModule,
          MatDialogModule,
          TranslateModule.forRoot() ],
      declarations: [ AccessListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
