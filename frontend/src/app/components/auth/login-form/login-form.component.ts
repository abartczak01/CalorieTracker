import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../../models/login-form';
import { AuthRequest } from '../../../models/auth-request';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  loginForm: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  saveForm(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as AuthRequest).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/']);
        },
        error: (error: { message: string }) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}