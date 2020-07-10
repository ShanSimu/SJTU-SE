package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.User;

import java.util.List;

public interface UserService {

    JSONObject checkUser(String name, String password);

    JSONObject overlapUsername(String username);

    JSONObject save(String username,String password,String email);

    List<User> getPassengers();

    List<User> blockOrUnblock(int id,int blockBit);
}
