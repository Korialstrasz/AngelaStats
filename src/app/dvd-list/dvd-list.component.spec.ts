import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DvdListComponent } from './dvd-list.component';

describe('DvdListComponent', () => {
  let component: DvdListComponent;
  let fixture: ComponentFixture<DvdListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DvdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
