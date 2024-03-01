package org.example.specifications;

import org.example.entities.ProductEntity;
import org.springframework.data.jpa.domain.Specification;

public class ProductEntitySpecifications {
    public static Specification<ProductEntity> findByCategoryId(int categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == 0) {
                return criteriaBuilder.notEqual(root.get("category").get("id"), 0);
            } else {
                return criteriaBuilder.equal(root.get("category").get("id"), categoryId);
            }
        };
    }
}
