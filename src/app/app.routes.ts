import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard, NotAuthGuard } from './core/guards/auth.guard';
import { FeatureFlagGuard } from './core/guards/feature-flag.guard';
import { SaveGuard } from './core/guards/save.guard';

import { AdminChildGuard, AdminGuard, RoleChildGuard, RoleGuard} from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
            .then(mod => mod.HomeComponent)
    },
    {
        path: "random-roller",
        loadComponent: () => import('./pages/random-roller/random-roller.component')
            .then(mod => mod.RandomRollerComponent),
        canActivate: [AuthGuard, FeatureFlagGuard("roller")]
    },
    {
        path: "mechs",
        loadComponent: () => import('./pages/mechs/mechs.component')
            .then(mod => mod.MechsComponent),
        canActivate: [AuthGuard, FeatureFlagGuard("mechs")]
    },
    {
        path: "rosters",
        loadComponent: () => import('./pages/rosters/rosters.component')
            .then(mod => mod.RostersComponent),
        canActivate: [AuthGuard, FeatureFlagGuard("roster")]
    },
    {
        path: "user",
        loadComponent: () => import('./pages/user/user.component')
            .then(mod => mod.UserComponent),
        canLoad: [FeatureFlagGuard("user")],
        canActivateChild: [FeatureFlagGuard("user")],
        children: [
            {
                path: "login",
                loadComponent: () => import('./pages/user/login/login.component')
                    .then(mod => mod.LoginComponent),
                canActivate: [NotAuthGuard, FeatureFlagGuard("login")]
            },
            {
                path: "profile",
                loadComponent: () => import('./pages/user/profile/profile.component')
                    .then(mod => mod.ProfileComponent),
                canActivate: [AuthGuard]
            },
            {
                path: "sign-up",
                loadComponent: () => import('./pages/user/sign-up/sign-up.component')
                    .then(mod => mod.SignUpComponent),
                canActivate: [NotAuthGuard]
            },
            {
                path: "sign-out",
                loadComponent: () => import('./pages/user/sign-out/sign-out.component')
                    .then(mod => mod.SignOutComponent),
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: "admin",
        loadComponent: () => import('./pages/admin/admin.component')
            .then(mod => mod.AdminComponent),
        canLoad: [AuthGuard, AdminGuard],
        canActivateChild: [AdminChildGuard],
        children:[]
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
