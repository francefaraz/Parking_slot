CREATE TABLE `park_slots` (
  `slot_id` int NOT NULL,
  `current_status` varchar(20) DEFAULT 'empty',
  `contains` varchar(20) DEFAULT NULL,
  `numbers_of_vehicle` varchar(100) ,
  PRIMARY KEY (`slot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO park_slots (slot_id) Values(1),(2),(3),(4),(5)