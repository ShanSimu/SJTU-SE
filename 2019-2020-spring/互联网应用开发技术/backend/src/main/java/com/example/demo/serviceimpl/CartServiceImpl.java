package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Dao.BookDao;
import com.example.demo.Dao.CartDao;
import com.example.demo.Dao.OrderDao;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private BookDao bookDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public List<JSONObject> saveOneCart(int customer, int book) {
        Cart cart = cartDao.verifyExist(customer,book);
        if(cart != null)
        {
            cart.setSum_book(cart.getSum_book()+1);
        }
        else {
            cart = new Cart();
            cart.setCustomer(customer);
            cart.setItem(book);
            cart.setSum_book(1);
        }

        cartDao.saveOneCart(cart);

        return getCarts(customer);
    }

    @Override
    public List<JSONObject> getCarts(int customer) {
        List<Cart> Carts = cartDao.getCarts(customer);
        List<JSONObject> objectList = new ArrayList<>();
        int key = 0;
        for (Cart cart : Carts) {
            Book book = bookDao.findOne(cart.getItem());
            JSONObject object = new JSONObject();
            object.put("key",key);
            object.put("book_id",book.getKey());
            object.put("title",book.getTitle());
            object.put("author",book.getAuthor());
            object.put("price",book.getPrice());
            object.put("stocks",book.getStocks());
            object.put("number",cart.getSum_book());
            object.put("iconBase64",book.getIcon().getIconBase64());
            objectList.add(object);
            key++;
        }

        return objectList;
    }

    @Override
    public List<JSONObject> reduceOneCart(int customer, int book) {
        Cart cart = cartDao.verifyExist(customer,book);
        int sum_book = cart.getSum_book();
        if(sum_book > 1)
        {
            cart.setSum_book(sum_book-1);
            cartDao.saveOneCart(cart);
        }
        else
        {
            cartDao.deleteOneCart(customer,book);
        }

        return getCarts(customer);
    }

    @Override
    public List<JSONObject> deleteOneCart(int customer, int book) {
        Cart cart = cartDao.verifyExist(customer,book);
        Book book1 = bookDao.findOne(book);
        book1.setStocks(book1.getStocks()-cart.getSum_book());
        cartDao.deleteOneCart(customer,book);
        bookDao.edit(book1);

        Order order = new Order();
        order.setCustomer(customer);
        order.setItem(book);
        order.setSum_book(cart.getSum_book());
        order.setPurchase_time(new Date());
        orderDao.saveOrder(order);
        return getCarts(customer);
    }

    @Override
    public List<Book> getMobileCart(int customer) {
        List<Cart> Carts = cartDao.getCarts(customer);
        List<Book> bookList = new ArrayList<>();
        for (Cart cart : Carts) {
            Book book = bookDao.findOne(cart.getItem());
            bookList.add(book);
        }

        return bookList;
    }

    @Override
    public boolean deleteAllMobileOrder(int customer) {
        List<Cart> carts = cartDao.getCarts(customer);

        for (Cart cart : carts){
            Order order = new Order();
            order.setCustomer(cart.getCustomer());
            order.setItem(cart.getItem());
            order.setSum_book((cart.getSum_book()));
            order.setPurchase_time(new Date());
            orderDao.saveOrder(order);
        }

        cartDao.deleteAllCarts(customer);

        return true;
    }
}
