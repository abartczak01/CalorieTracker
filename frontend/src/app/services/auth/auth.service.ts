import { Injectable } from '@angular/core';
import { AuthRequest } from '../../models/auth/auth-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = '/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public constructor(private http: HttpClient) { }


  public login(authRequest: AuthRequest): Observable<{ token: string }> {
    console.log(authRequest, "authRequest");

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, authRequest).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.token);
        const decodedToken: { role: string } = jwtDecode(response.token);

        localStorage.setItem('role', decodedToken.role);
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleLoginError)
    );
  }

  public register(authRequest: AuthRequest): Observable<{ token: string }> {
    console.log(authRequest, "authRequest");

    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, authRequest).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.token);
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleRegisterError)
    );
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {
    console.log(error, "login error");
    if (error.status === 400) {
      return throwError(() => new Error('Invalid email or password.'));
    }

    return throwError(() => new Error('An error occurred during login.'));
  }

  private handleRegisterError(error: HttpErrorResponse): Observable<never> {
    console.log(error, "error");
    if (error.status === 409) {
      return throwError(() => new Error('Email not available.'));
    }

    return throwError(() => new Error('An error occurred during registration.'));
  }

  public refreshLoginStatus(): void {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }


}

