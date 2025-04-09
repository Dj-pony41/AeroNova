CREATE DATABASE  IF NOT EXISTS `aeronova` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aeronova`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aeronova
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `asiento`
--

DROP TABLE IF EXISTS `asiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asiento` (
  `IdAsiento` int NOT NULL,
  `IdVuelo` int DEFAULT NULL,
  `NumeroAsiento` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Clase` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Estado` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UltimaActualizacion` bigint DEFAULT NULL,
  `VectorClock` json DEFAULT NULL,
  PRIMARY KEY (`IdAsiento`),
  KEY `IdVuelo` (`IdVuelo`),
  CONSTRAINT `asiento_ibfk_1` FOREIGN KEY (`IdVuelo`) REFERENCES `vuelo` (`IdVuelo`),
  CONSTRAINT `chk_Clase` CHECK ((`Clase` in (_utf8mb4'Turistica',_utf8mb4'Ejecutiva'))),
  CONSTRAINT `chk_Estado` CHECK ((`Estado` in (_utf8mb4'Devolucion',_utf8mb4'Vendido',_utf8mb4'Reservado',_utf8mb4'Libre')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiento`
--

LOCK TABLES `asiento` WRITE;
/*!40000 ALTER TABLE `asiento` DISABLE KEYS */;
INSERT INTO `asiento` VALUES (1,1,'A1','Ejecutiva','Libre',1743992305000,'{\"nodo_mongo\": 0, \"nodo_mysql_1\": 0, \"nodo_mysql_2\": 0}'),(2,1,'B3','Turistica','Libre',1712600000000,'{\"nodo_mongo\": 7, \"nodo_mysql_1\": 1, \"nodo_mysql_2\": 0}');
/*!40000 ALTER TABLE `asiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destino`
--

DROP TABLE IF EXISTS `destino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destino` (
  `IdDestino` int NOT NULL,
  `Ciudad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Pais` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Aeropuerto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoIATA` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`IdDestino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destino`
--

LOCK TABLES `destino` WRITE;
/*!40000 ALTER TABLE `destino` DISABLE KEYS */;
INSERT INTO `destino` VALUES (1,'Buenos Aires','Argentina','Ezeiza','EZE'),(2,'Santiago','Chile','Arturo Merino Benítez','SCL'),(3,'Lima','Perú','Jorge Chávez','LIM'),(4,'São Paulo','Brasil','Guarulhos','GRU'),(5,'Ciudad de México','México','Benito Juárez','MEX');
/*!40000 ALTER TABLE `destino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historialasiento`
--

DROP TABLE IF EXISTS `historialasiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historialasiento` (
  `IdHistorial` int NOT NULL AUTO_INCREMENT,
  `IdAsiento` int DEFAULT NULL,
  `EstadoAnterior` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EstadoNuevo` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EpochCambio` bigint DEFAULT NULL,
  `NodoOrigen` int DEFAULT NULL,
  PRIMARY KEY (`IdHistorial`),
  KEY `IdAsiento` (`IdAsiento`),
  CONSTRAINT `historialasiento_ibfk_1` FOREIGN KEY (`IdAsiento`) REFERENCES `asiento` (`IdAsiento`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historialasiento`
--

LOCK TABLES `historialasiento` WRITE;
/*!40000 ALTER TABLE `historialasiento` DISABLE KEYS */;
INSERT INTO `historialasiento` VALUES (1,1,'Libre','Reservado',1743992318000,1),(2,1,'Reservado','Vendido',1743992323000,2);
/*!40000 ALTER TABLE `historialasiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nave`
--

DROP TABLE IF EXISTS `nave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nave` (
  `IdNave` int NOT NULL,
  `Tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CapacidadEjecutiva` int DEFAULT NULL,
  `CapacidadTuristica` int DEFAULT NULL,
  `Matricula` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UltimoVuelo` bigint DEFAULT NULL,
  `HorasVueloTotal` decimal(10,2) DEFAULT NULL,
  `CiclosVuelo` int DEFAULT NULL,
  `DistanciaTotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`IdNave`),
  UNIQUE KEY `Matricula` (`Matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nave`
--

LOCK TABLES `nave` WRITE;
/*!40000 ALTER TABLE `nave` DISABLE KEYS */;
INSERT INTO `nave` VALUES (1,'Boeing 737',20,140,'LV-ABC',1712345678,1250.50,450,1250000.00),(2,'Airbus A320',16,144,'LV-DEF',1712345600,980.75,380,980000.00);
/*!40000 ALTER TABLE `nave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasajero`
--

DROP TABLE IF EXISTS `pasajero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pasajero` (
  `Pasaporte` int NOT NULL,
  `NombreCompleto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Pasaporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasajero`
--

LOCK TABLES `pasajero` WRITE;
/*!40000 ALTER TABLE `pasajero` DISABLE KEYS */;
INSERT INTO `pasajero` VALUES (12345678,'Juan Pérez'),(23456789,'María González'),(34567890,'Carlos López');
/*!40000 ALTER TABLE `pasajero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruta`
--

DROP TABLE IF EXISTS `ruta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ruta` (
  `IdRuta` int NOT NULL,
  `CostoEjecutiva` decimal(10,2) DEFAULT NULL,
  `CostoTuristica` decimal(10,2) DEFAULT NULL,
  `OrigenID` int DEFAULT NULL,
  `DestinoID` int DEFAULT NULL,
  PRIMARY KEY (`IdRuta`),
  KEY `OrigenID` (`OrigenID`),
  KEY `DestinoID` (`DestinoID`),
  CONSTRAINT `ruta_ibfk_1` FOREIGN KEY (`OrigenID`) REFERENCES `destino` (`IdDestino`),
  CONSTRAINT `ruta_ibfk_2` FOREIGN KEY (`DestinoID`) REFERENCES `destino` (`IdDestino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruta`
--

LOCK TABLES `ruta` WRITE;
/*!40000 ALTER TABLE `ruta` DISABLE KEYS */;
INSERT INTO `ruta` VALUES (1,500.00,200.00,1,2),(2,700.00,300.00,1,3),(3,1200.00,600.00,1,4);
/*!40000 ALTER TABLE `ruta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaccion`
--

DROP TABLE IF EXISTS `transaccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaccion` (
  `IdTransaccion` int NOT NULL,
  `IdAsiento` int DEFAULT NULL,
  `Pasaporte` int DEFAULT NULL,
  `Operacion` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaOperacion` bigint DEFAULT NULL,
  `OrigenTransaccion` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VectorClock` json DEFAULT NULL,
  `ServidorConectado` int DEFAULT NULL,
  PRIMARY KEY (`IdTransaccion`),
  KEY `IdAsiento` (`IdAsiento`),
  KEY `Pasaporte` (`Pasaporte`),
  CONSTRAINT `transaccion_ibfk_1` FOREIGN KEY (`IdAsiento`) REFERENCES `asiento` (`IdAsiento`),
  CONSTRAINT `transaccion_ibfk_2` FOREIGN KEY (`Pasaporte`) REFERENCES `pasajero` (`Pasaporte`),
  CONSTRAINT `chk_Operacion` CHECK ((`Operacion` in (_utf8mb4'Devolucion',_utf8mb4'Anulacion',_utf8mb4'Venta',_utf8mb4'Reserva')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaccion`
--

LOCK TABLES `transaccion` WRITE;
/*!40000 ALTER TABLE `transaccion` DISABLE KEYS */;
INSERT INTO `transaccion` VALUES (1,1,12345678,'Reserva',1743992314000,'nodo1','{\"nodo_mongo\": 0, \"nodo_mysql_1\": 1, \"nodo_mysql_2\": 0}',1),(2,1,23456789,'Venta',1743992315000,'nodo2','{\"nodo_mongo\": 0, \"nodo_mysql_1\": 0, \"nodo_mysql_2\": 1}',2);
/*!40000 ALTER TABLE `transaccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vuelo`
--

DROP TABLE IF EXISTS `vuelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vuelo` (
  `IdVuelo` int NOT NULL,
  `FechaHoraSalida` bigint DEFAULT NULL,
  `IdRuta` int DEFAULT NULL,
  `IdNave` int DEFAULT NULL,
  `CodigoVuelo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EsInternacional` tinyint(1) DEFAULT NULL,
  `FechaHoraLlegada` bigint DEFAULT NULL,
  PRIMARY KEY (`IdVuelo`),
  UNIQUE KEY `CodigoVuelo` (`CodigoVuelo`),
  KEY `IdRuta` (`IdRuta`),
  KEY `IdNave` (`IdNave`),
  CONSTRAINT `vuelo_ibfk_1` FOREIGN KEY (`IdRuta`) REFERENCES `ruta` (`IdRuta`),
  CONSTRAINT `vuelo_ibfk_2` FOREIGN KEY (`IdNave`) REFERENCES `nave` (`IdNave`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vuelo`
--

LOCK TABLES `vuelo` WRITE;
/*!40000 ALTER TABLE `vuelo` DISABLE KEYS */;
INSERT INTO `vuelo` VALUES (1,1712505600000,1,1,'AN101',1,1712512800000),(2,1712592000000,2,2,'AN202',1,1712602800000);
/*!40000 ALTER TABLE `vuelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'aeronova'
--

--
-- Dumping routines for database 'aeronova'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-09 10:45:02
