import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataSetComponent } from './data-set.component';
import {SharedModule} from "../../../shared/shared.module";
import {InputElementsModule} from "../../../components/input-elements/input-elements.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

describe('DataSetComponent', () => {
  let component: DataSetComponent;
  let fixture: ComponentFixture<DataSetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule,
        InputElementsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [ DataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This will set the data.name and check it shows in the interface (input field), then change value in input field and lastly check it in model.
  it("Should change name", waitForAsync(() => {

    const sendInput = (inputElement: any, text: string) => {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    };

    component.data.name = "testName";
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const compiled = fixture.debugElement.query(By.css('#data-name')).nativeElement;
      const childInputField = compiled.children[0];
      expect(childInputField.value).toContain("testName");

      sendInput(childInputField, 'newTestName').then( () => {
        expect(fixture.componentInstance.data.name).toContain("newTestName");
      });
    });

  }));
});
