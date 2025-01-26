package dev.abartczak.calorietracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import dev.abartczak.calorietracker.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
