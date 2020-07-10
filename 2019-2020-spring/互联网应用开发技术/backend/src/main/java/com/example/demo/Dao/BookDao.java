package com.example.demo.Dao;

import com.example.demo.entity.Book;

import java.util.List;

public interface BookDao {
    Book findOne(Integer id);

    List<Book> getBooks();

    Book edit(Book book);

    void delete(int key);

    void editIcon(int id,String icon);

    List<Integer> getBookKey();
}
