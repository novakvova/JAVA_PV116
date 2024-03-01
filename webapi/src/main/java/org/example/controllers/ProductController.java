package org.example.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.dto.product.ProductCreateDTO;
import org.example.dto.product.ProductItemDTO;
import org.example.dto.product.ProductSearchResultDTO;
import org.example.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final ProductService productService;
    @GetMapping
    public ResponseEntity<List<ProductItemDTO>> index() {
        return new ResponseEntity<>(productService.get(), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductItemDTO> create(@Valid @ModelAttribute ProductCreateDTO model) {
        var result = productService.create(model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ProductSearchResultDTO> searchProducts(
            @RequestParam (defaultValue = "")String name,
            @RequestParam (defaultValue = "")String category,
            @RequestParam (defaultValue = "")String description,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        ProductSearchResultDTO searchResult = productService.searchProducts(name, category,
                description, page, size);

        return new ResponseEntity<>(searchResult, HttpStatus.OK);
    }

}
