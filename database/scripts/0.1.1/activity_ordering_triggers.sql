DROP TRIGGER IF EXISTS `set_activity_position`;
DELIMITER $$
CREATE TRIGGER `set_activity_position`
AFTER INSERT ON `activity`
FOR EACH ROW BEGIN
	DECLARE new_position INT DEFAULT -1;
	SELECT MAX(position) + 1 INTO new_position FROM activity_order;
	INSERT INTO activity_order (position, activity_id) VALUES (new_position, NEW.id);
END
$$
DELIMITER ;

DROP TRIGGER IF EXISTS `cascade_activity_position_delete`;
DELIMITER $$
CREATE TRIGGER `cascade_activity_position_delete`
BEFORE DELETE ON `activity`
FOR EACH ROW BEGIN
	DECLARE old_position INT;
	SELECT position INTO old_position FROM activity_order WHERE activity_id = OLD.id;
	DELETE FROM activity_order WHERE activity_id = OLD.id;

	UPDATE activity_order SET position = position - 1 WHERE position > old_position;
END
$$
DELIMITER ;