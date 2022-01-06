package com.august.test;


import com.august.dao.UserDao;
import com.august.dao.impl.UserDaoImpl;
import com.august.pojo.User;

public class UserDaoTest {

    private UserDao userDao = new UserDaoImpl();

    @org.junit.Test
    public void queryUserByUsername() {
        userDao.queryUserByUsername("admin");
    }

    @org.junit.Test
    public void queryUserByUsernameAndPassword() {
        userDao.queryUserByUsernameAndPassword("admin","123456");
    }

    @org.junit.Test
    public void saveUser() {
        userDao.saveUser(new User("xzy","1223"));
    }

    @org.junit.Test
    public void savaTopicsByusername() {
        userDao.savaTopicsByusername("admin","[{\"name\":\"Door\",\"state\":false},{\"name\":\"topik1\",\"state\":false},{\"name\":\"topik2\",\"state\":false},{\"name\":\"Topic0\",\"state\":false}]");
    }

}