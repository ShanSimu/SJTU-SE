package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.Book;
import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3000)
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

//    @RequestMapping("/saveOrders")
//    public List<Order> saveAllOrders(@RequestParam("customer") int customer){
//        System.out.println("empty !");
//        return orderService.saveAllOrder(customer);
//    }

    @RequestMapping("/getOrders")
    public List<JSONObject> getOrders(@RequestParam("customer") int customer){
        System.out.println("get orders!");
        return orderService.getOrder(customer);
    }

    @RequestMapping("/getAllOrder")
    public List<JSONObject> getAllOrders(@RequestParam("customer") int customer){
        System.out.println("get All order!");
        return orderService.getAllOrder();
    }
}
