package com.august.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.august.utils.WebUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


/**
 * @author : Crazy_August
 * @description :
 * @Time: 2021-12-30   21:03
 */
public abstract class BaseServelet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        //这里代码一般是固定
        resp.setContentType("text/html;charset=utf-8");
        // 设置响应头允许ajax跨域访问
        resp.setHeader("Access-Control-Allow-Origin", "*");
        // 星号表示所有的异域请求都可以接受
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST");

        String requestPayload = WebUtils.getRequestPayload(req);
        String action = (String) ((Map) JSONObject.parseObject(requestPayload).get("data")).get("action");
        String formInfo = JSONObject.parseObject(requestPayload).get("data").toString();
        ;

        // 方法一 普通方法
//        if ("regist".equals(action)) {
//            regist(req,resp);
//        } else  if ("login".equals(action)) {
//            login(req,resp);
//        }
        // 方法二 通过反射
        if(action.isEmpty()){
            System.out.println("空");
        }else
        {
            try {
                Method Method = this.getClass().getDeclaredMethod(action, HttpServletRequest.class, HttpServletResponse.class, Object.class);
                Method.invoke(this, req, resp, formInfo);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //这里代码一般是固定
        resp.setContentType("text/html;charset=utf-8");
        // 设置响应头允许ajax跨域访问
        resp.setHeader("Access-Control-Allow-Origin", "*");
        // 星号表示所有的异域请求都可以接受
        resp.setHeader("Access-Control-Allow-Methods", "GET,POST");

        String action = req.getParameter("data");
        System.out.println("action----------->" + action);
        System.out.println("Get");
    }

    public static void main(String[] args) {
        String data = "{\"data\":{\"username\":\"admin\",\"password\":\"123456\",\"y\":\"cc\"}}\n";
        String datac = "{\"x\":\"cc\",\"y\":\"cc\"}";

//        //第一种方式
//        Map maps = (Map)JSON.parse(data);
//        System.out.println("这个是用JSON类来解析JSON字符串!!!");
//        for (Object map : maps.entrySet()){
//            System.out.println(((Map.Entry)map).getKey()+"     " + ((Map.Entry)map).getValue());
//        }
//
//        JSONObject obj = JSON.parseObject(data);//将json字符串转换为json对象
//        String data1 = obj.get("data").toString();
//        User user = JSON.parseObject(data1, User.class);
//        System.out.println(user);
//
//        String o = "{'area':{'area':'1','pagetype':'home'},'pagetype':'home'}";
//        System.out.println(((Map) JSONObject.parseObject(o).get("area")).get("pagetype"));


        Map map = new HashMap();

        map.put("name", "json");

        map.put("bool", Boolean.TRUE);

        map.put("int", new Integer(1));

        map.put("arr", new String[]{"a", "b"});

        map.put("func", "function(i){ return this.arr[i]; }");

        String jsonString = JSON.toJSONString(map);
        System.out.println(jsonString);
    }


}