import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  adminData: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAdminData();
  }

  fetchAdminData(): void {
    this.http.get('/api/users/admin').subscribe({
      next: (data: any) => (console.log('Admin data:', data), this.adminData = data),
      error: (err: any) => console.error('Failed to fetch admin data:', err),
    });
  }
}
