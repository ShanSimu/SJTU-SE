package com.example.demo.daoimpl;

import com.example.demo.Dao.OrderDao;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> findOneCustomer(int customer) {
        return orderRepository.findOrdersByCustomerEqualsOrderByKeyAsc(customer);
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findAllByBook(int book) {
        return orderRepository.findOrdersByItem(book);
    }
}
