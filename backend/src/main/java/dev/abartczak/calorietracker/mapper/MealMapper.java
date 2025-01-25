package dev.abartczak.calorietracker.mapper;

import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.dto.MealDTO;
import dev.abartczak.calorietracker.dto.ProductQuantityDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MealMapper {

    private final ProductQuantityMapper productQuantityMapper;

    public MealMapper(ProductQuantityMapper productQuantityMapper) {
        this.productQuantityMapper = productQuantityMapper;
    }

    public MealDTO toMealDTO(Meal meal) {
        if (meal == null) {
            return null;
        }

        List<ProductQuantityDTO> productQuantityDTOList = meal.getProductQuantities().stream()
                .map(productQuantityMapper::toProductQuantityDTO)
                .toList();

        int totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;
        double totalSodium = 0;
        double totalFiber = 0;

        for (var productQuantity : productQuantityDTOList) {
            totalCalories += productQuantity.getKcal();
            totalProtein += productQuantity.getProtein();
            totalFat += productQuantity.getFat();
            totalCarbs += productQuantity.getCarbohydrate();
            totalSodium += productQuantity.getSodium();
            totalFiber += productQuantity.getFiber();
        }

        return MealDTO.builder()
                .id(meal.getId())
                .name(meal.getName())
                .productQuantities(meal.getProductQuantities().stream()
                        .map(productQuantityMapper::toProductQuantityDTO)
                        .collect(Collectors.toList()))
                .mealKcal(totalCalories)
                .mealProtein(totalProtein)
                .mealFat(totalFat)
                .mealCarbohydrate(totalCarbs)
                .mealFiber(totalFiber)
                .mealSodium(totalSodium)
                .build();
    }
}
