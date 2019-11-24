CREATE TABLE IF NOT EXISTS `USERS` (
    `ID` INT AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imageurl` VARCHAR(255),
    `description` VARCHAR(255),
    `country` VARCHAR(255),
    `dateofbirth` VARCHAR(255)
    PRIMARY KEY(`ID`)
);