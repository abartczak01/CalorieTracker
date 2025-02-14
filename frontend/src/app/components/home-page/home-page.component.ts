import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  public constructor(private router: Router) { }

  protected goToRegister(): void {
    this.router.navigate(['/auth/sign-up']);
  }
}
