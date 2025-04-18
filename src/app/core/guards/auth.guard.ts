import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
  };

  export const NotAuthGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    if (authService.isAuthenticated()) {
        return true;
      } else {
        return false;
      }
  };