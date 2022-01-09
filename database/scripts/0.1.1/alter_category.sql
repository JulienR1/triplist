CREATE TABLE category_order
(
  category_id INT NOT NULL,
  position INT NOT NULL UNIQUE,
  PRIMARY KEY (category_id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

DROP PROCEDURE IF EXISTS init_category_positions;
DELIMITER $$
CREATE PROCEDURE init_category_positions()
BEGIN
DECLARE i INT DEFAULT 0;
DECLARE current_id INT DEFAULT -1;
DECLARE category_count INT DEFAULT 0;

SELECT COUNT(*) FROM category INTO category_count;
WHILE i < category_count DO
	SELECT id INTO current_id FROM category LIMIT i,1;    
	INSERT INTO category_order (position, category_id) VALUES (i, current_id);
    SET i = i + 1;
END WHILE;
END ;
$$
DELIMITER ;

CALL init_category_positions();
DROP PROCEDURE init_category_positions;

DROP VIEW IF EXISTS category_data;
CREATE VIEW category_data AS
SELECT c.*, position
FROM category c
JOIN category_order co ON c.id = co.category_id
ORDER BY position;