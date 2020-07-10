package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    @Query("select u from User u where u.name = :name and u.password = :password")
    User checkUser(@Param("name") String name, @Param("password") String password);

    User findUserByNameEquals(@Param("username")String username);

    List<User> getUsersByTypeEquals(@Param("type")int type);

    User findUserByKeyEquals(@Param("userID") int usrID);
}
