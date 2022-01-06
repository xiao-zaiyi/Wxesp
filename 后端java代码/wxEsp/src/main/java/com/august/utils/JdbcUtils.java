package com.august.utils;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.pool.DruidPooledConnection;

import java.io.InputStream;
import java.sql.Connection;
import java.util.Properties;

/**
 * @author : Crazy_August
 * @description :
 * @Time: 2021-11-28   21:01
 */
public class JdbcUtils {
    private static DruidDataSource dataSource;
    //初始化
    static{
        try {
            //读取配置文件
            //方式一
            InputStream is = JdbcUtils.class.getClassLoader().getResourceAsStream("jdbc.properties");
            //方式二
//            InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
            Properties pros = new Properties();
            //从流中加载数据
            pros.load(is);
            dataSource = (DruidDataSource) DruidDataSourceFactory.createDataSource(pros);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 获取数据库连接池的连接
      * @return null 连接失败 ,conn
     */
    public static Connection getConnection(){
        DruidPooledConnection conn = null;
        try {
            conn = dataSource.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return conn;
    }

    /**
     * 关闭数据库连接
     * @param conn
     */
    public  static void close(Connection conn){
        if(conn != null){
            try {
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
