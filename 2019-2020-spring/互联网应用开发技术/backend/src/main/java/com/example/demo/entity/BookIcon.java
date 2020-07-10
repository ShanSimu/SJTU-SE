package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;

@Document(collection = "bookicon")
public class BookIcon {

    @Id
    @Field("id")
    private int id;

    @Field("iconBase64")
    private String iconBase64;

    public BookIcon(int id,String iconBase64){
        this.id = id;
        this.iconBase64 = iconBase64;
    }

    public int getId(){return id;}

    public void setId(int id){this.id = id;}

    public String getIconBase64(){
        return iconBase64;
    }

    public void setIconBase64(String iconBase64){
        this.iconBase64 = iconBase64;
    }
}
