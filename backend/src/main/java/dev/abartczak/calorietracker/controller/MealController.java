package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.dto.ProductQuantityDTO;
import dev.abartczak.calorietracker.service.MealService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    @PostMapping("/{mealId}/product_quantities")
    public ResponseEntity<ProductQuantityDTO> addProductQuantityToMeal(
            @PathVariable Long mealId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        ProductQuantityDTO response = mealService.addProductQuantityToMeal(mealId, productId, quantity);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/product_quantities/{productQuantityId}")
    public ResponseEntity<Void> removeProductQuantity(@PathVariable Long productQuantityId) {
        mealService.removeProductQuantity(productQuantityId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/product_quantities/{productQuantityId}")
    public ResponseEntity<ProductQuantityDTO> updateProductQuantity(
            @PathVariable Long productQuantityId,
            @RequestParam Integer quantity) {
        ProductQuantityDTO response = mealService.updateProductQuantity(productQuantityId, quantity);
        return ResponseEntity.ok(response);
    }
}
