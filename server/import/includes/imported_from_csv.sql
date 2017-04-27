-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2017 at 05:17 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `imported_from_csv`
--

CREATE TABLE `imported_from_csv` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `id_school` int(8) UNSIGNED NOT NULL,
  `id_system` int(5) UNSIGNED NOT NULL,
  `name` varchar(91) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imported_from_csv`
--

INSERT INTO `imported_from_csv` (`id`, `id_school`, `id_system`, `name`) VALUES
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville'),
(100654, 100200, 1002, 'Alabama A & M University'),
(100663, 105200, 1052, 'University of Alabama at Birmingham'),
(100690, 2503400, 25034, 'Amridge University'),
(100706, 105500, 1055, 'University of Alabama in Huntsville');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
