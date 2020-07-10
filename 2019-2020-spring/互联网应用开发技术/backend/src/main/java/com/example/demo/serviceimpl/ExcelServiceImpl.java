package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Dao.BookDao;
import com.example.demo.Dao.OrderDao;
import com.example.demo.Dao.UserDao;
import com.example.demo.entity.Book;
import com.example.demo.entity.Order;
import com.example.demo.entity.User;
import com.example.demo.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ExcelServiceImpl implements ExcelService {

    @Autowired
    OrderDao orderDao;

    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Override
    public List<JSONObject> saleExcel(int start, int end) {
        List<JSONObject> objectList = new ArrayList<>();
        List<Integer> integers = bookDao.getBookKey();
        int date;
        for (int i : integers)
        {
            List<Order> orderList = orderDao.findAllByBook(i);
            int number = 0;
            for (Order order : orderList)
            {
                date = Integer.parseInt(order.getPurchase_time().toString().substring(0,10).replace("-",""));
                if(date<start||date>end)
                    continue;
                number += order.getSum_book();
            }
            Book book = bookDao.findOne(i);
            if(number == 0)
                continue;
            JSONObject object = new JSONObject();
            object.put("key",i);
            object.put("title",book.getTitle());
            object.put("number",number);
            object.put("money",number*book.getPrice());
            objectList.add(object);
        }
        return objectList;
    }

    @Override
    public List<JSONObject> userExcel(int start, int end) {
        List<JSONObject> objectList = new ArrayList<>();
        List<Integer> integerList = userDao.getUserKey();
        int date;
        for (int i : integerList){
            User user = userDao.getOneUser(i);
            List<Order> orderList = orderDao.findOneCustomer(i);
            int money = 0;
            for(Order order : orderList)
            {
                date = Integer.parseInt(order.getPurchase_time().toString().substring(0,10).replace("-",""));
                if(date<start||date>end)
                    continue;
                Book book = bookDao.findOne(order.getItem());
                money += order.getSum_book()*book.getPrice();
            }
            if(money == 0)
                continue;
            JSONObject object = new JSONObject();
            object.put("key",i);
            object.put("user",user.getName());
            object.put("money",money);
            objectList.add(object);
        }
        return objectList;
    }

    @Override
    public List<JSONObject> customerExcel(int customer, int start, int end) {
        List<JSONObject> objectList = new ArrayList<>();
        List<Integer> integers = bookDao.getBookKey();
        int date;
        for (int i : integers)
        {
            List<Order> orderList = orderDao.findAllByBook(i);
            int number = 0;
            for (Order order : orderList)
            {
                date = Integer.parseInt(order.getPurchase_time().toString().substring(0,10).replace("-",""));
                if(date<start||date>end)
                    continue;
                if(order.getCustomer() != customer)
                    continue;
                number += order.getSum_book();
            }
            Book book = bookDao.findOne(i);
            if(number == 0)
                continue;
            JSONObject object = new JSONObject();
            object.put("key",i);
            object.put("title",book.getTitle());
            object.put("number",number);
            object.put("money",number*book.getPrice());
            objectList.add(object);
        }
        return objectList;
    }
}
