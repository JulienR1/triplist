CREATE TABLE activity_order
(
  activity_id INT NOT NULL,
  position INT NOT NULL UNIQUE,
  PRIMARY KEY (activity_id),
  FOREIGN KEY (activity_id) REFERENCES activity(id)
);

DROP PROCEDURE IF EXISTS init_activity_positions;
DELIMITER $$
CREATE PROCEDURE init_activity_positions()
BEGIN
DECLARE i INT DEFAULT 0;
DECLARE current_id INT DEFAULT -1;
DECLARE activity_count INT DEFAULT 0;

SELECT COUNT(*) FROM activity INTO activity_count;
WHILE i < activity_count DO
	SELECT id INTO current_id FROM activity LIMIT i,1;    
	INSERT INTO activity_order (position, activity_id) VALUES (i, current_id);
    SET i = i + 1;
END WHILE;
END ;
$$
DELIMITER ;

CALL init_activity_positions();
DROP PROCEDURE init_activity_positions;

DROP VIEW IF EXISTS activity_data;
CREATE VIEW activity_data AS
SELECT a.*, position
FROM activity a
JOIN activity_order ao ON a.id = ao.activity_id
ORDER BY position;