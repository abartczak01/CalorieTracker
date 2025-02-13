import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {

  protected isLoggedIn: boolean = false;
  protected isAdmin: boolean = false;
  private subscription!: Subscription;

  public constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin();
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
