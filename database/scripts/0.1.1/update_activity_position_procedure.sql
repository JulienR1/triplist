DROP PROCEDURE IF EXISTS `change_activity_position`;
DELIMITER $$
CREATE PROCEDURE `change_activity_position`
(IN activity_id INT, IN new_position INT)
BEGIN
	DECLARE original_position INT DEFAULT -1;
	DECLARE offset_to_apply INT DEFAULT 0;

	IF activity_id NOT IN (SELECT id FROM activity) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected activity id does not exist.';
	END IF;
	IF new_position < 0 OR new_position > (SELECT MAX(position) FROM activity_order) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected new position is not in the valid range.';
	END IF;

	SELECT position INTO original_position FROM activity_data WHERE id = activity_id;

	IF new_position <> original_position THEN		
		SET offset_to_apply = SIGN(original_position - new_position);

		UPDATE activity_order ao SET position = -1 WHERE ao.activity_id = activity_id;
		UPDATE activity_order
			SET position = position + offset_to_apply
			WHERE position BETWEEN LEAST(original_position, new_position) AND GREATEST(original_position, new_position)
			ORDER BY (CASE WHEN offset_to_apply = 1 THEN position END) DESC, (CASE WHEN offset_to_apply = -1 THEN position END) ASC;
		UPDATE activity_order ao SET position = new_position WHERE ao.activity_id = activity_id;
	END IF;
END
$$
DELIMITER ;