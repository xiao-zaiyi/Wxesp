package com.august.pojo;
import java.util.List;

/**
 * @author : Crazy_August
 * @description :
 * @Time: 2022-01-02   11:20
 */
public class User {
    private Integer id;
    private String username;
    private String password;
    private String topics;

    public User() {
    }


    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String topics) {
        this.username = username;
        this.password = password;
        this.topics = topics;
    }

    public User(Integer id, String username, String password, String topics) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.topics = topics;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTopics() {
        return topics;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", topics=" + topics +
                '}';
    }
}
