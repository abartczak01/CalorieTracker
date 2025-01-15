package dev.abartczak.calorietracker.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JsonBackReference
    private DailyMenu dailyMenu;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<ProductQuantity> productQuantities;
}
