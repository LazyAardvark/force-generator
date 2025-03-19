import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolledRosterContainerComponent } from './rolled-roster-container.component';

describe('RolledRosterContainerComponent', () => {
  let component: RolledRosterContainerComponent;
  let fixture: ComponentFixture<RolledRosterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolledRosterContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolledRosterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
