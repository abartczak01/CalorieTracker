import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {

  protected isLoggedIn: boolean = false;
  protected isAdmin: boolean = false;
  private subscription!: Subscription;
  public email: string | null = null;

  public constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin();
      this.email = this.authService.getEmail();
    });

  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
    this.snackBar.open("Logged out", 'Close', {
      duration: 3000,
    });
  }

}
