package org.example.dto.product;
import lombok.Data;

import java.util.List;

@Data
public class ProductEditDTO {
    private int id;
    private String name;
    private double price;
    private String description;
    private int category_id;
    public List<ProductPhotoDTO> oldPhotos;
    public List<ProductPhotoDTO> newPhotos;
}