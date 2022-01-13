DROP TRIGGER IF EXISTS `clearCategoryItems`;
DELIMITER $$
CREATE TRIGGER `clearCategoryItems`
BEFORE DELETE ON `category`
FOR EACH ROW BEGIN
	DELETE FROM item
    WHERE category_id = OLD.id;
END$$
DELIMITER ;
