/*package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "orderitems",schema = "ormsample")
public class OrderItem {
    private int itemId;
    private int idOfBook;
    private int idOfOrder;

    @Id
    @Column(name = "ID")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getItemId(){return itemId;}

    public void setItemId(int itemId){this.itemId = itemId;}

    @Basic
    @Column(name = "id_book")
    public int getIdOfBook(){return idOfBook;}
    public void setIdOfBook(int idOfBook){this.idOfBook = idOfBook;}
}*/
