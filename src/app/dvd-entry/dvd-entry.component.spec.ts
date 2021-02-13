import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DvdEntryComponent } from './dvd-entry.component';

describe('DvdEntryComponent', () => {
  let component: DvdEntryComponent;
  let fixture: ComponentFixture<DvdEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DvdEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvdEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
