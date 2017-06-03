-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 02, 2017 at 08:39 PM
-- Server version: 10.0.29-MariaDB-0ubuntu0.16.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `get_schooled`
--

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `uid` int(8) UNSIGNED NOT NULL COMMENT 'Unique School ID belonging to a single school unit',
  `id_school` int(8) UNSIGNED NOT NULL COMMENT 'Non-unique School ID used to identify all constituents of a single institution (e.g. Saint Vincent College and Saint Vincent Seminary)',
  `id_system` int(5) UNSIGNED NOT NULL COMMENT 'Non-unique School ID shared by all institutions belonging to a system (e.g. all ITT Tech Institutes)',
  `name` varchar(91) NOT NULL COMMENT 'Name of institution',
  `city` varchar(24) NOT NULL COMMENT 'City',
  `state` varchar(2) NOT NULL COMMENT 'State postcode (59 U.S. states: DC AS GU MP PR VI FM MH PW)',
  `lat` float NOT NULL COMMENT 'Latitude in format (##.####)',
  `lng` float NOT NULL COMMENT 'Longitude in format (##.####)',
  `url` varchar(124) NOT NULL DEFAULT '' COMMENT 'URL of the institution''s homepage (if provided)',
  `alias` varchar(680) NOT NULL DEFAULT '' COMMENT 'Institution name aliases, delimited by "|"',
  `size` mediumint(6) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Number of undergraduates seeking a certificate or degree',
  `demog_men` float UNSIGNED DEFAULT NULL COMMENT 'Percentage of undergraduates who are Men, of the total share of undergraduates (0.####)',
  `demog_women` float UNSIGNED DEFAULT NULL COMMENT 'Percentage of undergraduates who are Women, of the total share of undergraduates (0.####)',
  `adm_rate` float UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Admission Rate as a percentage (0.####)',
  `sat_avg` smallint(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Average SAT equivalent score of students admitted',
  `ownership` int(1) UNSIGNED NOT NULL COMMENT 'Ownership of school (1 = Public | 2 = Private, Non-profit | 3 Private, For-Profit)',
  `tuition_in` mediumint(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Tuition and fees per year for in-state residents',
  `tuition_out` mediumint(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Tuition and fees per year for out-of-state students'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid` (`uid`) USING BTREE COMMENT='7243 integers',
  ADD KEY `lat` (`lat`) USING BTREE COMMENT='float',
  ADD KEY `lng` (`lng`) USING BTREE COMMENT='float',
  ADD KEY `tuition_out` (`tuition_out`) USING BTREE COMMENT='integer',
  ADD KEY `ownership` (`ownership`) USING BTREE COMMENT='3 integers';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
