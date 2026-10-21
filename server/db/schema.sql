CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `personal_email` varchar(255) NOT NULL UNIQUE,
  `school_email` varchar(255) NOT NULL UNIQUE,
  `phone_number` varchar(20),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;