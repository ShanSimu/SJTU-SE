package com.example.demo.daoimpl;

import com.example.demo.Dao.BookDao;
import com.example.demo.entity.Book;
import com.example.demo.entity.BookIcon;
import com.example.demo.repository.BookIconRepository;
import com.example.demo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookIconRepository bookIconRepository;

    @Override
    public Book findOne(Integer id) {
        Book book = bookRepository.getBooksByKeyEquals(id);
        Optional<BookIcon> icon = bookIconRepository.findById(id);
        if(icon.isPresent()){
            book.setIcon(icon.get());
        }
        else {
            book.setIcon(null);
        }
        return book;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();
        for (Book book : books)
        {
            int _id = book.getKey();
            Optional<BookIcon> icon = bookIconRepository.findById(_id);
            if(icon.isPresent()){
                book.setIcon(icon.get());
            }
            else {
                book.setIcon(null);
            }
        }
        return books;
    }

    @Override
    public Book edit(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void delete(int key) {

        bookIconRepository.removeBookIconById(key);

        bookRepository.deleteById(key);
    }

    @Override
    public void editIcon(int id,String icon) {
        bookIconRepository.removeBookIconById(id);
        BookIcon bookIcon = new BookIcon(id,icon);
        bookIconRepository.save(bookIcon);
    }

    @Override
    public List<Integer> getBookKey() {
        List<Book> bookList = bookRepository.findAll();
        List<Integer> integerList = new ArrayList<>();
        for (Book book:bookList)
        {
            integerList.add(book.getKey());
        }
        return integerList;
    }
}
