import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechViewComponent } from './mech-view.component';

describe('MechViewComponent', () => {
  let component: MechViewComponent;
  let fixture: ComponentFixture<MechViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
