import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  public constructor(private router: Router, private authService: AuthService) { }

  public goToHome(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user/daily-menus']);
      
      return;
    }
    this.router.navigate(['/']);
  }
}
