package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{id}")
    ResponseEntity<Product> getProductById(@PathVariable long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    String.format("Product with id %s not found", id));
        }
        return ResponseEntity.ok(foundProduct.get());
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

    @PostMapping("")
    ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id));
        }
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProduct = productService.findById(id);

        if (existingProduct.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id));
        }

        Product product = existingProduct.get();
        product.setName(updatedProduct.getName());
        product.setIngredients(updatedProduct.getIngredients());
        product.setKcal(updatedProduct.getKcal());
        product.setProtein(updatedProduct.getProtein());
        product.setFat(updatedProduct.getFat());
        product.setCarbohydrate(updatedProduct.getCarbohydrate());
        product.setFiber(updatedProduct.getFiber());
        product.setSodium(updatedProduct.getSodium());
        product.setIsVegan(updatedProduct.getIsVegan());

        return ResponseEntity.ok(productService.save(product));
    }

}