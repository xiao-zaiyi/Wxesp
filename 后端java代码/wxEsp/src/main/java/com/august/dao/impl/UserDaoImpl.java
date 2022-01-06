package com.august.dao.impl;

import com.august.dao.UserDao;
import com.august.pojo.User;

/**
 * @author : Crazy_August
 * @description :
 * @Time: 2022-01-02   11:30
 */
public class UserDaoImpl extends BaseDao implements UserDao {

    /**
     * 根据用户名查询用户信息
     *
     * @param userName
     * @return null说明没有这个用户
     */
    @Override
    public User queryUserByUsername(String userName) {
        String sql = "select `id` ,`username`,`password`,`topics` from wx_user where username = ?";
        return queryForOne(User.class, sql, userName);
    }

    /**
     * 根据用户名和密码查询用户信息
     *
     * @param userName
     * @param password
     * @return 返回null  用户或者密码错误
     */
    @Override
    public User queryUserByUsernameAndPassword(String userName, String password) {
        String sql = "select `id` ,`username`,`password`,`topics` from wx_user where username = ? and password = ?";
        return queryForOne(User.class, sql, userName, password);
    }

    /**
     * 保存用户信息
     *
     * @param user
     * @return 返回-1表示插入失败
     */
    @Override
    public int saveUser(User user) {
        String sql = "INSERT INTO wx_user(`username`,`password`)values(?,?)";
        return update(sql, user.getUsername(), user.getPassword());
    }

    /**
     * 保存订阅主题
     *
     * @param topics
     * @param name
     * @return -1表示更新失败
     */
    @Override
    public int savaTopicsByusername(String name, String topics) {
        String sql = "UPDATE wx_user SET topics = ? WHERE username = ?";
        return update(sql, topics, name);
    }
}
