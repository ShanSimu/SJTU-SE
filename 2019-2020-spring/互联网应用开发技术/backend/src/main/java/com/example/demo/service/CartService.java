package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;

import java.util.List;

public interface CartService {

    List<JSONObject> saveOneCart(int customer,int book);

    List<JSONObject> getCarts(int customer);

    List<JSONObject> reduceOneCart(int customer,int book);

    List<JSONObject> deleteOneCart(int customer,int book);

    List<Book> getMobileCart(int customer);

    boolean deleteAllMobileOrder(int customer);
}
