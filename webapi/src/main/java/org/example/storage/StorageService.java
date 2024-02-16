package org.example.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    void init() throws IOException;
    String SaveImage(MultipartFile file, FileSaveFormat format) throws IOException;
}
