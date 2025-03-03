package dev.abartczak.calorietracker.domain;

import jakarta.persistence.*;
import lombok.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String name;

    private String ingredients;

    @NotNull
    @Column(nullable = false)
    private Integer kcal;

    @NotNull
    @Column(nullable = false)
    private Double protein;

    @NotNull
    private Double fat;

    @NotNull
    @Column(nullable = false)
    private Double carbohydrate;

    @NotNull
    @Column(nullable = false)
    private Double fiber;

    @NotNull
    @Column(nullable = false)
    private Double sodium;

    @NotNull
    @Column(nullable = false)
    private Boolean isVegan;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime createdAt;


}
