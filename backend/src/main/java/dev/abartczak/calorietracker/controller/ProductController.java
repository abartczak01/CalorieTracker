package dev.abartczak.calorietracker.controller;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<Product> getProductById(@PathVariable long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id));
        }
        return ResponseEntity.ok(foundProduct.get());
    }

    @PostMapping("")
    ResponseEntity<Product> createProduct(@RequestBody Product product) {
        System.out.println(product.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProductById(@PathVariable long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (foundProduct.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id));
        }
        productService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
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

        return ResponseEntity.ok(productService.save(product));
    }

}