import { TestBed } from '@angular/core/testing';

import { BattleValueService } from './battle-value.service';

describe('BattleValueService', () => {
  let service: BattleValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
