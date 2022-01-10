DROP PROCEDURE IF EXISTS `change_item_position`;
DELIMITER $$
CREATE PROCEDURE `change_item_position`
(IN item_id INT, IN new_position INT)
BEGIN
    DECLARE item_category_id INT DEFAULT -1; 
	DECLARE original_position INT DEFAULT -1;
	DECLARE offset_to_apply INT DEFAULT 0;

    SELECT category_id INTO item_category_id FROM item WHERE id = item_id;

	IF item_id NOT IN (SELECT id FROM item WHERE category_id = item_category_id) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected category id does not exist.';
	END IF;
	IF new_position < 0 OR new_position > (SELECT COUNT(position) FROM item_order WHERE category_id = item_category_id) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected new position is not in the valid range.';
	END IF;

	SELECT position INTO original_position FROM item_data WHERE id = item_id;

	IF new_position <> original_position THEN		
		SET offset_to_apply = SIGN(original_position - new_position);

		UPDATE item_order SET position = -1 WHERE item_order.item_id = item_id;
		UPDATE item_order
			SET position = position + offset_to_apply
			WHERE position BETWEEN LEAST(original_position, new_position) AND GREATEST(original_position, new_position) AND category_id = item_category_id
			ORDER BY (CASE WHEN offset_to_apply = 1 THEN position END) DESC, (CASE WHEN offset_to_apply = -1 THEN position END) ASC;
		UPDATE item_order SET position = new_position WHERE item_order.item_id = item_id;
	END IF;
END
$$
DELIMITER ;