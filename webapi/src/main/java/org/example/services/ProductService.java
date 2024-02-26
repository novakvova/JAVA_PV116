package org.example.services;

import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;

import java.util.List;

public interface ProductService {
    ProductItemDTO create(ProductCreateDTO model);
    List<ProductItemDTO> get();
}