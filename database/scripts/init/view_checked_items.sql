CREATE OR REPLACE VIEW `checked_items` AS
SELECT a.id AS activity_id, category_id, i.id AS item_id, ai.item_id IS NOT NULL AS checked
FROM activity a
JOIN item i
LEFT JOIN activityitem ai ON ai.item_id = i.id AND ai.activity_id = a.id
ORDER BY a.id, i.id;