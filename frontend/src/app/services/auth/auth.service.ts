import { Injectable } from '@angular/core';
import { AuthRequest } from '../../models/auth-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }


  login(authRequest: AuthRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, authRequest).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token)
        const decodedToken: any = jwtDecode(response.token);
        localStorage.setItem('role', decodedToken.role);
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleLoginError)
    );
  }

  register(authRequest: AuthRequest): Observable<{ token: string }> {
    console.log(authRequest, "authRequest");
    return this.http.post<{ token: string }>(`${this.API_URL}/register`, authRequest).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.token)
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleRegisterError)
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(() => new Error('Invalid email or password.'));
    }
    return throwError(() => new Error('An error occurred during login.'));
  }

  private handleRegisterError(error: HttpErrorResponse) {
    if (error.status === 409) {
      return throwError(() => new Error('Email not available.'));
    }
    return throwError(() => new Error('An error occurred during registration.'));
  }

  refreshLoginStatus(): void {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }


}

