import { TestBed } from '@angular/core/testing';

import { RollerFacadeService } from './roller-facade.service';

describe('RosterFacadeService', () => {
  let service: RollerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
