CREATE TABLE `cities` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`country_id` int,
	`popularity` enum('unknown','known','popular')
);

CREATE TABLE `countries` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256)
);

CREATE TABLE `todos` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`is_done` boolean NOT NULL DEFAULT false
);

ALTER TABLE `cities` ADD CONSTRAINT `cities_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`);