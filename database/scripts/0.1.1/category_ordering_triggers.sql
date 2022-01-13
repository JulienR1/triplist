DROP TRIGGER IF EXISTS `setCategoryPosition`;
DELIMITER $$
CREATE TRIGGER `setCategoryPosition`
AFTER INSERT ON `category`
FOR EACH ROW BEGIN
	DECLARE new_position INT DEFAULT -1;
	SELECT MAX(position) + 1 INTO new_position FROM category_order;
	INSERT INTO category_order (position, category_id) VALUES (new_position, NEW.id);
END
$$
DELIMITER ;

DROP TRIGGER IF EXISTS `cascadeCategoryPositionDelete`;
DELIMITER $$
CREATE TRIGGER `cascadeCategoryPositionDelete`
BEFORE DELETE ON `category`
FOR EACH ROW BEGIN
	DECLARE old_position INT;
	SELECT position INTO old_position FROM category_order WHERE category_id = OLD.id;
	DELETE FROM category_order WHERE category_id = OLD.id;

	UPDATE category_order SET position = position - 1 WHERE position > old_position;
END
$$
DELIMITER ;