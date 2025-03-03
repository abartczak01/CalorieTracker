import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(cloned);
  }

  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    let errorMessage: string;

    switch (err.status) {
      case 400:
        errorMessage = 'Invalid email or password. Please try again.';
        break;
      case 409:
        errorMessage = 'Email not available. Please try again.';
        break;
      default:
        errorMessage = 'An error occurred. Please try again.';
        break;

    }

    return throwError(() => new Error(errorMessage));
  }));

};