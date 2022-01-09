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

DROP PROCEDURE IF EXISTS `change_category_position`;
DELIMITER $$
CREATE PROCEDURE `change_category_position`
(IN category_id INT, IN new_position INT)
BEGIN
	DECLARE original_position INT DEFAULT -1;
	DECLARE offset_to_apply INT DEFAULT 0;

	IF category_id NOT IN (SELECT id FROM category) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected category id does not exist.';
	END IF;
	IF new_position < 0 OR new_position > (SELECT MAX(position) FROM category_order) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected new position is not in the valid range.';
	END IF;

	SELECT position INTO original_position FROM category_data WHERE id = category_id;	

	IF new_position <> original_position THEN		
		SET offset_to_apply = SIGN(original_position - new_position);

		UPDATE category_order co SET position = -1 WHERE co.category_id = category_id;
		UPDATE category_order
			SET position = position + offset_to_apply
			WHERE position BETWEEN LEAST(original_position, new_position) AND GREATEST(original_position, new_position)
			ORDER BY (CASE WHEN offset_to_apply = 1 THEN position END) DESC, (CASE WHEN offset_to_apply = -1 THEN position END) ASC;
		UPDATE category_order co SET position = new_position WHERE co.category_id = category_id;
	END IF;
END
$$
DELIMITER ;