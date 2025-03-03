import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMealPageComponent } from './add-to-meal-page.component';

describe('AddToMealPageComponent', () => {
  let component: AddToMealPageComponent;
  let fixture: ComponentFixture<AddToMealPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToMealPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddToMealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
