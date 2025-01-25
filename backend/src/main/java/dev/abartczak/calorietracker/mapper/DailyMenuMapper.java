package dev.abartczak.calorietracker.mapper;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.dto.DailyMenuDTO;
import dev.abartczak.calorietracker.dto.MealDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@Component
public class DailyMenuMapper {

    private final MealMapper mealMapper;

    public DailyMenuDTO toDailyMenuDTO(DailyMenu dailyMenu) {
        if (dailyMenu == null) {
            return null;
        }

        List<MealDTO> meals = dailyMenu.getMeals().stream()
                .map(mealMapper::toMealDTO)
                .toList();

        int totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;
        double totalSodium = 0;
        double totalFiber = 0;

        for (var meal : meals) {
            totalCalories += meal.getMealKcal();
            totalProtein += meal.getMealProtein();
            totalFat += meal.getMealFat();
            totalCarbs += meal.getMealCarbohydrate();
            totalSodium += meal.getMealSodium();
            totalFiber += meal.getMealFiber();
        }

        return DailyMenuDTO.builder()
                .id(dailyMenu.getId())
                .date(dailyMenu.getDate())
                .meals(meals)
                .totalKcal(totalCalories)
                .totalProtein(totalProtein)
                .totalFat(totalFat)
                .totalCarbohydrate(totalCarbs)
                .totalSodium(totalSodium)
                .totalFiber(totalFiber)
                .build();
    }
}
