package dev.abartczak.calorietracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealDTO {
    private Long id;
    private String name;
    private List<ProductQuantityDTO> productQuantities = new ArrayList<>();
    private Integer mealKcal;
    private Double mealProtein;
    private Double mealFat;
    private Double mealCarbohydrate;
    private Double mealSodium;
    private Double mealFiber;
}