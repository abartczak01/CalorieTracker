package dev.abartczak.calorietracker.domain;

import jakarta.persistence.*;
import lombok.*;

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
    // values per 100 g
    private String name;
    private String ingredients;
    private Integer kcal;
    private Double protein;
    private Double fat;
    private Double carbohydrate;
    private Double fiber;
    private Double sodium;
    private Boolean isVegan;


}
