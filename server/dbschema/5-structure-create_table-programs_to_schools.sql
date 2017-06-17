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
-- Table structure for table `programs_to_schools`
--

CREATE TABLE `programs_to_schools` (
  `uid` int(8) UNSIGNED NOT NULL COMMENT 'Unique School ID belonging to a single school unit from the `schools` table',
  `pid` int(2) UNSIGNED NOT NULL COMMENT 'Unique Program ID to reference a program from the `programs` table',
  `p_pct` float UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Percentage of degrees awarded in the program out of the total degrees awarded',
  `deg_2` tinyint(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Boolean: Associates Degree offered',
  `deg_4` tinyint(1) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Boolean: Bachelors Degree offered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `programs_to_schools`
--
ALTER TABLE `programs_to_schools`
  ADD KEY `pid` (`pid`) USING BTREE COMMENT='38 integers',
  ADD KEY `uid` (`uid`) USING BTREE COMMENT='int',
  ADD KEY `deg_4` (`deg_4`) USING BTREE COMMENT='boolean',
  ADD KEY `deg_2` (`deg_2`) USING BTREE COMMENT='boolean';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
