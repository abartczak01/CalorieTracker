package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id)));
    }

    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id));
        }
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Product with id %s not found", id)));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setIngredients(updatedProduct.getIngredients());
        existingProduct.setKcal(updatedProduct.getKcal());
        existingProduct.setProtein(updatedProduct.getProtein());
        existingProduct.setFat(updatedProduct.getFat());
        existingProduct.setCarbohydrate(updatedProduct.getCarbohydrate());
        existingProduct.setFiber(updatedProduct.getFiber());
        existingProduct.setSodium(updatedProduct.getSodium());
        existingProduct.setIsVegan(updatedProduct.getIsVegan());

        return productRepository.save(existingProduct);
    }

    public List<Product> searchProducts(
            String name,
            String ingredients,
            Boolean isVegan,
            Integer minKcal,
            Integer maxKcal,
            Double minProtein,
            Double maxProtein,
            Double minFat,
            Double maxFat,
            Double minCarbohydrate,
            Double maxCarbohydrate
    ) {
        Specification<Product> spec = Specification.where(null);

        if (name != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
        }
        if (ingredients != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("ingredients")), "%" + ingredients.toLowerCase() + "%"));
        }
        if (isVegan != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("isVegan"), isVegan));
        }
        if (minKcal != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("kcal"), minKcal));
        }
        if (maxKcal != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("kcal"), maxKcal));
        }
        if (minProtein != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("protein"), minProtein));
        }
        if (maxProtein != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("protein"), maxProtein));
        }
        if (minFat != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("fat"), minFat));
        }
        if (maxFat != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("fat"), maxFat));
        }
        if (minCarbohydrate != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("carbohydrate"), minCarbohydrate));
        }
        if (maxCarbohydrate != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("carbohydrate"), maxCarbohydrate));
        }

        return productRepository.findAll(spec);
    }
}
