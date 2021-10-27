import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetChangelogItemComponent } from './dataset-changelog-item.component';

describe('DatasetChangelogItemComponent', () => {
  let component: DatasetChangelogItemComponent;
  let fixture: ComponentFixture<DatasetChangelogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetChangelogItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetChangelogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
