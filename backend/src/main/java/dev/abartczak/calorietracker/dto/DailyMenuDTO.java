package dev.abartczak.calorietracker.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyMenuDTO {
    private Long id;
    private LocalDate date;
    private List<MealDTO> meals = new ArrayList<>();
    private Integer totalKcal;
    private Double totalProtein;
    private Double totalCarbohydrate;
    private Double totalFat;
    private Double totalSodium;
    private Double totalFiber;
}
