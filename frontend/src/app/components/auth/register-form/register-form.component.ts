import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterForm } from '../../../models/auth/register-form';
import { AuthRequest } from '../../../models/auth/auth-request';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  public errorMessage: string | null = null;

  public constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  public registerForm = new FormGroup<RegisterForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  protected saveForm(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as AuthRequest).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/user/daily-menus']);
          this.snackBar.open("Registration successful", 'Close', {
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
