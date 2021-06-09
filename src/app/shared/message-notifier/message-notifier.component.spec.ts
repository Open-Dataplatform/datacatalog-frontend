import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MessageNotifierComponent } from './message-notifier.component';
import {SharedModule} from "../shared.module";
import {TranslateModule} from "@ngx-translate/core";

describe('MessageNotifierComponent', () => {
  let component: MessageNotifierComponent;
  let fixture: ComponentFixture<MessageNotifierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, TranslateModule.forRoot(), HttpClientTestingModule ],
      declarations: [ MessageNotifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
