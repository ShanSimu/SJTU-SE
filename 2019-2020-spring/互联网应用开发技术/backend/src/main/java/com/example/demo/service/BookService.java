package com.example.demo.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;

import java.util.List;

public interface BookService {

    Book findBookById(Integer id);

    List<Book> getBooks();

    void deleteBook(int key);

    Book save(int key,String title,String author,String isbn,double price, int stocks);

    JSONObject editIcon(int id, String icon);
}
