import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfiniteScrollComponent } from './infinity-scroll.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

describe('InfinityScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule ],
      declarations: [ InfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});