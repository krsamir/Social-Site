CREATE DATABASE  IF NOT EXISTS `social` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `social`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: social
-- ------------------------------------------------------
-- Server version	5.7.31-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `expireat` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (1,'Samir','Kumar','samirkr2527@gmail.com','admin',NULL,NULL,1),(3,'Riya','Gupta','gtriya15@gmail.com','admin',NULL,NULL,1),(4,'Aryan','Gupta','aryanmars3@gmail.com','admin',NULL,NULL,1),(5,'Aniket','Rai','aniketri28@gmail.com','1234567890','04d1792b-a491-4bab-8e17-804fd0b7a6b0','2021-07-30 14:36:27',0);
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social__liketable`
--

DROP TABLE IF EXISTS `social__liketable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social__liketable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `post_id_idx` (`post_id`),
  CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `social__post` (`post_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social__liketable`
--

LOCK TABLES `social__liketable` WRITE;
/*!40000 ALTER TABLE `social__liketable` DISABLE KEYS */;
INSERT INTO `social__liketable` VALUES (71,2,1,'2021-07-18 18:19:29'),(72,1,1,'2021-07-18 18:19:32'),(73,2,3,'2021-07-18 18:19:42'),(75,3,3,'2021-07-18 18:19:46'),(76,3,4,'2021-07-18 18:19:58'),(77,2,4,'2021-07-18 18:19:59'),(92,4,1,'2021-07-19 08:03:30'),(94,7,1,'2021-07-22 16:04:44'),(95,8,4,'2021-07-22 17:17:39'),(99,8,1,'2021-07-22 17:18:15'),(115,9,1,'2021-07-25 08:08:44'),(117,40,1,'2021-08-14 07:27:49');
/*!40000 ALTER TABLE `social__liketable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social__mediaupload`
--

DROP TABLE IF EXISTS `social__mediaupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social__mediaupload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postid` int(11) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `mimetype` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postid_idx` (`postid`),
  CONSTRAINT `postid` FOREIGN KEY (`postid`) REFERENCES `social__post` (`post_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social__mediaupload`
--

LOCK TABLES `social__mediaupload` WRITE;
/*!40000 ALTER TABLE `social__mediaupload` DISABLE KEYS */;
INSERT INTO `social__mediaupload` VALUES (1,1,'1+1626628726089+michal-parzuchowski-EFvP9cHipMQ-unsplash.jpg','application/octet-stream',478491,1),(2,11,'11+1627187766556+Transaction 1.jpeg','application/octet-stream',47985,1),(3,14,'14+1627514962992+michal-parzuchowski-EFvP9cHipMQ-unsplash.jpg','application/octet-stream',478491,1),(4,14,'14+1627514962993+pexels-photo-933054.jpeg','application/octet-stream',252398,1);
/*!40000 ALTER TABLE `social__mediaupload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social__post`
--

DROP TABLE IF EXISTS `social__post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social__post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `text` longtext COLLATE utf8_bin,
  `status` tinyint(4) DEFAULT '1',
  `reports` varchar(45) COLLATE utf8_bin DEFAULT '0',
  `posted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `posted_by` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `id_idx` (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social__post`
--

LOCK TABLES `social__post` WRITE;
/*!40000 ALTER TABLE `social__post` DISABLE KEYS */;
INSERT INTO `social__post` VALUES (1,1,'pics',1,'0','2021-07-18 17:18:46','Samir Kumar'),(2,1,'Checking Like',1,'0','2021-07-18 17:54:15','Samir Kumar'),(3,1,'Checking like again',1,'0','2021-07-18 17:54:44','Samir Kumar'),(4,4,'Aryan Testing',1,'0','2021-07-18 18:22:34','Aryan Gupta'),(5,3,'Riya Testing',1,'0','2021-07-18 18:23:01','Riya Gupta'),(6,3,'New ',1,'0','2021-07-18 18:25:33','Riya Gupta'),(7,1,'WWW.FamilyBook.com',1,'0','2021-07-22 16:04:27','Samir Kumar'),(8,4,'Post by Aryan',1,'0','2021-07-22 17:17:24','Aryan Gupta'),(9,4,'Aryan',1,'0','2021-07-22 17:17:34','Aryan Gupta'),(10,1,'New',1,'0','2021-07-25 02:43:38','Samir Kumar'),(11,1,'',1,'0','2021-07-25 04:36:06','Samir Kumar'),(12,1,'Testing Redux',1,'0','2021-07-25 04:36:21','Samir Kumar'),(13,1,'Hello Aniket',1,'0','2021-07-28 23:28:20','Samir Kumar'),(14,1,'',1,'0','2021-07-28 23:29:22','Samir Kumar'),(15,1,'1',1,'0','2021-07-31 12:41:22','Samir Kumar'),(16,1,'2',1,'0','2021-07-31 12:41:23','Samir Kumar'),(17,1,'3',1,'0','2021-07-31 12:41:24','Samir Kumar'),(18,1,'4',1,'0','2021-07-31 12:41:25','Samir Kumar'),(19,1,'5',1,'0','2021-07-31 12:41:27','Samir Kumar'),(20,1,'6',1,'0','2021-07-31 12:41:30','Samir Kumar'),(21,1,'7',1,'0','2021-07-31 12:41:31','Samir Kumar'),(22,1,'8',1,'0','2021-07-31 12:41:33','Samir Kumar'),(23,1,'9',1,'0','2021-07-31 12:41:35','Samir Kumar'),(24,1,'10',1,'0','2021-07-31 12:41:38','Samir Kumar'),(25,1,'11',1,'0','2021-07-31 12:41:40','Samir Kumar'),(26,1,'12',1,'0','2021-07-31 12:41:43','Samir Kumar'),(27,1,'13',1,'0','2021-07-31 12:41:45','Samir Kumar'),(28,1,'14',1,'0','2021-07-31 12:41:48','Samir Kumar'),(29,1,'15',1,'0','2021-07-31 12:41:49','Samir Kumar'),(30,1,'16',1,'0','2021-07-31 12:42:16','Samir Kumar'),(31,1,'17',1,'0','2021-07-31 12:42:18','Samir Kumar'),(32,1,'18',1,'0','2021-07-31 12:42:21','Samir Kumar'),(33,1,'19',1,'0','2021-07-31 12:42:23','Samir Kumar'),(34,1,'20',1,'0','2021-07-31 12:42:27','Samir Kumar'),(36,1,'22',1,'0','2021-08-13 16:13:09','Samir Kumar'),(37,1,'NEW',1,'0','2021-08-13 16:21:20','Samir Kumar'),(38,3,'Post by Riya',1,'0','2021-08-14 04:58:29','Riya Gupta'),(39,1,'New',1,'0','2021-08-14 06:03:57','Samir Kumar'),(40,1,'One more',1,'0','2021-08-14 06:04:24','Samir Kumar'),(45,4,'posts',1,'0','2021-08-14 12:58:38','Aryan Gupta');
/*!40000 ALTER TABLE `social__post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social__reports`
--

DROP TABLE IF EXISTS `social__reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social__reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social__reports`
--

LOCK TABLES `social__reports` WRITE;
/*!40000 ALTER TABLE `social__reports` DISABLE KEYS */;
INSERT INTO `social__reports` VALUES (2,39,1,'2021-08-14 11:40:08'),(3,45,2,'2021-08-14 11:51:08');
/*!40000 ALTER TABLE `social__reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'social'
--
/*!50003 DROP PROCEDURE IF EXISTS `getAllPost` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllPost`(IN userId INT)
BEGIN
SELECT 
    t2.user_id,t2.post_id,t2.text,t2.status,t2.posted_by,t2.filename,t2.mimetype,likeTable.totalLikes,likeTable.updated_at,
    exists(select * from social__liketable t6 where t6.post_id=t2.post_id and t6.user_id=userId) as likedByCurrentUser,
    exists(select * from social__reports t7 where t7.post_id = t2.post_id and t7.user_id = userId) as reportedByCurrentUser,reportTable.totalReports
FROM
    (SELECT 
        t1.user_id,
            t1.post_id,
            t1.text,
            t1.status,
            t1.posted_by,
            JSON_ARRAYAGG(t2.filename) AS filename,
            JSON_ARRAYAGG(t2.mimetype) AS mimetype
    FROM
        social__post AS t1
    LEFT JOIN social__mediaupload AS t2 ON t1.post_id = t2.postid
    GROUP BY post_id
    ORDER BY t1.post_id DESC) AS t2
        LEFT JOIN
    (SELECT 
        COUNT(*) AS totalLikes, t4.post_id, t4.updated_at
    FROM
        social__post AS t3
    RIGHT JOIN social__liketable AS t4 ON t3.post_id = t4.post_id
    GROUP BY t3.post_id) AS likeTable ON t2.post_id = likeTable.post_id 
    LEFT JOIN 
    (
    SELECT 
		COUNT(*) AS totalReports,t9.post_id  FROM social__post as t8 
        RIGHT JOIN social__reports AS t9 ON t8.post_id = t9.post_id
        GROUP BY t8.post_id 
    ) as reportTable ON t2.post_id = reportTable.post_id 
    order by t2.post_id desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postByUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postByUser`(IN userId INT)
BEGIN
SELECT * FROM (
SELECT 
    t2.user_id,t2.post_id,t2.text,t2.status,t2.posted_by,t2.filename,t2.mimetype,likeTable.totalLikes,likeTable.updated_at,
    exists(select * from social__liketable t6 where t6.post_id=t2.post_id and t6.user_id=userId) as likedByCurrentUser
FROM
    (SELECT 
        t1.user_id,
            t1.post_id,
            t1.text,
            t1.status,
            t1.posted_by,
            JSON_ARRAYAGG(t2.filename) AS filename,
            JSON_ARRAYAGG(t2.mimetype) AS mimetype
    FROM
        social__post AS t1
    LEFT JOIN social__mediaupload AS t2 ON t1.post_id = t2.postid
    GROUP BY post_id
    ORDER BY t1.post_id DESC) AS t2
        LEFT JOIN
    (SELECT 
        COUNT(*) AS totalLikes, t4.post_id, t4.updated_at
    FROM
        social__post AS t3
    RIGHT JOIN social__liketable AS t4 ON t3.post_id = t4.post_id
    GROUP BY t3.post_id) AS likeTable ON t2.post_id = likeTable.post_id order by t2.post_id desc 
    ) AS bigTable where bigTable.user_id = userId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `social__like` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `social__like`(IN postid INT, IN userid INT,OUT returnValue INT)
BEGIN
IF exists(select * from social__liketable where post_id = postid and user_id = userid) THEN
	DELETE FROM Social__liketable WHERE post_id = postid and user_id = userid;
    SET returnValue = 0;
ELSE
	INSERT INTO social__liketable (`post_id`, `user_id`) VALUES (postid, userid);
        SET returnValue = 1;
    end if;
    SELECT returnValue;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-30  9:08:13
