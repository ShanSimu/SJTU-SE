package com.example.demo.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.Dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public JSONObject checkUser(String name, String password) {
        JSONObject object = new JSONObject();
        String param1 = "being",param2 = "available",param3="admin";
        User user = userDao.checkUser(name,password);
        System.out.println(user);
        if(user == null) {
            object.put("myState", 0);
            return object;
        }
        object.put("userID",user.getKey());
        if(user.getAvailability() == 0)
            object.put("myState",1);
        else if(user.getType() == 0)
            object.put("myState",2);
        else
            object.put("myState",3);

        return object;
    }

    @Override
    public JSONObject overlapUsername(String username) {
        JSONObject object = new JSONObject();
        User user = userDao.overlapUsername(username);
        if(user == null)
            object.put("overlap",false);
        else
            object.put("overlap",true);

        System.out.println(object);
        return object;
    }

    @Override
    public JSONObject save(String username, String password, String email) {
        JSONObject object = new JSONObject();
        User testUser = userDao.overlapUsername(username);
        if(testUser == null)
            object.put("overlap",false);
        else {
            object.put("overlap", true);
            return object;
        }
        User user;
        user = new User();
        user.setName(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setType(0);
        user.setAvailability(1);

        userDao.save(user);
        return object;
    }

    @Override
    public List<User> getPassengers() {
        return userDao.getPassengers();
    }

    @Override
    public List<User> blockOrUnblock(int id, int blockBit) {
        User user = userDao.getOneUser(id);
        user.setAvailability(blockBit);
        userDao.save(user);
        return userDao.getPassengers();
    }
}
