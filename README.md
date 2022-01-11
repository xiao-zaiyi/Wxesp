

## 一、前言

本小程序用于连接MQTT,可以配置后台配置数据保存信息,自行填写订阅主题和发布信息内容.

## 二、项目简介

本项目采用前后端分离技术

​	前端 微信小程序 + nginx + Vant-ui 

​	后端 java + Tomcat + 数据库

### 使用说明
 1. 在使用时只需改配置访问后台地址和订阅地址即可.
 2. 密码只是简单的Md5加密后传入后台服务器
 3. 为了应用和使用安全,程序在注册时加入授权码认证,默认授权码是注册时填写的密码(可自行更改,经过MD5加密后比较时候相等)
 4. 在开发时,因为使用的是苹果手机调试,所以安卓手机布局可能会有些问题,可以自行稍作调整.

应用部分截图

![image-20220106201547131](https://gitee.com/xiao-zaiyi/blog-images/raw/master/blog-images/images1/image-20220106201547131.png)

![image-20220106201603874](https://gitee.com/xiao-zaiyi/blog-images/raw/master/blog-images/images1/image-20220106201603874.png)

![image-20220106201634155](https://gitee.com/xiao-zaiyi/blog-images/raw/master/blog-images/images1/image-20220106201634155.png)
![680eb4222ae10b52a8981a02d23b7c0](https://user-images.githubusercontent.com/42707559/148872328-6f505cdf-9984-4408-b037-e11f52ed571f.jpg)

![351349702bfc502bc35f37c1d8b8bab](https://user-images.githubusercontent.com/42707559/148872310-0f2804b0-41ca-4f87-86c3-c5f04898b90e.jpg)

![a972cccdb09430dbe55bfb215fbc504](https://user-images.githubusercontent.com/42707559/148872281-495c7ac4-b997-4eca-b5d4-f8a16a7e28dd.jpg)



个人博客: [https://xiaozaiyi.xyz/](https://xiaozaiyi.xyz/)

联系方式:1932794922@qq.com
