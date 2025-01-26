package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.Meal;
import dev.abartczak.calorietracker.domain.ProductQuantity;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.repository.MealRepository;
import dev.abartczak.calorietracker.repository.ProductQuantityRepository;
import dev.abartczak.calorietracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final MealRepository mealRepository;
    private final ProductQuantityRepository productQuantityRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    public void deleteById(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public void ensureMealBelongsToCurrentUser(Long mealId) {
        User currentUser = getCurrentUser();
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found with id: " + mealId));

        if (!meal.getDailyMenu().getUser().getId().equals(currentUser.getId())) {
            throw new SecurityException("You are not authorized to modify this meal.");
        }
    }

    public void ensureProductQuantityBelongsToCurrentUser(Long productQuantityId) {
        User currentUser = getCurrentUser();
        ProductQuantity productQuantity = productQuantityRepository.findById(productQuantityId)
                .orElseThrow(() -> new IllegalArgumentException("ProductQuantity not found with id: " + productQuantityId));

        if (!productQuantity.getMeal().getDailyMenu().getUser().getId().equals(currentUser.getId())) {
            throw new SecurityException("You are not authorized to modify this product quantity.");
        }
    }
}