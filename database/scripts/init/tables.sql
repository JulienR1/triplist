CREATE TABLE category
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE item
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE activity
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE activityitem
(
  item_id INT NOT NULL,
  activity_id INT NOT NULL,
  PRIMARY KEY (item_id, activity_id),
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (activity_id) REFERENCES activity(id)
);