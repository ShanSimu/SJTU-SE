package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "carts",schema = "ormsample")
public class Cart {
    private int key;
    private int customer;
    private int item;
    private int sum_book;

    @Id
    @Column(name = "ID")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getKey(){return key;}
    public void setKey(int key){this.key = key;}

    @Basic
    @Column(name = "customer")
    public int getCustomer(){return customer;}
    public void setCustomer(int customer){this.customer = customer;}

    @Basic
    @Column(name = "id_item")
    public int getItem(){return item;}
    public void setItem(int item){this.item = item;}

    @Basic
    @Column(name = "sum_book")
    public int getSum_book(){return sum_book;}
    public void setSum_book(int sum_book){this.sum_book = sum_book;}
}
