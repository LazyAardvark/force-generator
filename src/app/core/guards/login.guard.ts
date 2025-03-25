import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if (authService.isAuthenticated()) {
        router.navigate(['/home']);
        return true;
      } else {
        return false;
      }
  };