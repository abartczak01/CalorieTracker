import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from '../../models/user/user';
import { UpdateUserRequest } from '../../models/user/update-user-request';
import { AuthService } from '../auth/auth.service';
import { AuthRequest } from '../../models/auth/auth-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "/api/users";

  public constructor(private http: HttpClient, private authService: AuthService) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin`);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public deleteUserById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public updateUser(id: number, authRequest: AuthRequest, updateUserRequest: UpdateUserRequest): Observable<User> {
    return this.authService.login(authRequest).pipe(
      switchMap(() => this.http.patch<User>(`${this.apiUrl}/${id}`, updateUserRequest))
    );
  }
}
