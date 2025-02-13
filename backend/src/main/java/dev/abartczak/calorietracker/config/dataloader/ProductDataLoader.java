package dev.abartczak.calorietracker.config.dataloader;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

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
                false,
                LocalDateTime.now()
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
                true,
                LocalDateTime.now().minusDays(1)
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
                true,
                LocalDateTime.now().minusDays(1)
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
                true,
                LocalDateTime.now().minusDays(2)
        );

        Product product5 = new Product(
                null,
                "Banana",
                "",
                89,
                1.1,
                0.3,
                23.0,
                2.6,
                0.01,
                true,
                LocalDateTime.now().minusDays(2)
        );

        Product product6 = new Product(
                null,
                "Peanut Butter",
                "Peanuts, salt",
                588,
                25.0,
                50.0,
                20.0,
                8.0,
                0.02,
                true,
                LocalDateTime.now().minusDays(3)
        );

        Product product7 = new Product(
                null,
                "Greek Yogurt",
                "Milk, bacterial cultures",
                59,
                10.0,
                0.4,
                3.6,
                0.0,
                0.05,
                false,
                LocalDateTime.now().minusDays(4)
        );

        Product product8 = new Product(
                null,
                "Almonds",
                "Almonds",
                579,
                21.0,
                49.0,
                22.0,
                12.5,
                0.01,
                true,
                LocalDateTime.now().minusDays(4)
        );

        Product product9 = new Product(
                null,
                "Carrot",
                "",
                41,
                0.9,
                0.2,
                10.0,
                2.8,
                0.07,
                true,
                LocalDateTime.now().minusDays(9)
        );

        Product product10 = new Product(
                null,
                "Salmon",
                "Salmon fillet",
                208,
                20.0,
                13.0,
                0.0,
                0.0,
                0.02,
                false,
                LocalDateTime.now().minusDays(7)
        );

        Product product11 = new Product(
                null,
                "Eggs",
                "Chicken eggs",
                155,
                13.0,
                11.0,
                1.1,
                0.0,
                0.02,
                false,
                LocalDateTime.now().minusDays(1)
        );

        Product product12 = new Product(
                null,
                "Perła Export Beer",
                "water, hops, BARLEY MALT",
                49,
                0.5,
                0.0,
                3.9,
                0.0,
                0.01,
                true,
                LocalDateTime.now().minusDays(8)
        );

        Product product13 = new Product(
                null,
                "Cheddar Cheese",
                "Milk, salt, enzymes",
                402,
                25.0,
                33.0,
                1.3,
                0.0,
                0.68,
                false,
                LocalDateTime.now().minusDays(3)
        );

        Product product14 = new Product(
                null,
                "Tomato",
                "",
                18,
                0.9,
                0.2,
                3.9,
                1.2,
                0.02,
                true,
                LocalDateTime.now().minusDays(12)
        );

        repository.save(product1);
        repository.save(product2);
        repository.save(product3);
        repository.save(product4);
        repository.save(product5);
        repository.save(product6);
        repository.save(product7);
        repository.save(product8);
        repository.save(product9);
        repository.save(product10);
        repository.save(product11);
        repository.save(product12);
        repository.save(product13);
        repository.save(product14);
    }
}
