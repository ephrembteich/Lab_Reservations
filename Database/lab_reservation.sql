-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 21, 2015 at 01:47 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lab_reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE IF NOT EXISTS `account` (
  `username` varchar(5) NOT NULL,
  `password` varchar(20) NOT NULL,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`username`, `password`) VALUES
('adm00', 'admin'),
('ehb03', 'admin'),
('kjk03', 'kareemisawesome'),
('mk03', 'admin'),
('six09', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `eventcalendar`
--

CREATE TABLE IF NOT EXISTS `eventcalendar` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Lab` int(11) NOT NULL,
  `eventDate` date NOT NULL,
  `eventStart` time NOT NULL,
  `addedBy` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=51 ;

--
-- Dumping data for table `eventcalendar`
--

INSERT INTO `eventcalendar` (`ID`, `Title`, `Lab`, `eventDate`, `eventStart`, `addedBy`) VALUES
(2, 'QUIZ 3', 209, '2015-12-22', '03:00:00', 'mk03'),
(3, 'quiz 69', 208, '2015-12-14', '10:00:00', 'hs04'),
(4, 'cmps 200 test', 210, '2015-12-25', '12:00:00', 'six09'),
(5, 'cmps 257 final', 114, '2015-12-21', '11:00:00', 'ehb03'),
(17, 'cmps 278 final', 114, '2015-12-22', '08:00:00', 'adm00'),
(20, 'cmps%20211%20final', 114, '2015-12-22', '11:00:00', 'adm00'),
(21, 'cmps%20212%20final', 114, '2015-12-24', '12:00:00', 'adm00'),
(22, 'cmps%20251%20lab', 114, '2015-12-25', '10:00:00', 'ehb03'),
(23, 'cmps%20222%20lab', 208, '2015-12-22', '02:00:00', 'ehb03'),
(31, 'cmps%20278%20quiz', 114, '2015-12-21', '12:00:00', 'adm00'),
(33, 'kaafrani%20chem', 114, '2015-12-22', '12:00:00', 'adm00'),
(46, 'cmps%20200%20quiz', 114, '2016-01-19', '10:00:00', 'adm00'),
(47, 'cmps%20200%20test', 114, '2016-01-18', '10:00:00', 'adm00'),
(48, 'cmps%20222', 114, '2016-01-19', '09:00:00', 'adm00'),
(49, 'cmps%20200', 114, '2016-04-19', '09:00:00', 'adm00'),
(50, 'cmps%20333', 114, '2016-04-19', '11:00:00', 'adm00');
