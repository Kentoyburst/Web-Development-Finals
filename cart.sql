-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 02:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timehaven`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `specs` text DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `name`, `price`, `image`, `specs`, `condition`, `added_at`) VALUES
(14, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 04:25:08'),
(15, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 04:34:55'),
(16, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 04:35:06'),
(17, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:15:07'),
(18, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:15:18'),
(19, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:17:50'),
(20, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:28:10'),
(21, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:28:26'),
(22, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 05:56:55'),
(23, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 06:22:58'),
(24, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 06:23:12'),
(25, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 06:43:52'),
(26, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 06:44:55'),
(27, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 06:45:11'),
(28, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 07:43:38'),
(29, 1, 'skx007k', '0', 11499.00, '0', 'Caliber: 7S26, 21 Jewels, 200M Water Resistance', 'Newly overhauled', '2025-05-29 08:17:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
