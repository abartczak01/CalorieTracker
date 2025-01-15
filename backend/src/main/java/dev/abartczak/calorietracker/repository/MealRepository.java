package dev.abartczak.calorietracker.repository;

import dev.abartczak.calorietracker.domain.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {
}
