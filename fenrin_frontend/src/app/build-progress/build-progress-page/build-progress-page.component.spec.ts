import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProgressPageComponent } from './build-progress-page.component';

describe('BuildProgressPageComponent', () => {
  let component: BuildProgressPageComponent;
  let fixture: ComponentFixture<BuildProgressPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildProgressPageComponent]
    });
    fixture = TestBed.createComponent(BuildProgressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
