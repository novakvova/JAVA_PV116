package org.example.repositories;

import org.example.entities.ProductEntity;
import org.example.entities.ProductImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity, Integer> {
    ProductImageEntity findByName(String name);

    @Query("SELECT pi.name FROM ProductImageEntity pi WHERE pi.product = :product ORDER BY pi.priority")
    List<String> findImageNamesByProduct(@Param("product") ProductEntity product);
}
