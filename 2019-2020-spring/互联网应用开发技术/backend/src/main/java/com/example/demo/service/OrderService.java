package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Order;

import java.util.List;

public interface OrderService {
//    List<Order> saveAllOrder(int customer);

    List<JSONObject> getOrder(int customer);

    List<JSONObject> getAllOrder();
}
