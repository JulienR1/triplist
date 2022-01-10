DROP TRIGGER IF EXISTS `set_item_positions`;
DELIMITER $$
CREATE TRIGGER `set_item_positions`
AFTER INSERT ON `item`
FOR EACH ROW BEGIN
	DECLARE new_position INT DEFAULT -1;
	SELECT IFNULL(MAX(position) + 1, 0) INTO new_position FROM item_order WHERE category_id = NEW.category_id;
	INSERT INTO item_order (position, item_id, category_id) VALUES (new_position, NEW.id, NEW.category_id);
END
$$
DELIMITER ;

DROP TRIGGER IF EXISTS `cascade_item_position_delete`;
DELIMITER $$
CREATE TRIGGER `cascade_item_position_delete`
BEFORE DELETE ON `item`
FOR EACH ROW BEGIN
	DECLARE old_position INT;
	SELECT position INTO old_position FROM item_order WHERE item_id = OLD.id;
	DELETE FROM item_order WHERE item_id = OLD.id;

	UPDATE item_order SET position = position - 1 WHERE position > old_position AND category_id = OLD.category_id;
END
$$
DELIMITER ;