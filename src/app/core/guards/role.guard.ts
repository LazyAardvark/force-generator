import { CanActivateChildFn, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  return true;
};

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};

