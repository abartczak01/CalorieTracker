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
    @JoinColumn(name = "user_info_id")
    private User user;

    @OneToMany(mappedBy = "dailyMenu", cascade = CascadeType.ALL)
    private List<Meal> meals;
}
