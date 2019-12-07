-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2017 at 06:16 AM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Table structure for table `destination`
--

CREATE TABLE IF NOT EXISTS `destination` (
  `id` int(11) NOT NULL,
  `destination` varchar(25) NOT NULL,
  `engine_num` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `destination`
--

INSERT INTO `destination` (`id`, `destination`, `engine_num`) VALUES
(1, 'orbital transfer', 3),
(2, 'low earth orbit', 5),
(3, 'orbital transfer', 25);

-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2017 at 05:07 AM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Table structure for table `engine`
--

CREATE TABLE IF NOT EXISTS `engine` (
  `id` int(11) NOT NULL,
  `upgrade` varchar(50) NOT NULL,
  `cost` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `weight` int(11) NOT NULL,
  `material` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Dumping data for table `engine`
--

INSERT INTO `engine` (`id`, `upgrade`, `cost`, `description`, `weight`, `material`) VALUES
(1, 'turbopump', 30000, 'See part manual 11d', 500, 'steel'),
(2, 'oxidizer preburner', 12000, 'See part manual 15a', 600, 'steel'),
(3, 'lox bleed valve', 3000, 'See part manual 14b', 50, 'aluminum'),
(4, 'low-pressure fuel duct', 7000, 'See part manual 14d', 400, 'steel'),
(5, 'chamber coolant valve', 9000, 'See part manual 17a', 70, 'misc'),
(6, 'ahm controller', 15000, 'See part manual 19c', 15, 'misc'),
(7, 'dome injector', 4000, 'See part manual 19a', 70, 'steel'),
(8, 'turbine drive duct', 20000, 'See part manual 17a', 150, 'composite'),
(9, 'gimble bearing', 2000, 'See part manual 13d', 10, 'ceramic'),
(10, 'composite thrust chamber', 25000, 'See part manual 14b', 300, 'composite'),
(11, 'tvc actuator',5000, 'See part manual 17d',25, 'misc'),
(12, 'dual exhaust manifold', 16000, 'See part manual 17c', 150, 'composite'),
(13, 'gimble outtrigger', 1000, 'See part manual 17a', 20, 'composite'),
(14, 'prefill check valve', 1500, 'See part manual 11a', 50, 'aluminum'),
(15, 'tops mounting pad', 4000, 'See part manual 12d', 60, 'misc'),
(16, 'redundant fuel duct', 17000, 'See part manual 13a', 150, 'composite'),
(17, 'redundant fuel inlet', 8000, 'See part manual 18d', 50, 'aluminum'),
(18, 'turbine discharge duct', 4000, 'See part manual 19b', 80, 'aluminum'),
(19, 'buner caps', 1000, 'See part manual 19a', 10, 'misc'),
(20, 'bellow covers', 3000, 'See part manual 11b', 50, 'misc');

--
-- Database: `final`
--

-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Table structure for table `payload`
--

CREATE TABLE IF NOT EXISTS `payload` (
  `id` int(11) NOT NULL,
  `payload` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payload`
--

INSERT INTO `payload` (`id`, `payload`, `cost`) VALUES
(1, 100000, 50000000),
(2, 75000, 40000000),
(3, 50000, 30000000),
(4, 25000, 20000000);



