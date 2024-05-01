import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./contacts/conyacts.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./contacts-form/contacts-form.component')
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./contacts-form/contacts-form.component')
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
