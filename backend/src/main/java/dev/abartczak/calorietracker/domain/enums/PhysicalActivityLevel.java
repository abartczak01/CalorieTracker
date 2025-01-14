package dev.abartczak.calorietracker.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhysicalActivityLevel {
    SICK(1.2f),
    LIGHT(1.4f),
    MODERATE(1.6f),
    ACTIVE(1.75f),
    VERY_ACTIVE(2.0f),
    PROFESSIONAL_ATHLETE(2.4f);

    private final float value;


}
