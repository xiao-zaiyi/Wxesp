package com.august.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.august.pojo.User;
import com.august.service.Impl.UserServiceImpl;
import com.august.service.UserService;
import com.august.utils.WebUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.LogManager;
import java.util.logging.Logger;

/**
 * @author : Crazy_August
 * @description :
 * @Time: 2022-01-02   12:35
 */
public class UserServelet extends BaseServelet {

    private UserService userService = new UserServiceImpl();


    /**
     * 用户登录 servlet
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void login(HttpServletRequest req, HttpServletResponse resp, Object obj) {
        System.out.println("登录");
        Map map = new HashMap();
        String formInfo = obj.toString();
        User user = JSONObject.parseObject(formInfo, User.class);
        if (userService.existsUserName(user.getUsername())) {
            if (userService.longin(user) == null) {
                //登录失败,页面回显 ,保存到 request 中
                System.out.println("[" + user.getUsername() + "]密码错误");
                map.put("state", false);
                map.put("exis", true);
                WebUtils.printResponseData(resp, JSON.toJSONString(map));
            } else {
                System.out.println("[" + user.getUsername() + "]登录成功");
                map.put("state", true);
                map.put("exis", true);
                WebUtils.printResponseData(resp, JSON.toJSONString(map));
            }
        } else {
            System.out.println("[" + user.getUsername() + "]用户不存在");
            map.put("state", false);
            map.put("exis", false);
            WebUtils.printResponseData(resp, JSON.toJSONString(map));
        }

    }

    /**
     * 用户注册 servlet
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void regist(HttpServletRequest req, HttpServletResponse resp, Object obj) {
        System.out.println("注册");
        Map map = new HashMap();
        String formInfo = obj.toString();
        User user = JSONObject.parseObject(formInfo, User.class);
        if (userService.existsUserName(user.getUsername())) {
            //用户名已经存在,注册失败
            //注册失败
            System.out.println("[" + user.getUsername() + "]用户名已经存在");
            map.put("state", false);
            map.put("exis", true);
            WebUtils.printResponseData(resp, JSON.toJSONString(map));
        } else {
            System.out.println("[" + user.getUsername() + "]用户可用");
            map.put("state", true);
            map.put("exis", false);
            WebUtils.printResponseData(resp, JSON.toJSONString(map));
            //保存用户
            userService.registerUser(user);
        }


    }


    /**
     * 保存主题到数据库
     *
     * @param req
     * @param resp
     * @param obj
     * @throws ServletException
     * @throws IOException
     */

    protected void saveTopic(HttpServletRequest req, HttpServletResponse resp, Object obj) {
        String formInfo = obj.toString();
        User user = JSONObject.parseObject(formInfo, User.class);
        userService.saveTopics(user);
    }


    /**
     * 页面显示
     *
     * @param req
     * @param resp
     * @param obj
     * @throws ServletException
     * @throws IOException
     */
    protected void userShow(HttpServletRequest req, HttpServletResponse resp, Object obj) {
        System.out.println("页面显示");
        Map map = new HashMap();
        String formInfo = obj.toString();
        User user = userService.userShowInfo(JSONObject.parseObject(formInfo, User.class));
        String topicsInfo = user.getTopics();
        JSONArray objects = JSON.parseArray(topicsInfo);
        //如果为空这创建一个数组
        Object topics = objects != null ? objects : new Array[0];
        map.put("topics", topics);
        //topics 传给前端
        WebUtils.printResponseData(resp, JSON.toJSONString(map));

    }
}




