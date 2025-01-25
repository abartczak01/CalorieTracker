package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.dto.DailyMenuDTO;
import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.service.DailyMenuService;
import dev.abartczak.calorietracker.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/daily_menus")
public class DailyMenuController {

    private final DailyMenuService dailyMenuService;
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<DailyMenuDTO> getDailyMenu(@PathVariable Long id) {
        return dailyMenuService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DailyMenuDTO>> getDailyMenusByUserId(@PathVariable Long userId) {
        return userService.findById(userId)
                .map(user -> ResponseEntity.ok(dailyMenuService.findByUser(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<DailyMenuDTO> createDailyMenuForUser(
            @PathVariable Long userId,
            @RequestParam LocalDate date) {

        User user = userService.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        if (dailyMenuService.findByDate(date).isPresent()) {
            return ResponseEntity.status(409).build();
        }

        DailyMenu dailyMenu = new DailyMenu();
        dailyMenu.setUser(user);
        dailyMenu.setDate(date);

        List<Meal> meals = new ArrayList<>();
        String[] mealNames = {"Breakfast", "Lunch", "Dinner", "Snacks"};
        for (String mealName : mealNames) {
            Meal meal = Meal.builder()
                    .name(mealName)
                    .dailyMenu(dailyMenu)
                    .productQuantities(new ArrayList<>())
                    .build();
            meals.add(meal);
        }
        dailyMenu.setMeals(meals);

        DailyMenuDTO savedMenu = dailyMenuService.addNewMenu(dailyMenu);

        return ResponseEntity.ok(savedMenu);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyMenu(@PathVariable Long id) {
        if (dailyMenuService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        dailyMenuService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
