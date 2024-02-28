package org.example.controllers;

import lombok.AllArgsConstructor;
import org.example.dto.category.CategoryCreateDTO;
import org.example.dto.category.CategoryEditDTO;
import org.example.dto.category.CategoryItemDTO;
import org.example.dto.common.SelectItemDTO;
import org.example.mapper.CategoryMapper;
import org.example.repositories.CategoryRepository;
import org.example.services.CategoryService;
import org.example.storage.FileSaveFormat;
import org.example.storage.StorageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    //final - як readlonly на С#
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final StorageService storageService;
    private final CategoryService categoryService;

    //HttpGet - аналог ASP.NET - отримання інформації
    @GetMapping
    public ResponseEntity<Page<CategoryItemDTO>> index(Pageable pageable) {
        var model = categoryService.getAll(pageable);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @PostMapping(value="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> create(@ModelAttribute CategoryCreateDTO dto) {
        try {
            var entity = categoryMapper.categoryEntityByCategoryCreateDTO(dto);
            entity.setCreationTime(LocalDateTime.now());
            String fileName = storageService.SaveImage(dto.getFile(), FileSaveFormat.WEBP);
            entity.setImage(fileName);
            categoryRepository.save(entity);
            var result = categoryMapper.categoryItemDTO(entity);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(value="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CategoryItemDTO> edit(@ModelAttribute CategoryEditDTO model) {
        var old = categoryRepository.findById(model.getId()).orElse(null);
        if (old == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var entity = categoryMapper.categoryEditDto(model);
        if(model.getFile()==null) {
            entity.setImage(old.getImage());
        }
        else {
            try {
                storageService.deleteImage(old.getImage());
                String fileName = storageService.SaveImage(model.getFile(), FileSaveFormat.WEBP);
                entity.setImage(fileName);
            }
            catch (Exception exception) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        categoryRepository.save(entity);
        var result = categoryMapper.categoryItemDTO(entity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Method to delete a category by ID
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable int categoryId) {
        var entity = categoryRepository.findById(categoryId).orElse(null);
        if (entity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            storageService.deleteImage(entity.getImage());
            categoryRepository.deleteById(categoryId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryItemDTO> getById(@PathVariable int categoryId) {
        var entity = categoryRepository.findById(categoryId).orElse(null);
        if (entity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        var result =  categoryMapper.categoryItemDTO(entity);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CategoryItemDTO>> searchByName(@RequestParam(required = false) String name,
                                                              Pageable pageable) {
        Page<CategoryItemDTO> categories = categoryService.searchByName(name, pageable);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/selectList")
    public ResponseEntity<List<SelectItemDTO>> selectList() {
        var list = categoryService.getSelectList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
