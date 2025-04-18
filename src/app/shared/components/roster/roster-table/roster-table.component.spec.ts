import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterTableComponent } from './roster-table.component';

describe('RosterTableComponent', () => {
  let component: RosterTableComponent;
  let fixture: ComponentFixture<RosterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
