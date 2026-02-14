import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const allowedRoles = route.data['roles'] as UserRole[];

    if (authService.hasRole(allowedRoles)) {
        return true;
    }

    // Redirect to dashboard if user doesn't have required role
    return router.navigate(['/dashboard']);
};
