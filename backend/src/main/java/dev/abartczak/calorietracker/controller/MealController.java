package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.domain.ProductQuantity;
import dev.abartczak.calorietracker.service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    @PostMapping("/{mealId}/product_quantities")
    public ResponseEntity<ProductQuantity> addProductQuantityToMeal(
            @PathVariable Long mealId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        ProductQuantity productQuantity = mealService.addProductQuantityToMeal(mealId, productId, quantity);
        return ResponseEntity.ok(productQuantity);
    }

    @DeleteMapping("/product_quantities/{productQuantityId}")
    public ResponseEntity<Void> removeProductQuantity(@PathVariable Long productQuantityId) {
        mealService.removeProductQuantity(productQuantityId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/product_quantities/{productQuantityId}")
    public ResponseEntity<ProductQuantity> updateProductQuantity(
            @PathVariable Long productQuantityId,
            @RequestParam Integer quantity) {
        ProductQuantity updatedProductQuantity = mealService.updateProductQuantity(productQuantityId, quantity);
        return ResponseEntity.ok(updatedProductQuantity);
    }

}
