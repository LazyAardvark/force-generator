import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollerRosterContainerComponent } from './roller-roster-container.component';

describe('RollerRosterContainerComponent', () => {
  let component: RollerRosterContainerComponent;
  let fixture: ComponentFixture<RollerRosterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RollerRosterContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollerRosterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
