import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolledRosterComponent } from './rolled-roster.component';

describe('RolledRosterComponent', () => {
  let component: RolledRosterComponent;
  let fixture: ComponentFixture<RolledRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolledRosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolledRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
