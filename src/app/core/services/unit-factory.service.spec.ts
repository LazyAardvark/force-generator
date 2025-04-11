import { TestBed } from '@angular/core/testing';

import { UnitFactoryService } from './unit-factory.service';

describe('MechFactoryService', () => {
  let service: UnitFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
