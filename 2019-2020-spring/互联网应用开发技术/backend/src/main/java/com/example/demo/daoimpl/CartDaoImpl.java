package com.example.demo.daoimpl;

import com.example.demo.Dao.CartDao;
import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart saveOneCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public List<Cart> getCarts(int customer) {
        return cartRepository.getCartsByCustomerEqualsOrderByKeyAsc(customer);
    }


    @Override
    public void deleteOneCart(int customer, int item) {
        cartRepository.deleteByCustomerAndItem(customer,item);
    }

    @Override
    public void deleteAllCarts(int customer) {
        cartRepository.deleteByCustomer(customer);
    }

    @Override
    public Cart verifyExist(int customer, int item) {
        return cartRepository.getCartByCustomerAndItem(customer,item);
    }
}
