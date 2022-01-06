/*
 Navicat Premium Data Transfer

 Source Server         : MySQLTest
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : wxesp

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 06/01/2022 20:36:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `topics` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wx_user
-- ----------------------------
INSERT INTO `wx_user` VALUES (34, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '[{\"name\":\"Door\",\"state\":false},{\"name\":\"ccc\",\"state\":false}]');
INSERT INTO `wx_user` VALUES (35, 'test', 'e10adc3949ba59abbe56e057f20f883e', '[{\"name\":\"Door\",\"state\":false}]');
INSERT INTO `wx_user` VALUES (36, 'test1', 'e10adc3949ba59abbe56e057f20f883e', NULL);

SET FOREIGN_KEY_CHECKS = 1;
