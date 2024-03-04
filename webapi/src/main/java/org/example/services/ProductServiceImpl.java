package org.example.services;

import lombok.AllArgsConstructor;
import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.dto.product.ProductSearchResultDTO;
import org.example.entities.CategoryEntity;
import org.example.entities.ProductEntity;
import org.example.entities.ProductImageEntity;
import org.example.mapper.ProductMapper;
import org.example.repositories.ProductImageRepository;
import org.example.repositories.ProductRepository;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

import static org.example.specifications.ProductEntitySpecifications.*;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final StorageService storageService;
    private final ProductMapper productMapper;

    @Override
    public ProductItemDTO create(ProductCreateDTO model) {
        var p = new ProductEntity();
        var cat = new CategoryEntity();
        cat.setId(model.getCategory_id());
        p.setName(model.getName());
        p.setDescription(model.getDescription());
        p.setPrice(model.getPrice());
        p.setDateCreated(LocalDateTime.now());
        p.setCategory(cat);
        p.setDelete(false);
        productRepository.save(p);
        int priority = 1;
        for (var img : model.getFiles()) {
            try {
                var file = storageService.SaveImage(img, FileSaveFormat.WEBP);
                ProductImageEntity pi = new ProductImageEntity();
                pi.setName(file);
                pi.setDateCreated(LocalDateTime.now());
                pi.setPriority(priority);
                pi.setDelete(false);
                pi.setProduct(p);
                productImageRepository.save(pi);
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
            priority++;
        }
        return null;
    }

    @Override
    public List<ProductItemDTO> get() {
        var list = new ArrayList<ProductItemDTO>();
        var data = productRepository.findAll();
        for (var product : data) {
            ProductItemDTO productItemDTO = new ProductItemDTO();

            productItemDTO.setCategory(product.getCategory().getName());
            productItemDTO.setId(product.getId());
            productItemDTO.setName(product.getName());
            productItemDTO.setPrice(product.getPrice());
            productItemDTO.setDescription(product.getDescription());

            var items = new ArrayList<String>();
            for (var img : product.getProductImages()) {
                items.add(img.getName());
            }
            productItemDTO.setFiles(items);
            list.add(productItemDTO);
        }
        return list;
    }

    @Override
    public ProductSearchResultDTO searchProducts(
            String name, int categoryId, String description, int page, int size) {

        Page<ProductEntity> result = productRepository
                .findAll(findByCategoryId(categoryId).and(findByName(name)).and(findByDescription(description)),
                        PageRequest.of(page, size));

        List<ProductItemDTO> products = result.getContent().stream()
                .map(product -> {
                    ProductItemDTO productItemDTO = productMapper.ProductItemDTOByProduct(product);

                    // Retrieve image names for the current product
                    List<String> imageNames = productImageRepository.findImageNamesByProduct(product);
                    productItemDTO.setFiles(imageNames);

                    return productItemDTO;
                })
                .collect(Collectors.toList());

        return new ProductSearchResultDTO(products, (int) result.getTotalElements());
    }
}

