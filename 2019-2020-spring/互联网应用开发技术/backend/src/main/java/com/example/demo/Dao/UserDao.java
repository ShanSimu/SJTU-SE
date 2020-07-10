package com.example.demo.Dao;

import com.example.demo.entity.User;

import java.util.List;

public interface UserDao {

    User checkUser(String name, String password);

    User overlapUsername(String username);

    User save(User user);

    List<User> getPassengers();

    User blockOrUnblock(User user);

    User getOneUser(int id);

    List<Integer> getUserKey();
}
