import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechsComponent } from './mechs.component';

describe('MechsComponent', () => {
  let component: MechsComponent;
  let fixture: ComponentFixture<MechsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
