/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 10.4.22-MariaDB : Database - akademikdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`akademikdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `akademikdb`;

/*Table structure for table `mst_fakultas` */

DROP TABLE IF EXISTS `mst_fakultas`;

CREATE TABLE `mst_fakultas` (
  `kode_fakultas` char(2) NOT NULL,
  `nama_fakultas` varchar(50) NOT NULL,
  `nama_dekan` varchar(50) DEFAULT NULL,
  `alamat` tinytext DEFAULT NULL,
  PRIMARY KEY (`kode_fakultas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `mst_fakultas` */

insert  into `mst_fakultas`(`kode_fakultas`,`nama_fakultas`,`nama_dekan`,`alamat`) values 
('01','EKONOMI','BUDI PRASETYO','BOGOR'),
('02','ILMU KOMPUTER','NUR ALAMSYAH',NULL),
('03','SASTRA','FRISTI',NULL),
('04','PSIKOLOGI','SITI SARAH',NULL),
('05','TEKNIK','SJAMSURIJAL',NULL),
('06','ILMU POLITIK','KRISE ROHALIA','CIAMIS');

/*Table structure for table `mst_jurusan` */

DROP TABLE IF EXISTS `mst_jurusan`;

CREATE TABLE `mst_jurusan` (
  `kode_jurusan` char(2) NOT NULL,
  `nama_jurusan` varchar(50) NOT NULL,
  `nama_kajur` varchar(50) DEFAULT NULL,
  `kode_fakultas` char(2) DEFAULT NULL,
  PRIMARY KEY (`kode_jurusan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `mst_jurusan` */

insert  into `mst_jurusan`(`kode_jurusan`,`nama_jurusan`,`nama_kajur`,`kode_fakultas`) values 
('01','S1 MANAJEMEN',NULL,'01'),
('02','S1 AKUNTANSI',NULL,'01'),
('03','TEKNIK INFORMATIKA',NULL,'02'),
('04','MANAJAMEN INFORMATIKA',NULL,'02'),
('05','S1 SASTRA JEPANG',NULL,'03'),
('06','D3 BAHASA INGGRIS',NULL,'03'),
('07','S1 PSIKOLOGI',NULL,'04');

/*Table structure for table `mst_matakuliah` */

DROP TABLE IF EXISTS `mst_matakuliah`;

CREATE TABLE `mst_matakuliah` (
  `kode_matakuliah` char(6) NOT NULL,
  `nama_matakuliah` varchar(50) NOT NULL,
  `semester` tinyint(4) DEFAULT NULL,
  `sks` tinyint(4) DEFAULT NULL,
  `kode_prasyarat` char(6) DEFAULT NULL,
  `kode_jurusan` char(2) DEFAULT NULL,
  PRIMARY KEY (`kode_matakuliah`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `mst_matakuliah` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
