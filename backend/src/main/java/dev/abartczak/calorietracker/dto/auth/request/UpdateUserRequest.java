package dev.abartczak.calorietracker.dto.auth.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest {
    private String email;
    private String password;
}
