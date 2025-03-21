import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRollerComponent } from './random-roller.component';

describe('RandomRollerComponent', () => {
  let component: RandomRollerComponent;
  let fixture: ComponentFixture<RandomRollerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomRollerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
