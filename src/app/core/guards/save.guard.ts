import { CanDeactivateFn } from '@angular/router';

export const saveGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
