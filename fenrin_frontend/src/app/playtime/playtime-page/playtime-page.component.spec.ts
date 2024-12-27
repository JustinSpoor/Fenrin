import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytimePageComponent } from './playtime-page.component';

describe('PlaytimePageComponent', () => {
  let component: PlaytimePageComponent;
  let fixture: ComponentFixture<PlaytimePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaytimePageComponent]
    });
    fixture = TestBed.createComponent(PlaytimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
