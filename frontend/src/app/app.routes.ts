import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';

export const routes: Routes = [
    {
        path: 'auth/sign-in',
        component: LoginFormComponent,
    },
    {
        path: 'auth/sign-up',
        component: RegisterFormComponent,
    }

];
