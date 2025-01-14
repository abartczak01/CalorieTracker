package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.enums.Role;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.domain.UserInfo;
import dev.abartczak.calorietracker.dto.request.AuthenticationRequest;
import dev.abartczak.calorietracker.dto.request.RegisterRequest;
import dev.abartczak.calorietracker.dto.response.AuthenticationResponse;
import dev.abartczak.calorietracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already in use");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDate.now())
                .build();

        UserInfo userInfo = UserInfo.builder()
                .user(user)
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .birthDate(registerRequest.getBirthDate())
                .height(registerRequest.getHeight())
                .weight(registerRequest.getWeight())
                .caloricGoalMultiplier(registerRequest.getCaloricGoalMultiplier())

                .build();

        user.setUserInfo(userInfo);

        userRepository.save(user);

        String token = "token";

        return new AuthenticationResponse(token, user.getId());
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));


        String jwtToken = "token";

        return new AuthenticationResponse(jwtToken, user.getId());
    }
}
