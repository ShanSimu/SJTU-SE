package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders",schema = "ormsample")
public class Order {
    private int key;
    private int customer;
    private int item;
    private int sum_book;

    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date purchase_time;

    @Id
    @Column(name = "ID")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment",strategy = "increment")
    public int getKey(){return key;}
    public void setKey(int key){this.key = key;}

    @Basic
    @Column(name =  "customer")
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

    @Basic
    @Column(name = "purchase_time")
    public Date getPurchase_time(){return purchase_time;}
    public void setPurchase_time(Date purchase_time){this.purchase_time = purchase_time;}
}
