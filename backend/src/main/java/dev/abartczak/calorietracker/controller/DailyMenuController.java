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
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(dailyMenuService.findById(id, currentUser));
    }

    @GetMapping
    public ResponseEntity<List<DailyMenuDTO>> getDailyMenusForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(dailyMenuService.findByUser(currentUser));
    }

    @GetMapping("/by-date/{date}")
    public ResponseEntity<DailyMenuDTO> getDailyMenuByDate(@PathVariable LocalDate date) {
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(dailyMenuService.findByDateAndUser(date, currentUser));
    }

    @PostMapping
    public ResponseEntity<DailyMenuDTO> createDailyMenuForCurrentUser(@RequestParam LocalDate date) {
        User currentUser = userService.getCurrentUser();

        DailyMenu dailyMenu = new DailyMenu();
        dailyMenu.setUser(currentUser);
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

        return ResponseEntity.ok(dailyMenuService.addNewMenu(dailyMenu));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyMenu(@PathVariable Long id) {
        User currentUser = userService.getCurrentUser();
        dailyMenuService.deleteById(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}
