import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FeatureFlagService } from '../services/feature-flag/feature-flag.service';

export function featureFlagGuard(flagName: string): CanActivateFn {
  return () => {
  const featureFlagsService: FeatureFlagService = inject(FeatureFlagService);

  return featureFlagsService.isFeatureEnabled(flagName)
  }
};
