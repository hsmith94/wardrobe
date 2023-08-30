-- v0 db schema

CREATE TABLE `items` (
    `item_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
    `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
    `name` mediumtext COLLATE utf8mb4_unicode_ci,
    `description` longtext COLLATE utf8mb4_unicode_ci,
    `picture` varchar(511) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `delete_date` datetime DEFAULT NULL,
    PRIMARY KEY (`item_id`),
    FULLTEXT KEY `items_name_FULL_TEXT_IDX` (`name`),
    FULLTEXT KEY `items_description_FULL_TEXT_IDX` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `item_properties` (
    `item_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
    `property_key` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `metadata` json DEFAULT NULL,
    UNIQUE KEY `item_properties_UN` (`item_id`, `property_key`, `value`),
    CONSTRAINT `item_properties_FK` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;