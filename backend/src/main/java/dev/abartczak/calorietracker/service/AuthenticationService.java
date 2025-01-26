package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.domain.enums.Role;
import dev.abartczak.calorietracker.dto.auth.request.AuthenticationRequest;
import dev.abartczak.calorietracker.dto.auth.request.RegisterRequest;
import dev.abartczak.calorietracker.dto.auth.response.AuthenticationResponse;
import dev.abartczak.calorietracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new IllegalStateException("Email already in use");
        }

        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .dailyMenus(new ArrayList<>())
                .createdAt(LocalDate.now())
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token, user.getId());
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String jwtToken = jwtService.generateToken(user);

        return new AuthenticationResponse(jwtToken, user.getId());
    }
}