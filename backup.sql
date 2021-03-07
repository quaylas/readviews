-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: read_views_db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Ring out, wild bells','http://covers.openlibrary.org/b/id/5776310-S.jpg','Alfred, Lord Tennyson','2021-02-28 22:04:59','2021-02-28 22:04:59'),(2,'Lord of the Rings','http://covers.openlibrary.org/b/id/1454705-S.jpg','J.R.R Tolkien','2021-02-28 22:04:59','2021-02-28 22:04:59'),(3,'Mariel of Redwall','http://covers.openlibrary.org/b/id/9088859-S.jpg','Brian Jacques','2021-02-28 22:04:59','2021-02-28 22:04:59'),(4,'A Warrior\'s Death','http://covers.openlibrary.org/b/id/2766106-S.jpg','SFX Fantasy','2021-02-28 22:04:59','2021-02-28 22:04:59');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `review_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Nunc rhoncus dui vel sem.',6,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(2,'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',6,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(3,'Aliquam erat volutpat. In congue.',3,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(4,'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',3,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(5,'In hac habitasse platea dictumst.',7,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(6,'Vivamus vestibulum sagittis sapien.',1,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(7,'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',6,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(8,'Sed vel enim sit amet nunc viverra dapibus.',7,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(9,'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.',6,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(10,'Morbi a ipsum.',6,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(11,'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',3,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(12,'Donec ut mauris eget massa tempor convallis.',5,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(13,'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',4,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(14,'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',5,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(15,'Quisque porta volutpat erat.',6,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(16,'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',8,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(17,'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',2,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(18,'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',4,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(19,'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',5,3,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(20,'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',9,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(21,'Curabitur convallis.',6,4,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(22,'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',4,2,'2021-02-28 22:04:59','2021-02-28 22:04:59');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `review_title` varchar(255) NOT NULL,
  `review_text` text NOT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `comments_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'Love Alfred','I just can\'t get over how excellent lord tennyson is. I am not accepting comments at this time.',1,0,1,1,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(2,'TOO MANY HOBBITS','SRSL what even is with all the breakfasts? and the stories? and the pipe-weed????',1,1,2,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(3,'THANK GOD FOR Brian Jacques','Love everything this guy does srsly',1,1,1,2,'2021-02-28 22:04:59','2021-02-28 22:04:59'),(4,'Confusing all the way down','I was looking for the cookbook and idk what this is.',1,1,2,3,'2021-02-28 22:04:59','2021-02-28 22:04:59');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dstanmer3','ihellier3@goo.ne.jp','$2b$10$d5ARJYbu0hAfxtqKz2upJODMd4nC7HwkuDkKc/j8ikC5ORFGBna/i'),(2,'alesmonde0','nwestnedge0@cbc.ca','$2b$10$SaazYDccDaBqwIaDu9o6re9cP1sm12G.UMwk29aOTTN38rMtygaXO'),(3,'jwilloughway1','rmebes1@sogou.com','$2b$10$JikQocQyE1l5Jfyhmk6Dnejt.U7cuV0PKhJy0QJu2RejqME7ZCL6m'),(4,'iboddam2','cstoneman2@last.fm','$2b$10$CdJpZeQQUWTHnEJ/zZugBO2m8ojI8JZqFuCt.bkR03dUoBqeZzhTK'),(5,'djiri4','gmidgley4@weather.com','$2b$10$msNjKZ9nV0qJIBxaUhKu8OQGoWtzyW3NMPOeyZMj76Q2qlsu7POXe'),(6,'tpenniell7','kperigo7@china.com.cn','$2b$10$xv.Hyyw31wtTrCiJCXeM0.KjEHmS9qpfh4fONAljhke75JGF8tWPe'),(7,'msprague5','larnout5@imdb.com','$2b$10$kMxU/8Y0ZHj.OMiK7qmc.uG6PNTkKKr3dAhSKROHHT6ij7kJKfRbG'),(8,'mpergens6','hnapleton6@feedburner.com','$2b$10$DOL6epblQHo7YkPsCgSajexll4rd0084MEiLluoCRzziRIAJYtp2.'),(9,'msabbins8','lmongain8@google.ru','$2b$10$qfRG4ATJmxWqIx9.Wmm0tOFt7TD0X3Hw7tIkpTgd98F81CaZuoOtS'),(10,'jmacarthur9','bsteen9@epa.gov','$2b$10$i3W3LL2aJKMH/.M.LrecAeWv9tHS6H/.uegiTe8n2SabvYXmdGIVe');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `review_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vote_review_id_user_id_unique` (`user_id`,`review_id`),
  KEY `review_id` (`review_id`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (1,2,2),(2,2,4),(4,3,2),(3,3,4);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-28 15:06:51
