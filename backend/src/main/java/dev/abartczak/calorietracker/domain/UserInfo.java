package dev.abartczak.calorietracker.domain;

import dev.abartczak.calorietracker.domain.enums.PhysicalActivityLevel;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String firstName;
    private String lastName;
    private LocalDate birthDate;

    private Integer height;     // height in cm
    private Integer weight;     // weight in kg

    @Enumerated(EnumType.STRING)
    private PhysicalActivityLevel physicalActivityLevel;
    private Float caloricGoalMultiplier;

}

