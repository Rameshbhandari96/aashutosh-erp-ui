import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { LayoutMainComponent } from './layout/pages/layout-main/layout-main.component';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {
        path:'',
        component:LayoutMainComponent,
        canActivate: [authGuard],
        children:[
            {
                path:'auth',
                loadChildren:()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)
            },
            {
                path:'customer',
                loadChildren:()=> import('./modules/customers/customers.module').then(m=>m.CustomersModule)
            },
            {
                path:'dashboard',
                loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
