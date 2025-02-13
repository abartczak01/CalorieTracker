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
import { DatepickerDialogComponent } from '../../dialogs/datepicker-dialog/datepicker-dialog.component';
import { DailyMenuService } from '../../../services/daily-menu/daily-menu.service';
import { DailyMenu } from '../../../models/daily-menu/daily-menu';
import { MealsComponent } from '../meals/meals.component';
@Component({
  selector: 'app-daily-menu',
  standalone: true,
  imports: [MealsComponent, DatePipe, MatIconModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './daily-menu.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './daily-menu.component.scss'
})
export class DailyMenuComponent implements OnInit {
  protected selectedDate: Date = new Date();
  public dialog = inject(MatDialog);
  public dailyMenu: DailyMenu | null = null;
  public constructor(private route: ActivatedRoute, private router: Router, private dailyMenuService: DailyMenuService) { }
  public errorMsg: string | null = '';
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
    this.loadDailyMenu(this.selectedDate);
  }

  private createDailyMenu(date: string): void {
    this.dailyMenuService.createDailyMenu(date).subscribe({
      next: (dailyMenu: DailyMenu) => {
        console.log('Daily menu created:', dailyMenu);
        this.dailyMenu = { ...dailyMenu };
        this.errorMsg = null;
      },
      error: () => {
        this.errorMsg = 'Error creating daily menu';
      }
    });
  }


  public loadDailyMenu(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0];

    this.dailyMenuService.getDailyMenuByDate(formattedDate).subscribe({
      next: (dailyMenu: DailyMenu) => {
        console.log('Daily menu for date:', formattedDate, dailyMenu);
        this.dailyMenu = { ...dailyMenu };
        this.errorMsg = null;
      },
      error: () => {

        this.createDailyMenu(formattedDate);
      }
    });
  }

  protected updateDate(date: Date): void {
    this.router.navigate([], {
      queryParams: { date: date.toISOString().split('T')[0] },
      queryParamsHandling: 'merge'
    });
    this.loadDailyMenu(date);
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
        this.loadDailyMenu(this.selectedDate);
      }
    });
  }
}