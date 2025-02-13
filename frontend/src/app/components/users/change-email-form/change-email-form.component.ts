import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-change-email-form',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './change-email-form.component.html',
  styleUrl: './change-email-form.component.scss'
})
export class ChangeEmailFormComponent implements OnInit {
  @Output() protected emailChange = new EventEmitter<{ currentPassword: string, newEmail: string }>();
  @Input() public currentEmail: string | null = null;
  protected changeEmailForm: FormGroup;


  public constructor() {
    this.changeEmailForm = new FormGroup({
      oldEmail: new FormControl({ value: "", disabled: true }),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      currentPassword: new FormControl('', [Validators.required])
    });
  }

  public ngOnInit(): void {
    this.changeEmailForm.get('oldEmail')!.setValue(this.currentEmail);

  }

  protected onSubmit(): void {
    if (this.changeEmailForm.valid) {
      this.emailChange.emit({
        currentPassword: this.changeEmailForm.get('currentPassword')!.value as string,
        newEmail: this.changeEmailForm.get('newEmail')!.value as string
      });
    }
  }

}
