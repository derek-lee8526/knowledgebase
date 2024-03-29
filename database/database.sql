CREATE SCHEMA IF NOT EXISTS `knowledgebase` DEFAULT CHARACTER SET utf8 ;
USE `knowledgebase`;

CREATE TABLE IF NOT EXISTS Users (
    `ID`VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `imageurl` VARCHAR(255),
    `description` VARCHAR(255),
    `country` VARCHAR(255),
    `dateofbirth` VARCHAR(255),
    `likes` INT,
    PRIMARY KEY(`ID`)
);

