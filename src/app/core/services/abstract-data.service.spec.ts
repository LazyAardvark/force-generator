import { TestBed } from '@angular/core/testing';

import { AbstractDataService } from './abstract-data.service';

describe('AbstractDataService', () => {
  let service: AbstractDataService<String>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
