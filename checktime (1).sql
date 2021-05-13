-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2021 at 11:53 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `checktime`
--

-- --------------------------------------------------------

--
-- Table structure for table `listpersonnel`
--

CREATE TABLE `listpersonnel` (
  `idListPersonnel` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `numberPersonnel` varchar(255) NOT NULL,
  `pay` int(11) NOT NULL,
  `position` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `listpersonnel`
--

INSERT INTO `listpersonnel` (`idListPersonnel`, `name`, `lastName`, `numberPersonnel`, `pay`, `position`) VALUES
(123456789, 'narasak', '', '123456789', 0, ''),
(611102108, 'Thanakorn', 'boonnontae', '611102108', 0, ''),
(611102110, 'rungniran', 'ketason', '611102110', 1600, 'Developers (นักพัฒนา)'),
(611102111, 'rungniran1', 'ketason1', '611102111', 900, 'Tester (ผู้ทดสอบ)'),
(611102121, 'itti', '', '611102121', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `worktime`
--

CREATE TABLE `worktime` (
  `idWorkTime` int(11) NOT NULL,
  `idListPersonnel` int(11) NOT NULL,
  `T` varchar(11) NOT NULL,
  `Off_T` varchar(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `month` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `worktime`
--

INSERT INTO `worktime` (`idWorkTime`, `idListPersonnel`, `T`, `Off_T`, `day`, `month`, `year`) VALUES
(2, 611102110, '07:45', '', '29', '11', '2020'),
(3, 611102110, '07:45', '', '30', '11', '2020'),
(4, 611102110, '07:45', '', '04', '12', '2020'),
(5, 611102110, '07:45', '', '05', '12', '2020'),
(6, 611102110, '07:45', '', '06', '12', '2020'),
(7, 611102110, '07:45', '', '08', '12', '2020'),
(8, 611102110, '07:45', '', '09', '12', '2020'),
(9, 611102110, '07:45', '', '10', '12', '2020'),
(10, 611102110, '07:45', '', '11', '12', '2020'),
(11, 611102110, '07:45', '', '12', '12', '2020'),
(12, 611102110, '07:45', '', '13', '12', '2020'),
(13, 611102110, '07:45', '', '14', '12', '2020'),
(14, 611102110, '07:45', '', '15', '12', '2020'),
(15, 611102110, '07:45', '', '16', '12', '2020'),
(16, 611102111, '01:27', '', '17', '12', '2020'),
(19, 611102110, '15:25', '', '17', '12', '2020'),
(21, 611102110, '10:52', '', '20', '12', '2020'),
(22, 611102111, '12:15', '', '20', '12', '2020'),
(23, 611102110, '16:25', '', '26', '12', '2020'),
(24, 611102111, '16:26', '', '26', '12', '2020'),
(25, 611102110, '13:37', '', '28', '12', '2020'),
(26, 611102111, '14:25', '', '28', '12', '2020'),
(27, 611102110, '15:02', '', '29', '12', '2020'),
(28, 611102111, '15:03', '', '29', '12', '2020'),
(29, 611102110, '11:26', '', '02', '01', '2021'),
(30, 611102111, '11:26', '', '02', '01', '2021'),
(31, 611102110, '19:24', '', '03', '01', '2021'),
(32, 611102111, '19:24', '', '03', '01', '2021'),
(33, 611102110, '12:51', '', '04', '01', '2021'),
(34, 611102110, '07:53', '', '05', '01', '2021'),
(35, 611102111, '07:53', '', '05', '01', '2021'),
(36, 611102111, '05:03', '', '08', '01', '2021'),
(37, 611102110, '05:03', '', '08', '01', '2021'),
(39, 611102110, '16:36', '', '13', '01', '2021'),
(44, 611102110, '10:20', '', '15', '01', '2021'),
(46, 611102110, '23:16', '', '20', '01', '2021'),
(47, 611102111, '23:22', '', '20', '01', '2021'),
(48, 611102110, '13:24', '', '21', '01', '2021'),
(49, 611102111, '13:25', '', '21', '01', '2021'),
(56, 611102110, '17:11', '17:16', '30', '01', '2021'),
(57, 611102111, '17:15', '', '30', '01', '2021'),
(58, 611102110, '16:47', '16:49', '31', '01', '2021'),
(60, 611102110, '18:33', '18:40', '23', '02', '2021'),
(61, 611102110, '19:10', '', '04', '03', '2021'),
(62, 611102110, '13:37', '', '05', '03', '2021'),
(63, 611102110, '09:52', '', '02', '04', '2021'),
(77, 611102111, '13:43', '13:45', '24', '04', '2021'),
(78, 611102110, '13:43', '13:44', '24', '04', '2021'),
(93, 611102110, '14:46', '14:59 ', '25', '04', '2021'),
(94, 611102110, '18:35', '18:36 ', '26', '04', '2021'),
(95, 611102110, '10:45', '10:47 ', '04', '05', '2021'),
(96, 611102110, '18:31', '18:34 ', '05', '05', '2021');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listpersonnel`
--
ALTER TABLE `listpersonnel`
  ADD PRIMARY KEY (`idListPersonnel`);

--
-- Indexes for table `worktime`
--
ALTER TABLE `worktime`
  ADD PRIMARY KEY (`idWorkTime`),
  ADD KEY `idListPersonnel` (`idListPersonnel`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listpersonnel`
--
ALTER TABLE `listpersonnel`
  MODIFY `idListPersonnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=611102123;

--
-- AUTO_INCREMENT for table `worktime`
--
ALTER TABLE `worktime`
  MODIFY `idWorkTime` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `worktime`
--
ALTER TABLE `worktime`
  ADD CONSTRAINT `worktime_ibfk_1` FOREIGN KEY (`idListPersonnel`) REFERENCES `listpersonnel` (`idListPersonnel`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
