import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointSystemPageComponent } from './point-system-page.component';

describe('PointSystemPageComponent', () => {
  let component: PointSystemPageComponent;
  let fixture: ComponentFixture<PointSystemPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointSystemPageComponent]
    });
    fixture = TestBed.createComponent(PointSystemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
