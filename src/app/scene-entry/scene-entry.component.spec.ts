import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEntryComponent } from './scene-entry.component';

describe('SceneEntryComponent', () => {
  let component: SceneEntryComponent;
  let fixture: ComponentFixture<SceneEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
