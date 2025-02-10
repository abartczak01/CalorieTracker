import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'sign-in',
                component: LoginFormComponent,
            },
            {
                path: 'sign-up',
                component: RegisterFormComponent,
            }
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            {
                path: "dashboard",
                component: AdminDashboardComponent
            },

            {
                path: "users",
                children: [
                    {
                        path: "",
                        component: UserListComponent,
                    },
                ]
            },
            {
                path: "products",
                children: [
                    {
                        path: '',
                        component: ProductListComponent,
                    },
                    {
                        path: 'edit/:id',
                        component: ProductFormComponent,
                    },
                    {
                        path: 'add',
                        component: ProductFormComponent,
                    },
                ],
            },
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "",
        redirectTo: "auth/sign-in",
        pathMatch: "full"
    }
];
