import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DailyMenu } from '../../../models/daily-menu/daily-menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatExpansionModule, MatCardModule, MatTableModule, DecimalPipe, MatButtonModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent implements OnInit, OnChanges {
  @Input() public dailyMenu!: DailyMenu;
  public displayedColumns: string[] = ['productName', 'quantity', 'kcal', 'protein', 'fat', 'carbohydrate', 'fiber', 'sodium'];
  public ngOnInit(): void {
    console.log('from meals component: daily menu:', this.dailyMenu);
  }

  public ngOnChanges(changes: SimpleChanges): void {

    console.log('Daily menu changed:', changes['dailyMenu'].currentValue);

  }
}
