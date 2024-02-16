package org.example;

import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.example.storage.StorageProperties;
import org.example.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.Calendar;


@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner(CategoryRepository repository, StorageService storageService) {
        return args -> {
            storageService.init();
//            CategoryEntity category = new CategoryEntity();
//            category.setName("Одяг");
//            category.setImage("1.jpg");
//            category.setDescription("Для дорослих людей");
//            category.setCreationTime(LocalDateTime.now());
//            repository.save(category);
        };
    }
}