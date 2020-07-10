package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ExcelController {

    @Autowired
    ExcelService excelService;

    @RequestMapping("/saleExcel")
    List<JSONObject> saleExcel(@RequestParam("start") int start,@RequestParam("end") int end)
    {
        return excelService.saleExcel(start,end);
    }

    @RequestMapping("/userExcel")
    List<JSONObject> userExcel(@RequestParam("start") int start,@RequestParam("end") int end)
    {
        return excelService.userExcel(start, end);
    }

    @RequestMapping("/customerExcel")
    List<JSONObject> customerExcel(@RequestParam("customer") int customer,@RequestParam("start") int start,@RequestParam("end") int end)
    {
        return excelService.customerExcel(customer,start, end);
    }
}
