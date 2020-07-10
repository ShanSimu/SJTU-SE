package com.example.demo.repository;

import com.example.demo.entity.BookIcon;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookIconRepository extends MongoRepository<BookIcon,Integer> {
    void removeBookIconById(int key);
}
