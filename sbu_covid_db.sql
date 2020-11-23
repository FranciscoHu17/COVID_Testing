-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: sbu_covid_db
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employeeID` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `passcode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employeeID`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeetest`
--

DROP TABLE IF EXISTS `employeetest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeetest` (
  `testBarcode` varchar(50) NOT NULL,
  `employeeID` varchar(20) NOT NULL,
  `collectionTime` datetime DEFAULT NULL,
  `collectedBy` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`testBarcode`),
  KEY `employeetest_ibfk_1` (`employeeID`),
  KEY `employeetest_ibfk_2` (`collectedBy`),
  CONSTRAINT `employeetest_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`),
  CONSTRAINT `employeetest_ibfk_2` FOREIGN KEY (`collectedBy`) REFERENCES `labemployee` (`labID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetest`
--

LOCK TABLES `employeetest` WRITE;
/*!40000 ALTER TABLE `employeetest` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeetest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labemployee`
--

DROP TABLE IF EXISTS `labemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labemployee` (
  `labID` varchar(20) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`labID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labemployee`
--

LOCK TABLES `labemployee` WRITE;
/*!40000 ALTER TABLE `labemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `labemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pool`
--

DROP TABLE IF EXISTS `pool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pool` (
  `poolBarcode` varchar(50) NOT NULL,
  PRIMARY KEY (`poolBarcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pool`
--

LOCK TABLES `pool` WRITE;
/*!40000 ALTER TABLE `pool` DISABLE KEYS */;
/*!40000 ALTER TABLE `pool` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poolmap`
--

DROP TABLE IF EXISTS `poolmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poolmap` (
  `testBarcode` varchar(50) DEFAULT NULL,
  `poolBarcode` varchar(50) DEFAULT NULL,
  KEY `poolBarcode` (`poolBarcode`),
  KEY `poolmap_ibfk_1` (`testBarcode`),
  CONSTRAINT `poolmap_ibfk_1` FOREIGN KEY (`testBarcode`) REFERENCES `employeetest` (`testBarcode`),
  CONSTRAINT `poolmap_ibfk_2` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poolmap`
--

LOCK TABLES `poolmap` WRITE;
/*!40000 ALTER TABLE `poolmap` DISABLE KEYS */;
/*!40000 ALTER TABLE `poolmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `well`
--

DROP TABLE IF EXISTS `well`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `well` (
  `wellBarcode` varchar(50) NOT NULL,
  PRIMARY KEY (`wellBarcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `well`
--

LOCK TABLES `well` WRITE;
/*!40000 ALTER TABLE `well` DISABLE KEYS */;
/*!40000 ALTER TABLE `well` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `welltesting`
--

DROP TABLE IF EXISTS `welltesting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `welltesting` (
  `poolBarcode` varchar(50) DEFAULT NULL,
  `wellBarcode` varchar(50) DEFAULT NULL,
  `testingStartTime` datetime DEFAULT NULL,
  `testingEndTime` datetime DEFAULT NULL,
  `result` varchar(20) DEFAULT NULL,
  KEY `poolBarcode` (`poolBarcode`),
  KEY `wellBarcode` (`wellBarcode`),
  CONSTRAINT `welltesting_ibfk_1` FOREIGN KEY (`poolBarcode`) REFERENCES `pool` (`poolBarcode`),
  CONSTRAINT `welltesting_ibfk_2` FOREIGN KEY (`wellBarcode`) REFERENCES `well` (`wellBarcode`),
  CONSTRAINT `welltesting_chk_1` CHECK ((`result` in (_utf8mb4'in progress',_utf8mb4'negative',_utf8mb4'positive')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `welltesting`
--

LOCK TABLES `welltesting` WRITE;
/*!40000 ALTER TABLE `welltesting` DISABLE KEYS */;
/*!40000 ALTER TABLE `welltesting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-23 16:31:09
