package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3000)
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
  public JSONObject checkUser(@RequestParam("username") String name, @RequestParam("password") String password){
        System.out.println(name);
        System.out.println(password);
        System.out.println("someone is coming !");

        return userService.checkUser(name, password);
    }

    @RequestMapping("/overlap")
    public JSONObject overlapName(@RequestParam("username") String username){
        return userService.overlapUsername(username);
    }

    @RequestMapping("/register")
    public JSONObject registerUser(@RequestParam("username") String username,@RequestParam("password") String password,@RequestParam("email") String email)
    {
        return userService.save(username,password,email);
    }

    @RequestMapping("/getPassengers")
    public List<User> getPassengers(){
        return userService.getPassengers();
    }

    @RequestMapping("/blockOrUnblock")
    public List<User> blockOrUnblock(@RequestParam("userID") int userID ,@RequestParam("blockBit") int blockBit){
        System.out.println(userID);
        System.out.println(blockBit);
        return userService.blockOrUnblock(userID,blockBit);
    }
}
