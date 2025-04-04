import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechCreationComponent } from './mech-creation.component';

describe('MechCreationComponent', () => {
  let component: MechCreationComponent;
  let fixture: ComponentFixture<MechCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
