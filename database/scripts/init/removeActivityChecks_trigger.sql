DROP TRIGGER IF EXISTS `removeActivityChecks`;
DELIMITER $$
CREATE TRIGGER `removeActivityChecks`
BEFORE DELETE ON `activity`
FOR EACH ROW BEGIN
	DELETE FROM activityitem
    WHERE activity_id = OLD.id;
END$$
DELIMITER ;
