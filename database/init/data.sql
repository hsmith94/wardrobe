-- items table
INSERT INTO items (item_id, user_id, name, description, picture, create_date, update_date, delete_date) VALUES('c48933d5-46ae-11ee-a93f-0242ac140002', 'HARRY', 'White shirt', 'An Oxford cotton shirt from TM Lewin', NULL, '2023-08-29 20:58:13', '2023-08-29 20:58:13', NULL);

-- item_properties table
INSERT INTO item_properties (item_id, property_key, value, metadata) VALUES('c48933d5-46ae-11ee-a93f-0242ac140002', 'COLOR', 'WHITE', NULL);
INSERT INTO item_properties (item_id, property_key, value, metadata) VALUES('c48933d5-46ae-11ee-a93f-0242ac140002', 'MATERIAL', 'COTTON', '{"percentage":90,"subtype":"OXFORD"}');
INSERT INTO item_properties (item_id, property_key, value, metadata) VALUES('c48933d5-46ae-11ee-a93f-0242ac140002', 'MATERIAL', 'ELASTANE', '{"percentage":10}');
INSERT INTO item_properties (item_id, property_key, value, metadata) VALUES('c48933d5-46ae-11ee-a93f-0242ac140002', 'HAS_PATTERN', 'FALSE', NULL);
