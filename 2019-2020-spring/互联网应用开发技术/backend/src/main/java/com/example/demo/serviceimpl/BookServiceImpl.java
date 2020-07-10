package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Dao.BookDao;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id) {
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book save(int key, String title, String author, String isbn,double price, int stocks) {
        Book book = new Book();
        book.setKey(key);
        book.setTitle(title);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setPrice(price);
        book.setStocks(stocks);

        return bookDao.edit(book);
    }

    @Override
    public void deleteBook(int key) {
        bookDao.delete(key);
    }

    @Override
    public JSONObject editIcon(int id, String icon) {
        JSONObject object = new JSONObject();
        bookDao.editIcon(id,icon);
        object.put("status","ok");
        return object;
    }
}
