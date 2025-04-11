import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechEditComponent } from './mech-edit.component';

describe('MechEditComponent', () => {
  let component: MechEditComponent;
  let fixture: ComponentFixture<MechEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
