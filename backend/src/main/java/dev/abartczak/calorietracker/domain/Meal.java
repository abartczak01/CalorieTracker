package dev.abartczak.calorietracker.domain;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    private DailyMenu dailyMenu;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<ProductQuantity> productQuantities;
}
