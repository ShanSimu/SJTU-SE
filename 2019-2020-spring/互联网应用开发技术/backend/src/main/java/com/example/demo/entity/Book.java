package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "books",schema = "ormsample")
public class Book {
    private int key;
    private String title;
    private String author;
    private String isbn;
    private int stocks;
    private String details;
    private double price;

    @Id
    @Column(name = "ID")
//    @GeneratedValue(generator = "increment")
//    @GenericGenerator(name = "increment", strategy = "increment")
    public int getKey(){return key;}
    public void setKey(int key){this.key = key;}

    @Basic
    @Column(name = "title")
    public  String getTitle(){return title;}
    public void setTitle(String title){this.title = title;}

    @Basic
    @Column(name = "author")
    public String getAuthor(){return author;}
    public void setAuthor(String author){this.author = author;}

    @Basic
    @Column(name = "isbn")
    public String getIsbn(){return  isbn;}
    public void setIsbn(String isbn){this.isbn = isbn;}

    @Basic
    @Column(name = "stock")
    public int getStocks(){return stocks;}
    public void setStocks(int stocks){this.stocks = stocks;}

    @Basic
    @Column(name = "details")
    public String getDetails(){return details;}
    public void setDetails(String details){this.details = details;}

    @Basic
    @Column(name = "price")
    public double getPrice(){return price;}
    public void setPrice(double price){this.price = price;}

    private BookIcon icon;
    @Transient
    public BookIcon getIcon(){return icon;}
    public void setIcon(BookIcon icon){this.icon = icon;}

}
