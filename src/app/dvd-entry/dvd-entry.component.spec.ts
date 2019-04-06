import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvdEntryComponent } from './dvd-entry.component';

describe('DvdEntryComponent', () => {
  let component: DvdEntryComponent;
  let fixture: ComponentFixture<DvdEntryComponent>;

  beforeEach(async(() => {
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
