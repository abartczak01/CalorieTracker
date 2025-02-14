import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface DatepickerDialogData {
  selectedDate: Date | null;
}

@Component({
  selector: 'app-datepicker-dialog',
  standalone: true,
  imports: [MatDatepickerModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './datepicker-dialog.component.html',
  styleUrl: './datepicker-dialog.component.scss'
})
export class DatepickerDialogComponent {
  protected dialogRef = inject<MatDialogRef<DatepickerDialogComponent>>(MatDialogRef<DatepickerDialogComponent>);
  protected data = inject<DatepickerDialogData>(MAT_DIALOG_DATA);

  public readonly date = new FormControl(new Date());

  public constructor() {
    this.date.setValue(this.data.selectedDate ? new Date(this.data.selectedDate) : new Date());
  }
}
