package com.august.service.Impl;

import com.august.dao.UserDao;
import com.august.dao.impl.UserDaoImpl;
import com.august.pojo.User;
import com.august.service.UserService;


/**
 * @author : Crazy_August
 * @description :
 * @Time: 2022-01-02   12:29
 */
public class UserServiceImpl implements UserService {

    private UserDao userDao = new UserDaoImpl();

    /**
     * 注册用户
     *
     * @param user
     */
    @Override
    public void registerUser(User user) {
        userDao.saveUser(user);
    }

    /**
     * 登录
     *
     * @param user
     * @return 返回null登录失败,
     * 返回有值,登录成功
     */
    @Override
    public User longin(User user) {
        return userDao.queryUserByUsernameAndPassword(user.getUsername(), user.getPassword());
    }

    /**
     * 检查是否有用户名
     *
     * @param username
     * @return 返回turn说明已经存在
     */
    @Override
    public boolean existsUserName(String username) {
        if (userDao.queryUserByUsername(username) != null) {
            return true;
        }
        return false;
    }

    /**
     * @return
     */
    @Override
    public int saveTopics(User user) {
        return userDao.savaTopicsByusername(user.getUsername(),user.getTopics());
    }

    /**
     * 查询用户话题 topics
     * @param user
     * @return
     */
    @Override
    public User userShowInfo(User user) {
        return userDao.queryUserByUsernameAndPassword(user.getUsername(),user.getPassword());
    }


}
