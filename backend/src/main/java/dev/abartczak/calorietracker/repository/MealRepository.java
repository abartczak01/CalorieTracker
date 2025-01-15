package dev.abartczak.calorietracker.repository;

import dev.abartczak.calorietracker.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
