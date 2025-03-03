import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { ChangePasswordRequest } from '../../../models/user/change-password.request';
@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.scss'
})
export class ChangePasswordFormComponent {
  @Output() protected passwordChange = new EventEmitter<ChangePasswordRequest>();

  protected changePasswordForm: FormGroup<{
    oldPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmNewPassword: FormControl<string>;
  }>;

  public constructor() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      newPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      confirmNewPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, this.validateSamePassword] })
    });
  }

  private validateSamePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('newPassword');
    const confirmNewPassword = control.parent?.get('confirmNewPassword');

    return password?.value == confirmNewPassword?.value ? null : { 'notSame': true };
  }

  protected onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const formValue: ChangePasswordRequest = {
        oldPassword: this.changePasswordForm.get('oldPassword')!.value,
        newPassword: this.changePasswordForm.get('newPassword')!.value
      };
      this.passwordChange.emit(formValue);
    }
  }
}
