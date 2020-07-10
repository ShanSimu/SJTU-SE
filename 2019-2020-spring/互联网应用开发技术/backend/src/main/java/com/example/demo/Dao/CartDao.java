package com.example.demo.Dao;

import com.example.demo.entity.Cart;

import java.util.List;

public interface CartDao {
    Cart saveOneCart(Cart cart);

    List<Cart> getCarts(int customer);

    void deleteAllCarts(int customer);

    Cart verifyExist(int customer,int item);

    void deleteOneCart(int customer,int item);
}
