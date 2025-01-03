package dev.abartczak.calorietracker.domain;

import jakarta.persistence.*;

@Entity
public class ProductQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Product product;

    @ManyToOne
    private Meal meal;

    private Double quantity; // quantity in grams
}
