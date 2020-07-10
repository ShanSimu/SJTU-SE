package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;

@Entity
@Table(name = "users",schema ="ormsample")
public class User {
    private int key;
    private String name;
    private String password;
    private int type;
    private String email;
    private int availability;

    @Id
    @Column(name = "ID")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getKey(){return key;}
    public void setKey(int key){this.key = key;}

    @Basic
    @Column(name = "name_users")
    public String getName(){return  name;}
    public void setName(String name){this.name = name;}

    @Basic
    @Column(name = "password_users")
    public String getPassword(){return password;}
    public void setPassword(String password){this.password = password;}

    @Basic
    @Column(name = "user_type")
    public int getType(){return type;}
    public void setType(int type){this.type = type;}

    @Basic
    @Column(name = "email")
    public String getEmail(){return email;}
    public void setEmail(String email){this.email = email;}

    @Basic
    @Column(name = "_availability")
    public int getAvailability(){return availability;}
    public void setAvailability(int availability){this.availability = availability;}

//    private List<OrderItem> items;
////表orders作为中间表，既得有映射到users上的外键，又得有映射到orderitem上的外键
//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "orders",joinColumns = @JoinColumn(name ="customer"),
//            inverseJoinColumns = @JoinColumn(name = "id_item"))
//    public List<OrderItem> getItems() {return items;}
//
//    public void setItems(List<OrderItem> items) {this.items = items;}

}
