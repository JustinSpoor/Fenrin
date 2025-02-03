import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListPageComponent } from './player-list-page.component';

describe('PlayerListPageComponent', () => {
  let component: PlayerListPageComponent;
  let fixture: ComponentFixture<PlayerListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerListPageComponent]
    });
    fixture = TestBed.createComponent(PlayerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
