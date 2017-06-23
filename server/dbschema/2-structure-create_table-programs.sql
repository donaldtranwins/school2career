-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 02, 2017 at 08:43 PM
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
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `pid` int(2) UNSIGNED NOT NULL COMMENT 'Unique Program ID to reference from the `programs_to_schools` table',
  `program` varchar(21) NOT NULL COMMENT 'Name of program to reference in the CSV from the Data Dump',
  `external` varchar(24) NOT NULL COMMENT 'Name of program to reference from the front-end in the drop-down menu from the landing page',
  `description` varchar(96) NOT NULL COMMENT 'The complete list of programs included, as described in the Data Dictionary of the data source'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`pid`, `program`, `external`, `description`) VALUES
(1, 'prog_agri', 'Agriculture', 'Agriculture, Agriculture Operations, and Related Sciences'),
(2, 'prog_anthro', 'Anthropology', 'Area, Ethnic, Cultural, Gender, and Group Studies'),
(3, 'prog_arch', 'Architecture', 'Architecture and Related Services'),
(4, 'prog_biol', 'Biology/Biomedical', 'Biological and Biomedical Sciences'),
(5, 'prog_bus_mktg_mgmt', 'Business', 'Business, Management, Marketing, and Related Support Services'),
(6, 'prog_comm', 'Communications', 'Communication, Journalism, and Related Programs'),
(7, 'prog_comm_tech', 'Communications Tech', 'Communications Technologies/Technicians and Support Services'),
(8, 'prog_comp_sci', 'Computer Science', 'Computer and Information Sciences and Support Services'),
(9, 'prog_construction', 'Construction', 'Construction Trades'),
(10, 'prog_culinary', 'Personal & Culinary', 'Personal and Culinary Services'),
(11, 'prog_edu', 'Education', 'Education'),
(12, 'prog_engi', 'Engineering', 'Engineering'),
(13, 'prog_engi_tech', 'Engineering Tech', 'Engineering Technologies and Engineering-Related Fields'),
(14, 'prog_english', 'English', 'English Language and Literature/Letters'),
(15, 'prog_fam_con_sci', 'Family/Consumer Sci', 'Family and Consumer Sciences/Human Sciences'),
(16, 'prog_health', 'Health', 'Health Professions and Related Programs'),
(17, 'prog_history', 'History', 'History'),
(18, 'prog_humanities', 'Humanities', 'Liberal Arts and Sciences, General Studies and Humanities'),
(19, 'prog_law_enf_secur', 'Law Enforcement', 'Homeland Security, Law Enforcement, Firefighting and Related Protective Services'),
(20, 'prog_legal', 'Legal Professions', 'Legal Professions and Studies'),
(21, 'prog_library_sci', 'Library Science', 'Library Science'),
(22, 'prog_linguistics', 'Linguistics', 'Foreign Languages, Literatures, and Linguistics'),
(23, 'prog_math', 'Mathematics', 'Mathematics and Statistics'),
(24, 'prog_mechanic', 'Mechanic/Repair', 'Mechanic and Repair Technologies/Technicians'),
(25, 'prog_military', 'Military Technologies', 'Military Technologies and Applied Sciences'),
(26, 'prog_multi', 'Multi/Interdisciplinary', 'Multi/Interdisciplinary Studies'),
(27, 'prog_resources', 'Natural Resources', 'Natural Resources and Conservation'),
(28, 'prog_parks_rec', 'Parks/Recreation', 'Parks, Recreation, Leisure, and Fitness Studies'),
(29, 'prog_phil_religion', 'Philosophy/Religion', 'Philosophy and Religious Studies'),
(30, 'prog_phys_sci', 'Physical Sciences', 'Physical Sciences'),
(31, 'prog_precision_prod', 'Precision Production', 'Precision Production'),
(32, 'prog_psych', 'Psychology', 'Psychology'),
(33, 'prog_pub_adm_soc_serv', 'Social Services', 'Public Administration and Social Service Professions'),
(34, 'prog_sci_tech', 'Science Technologies', 'Science Technologies/Technicians'),
(35, 'prog_soc_sci', 'Social Sciences', 'Social Sciences'),
(36, 'prog_theology', 'Religious Vocations', 'Theology and Religious Vocations'),
(37, 'prog_transportation', 'Transportation', 'Transportation and Materials Moving'),
(38, 'prog_vis_perf_arts', 'Performing Arts', 'Visual and Performing Arts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `pid` (`pid`) USING BTREE COMMENT='38 ints',
  ADD KEY `external` (`external`) USING BTREE COMMENT='38 strings';

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `pid` int(2) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique Program ID to reference from the `programs_to_schools` table', AUTO_INCREMENT=39;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
