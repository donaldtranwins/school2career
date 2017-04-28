-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 26, 2017 at 05:56 PM
-- Server version: 10.0.29-MariaDB-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `get_tested`
--

-- --------------------------------------------------------

--
-- Table structure for table `school_data`
--

CREATE TABLE `school_data` (
  `uid` int(8) UNSIGNED NOT NULL,
  `id_school` int(8) UNSIGNED NOT NULL,
  `id_system` int(5) UNSIGNED NOT NULL,
  `name` varchar(91) NOT NULL,
  `city` varchar(24) NOT NULL,
  `state` varchar(2) NOT NULL,
  `url` varchar(124) NOT NULL DEFAULT '',
  `alias` varchar(680) NOT NULL DEFAULT '',
  `region` int(1) UNSIGNED NOT NULL,
  `locale` int(2) UNSIGNED NOT NULL DEFAULT '0',
  `cc_setting_size_time` int(2) NOT NULL DEFAULT '0',
  `size` mediumint(6) UNSIGNED NOT NULL DEFAULT '0',
  `demog_men` float UNSIGNED DEFAULT NULL,
  `demog_women` float UNSIGNED DEFAULT NULL,
  `religion` int(3) NOT NULL DEFAULT '0',
  `adm_rate` float UNSIGNED NOT NULL DEFAULT '0',
  `sat_avg` float UNSIGNED NOT NULL DEFAULT '0',
  `cc_selective_time` int(2) NOT NULL DEFAULT '0',
  `cc_focus` int(2) NOT NULL DEFAULT '0',
  `ownership` int(1) UNSIGNED NOT NULL,
  `tuition_in` mediumint(5) UNSIGNED NOT NULL DEFAULT '0',
  `tuition_out` mediumint(5) UNSIGNED NOT NULL DEFAULT '0',
  `aid_grant` float UNSIGNED DEFAULT NULL,
  `aid_loan` float UNSIGNED DEFAULT NULL,
  `online` int(1) UNSIGNED NOT NULL DEFAULT '1'

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `school_data`
--
ALTER TABLE `school_data`
  ADD UNIQUE(`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
