import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCreationComponent } from './roster-creation.component';

describe('RosterCreationComponent', () => {
  let component: RosterCreationComponent;
  let fixture: ComponentFixture<RosterCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
