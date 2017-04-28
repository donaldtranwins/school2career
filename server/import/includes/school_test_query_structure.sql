-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 26, 2017 at 05:55 PM
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
-- Table structure for table `school_query`
--
CREATE TABLE `school_query` (
  `uid` int(8) UNSIGNED NOT NULL,
  `zip` varchar(5) NOT NULL,
  `lat` decimal(9,7) NOT NULL,
  `lng` decimal(10,7) NOT NULL,
  `prog_agri` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_anthro` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_arch` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_biol_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_bus_mktg` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_comm` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_comm_tech` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_comp_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_construction` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_culinary` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_edu` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_engi` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_engi_tech` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_english` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_fam_con_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_health` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_history` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_humanities` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_law_enfor` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_legal` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_library_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_linguistics` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_math` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_mechanic` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_military` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_multi` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_parks_rec` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_phil_religion` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_phys_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_precision_prod` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_psych` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_pub_adm_soc_serv` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_resources` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_sci_tech` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_soc_sci` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_theology` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_transportation` float UNSIGNED NOT NULL DEFAULT '0',
  `prog_vis_perf_arts` float UNSIGNED NOT NULL DEFAULT '0',
  `deg_agri_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_agri_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_anthro_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_anthro_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_arch_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_arch_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_biol_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_biol_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_bus_mktg_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_bus_mktg_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comm_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comm_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comm_tech_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comm_tech_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comp_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_comp_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_construction_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_construction_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_culinary_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_culinary_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_english_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_english_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_edu_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_edu_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_engi_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_engi_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_engi_tech_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_engi_tech_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_fam_cnsm_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_fam_cnsm_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_health_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_health_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_history_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_history_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_humanities_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_humanities_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_law_enfor_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_law_enfor_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_legal_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_legal_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_library_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_library_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_linguistics_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_linguistics_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_math_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_math_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_mechanic_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_mechanic_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_military_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_military_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_multi_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_multi_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_parks_rec_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_parks_rec_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_phil_religion_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_phil_religion_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_phys_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_phys_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_precision_prod_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_precision_prod_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_psych_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_psych_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_pub_adm_soc_serv_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_pub_adm_soc_serv_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_resources_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_resources_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_sci_tech_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_sci_tech_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_soc_sci_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_soc_sci_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_theology_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_theology_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_transportation_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_transportation_4` tinyint(1) NOT NULL DEFAULT '0',
  `deg_vis_perf_arts_2` tinyint(1) NOT NULL DEFAULT '0',
  `deg_vis_perf_arts_4` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `school_query`
  ADD UNIQUE(`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
