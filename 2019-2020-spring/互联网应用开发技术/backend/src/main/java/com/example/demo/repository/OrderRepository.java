package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    List<Order> findOrdersByCustomerEqualsOrderByKeyAsc(@Param("customer") int customer);

    List<Order> findOrdersByItem(@Param("book") int item);
}
