/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : bem-blog

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-07-27 19:01:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `content` varchar(2000) CHARACTER SET utf8 DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `state` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('63cf1653-48bc-46bf-98c1-dffd6fa99a46', '请问请问', '请问   ', '2017-07-27 14:14:36', 'publish', '538780f9-1d67-481b-8f91-e1ec42ca7e2a');
INSERT INTO `article` VALUES ('66b37161-e038-4156-8a4f-1cfc515b351d', 'qweqw', '\n    <div class=\"artivcle-preview\">\n        <transition name=\"fade\" mode=\"out-in\">\n            <div v-for=\"item in list\" v-if=\"list.length>0\">\n                <div class=\"atticle-title\">{{item.title}}</div>\n                <div style=\"color:#34495e\" v-compiledMarkdown>{{item.content}}</div>\n                <div class=\"article-preview-footer\">\n                    <el-button type=\"primary\" icon=\"edit\" @click=\"modify(item.id)\">不满意，点此修改</el-button>\n                </div>\n            </div>\n        </transition>\n    </div>\n', '2017-07-27 18:19:42', 'publish', '327c160e-646d-4f50-a64b-1721f386665d');

-- ----------------------------
-- Table structure for auth
-- ----------------------------
DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userpwd` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of auth
-- ----------------------------
INSERT INTO `auth` VALUES ('08f4d221-7ff5-4c58-8228-880beda683b3', '201300347', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('0f2dfa32-f2bd-420a-a4e6-d0bfdd363f56', '201300339', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('1', '123', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('21c0230c-4a71-4ecb-ac61-e30f08934bd5', '201300329', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('35f25cd9-b69a-4d4c-8e77-15eef79edf2e', '201300356', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('482d9265-68cb-412d-abac-be2f3f0b10bc', '201300345', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('529ca124-5bf7-4599-b719-d9b9551c5cda', '201300365', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('60c64a84-9eb5-4c2f-90d5-e3246d5d8950', '201300331', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('78e2dff3-64ff-43bd-9611-dc0a6db55829', '201300343', '83fc779b49fe50519100ae885db8c65d');
INSERT INTO `auth` VALUES ('de3d6c13-6215-4721-8669-0feeb4e2630c', '201300336', '83fc779b49fe50519100ae885db8c65d');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `motto` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `head_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `auth_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '123456', '123456qwe', 'luiMQTO4WxEUN6ZhScHdl0DS7izM', '1');
INSERT INTO `user` VALUES ('105477d4-3459-407a-ba9a-f60098083634', null, null, 'use.png', 'de3d6c13-6215-4721-8669-0feeb4e2630c');
INSERT INTO `user` VALUES ('327c160e-646d-4f50-a64b-1721f386665d', '123456', '23213', '327c160e-646d-4f50-a64b-1721f386665d_head_project-8.jpg', '78e2dff3-64ff-43bd-9611-dc0a6db55829');
INSERT INTO `user` VALUES ('538780f9-1d67-481b-8f91-e1ec42ca7e2a', null, null, 'use.png', '0f2dfa32-f2bd-420a-a4e6-d0bfdd363f56');
INSERT INTO `user` VALUES ('602268ac-cf73-43b7-8009-f1c363a86464', null, null, 'use.png', '21c0230c-4a71-4ecb-ac61-e30f08934bd5');
INSERT INTO `user` VALUES ('801efea2-4a45-4274-8242-0400fa2d08eb', null, null, 'use.png', '08f4d221-7ff5-4c58-8228-880beda683b3');
INSERT INTO `user` VALUES ('94160a33-e5fc-4331-aa9d-817e308f0f15', null, null, 'use.png', '60c64a84-9eb5-4c2f-90d5-e3246d5d8950');
INSERT INTO `user` VALUES ('a563e615-3e7f-464d-8c3e-7294b2fa5432', null, null, 'use.png', '482d9265-68cb-412d-abac-be2f3f0b10bc');
INSERT INTO `user` VALUES ('a9ef3f35-facf-42c9-9dbe-6211c8e5452e', null, null, 'use.png', '35f25cd9-b69a-4d4c-8e77-15eef79edf2e');
INSERT INTO `user` VALUES ('f7ec847f-9409-4c6a-900b-9023fd087b53', null, null, 'use.png', '529ca124-5bf7-4599-b719-d9b9551c5cda');
