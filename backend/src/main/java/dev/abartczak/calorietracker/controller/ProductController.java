package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    ResponseEntity<Product> getProductById(@PathVariable long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @GetMapping("/search")
    ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String ingredients,
            @RequestParam(required = false) Boolean isVegan,
            @RequestParam(required = false) Integer minKcal,
            @RequestParam(required = false) Integer maxKcal,
            @RequestParam(required = false) Double minProtein,
            @RequestParam(required = false) Double maxProtein,
            @RequestParam(required = false) Double minFat,
            @RequestParam(required = false) Double maxFat,
            @RequestParam(required = false) Double minCarbohydrate,
            @RequestParam(required = false) Double maxCarbohydrate
    ) {
        List<Product> products = productService.searchProducts(
                name, ingredients, isVegan, minKcal, maxKcal, minProtein, maxProtein, minFat, maxFat, minCarbohydrate, maxCarbohydrate
        );
        return ResponseEntity.ok(products);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin")
    ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product updatedProduct) {
        return ResponseEntity.ok(productService.updateProduct(id, updatedProduct));
    }
}
