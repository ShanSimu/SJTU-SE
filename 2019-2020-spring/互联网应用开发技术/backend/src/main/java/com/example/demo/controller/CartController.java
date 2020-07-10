package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3000)
@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping("/saveOneCart")
    public List<JSONObject> saveOneCart(@RequestParam("customer") int customer,@RequestParam("book") int book){
        System.out.println(customer+" buy "+book);
        return cartService.saveOneCart(customer,book);
    }

    @RequestMapping("/reduceOneCart")
    public List<JSONObject> reduceOneCart(@RequestParam("customer") int customer,@RequestParam("book") int book){
        return cartService.reduceOneCart(customer,book);
    }

    @RequestMapping("/getCarts")
    public List<JSONObject> getCarts(@RequestParam("customer") int customer){
        System.out.println("get Carts!");
        return cartService.getCarts(customer);
    }

    @RequestMapping("/deleteOneCart")
    public List<JSONObject> deleteOneCart(@RequestParam("customer") int customer,@RequestParam("book") int book){
        return cartService.deleteOneCart(customer,book);
    }

    @RequestMapping("/getMobileCart")
    public List<Book> getMobileCarts(@RequestParam("customer") int customer){
        System.out.println("get Orders!");
        return cartService.getMobileCart(customer);
    }

    @RequestMapping("deleteAllMobileOrder")
    public boolean deleteAllMobileOrder(@RequestParam("customer") int customer){
        return cartService.deleteAllMobileOrder(customer);
    }
}
