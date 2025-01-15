package dev.abartczak.calorietracker.repository;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyMenuRepository extends JpaRepository<DailyMenu, Long> {
    List<DailyMenu> findByUser(User user);
    Optional<DailyMenu> findByDate(LocalDate date);
}
