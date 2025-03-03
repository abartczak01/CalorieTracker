package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.ProductQuantity;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.domain.enums.Role;
import dev.abartczak.calorietracker.dto.auth.request.UpdateUserRequest;
import dev.abartczak.calorietracker.repository.ProductQuantityRepository;
import dev.abartczak.calorietracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProductQuantityRepository productQuantityRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found with id: " + id));
    }

    public void deleteById(Long id) {
        User user = findById(id);
        if (user.getRole() == Role.ADMIN) {
            throw new SecurityException("You cannot delete the admin account.");
        }
        userRepository.delete(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public User updateUser(Long id, UpdateUserRequest updateUserRequest) {
        User user = findById(id);

        if (updateUserRequest.getEmail() != null) {
            boolean emailExists = userRepository.existsByEmail(updateUserRequest.getEmail());
            if (emailExists && !updateUserRequest.getEmail().equals(user.getEmail())) {
                throw new IllegalArgumentException("Email is already taken.");
            }
            user.setEmail(updateUserRequest.getEmail());

        }

        if (updateUserRequest.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
        }

        return userRepository.save(user);
    }


    public void ensureProductQuantityBelongsToCurrentUser(Long productQuantityId) {
        User currentUser = getCurrentUser();
        ProductQuantity productQuantity = productQuantityRepository.findById(productQuantityId)
                .orElseThrow(() -> new IllegalArgumentException("ProductQuantity not found with id: " + productQuantityId));

        if (!productQuantity.getMeal().getDailyMenu().getUser().getId().equals(currentUser.getId())) {
            throw new SecurityException("You are not authorized access this product quantity.");
        }
    }
}
