package com.example.demo.service;

import com.alibaba.fastjson.JSONObject;

import java.util.List;

public interface ExcelService {
    List<JSONObject> saleExcel(int start,int end);
    List<JSONObject> userExcel(int start,int end);
    List<JSONObject> customerExcel(int customer,int start,int end);
}
