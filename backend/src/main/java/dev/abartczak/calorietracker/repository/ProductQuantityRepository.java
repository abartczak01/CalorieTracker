package dev.abartczak.calorietracker.repository;

import dev.abartczak.calorietracker.domain.ProductQuantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {
}
