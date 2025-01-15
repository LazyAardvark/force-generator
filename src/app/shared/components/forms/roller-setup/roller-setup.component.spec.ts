import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollerSetupComponent } from './roller-setup.component';

describe('RollerSetupComponent', () => {
  let component: RollerSetupComponent;
  let fixture: ComponentFixture<RollerSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollerSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
