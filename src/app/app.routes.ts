import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home', 
        loadComponent: () => import('./pages/home/home.component')
            .then( mod => mod.HomeComponent)
    },
    { 
        path: "random-roller",
        loadComponent: () => import('./pages/random-roller/random-roller.component')
            .then( mod => mod.RandomRollerComponent),
        canActivate: [AuthGuard]
    },
    { 
        path: "mechs",
        loadComponent: () => import('./pages/mechs/mechs.component')
            .then( mod => mod.MechsComponent),
        canActivate: [AuthGuard]
    },
    { 
        path: "rosters",
        loadComponent: () => import('./pages/rosters/rosters.component')
            .then( mod => mod.RostersComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**', 
        component: NotFoundComponent,
    },
];
