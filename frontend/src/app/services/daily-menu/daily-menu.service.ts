import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyMenu } from '../../models/daily-menu/daily-menu';
@Injectable({
  providedIn: 'root'
})
export class DailyMenuService {
  private readonly apiUrl = '/api/daily_menus';

  public constructor(private http: HttpClient) {
  }

  public createDailyMenu(date: string): Observable<DailyMenu> {
    return this.http.post<DailyMenu>(`${this.apiUrl}?date=${date}`, {});
  }

  public getDailyMenuByDate(date: string): Observable<DailyMenu> {
    return this.http.get<DailyMenu>(`${this.apiUrl}/by-date/${date}`);
  }

  public deleteDailyMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
