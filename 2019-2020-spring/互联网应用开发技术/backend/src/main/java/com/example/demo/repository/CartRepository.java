package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Integer> {

    List<Cart> getCartsByCustomerEqualsOrderByKeyAsc(@Param("customer") int customer);

    void deleteByCustomer(@Param("customer") int customer);

    int deleteByCustomerAndItem(int customer, int item);

    Cart getCartByCustomerAndItem(@Param("customer") int customer, @Param("item") int item);
}
