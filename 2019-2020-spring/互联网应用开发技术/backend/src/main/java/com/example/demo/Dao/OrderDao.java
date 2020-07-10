package com.example.demo.Dao;

import com.example.demo.entity.Order;

import java.util.List;

public interface OrderDao {
    Order saveOrder(Order order);

    List<Order> findOneCustomer(int customer);

    List<Order> findAll();

    List<Order> findAllByBook(int book);
}
