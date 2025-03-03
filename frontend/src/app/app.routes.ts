import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { adminGuard } from './guards/admin.guard';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { userGuard } from './guards/user.guard';
import { DailyMenuComponent } from './components/daily-menu-related/daily-menu/daily-menu.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UserLayoutComponent } from './components/users/user-layout/user-layout.component';
import { AddToMealPageComponent } from './components/daily-menu-related/add-to-meal-page/add-to-meal-page.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductListPageComponent } from './components/products/product-list-page/product-list-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/home-page/home-page.component';
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
    path: 'user',
    canActivate: [userGuard],
    component: UserLayoutComponent,
    children: [
      { path: "", redirectTo: "/user/daily-menus", pathMatch: "full" },
      { path: "daily-menus", component: DailyMenuComponent },
      { path: "profile", component: UserProfileComponent },
      { path: "daily-menus/add-to-meal/:mealId", component: AddToMealPageComponent }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [

      {
        path: "products",
        children: [
          {
            path: '',
            component: ProductListPageComponent,
          },
          {
            path: 'add',
            component: ProductFormComponent,
          },
          {
            path: ':id',
            component: ProductDetailsComponent,
          },
          {
            path: 'edit/:id',
            component: ProductFormComponent,
          },

        ],
      },
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "**", component: PageNotFoundComponent
  }
];
