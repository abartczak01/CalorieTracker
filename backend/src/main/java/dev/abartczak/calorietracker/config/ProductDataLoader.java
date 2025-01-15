package dev.abartczak.calorietracker.config;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class ProductDataLoader implements CommandLineRunner {
    private final ProductRepository repository;

    @Override
    public void run(String... args) throws Exception {
        Product product1 = new Product(
                null,
                "Milk 3.2%",
                "",
                61,
                3.2,
                3.2,
                4.7,
                0.0,
                0.05,
                false
        );

        Product product2 = new Product(
                null,
                "Dark Chocolate 85%",
                "Cocoa mass, sugar, cocoa butter, natural vanilla",
                598,
                7.9,
                46.0,
                32.0,
                7.0,
                0.01,
                true
        );

        Product product3 = new Product(
                null,
                "Whole Wheat Bread",
                "Whole wheat flour, water, salt, yeast",
                247,
                12.0,
                4.0,
                41.0,
                6.0,
                0.55,
                true
        );

        Product product4 = new Product(
                null,
                "Apple",
                "",
                52,
                0.3,
                0.2,
                14.0,
                2.4,
                0.0,
                true
        );

        repository.save(product1);
        repository.save(product2);
        repository.save(product3);
        repository.save(product4);

    }
}
