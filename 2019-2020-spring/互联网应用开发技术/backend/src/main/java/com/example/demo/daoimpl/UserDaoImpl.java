package com.example.demo.daoimpl;

import com.example.demo.Dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User checkUser(String name, String password) {
        return userRepository.checkUser(name,password);
    }

    @Override
    public User overlapUsername(String username) {
        return userRepository.findUserByNameEquals(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getPassengers() {
        return userRepository.getUsersByTypeEquals(0);
    }

    @Override
    public User blockOrUnblock(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getOneUser(int id) {
        return userRepository.findUserByKeyEquals(id);
    }

    @Override
    public List<Integer> getUserKey() {
        List<Integer> integerList = new ArrayList<>();
        List<User> userList = userRepository.findAll();
        for (User user:userList)
        {
            integerList.add(user.getKey());
        }
        return integerList;
    }
}
