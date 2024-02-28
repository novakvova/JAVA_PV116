package org.example.services;

import lombok.AllArgsConstructor;
import org.example.dto.category.CategoryItemDTO;
import org.example.dto.common.SelectItemDTO;
import org.example.entities.CategoryEntity;
import org.example.mapper.CategoryMapper;
import org.example.repositories.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public Page<CategoryItemDTO> getAll(Pageable pageable) {
        Page<CategoryEntity> categories = categoryRepository.findAll(pageable);
        return categories.map(categoryMapper::categoryItemDTO);
    }

    @Override
    public Page<CategoryItemDTO> searchByName(String name, Pageable pageable) {
        Page<CategoryEntity> categories = categoryRepository.findByNameContainingIgnoreCase(name, pageable);
        return categories.map(categoryMapper::categoryItemDTO);
    }

    @Override
    public List<SelectItemDTO> getSelectList() {
        return categoryMapper.listSelectItemCategory(categoryRepository.findAll());
    }
}
