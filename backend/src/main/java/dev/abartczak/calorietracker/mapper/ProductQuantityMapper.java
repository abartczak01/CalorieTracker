package dev.abartczak.calorietracker.mapper;

import dev.abartczak.calorietracker.domain.Product;
import dev.abartczak.calorietracker.domain.ProductQuantity;
import dev.abartczak.calorietracker.dto.ProductQuantityDTO;
import org.springframework.stereotype.Component;

@Component
public class ProductQuantityMapper {
    public ProductQuantityDTO toProductQuantityDTO(ProductQuantity productQuantity) {
        Product product = productQuantity.getProduct();
        Integer quantity = productQuantity.getQuantity();

        return ProductQuantityDTO.builder()
                .id(productQuantity.getId())
                .productId(product.getId())
                .productName(product.getName())
                .quantity(quantity)
                .kcal(calculateValue(product.getKcal(), quantity))
                .protein(calculateValue(product.getProtein(), quantity))
                .carbohydrate(calculateValue(product.getCarbohydrate(), quantity))
                .fat(calculateValue(product.getFat(), quantity))
                .fiber(calculateValue(product.getFiber(), quantity))
                .sodium(calculateValue(product.getSodium(), quantity))
                .build();
    }

    private Integer calculateValue(Integer per100gValue, Integer quantity) {
        if (per100gValue == null) {
            return null;
        }
        return (int) (per100gValue * (quantity / 100.0));
    }

    private Double calculateValue(Double per100gValue, Integer quantity) {
        if (per100gValue == null) {
            return null;
        }
        return per100gValue * (quantity / 100.0);
    }
}
