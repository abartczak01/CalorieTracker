import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../../models/auth/login-form';
import { AuthRequest } from '../../../models/auth/auth-request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  public errorMessage: string | null = null;

  public constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  public loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  protected saveForm(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as AuthRequest).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/user/daily-menus']);
          this.snackBar.open("Successful login", 'Close', {
            duration: 3000,
          });
        },
        error: (error: { message: string }) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}