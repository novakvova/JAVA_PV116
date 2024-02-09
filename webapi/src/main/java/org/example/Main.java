package org.example;

import org.example.entities.CategoryEntity;
import org.example.repositories.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Calendar;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner(CategoryRepository repository) {
        return args -> {
//            Calendar calendar = Calendar.getInstance();
//            CategoryEntity category = new CategoryEntity();
//            category.setName("Одяг");
//            category.setImage("1.jpg");
//            category.setDescription("Для дорослих людей");
//            category.setDateCreated(calendar.getTime());
//            repository.save(category);
        };
    }
}