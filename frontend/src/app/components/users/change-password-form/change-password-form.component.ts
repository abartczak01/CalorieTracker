import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  @Output() protected passwordChange = new EventEmitter<{ oldPassword: string, newPassword: string }>();

  protected changePasswordForm: FormGroup;

  public constructor() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl('', [Validators.required, this.validateSamePassword])
    });
  }

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('newPassword');
    const confirmNewPassword = control.parent?.get('confirmNewPassword');

    return password?.value == confirmNewPassword?.value ? null : { 'notSame': true };
  }

  protected onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.passwordChange.emit({
        oldPassword: this.changePasswordForm.get('oldPassword')!.value as string,
        newPassword: this.changePasswordForm.get('newPassword')!.value as string
      });
    }
  }
}
