package dev.abartczak.calorietracker.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NutritionalInfo {
    private int proteinGrams;
    private int fatGrams;
    private int carbsGrams;
    private int totalCalories;
}
