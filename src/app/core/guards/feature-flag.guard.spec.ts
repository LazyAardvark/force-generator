import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { FeatureFlagGuard } from './feature-flag.guard';



describe('FeatureFlagGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => FeatureFlagGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
