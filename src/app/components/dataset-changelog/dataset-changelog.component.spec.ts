import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetChangelogComponent } from './dataset-changelog.component';

describe('DatasetChangelogComponent', () => {
  let component: DatasetChangelogComponent;
  let fixture: ComponentFixture<DatasetChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetChangelogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
