package com.august.utils;

import com.alibaba.fastjson.JSON;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.beanutils.BeanUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

/**
 * @author : Crazy_August
 * @description :
 * @Time: 2021-12-30   21:40
 */
public class WebUtils {
    /**
     * 把 Map 的值注入到javaBean中
     *
     * @param value
     * @param bean
     * @return
     */

    public static <T> T copyParametersToBean(Map value, T bean) {
        try {
            BeanUtils.populate(bean, value);
            System.out.println(bean);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }



    /**
     * 获取post Payload参数
     *
     * @param req
     * @return 返回json数据
     */
    public static String getRequestPayload(HttpServletRequest req) {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = null;
        try {
            reader = req.getReader();
            char[] buff = new char[1024];
            int len;
            while ((len = reader.read(buff)) != -1) {
                sb.append(buff, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return sb.toString();
    }


    /**
     * 发送json数据到前端
     *
     * @param resp
     * @param object
     */
    public static void printResponseData(HttpServletResponse resp, Object object) {
        try (PrintWriter out = resp.getWriter()) {
//            String jsonStr = JSON.toJSONString(object);
            out.print(object);
            out.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
