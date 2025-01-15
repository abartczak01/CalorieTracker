package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.service.DailyMenuService;
import dev.abartczak.calorietracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/daily_menus")
public class DailyMenuController {

    private final DailyMenuService dailyMenuService;
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<DailyMenu> getDailyMenu(@PathVariable Long id) {
        Optional<DailyMenu> foundMenu = dailyMenuService.findById(id);
        return foundMenu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DailyMenu>> getDailyMenuByUserId(@PathVariable Long userId) {
        Optional<User> user = userService.findById(userId);

        return user.map(value -> {
            List<DailyMenu> usersMenus = dailyMenuService.findByUser(value);
            return ResponseEntity.ok(usersMenus);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<DailyMenu> createDailyMenuForUser(
            @PathVariable Long userId,
            @RequestParam LocalDate date) {

        User user = userService.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        DailyMenu dailyMenu = new DailyMenu();
        dailyMenu.setUser(user);
        dailyMenu.setDate(date);

        List<Meal> meals = new ArrayList<>();
        String[] mealNames = {"Breakfast", "Lunch", "Dinner", "Snacks"};
        for (String name : mealNames) {
            Meal meal = Meal.builder()
                    .name(name)
                    .dailyMenu(dailyMenu)
                    .build();
            meals.add(meal);
        }

        dailyMenu.setMeals(meals);

        DailyMenu savedMenu = dailyMenuService.save(dailyMenu);

        return ResponseEntity.ok(savedMenu);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DailyMenu> deleteDailyMenu(@PathVariable Long id) {
        Optional<DailyMenu> foundMenu = dailyMenuService.findById(id);
        return foundMenu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
