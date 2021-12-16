CREATE TABLE Category
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Item
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE Activity
(
  id INT NOT NULL AUTO_INCREMENT,
  label VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ActivityItem
(
  item_id INT NOT NULL,
  activity_id INT NOT NULL,
  PRIMARY KEY (item_id, activity_id),
  FOREIGN KEY (item_id) REFERENCES Item(id),
  FOREIGN KEY (activity_id) REFERENCES Activity(id)
);