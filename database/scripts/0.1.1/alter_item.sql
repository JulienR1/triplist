CREATE TABLE item_order
(
  position INT NOT NULL,
  item_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (item_id, category_id),
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (category_id) REFERENCES category(id),
  UNIQUE (category_id, position)
);

DROP PROCEDURE IF EXISTS init_item_positions;
DELIMITER $$
CREATE PROCEDURE init_item_positions()
BEGIN
DECLARE category_index INT DEFAULT 0;
DECLARE category_count INT DEFAULT 0;
DECLARE current_category_id INT DEFAULT -1;

DECLARE current_item_index INT DEFAULT 0;
DECLARE current_item_count INT DEFAULT 0;
DECLARE current_item_id INT DEFAULT -1;

SELECT COUNT(*) FROM category INTO category_count;
WHILE category_index < category_count DO
	SELECT id INTO current_category_id FROM category LIMIT category_index,1;

    SELECT COUNT(*) FROM item WHERE category_id = current_category_id INTO current_item_count;
    WHILE current_item_index < current_item_count DO
        SELECT id INTO current_item_id FROM item WHERE category_id = current_category_id LIMIT current_item_index,1;
        INSERT INTO item_order (position, item_id, category_id) VALUES (current_item_index, current_item_id, current_category_id);
        SET current_item_index = current_item_index + 1;
    END WHILE;
    SET current_item_index = 0;

    SET category_index = category_index + 1;
END WHILE;
END ;
$$
DELIMITER ;

CALL init_item_positions();
DROP PROCEDURE init_item_positions;

DROP VIEW IF EXISTS item_data;
CREATE VIEW item_data AS
SELECT i.*, position
FROM item i
JOIN item_order ON i.id = item_order.item_id
ORDER BY category_id, position;