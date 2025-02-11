import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterForm } from '../../../models/register-form';
import { AuthRequest } from '../../../models/auth-request';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  public errorMessage: string | null = null;

  public constructor(private authService: AuthService) { }

  public registerForm = new FormGroup<RegisterForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public saveForm(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as AuthRequest).subscribe({
        next: () => {
          this.errorMessage = null;
        },
        error: (error: { message: string }) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}
