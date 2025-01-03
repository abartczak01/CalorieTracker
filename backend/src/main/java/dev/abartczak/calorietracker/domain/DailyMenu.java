package dev.abartczak.calorietracker.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class DailyMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate date;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "dailyMenu", cascade = CascadeType.ALL)
    private List<Meal> meals;
}
