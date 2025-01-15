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

//    private Integer basalMetabolicRate; // BMR

    // TEE = PAL * BMR * caloricCoalMultiplier
//    public Integer getTotalEnergyExpenditure() {
//        if (basalMetabolicRate == null || physicalActivityLevel == null || caloricGoalMultiplier == null) {
//            return null;
//        }
//        return Math.round(basalMetabolicRate * physicalActivityLevel * caloricGoalMultiplier);
//    }
//
//    public NutritionalInfo calculateMacros() {
//        int tee = getTotalEnergyExpenditure();
//        if (tee == 0) {
//            return null;
//        }
//
//        float proteinPercentage = 0.3f;
//        float fatPercentage = 0.25f;
//        float carbsPercentage = 0.45f;
//
//        int proteinCalories = Math.round(tee * proteinPercentage);
//        int fatCalories = Math.round(tee * fatPercentage);
//        int carbsCalories = Math.round(tee * carbsPercentage);
//
//        int proteinGrams = proteinCalories / 4;
//        int fatGrams = fatCalories / 9;
//        int carbsGrams = carbsCalories / 4;
//
//        return new NutritionalInfo(proteinGrams, fatGrams, carbsGrams, tee);
//    }

}

