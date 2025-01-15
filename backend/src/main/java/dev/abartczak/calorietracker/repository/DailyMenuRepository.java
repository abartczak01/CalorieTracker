package dev.abartczak.calorietracker.repository;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DailyMenuRepository extends JpaRepository<DailyMenu, Long> {
    List<DailyMenu> findByUser(User user);
}
