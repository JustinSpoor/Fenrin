import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytimeEditPageComponent } from './playtime-edit-page.component';

describe('PlaytimeEditPageComponent', () => {
  let component: PlaytimeEditPageComponent;
  let fixture: ComponentFixture<PlaytimeEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaytimeEditPageComponent]
    });
    fixture = TestBed.createComponent(PlaytimeEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
