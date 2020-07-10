package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Dao.BookDao;
import com.example.demo.Dao.OrderDao;
import com.example.demo.Dao.UserDao;
import com.example.demo.entity.Book;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private BookDao bookDao;

    @Autowired
    private UserDao userDao;

    @Override
    public List<JSONObject> getOrder(int customer) {
        List<Order> orders = orderDao.findOneCustomer(customer);
        List<JSONObject> objectList = new ArrayList<>();
        for(Order order : orders){
            Book book = bookDao.findOne(order.getItem());
            JSONObject object = new JSONObject();
            object.put("key",order.getKey());
            object.put("title",book.getTitle());
            object.put("author",book.getAuthor());
            object.put("isbn",book.getIsbn());
            object.put("number",order.getSum_book());
            object.put("price",order.getSum_book()*book.getPrice());
            object.put("date",order.getPurchase_time());
            object.put("iconBase64",book.getIcon().getIconBase64());
            objectList.add(object);
        }
        return objectList;
    }

    @Override
    public List<JSONObject> getAllOrder() {
        List<Order> orders = orderDao.findAll();
        List<JSONObject> objectList = new ArrayList<>();
        for (Order order : orders)
        {
            Book book = bookDao.findOne(order.getItem());
            User user = userDao.getOneUser(order.getCustomer());
            JSONObject object = new JSONObject();
            object.put("key",order.getKey());
            object.put("user",user.getName());
            object.put("title",book.getTitle());
            object.put("author",book.getAuthor());
            object.put("isbn",book.getIsbn());
            object.put("number",order.getSum_book());
            object.put("price",order.getSum_book()*book.getPrice());
            System.out.println(order.getPurchase_time());
            object.put("date",order.getPurchase_time());
            objectList.add(object);
        }
        return objectList;
    }
}
