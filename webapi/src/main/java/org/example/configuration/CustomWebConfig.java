package org.example.configuration;

import lombok.AllArgsConstructor;
import org.example.storage.StorageProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class CustomWebConfig implements WebMvcConfigurer {
    private final StorageProperties storageProperties;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Add the appropriate origin of your client application
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        String location = storageProperties.getLocation();
        registry.addResourceHandler("/"+location+"/**")
                .addResourceLocations("file:"+location+"/");
    }
}