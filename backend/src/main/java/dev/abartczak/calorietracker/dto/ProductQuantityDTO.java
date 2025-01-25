package dev.abartczak.calorietracker.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductQuantityDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity; // quantity in grams
    private Integer kcal;
    private Double protein;
    private Double fat;
    private Double carbohydrate;
    private Double fiber;
    private Double sodium;

}

