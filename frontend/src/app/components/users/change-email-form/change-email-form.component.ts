import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../modules/material.module';
import { ChangeEmailRequest } from '../../../models/user/change-email-request';
@Component({
  selector: 'app-change-email-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.scss'
})
export class ChangeEmailFormComponent implements OnInit {
  @Output() protected emailChange = new EventEmitter<ChangeEmailRequest>();
  @Input() public currentEmail: string | null = null;
  protected changeEmailForm: FormGroup<{
    oldEmail: FormControl<string | null>;
    newEmail: FormControl<string>;
    currentPassword: FormControl<string>;
  }>;


  public constructor() {
    this.changeEmailForm = new FormGroup({
      oldEmail: new FormControl({ value: "", disabled: true }),
      newEmail: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      currentPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  public ngOnInit(): void {
    this.changeEmailForm.get('oldEmail')!.setValue(this.currentEmail);

  }

  protected onSubmit(): void {
    if (this.changeEmailForm.valid) {
      const formValue: ChangeEmailRequest = {
        currentPassword: this.changeEmailForm.get('currentPassword')!.value,
        newEmail: this.changeEmailForm.get('newEmail')!.value
      };
      this.emailChange.emit(formValue);
    }
  }

}
