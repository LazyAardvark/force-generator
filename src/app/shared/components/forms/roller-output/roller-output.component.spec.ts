import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollerOutputComponent } from './roller-output.component';

describe('RollerOutputComponent', () => {
  let component: RollerOutputComponent;
  let fixture: ComponentFixture<RollerOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollerOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollerOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
