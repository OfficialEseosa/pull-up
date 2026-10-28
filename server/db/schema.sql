-- Users table: one row per Pull Up account.
-- IF NOT EXISTS skips this if the table is already there, so edits to this
-- file don't apply until the table is dropped and the file is run again.
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `personal_email` varchar(255) NOT NULL UNIQUE,  -- UNIQUE: one account per email
  `school_email` varchar(255) NOT NULL UNIQUE,    -- the GSU email that proves they're a student
  `phone_number` varchar(20),                     -- optional, so it can be NULL
  `password` varchar(255) NOT NULL,               -- stores the bcrypt hash, never the real password
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
