package dev.abartczak.calorietracker.config;

import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.domain.enums.Role;
import dev.abartczak.calorietracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@AllArgsConstructor
@Component
public class UserDataLoader implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User user1 = User.builder()
                .email("user1@em.com")
                .password("password")
                .role(Role.USER)
                .createdAt(LocalDate.now())
                .build();
        User user2 = User.builder()
                .email("user2@em.com")
                .password("password")
                .role(Role.USER)
                .createdAt(LocalDate.now())
                .build();
        userRepository.save(user1);
        userRepository.save(user2);
    }


}
