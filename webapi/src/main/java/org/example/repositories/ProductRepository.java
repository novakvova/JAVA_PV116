package org.example.repositories;

import org.example.entities.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer>, JpaSpecificationExecutor<ProductEntity> {
    @Query("SELECT p FROM ProductEntity p WHERE LOWER(p.name) LIKE LOWER(:name) " +
            "AND LOWER(p.category.name) LIKE LOWER(:category) " +
            "AND LOWER(p.description) LIKE LOWER(:description)")
    Page<ProductEntity> searchProducts(
            @Param("name") String name,
            @Param("category") String category,
            @Param("description") String description,
            Pageable pageable);

//    Page<ProductEntity> searchProducts(Specification<ProductEntity> spec,
//            Pageable pageable);
}
