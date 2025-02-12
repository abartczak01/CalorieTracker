import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatepickerDialogComponent } from '../datepicker-dialog/datepicker-dialog.component';
import { DailyMenuService } from '../../services/daily-menu/daily-menu.service';

@Component({
  selector: 'app-daily-menu',
  standalone: true,
  imports: [DatePipe, MatIconModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './daily-menu.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './daily-menu.component.scss'
})
export class DailyMenuComponent implements OnInit {
  protected selectedDate: Date = new Date();
  public dialog = inject(MatDialog);

  public constructor(private route: ActivatedRoute, private router: Router, private dailyMenuService: DailyMenuService) { }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const dateParam: string = params['date'] as string;
      if (dateParam) {
        const parsedDate = new Date(dateParam);
        if (!isNaN(parsedDate.getTime())) {
          this.selectedDate = parsedDate;
        } else {
          this.updateDate(new Date());
        }
      }
    });
  }

  protected updateDate(date: Date): void {
    this.router.navigate([], {
      queryParams: { date: date.toISOString().split('T')[0] },
      queryParamsHandling: 'merge'
    });
  }

  public changeDay(offset: number): void {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    this.updateDate(newDate);
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<DatepickerDialogComponent, Date | null> = this.dialog.open(DatepickerDialogComponent, {
      width: '500px',
      data: { selectedDate: this.selectedDate },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDate = result;
        this.updateDate(this.selectedDate);
      }
    });
  }
}