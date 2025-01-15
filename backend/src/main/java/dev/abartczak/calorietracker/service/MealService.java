package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.domain.ProductQuantity;
import dev.abartczak.calorietracker.repository.MealRepository;
import dev.abartczak.calorietracker.repository.ProductQuantityRepository;
import dev.abartczak.calorietracker.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class MealService {

    private final MealRepository mealRepository;
    private final ProductRepository productRepository;
    private final ProductQuantityRepository productQuantityRepository;

    public Optional<Meal> findById(Long id) {
        return mealRepository.findById(id);
    }

    public ProductQuantity addProductQuantityToMeal(Long mealId, Long productId, Integer quantity) {
        Meal foundMeal = mealRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found with id: " + mealId));

        Product foundProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        ProductQuantity productQuantity = ProductQuantity.builder()
                .meal(foundMeal)
                .product(foundProduct)
                .quantity(quantity)
                .build();

        return productQuantityRepository.save(productQuantity);
    }

    public void removeProductQuantity(Long productQuantityId) {
        ProductQuantity productQuantity = productQuantityRepository.findById(productQuantityId)
                .orElseThrow(() -> new IllegalArgumentException("ProductQuantity not found with id: " + productQuantityId));

        productQuantityRepository.delete(productQuantity);
    }

    public ProductQuantity updateProductQuantity(Long productQuantityId, Integer newQuantity) {
        ProductQuantity productQuantity = productQuantityRepository.findById(productQuantityId)
                .orElseThrow(() -> new IllegalArgumentException("ProductQuantity not found with id: " + productQuantityId));

        productQuantity.setQuantity(newQuantity);

        return productQuantityRepository.save(productQuantity);
    }


}
