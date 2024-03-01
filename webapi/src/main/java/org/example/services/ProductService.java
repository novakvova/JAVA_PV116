package org.example.services;

import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.dto.product.ProductSearchResultDTO;

import java.util.List;

public interface ProductService {
    ProductItemDTO create(ProductCreateDTO model);
    List<ProductItemDTO> get();

    ProductSearchResultDTO searchProducts(String name, int categoryId,
                                                 String description, int page, int size);
}