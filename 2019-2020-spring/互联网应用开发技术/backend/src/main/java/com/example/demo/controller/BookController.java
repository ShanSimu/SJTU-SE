package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.BookIcon;
import com.example.demo.repository.BookIconRepository;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3000)
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

//    @Autowired
//    private BookIconRepository bookIconRepository;

//    @RequestMapping("/getIcons")
//    public List<BookIcon> getBookIcons(){
//        System.out.println("Get bookicons !");
//        return bookIconRepository.findAll();
//    }

    @RequestMapping("/deleteBook")
    public void deleteBook(@RequestParam("book")int key)
    {
        bookService.deleteBook(key);
    }

    @RequestMapping("/getBooks")
    public List<Book> getBooks() {
        System.out.println("Get books !");
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id){
        System.out.println(id);
        return bookService.findBookById(id);
    }
//    public Book save(int key, String title, String author, String isbn, int stocks) {
    @RequestMapping("/editBook")
    public Book editBook(@RequestParam("key") int key,@RequestParam("title") String title,@RequestParam("author") String author,
                          @RequestParam("isbn") String isbn, @RequestParam("price") double price, @RequestParam("stocks") int stocks)
    {
        System.out.println(price);
        return bookService.save(key,title,author,isbn,price,stocks);
    }

    @RequestMapping("editBookIcon")
    public JSONObject editIcon(@RequestParam("id")int id, @RequestParam("icon")String icon)
    {
        return bookService.editIcon(id, icon);
    }
}
