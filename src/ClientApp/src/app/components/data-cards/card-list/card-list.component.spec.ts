import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CardListComponent } from './card-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {TagsListComponent} from "../../tags-list/tags-list.component";
import {DataCardComponent} from "../data-card/data-card.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, BrowserAnimationsModule, HttpClientTestingModule ],
      declarations: [ CardListComponent, TagsListComponent, DataCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
