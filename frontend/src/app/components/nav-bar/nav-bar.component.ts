import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isAdmin = this.authService.isAdmin();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
