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

    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/login`, authRequest).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('userId', response.userId.toString());
        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleLoginError)
    );
  }

  public register(authRequest: AuthRequest): Observable<{ token: string }> {

    return this.http.post<{ token: string, userId: number }>(`${this.apiUrl}/register`, authRequest).pipe(
      tap((response) => {
        localStorage.setItem('jwt', response.token);
        localStorage.setItem('userId', response.userId.toString());

        this.isLoggedInSubject.next(true);
      }),
      catchError(this.handleRegisterError)
    );
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
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

  public getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return null;
    }

    return parseInt(userId, 10);
  }


  public getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: { role: string } = jwtDecode(token);

    return decodedToken.role;
  }

  public getEmail(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: { sub: string } = jwtDecode(token);

    return decodedToken.sub;
  }

  private handleLoginError(error: HttpErrorResponse): Observable<never> {

    if (error.status === 400) {
      return throwError(() => new Error('Invalid email or password.'));
    }

    return throwError(() => new Error('An error occurred during login.'));
  }

  private handleRegisterError(error: HttpErrorResponse): Observable<never> {

    if (error.status === 409) {
      return throwError(() => new Error('Email not available.'));
    }

    return throwError(() => new Error('An error occurred during registration.'));
  }

  public refreshLoginStatus(): void {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }


}

