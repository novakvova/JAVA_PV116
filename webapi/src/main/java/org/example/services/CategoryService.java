package org.example.services;

import org.example.dto.category.CategoryItemDTO;
import org.example.dto.common.SelectItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    Page<CategoryItemDTO> getAll(Pageable pageable);
    Page<CategoryItemDTO> searchByName(String name, Pageable pageable);
    List<SelectItemDTO> getSelectList();
}
