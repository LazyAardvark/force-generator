import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export function RoleGuard(expectedRole: string) : CanActivateFn {
   return() => {
    const userRole: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (userRole.getRole().toLowerCase() == expectedRole) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  }
};

export function RoleChildGuard(expectedRole: string) : CanActivateChildFn {
  return() => {
   const userRole: AuthService = inject(AuthService);
   const router: Router = inject(Router);
   if (userRole.getRole().toLowerCase() == expectedRole) {
     return true;
   } else {
     router.navigate(['/home']);
     return false;
   }
 }
};

export const AdminGuard: CanActivateFn = () => {
  const userRole: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (userRole.getRole().toLowerCase() == "admin") {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

export const AdminChildGuard: CanActivateChildFn = () => {
    const userRole: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (userRole.getRole().toLowerCase() == "admin") {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
};